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

/** serviceContent.ts (reine Daten) fuer den Prerender-Inhalt laden. */
async function loadServiceContent() {
  const tmpOut = path.join(DIST, '__servicecontent.mjs');
  await esbuild({
    entryPoints: [path.join(ROOT, 'src', 'serviceContent.ts')],
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

const NAP_HTML = `
        <address style="font-style:normal">
          <strong>DK Finanzkanzlei</strong> · Joel Dakaj<br />
          Eilendorfer Straße 215, 52078 Aachen, Nordrhein-Westfalen, Deutschland<br />
          Telefon: <a href="tel:+491731038570" style="color:#7dd3fc">+49 173 1038570</a> ·
          E-Mail: <a href="mailto:dakaj@dk-finanzkanzlei.de" style="color:#7dd3fc">dakaj@dk-finanzkanzlei.de</a><br />
          Öffnungszeiten: Montag bis Samstag, 10:00–20:00 Uhr
        </address>`;

const LOCAL_HTML = `
        <h2>Finanzberatung in Aachen und Umgebung</h2>
        <p>
          Die DK Finanzkanzlei ist eine kundenorientierte Finanzberatung mit Sitz in Aachen-Eilendorf.
          Wir beraten Mandanten in Aachen, Eschweiler, Stolberg, Würselen, Alsdorf, Herzogenrath,
          Düren und der gesamten Städteregion Aachen – auf Wunsch persönlich vor Ort oder
          deutschlandweit per Video-Call. Die Erstberatung ist kostenlos und unverbindlich.
        </p>`;

function linksHtml(routes, currentPath) {
  const services = routes.filter((r) => r.path.startsWith('/leistungen/'));
  const pages = routes.filter((r) => !r.path.startsWith('/leistungen/') && r.path !== currentPath);
  return `<h2>Unsere Leistungen im Überblick</h2>
        <ul>${services
          .map((r) => `<li><a href="${escAttr(r.path)}" style="color:#7dd3fc">${esc(r.prerenderH1 || r.title)}</a></li>`)
          .join('')}</ul>
        <h2>Weitere Seiten</h2>
        <ul>${pages
          .map((r) => `<li><a href="${escAttr(r.path)}" style="color:#7dd3fc">${esc(r.prerenderH1 || r.title)}</a></li>`)
          .join('')}</ul>`;
}

function statsHtml(stats) {
  if (!stats || !stats.length) return '';
  return `<h2>Zahlen und Fakten</h2>
        <dl>${stats
          .map((st) => `<dt><strong>${esc(st.value)}</strong></dt><dd>${esc(st.label)}</dd>`)
          .join('\n        ')}</dl>`;
}

function comparisonHtml(c) {
  if (!c) return '';
  const side = (x) =>
    `<h3>${esc(x.label)}</h3><ul>${x.points
      .map((p) => `<li>${p.pos ? '✓' : '✗'} ${esc(p.text)}</li>`)
      .join('')}</ul>`;
  return `<h2>${esc(c.heading)}</h2>${side(c.left)}${side(c.right)}`;
}

function typesHtml(types) {
  if (!types || !types.length) return '';
  return `<h2>Varianten im Überblick</h2>${types
    .map(
      (t) =>
        `<h3>${esc(t.title)}${t.tag ? ` (${esc(t.tag)})` : ''}</h3><p>${esc(t.desc)}</p>`,
    )
    .join('')}`;
}

function faqHtml(faq) {
  if (!faq || !faq.length) return '';
  return `<h2>Häufige Fragen</h2>${faq
    .map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`)
    .join('')}`;
}

/**
 * Vollwertiger, crawlbarer Inhalt im #root.
 * Wird beim React-Mount ersetzt – ist aber fuer Crawler ohne JS-Rendering
 * (GPTBot, ClaudeBot, PerplexityBot, Bingbot ...) die einzige Datenquelle.
 */
function buildSeoFallback(seo, data, stand, routes) {
  const parts = [];
  parts.push(`<h1>${esc(seo.prerenderH1 || seo.title)}</h1>`);
  if (data) {
    parts.push(`<p><strong>${esc(data.hook)}</strong></p>`);
    parts.push(`<p>${esc(data.intro)}</p>`);
    parts.push(statsHtml(data.stats));
    parts.push(comparisonHtml(data.comparison));
    parts.push(typesHtml(data.types));
    if (data.problems && data.problems.length) {
      parts.push(
        `<h2>Typische Probleme, die wir lösen</h2><ul>${data.problems
          .map((p) => `<li>${esc(p)}</li>`)
          .join('')}</ul>`,
      );
    }
    if (data.solution) parts.push(`<h2>Unsere Lösung</h2><p>${esc(data.solution)}</p>`);
    parts.push(faqHtml(data.faq));
  } else {
    if (seo.prerenderBody) parts.push(`<p>${esc(seo.prerenderBody)}</p>`);
    // FAQ aus dem Route-JSON-LD auch als lesbaren Text ausgeben (z. B. Startseite).
    const faqLd = (seo.jsonLd || []).find((x) => x['@type'] === 'FAQPage');
    if (faqLd) {
      parts.push(
        faqHtml(
          faqLd.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text })),
        ),
      );
    }
  }
  parts.push(LOCAL_HTML);
  parts.push(linksHtml(routes, seo.path));
  parts.push(`<h2>Kontakt</h2>`);
  parts.push(NAP_HTML);
  parts.push(`<p><small>Stand: ${esc(stand)}</small></p>`);

  return `<div id="dk-seo-fallback" style="max-width:44rem;margin:0 auto;padding:3rem 1.25rem;color:#e2e8f0;font-family:system-ui,sans-serif;line-height:1.65">
        ${parts.filter(Boolean).join('\n        ')}
      </div>`;
}

function applyToTemplate(template, seo, helpers) {
  const serviceKey = seo.path.startsWith('/leistungen/') ? seo.path.split('/').pop() : null;
  const data = serviceKey ? helpers.SERVICE_DATA[serviceKey] : null;
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
    (m) => m.replace('<div id="root">', `<div id="root">${buildSeoFallback(seo, data, helpers.STAND, helpers.routes)}`),
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

/**
 * llms.txt – kompaktes Unternehmensprofil in Markdown fuer Antwortmaschinen.
 * Konvention: https://llmstxt.org
 */
function makeLlmsTxt(routes, SERVICE_DATA, SITE_URL, stand) {
  const svc = routes.filter((r) => r.path.startsWith('/leistungen/'));
  const pages = routes.filter((r) => !r.path.startsWith('/leistungen/'));
  const line = (r) => `- [${r.prerenderH1 || r.title}](${SITE_URL}${r.path}): ${r.description}`;

  return `# DK Finanzkanzlei

> Kundenorientierte Finanz- und Versicherungsberatung mit Sitz in Aachen (Nordrhein-Westfalen),
> tätig in der gesamten Städteregion Aachen und deutschlandweit per Video-Beratung.
> Inhaber und Geschäftsführer: Joel Dakaj. Die Erstberatung ist kostenlos und unverbindlich.

## Eckdaten

- **Name:** DK Finanzkanzlei
- **Inhaber:** Joel Dakaj
- **Adresse:** Eilendorfer Straße 215, 52078 Aachen, Deutschland
- **Telefon:** +49 173 1038570
- **E-Mail:** dakaj@dk-finanzkanzlei.de
- **Website:** ${SITE_URL}
- **Öffnungszeiten:** Montag bis Samstag, 10:00–20:00 Uhr
- **Einzugsgebiet:** Aachen, Eschweiler, Stolberg, Würselen, Alsdorf, Herzogenrath, Düren,
  Städteregion Aachen, Nordrhein-Westfalen, deutschlandweit per Video-Call
- **Beratungsmodell:** kundenorientiert und provisionsbasiert; für Mandanten entstehen keine Beratungskosten

## Was DK Finanzkanzlei auszeichnet

- Vergleich über mehr als 100 geprüfte Anbieter am Markt
- Kostenlose Erstberatung ohne Verkaufsdruck
- Beratung wahlweise persönlich in Aachen oder online per Video-Call
- Schwerpunkt auf junge Berufstätige, Familien, Selbstständige und Immobilienkäufer

## Leistungen

${svc.map(line).join('\n')}

## Weitere Seiten

${pages.map(line).join('\n')}

## Häufige Fragen

${Object.values(SERVICE_DATA)
  .flatMap((d) => d.faq.slice(0, 2))
  .map((f) => `**${f.q}**\n${f.a}`)
  .join('\n\n')}

---
Stand: ${stand}
`;
}

async function main() {
  if (!existsSync(INDEX_HTML)) {
    console.error(`[prerender] ${INDEX_HTML} nicht gefunden – läuft "vite build"?`);
    process.exit(1);
  }
  const { SITE_URL, DEFAULT_OG_IMAGE, listAllRoutes } = await loadSeo();
  const { SERVICE_DATA } = await loadServiceContent();
  const STAND = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  const routes = listAllRoutes();
  const template = await readFile(INDEX_HTML, 'utf8');

  let count = 0;
  for (const r of routes) {
    const html = applyToTemplate(template, r, { SITE_URL, DEFAULT_OG_IMAGE, SERVICE_DATA, STAND, routes });
    const outDir = r.path === '/' ? DIST : path.join(DIST, r.path.replace(/^\//, ''));
    await mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');
    await writeFile(outFile, html, 'utf8');
    count++;
  }

  // Sitemap
  const sitemap = makeCleanSitemap(routes, SITE_URL);
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  // llms.txt für Antwortmaschinen
  await writeFile(
    path.join(DIST, 'llms.txt'),
    makeLlmsTxt(routes, SERVICE_DATA, SITE_URL, STAND),
    'utf8',
  );

  // Temp-Datei aufräumen
  await rm(path.join(DIST, '__seo.mjs'), { force: true });
  await rm(path.join(DIST, '__servicecontent.mjs'), { force: true });

  console.log(`[prerender] ${count} Routen geschrieben, sitemap.xml erstellt.`);
}

main().catch((e) => {
  console.error('[prerender] Fehler:', e);
  process.exit(1);
});
