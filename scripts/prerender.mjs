/**
 * Post-build SSG: erzeugt pro Route ein statisches HTML mit
 *  - Route-spezifischem <title>, Meta-Description, Keywords, Canonical
 *  - Open Graph / Twitter Cards
 *  - Route-spezifischem JSON-LD (Service, BreadcrumbList, FAQPage, ...)
 *  - Sichtbarem SEO-Fallback-Inhalt im #root für Crawler ohne JS
 * Außerdem: generiert dist/sitemap.xml aus der Routenliste.
 *
 * Wird automatisch über `npm run build` (postbuild) aufgerufen.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build as esbuild } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const INDEX_HTML = path.join(DIST, 'index.html');

/** seo.ts ist TypeScript – wir bundeln es kurz mit esbuild zu einer .mjs in einem Temp-Pfad. */
async function loadSeo() {
  const tmpOut = path.join(DIST, '__seo.mjs');
  await esbuild({
    entryPoints: [path.join(ROOT, 'src', 'seo.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: tmpOut,
    logLevel: 'silent',
  });
  return import(pathToFileURL(tmpOut).href);
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escAttr(s) {
  return esc(s);
}

function buildHeadInjection(seo, SITE_URL, DEFAULT_OG_IMAGE) {
  const url = `${SITE_URL}${seo.path}`;
  const ogImage = seo.ogImage || DEFAULT_OG_IMAGE;
  const robots = seo.robots || 'index, follow, max-snippet:-1, max-image-preview:large';
  const lines = [];
  lines.push(`<meta name="description" content="${escAttr(seo.description)}" data-dk-seo="1" />`);
  if (seo.keywords) lines.push(`<meta name="keywords" content="${escAttr(seo.keywords)}" data-dk-seo="1" />`);
  lines.push(`<meta name="robots" content="${escAttr(robots)}" data-dk-seo="1" />`);
  lines.push(`<link rel="canonical" href="${escAttr(url)}" data-dk-seo="1" />`);
  lines.push(`<meta property="og:url" content="${escAttr(url)}" data-dk-seo="1" />`);
  lines.push(`<meta property="og:title" content="${escAttr(seo.title)}" data-dk-seo="1" />`);
  lines.push(`<meta property="og:description" content="${escAttr(seo.description)}" data-dk-seo="1" />`);
  lines.push(`<meta property="og:image" content="${escAttr(ogImage)}" data-dk-seo="1" />`);
  lines.push(`<meta name="twitter:title" content="${escAttr(seo.title)}" data-dk-seo="1" />`);
  lines.push(`<meta name="twitter:description" content="${escAttr(seo.description)}" data-dk-seo="1" />`);
  lines.push(`<meta name="twitter:image" content="${escAttr(ogImage)}" data-dk-seo="1" />`);
  if (Array.isArray(seo.jsonLd)) {
    for (let i = 0; i < seo.jsonLd.length; i++) {
      const json = JSON.stringify(seo.jsonLd[i]).replace(/</g, '\\u003c');
      lines.push(`<script type="application/ld+json" id="dk-seo-jsonld-${i}">${json}</script>`);
    }
  }
  return lines.join('\n    ');
}

function buildSeoFallback(seo) {
  // Sichtbarer, semantischer Fallback – im React-Mount wird er ersetzt.
  // Bleibt aber für Crawler ohne JS und kurzen Initial-Paint präsent.
  return `<div id="dk-seo-fallback" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">
        <h1>${esc(seo.prerenderH1 || seo.title)}</h1>
        ${seo.prerenderBody ? `<p>${esc(seo.prerenderBody)}</p>` : ''}
      </div>`;
}

function applyToTemplate(template, seo, helpers) {
  const url = `${helpers.SITE_URL}${seo.path}`;
  // <title>
  let out = template.replace(/<title>.*?<\/title>/s, `<title>${esc(seo.title)}</title>`);
  // Entferne die Default-Tags aus index.html, die wir per Route überschreiben:
  out = out.replace(/<meta\s+name="description"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+name="keywords"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+name="robots"[^>]*>\s*/g, '');
  out = out.replace(/<link\s+rel="canonical"[^>]*>\s*/g, '');
  out = out.replace(/<link\s+rel="alternate"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+property="og:url"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+property="og:title"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+property="og:description"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+property="og:image"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+name="twitter:title"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+name="twitter:description"[^>]*>\s*/g, '');
  out = out.replace(/<meta\s+name="twitter:image"[^>]*>\s*/g, '');
  // Frische hreflang-Tags pro Route
  const hreflang = `<link rel="alternate" hreflang="de" href="${escAttr(url)}" data-dk-seo="1" />\n    <link rel="alternate" hreflang="x-default" href="${escAttr(url)}" data-dk-seo="1" />`;
  out = out.replace(/<\/head>/, `    ${hreflang}\n  </head>`);

  // Injection direkt vor </head>
  const headInj = buildHeadInjection(seo, helpers.SITE_URL, helpers.DEFAULT_OG_IMAGE);
  out = out.replace(/<\/head>/, `    ${headInj}\n  </head>`);

  // SEO-Fallback in #root einfügen (sr-only, wird beim React-Mount überschrieben).
  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    (m) => m.replace('<div id="root">', `<div id="root">${buildSeoFallback(seo)}`),
  );

  return out;
}

function makeCleanSitemap(routes, SITE_URL) {
  const today = new Date().toISOString().split('T')[0];
  const urls = routes
    .map((r) => {
      const noindex = (r.robots || '').includes('noindex');
      if (noindex) return null;
      const url = `${SITE_URL}${r.path}`;
      const priority = r.path === '/' ? '1.0' : r.path.startsWith('/leistungen/') ? '0.8' : r.path === '/leistungen' ? '0.9' : '0.6';
      const changefreq = r.path === '/' ? 'weekly' : 'monthly';
      return `  <url>\n    <loc>${esc(url)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .filter(Boolean)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  if (!existsSync(INDEX_HTML)) {
    console.error(`[prerender] ${INDEX_HTML} nicht gefunden – läuft "vite build"?`);
    process.exit(1);
  }
  const { SITE_URL, DEFAULT_OG_IMAGE, listAllRoutes } = await loadSeo();
  const routes = listAllRoutes();
  const template = await readFile(INDEX_HTML, 'utf8');

  let count = 0;
  for (const r of routes) {
    const html = applyToTemplate(template, r, { SITE_URL, DEFAULT_OG_IMAGE });
    const outDir = r.path === '/' ? DIST : path.join(DIST, r.path.replace(/^\//, ''));
    await mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');
    await writeFile(outFile, html, 'utf8');
    count++;
  }

  // Sitemap
  const sitemap = makeCleanSitemap(routes, SITE_URL);
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  // Temp-Datei aufräumen
  await rm(path.join(DIST, '__seo.mjs'), { force: true });

  console.log(`[prerender] ${count} Routen geschrieben, sitemap.xml erstellt.`);
}

main().catch((e) => {
  console.error('[prerender] Fehler:', e);
  process.exit(1);
});
