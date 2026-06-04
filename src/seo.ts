/**
 * Per-Route-SEO: Daten + Runtime-Anwendung.
 * Wird sowohl vom Client (LandingPage) als auch vom Prerender-Skript (scripts/prerender.mjs) genutzt.
 */

export const SITE_URL = 'https://www.dk-finanzkanzlei.de';
export const SITE_NAME = 'DK Finanzkanzlei';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/dk-logo.png`;

export type RouteKey =
  | 'home'
  | 'ueberuns'
  | 'leistungen'
  | 'karriere'
  | 'kontakt'
  | 'impressum'
  | 'datenschutz'
  | `service:${string}`;

export interface SeoData {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: object[];
  /** Sichtbarer SEO-Fallback-Text (nur für Prerender genutzt, nicht für die App). */
  prerenderH1?: string;
  prerenderBody?: string;
}

const LOCAL_KEYWORDS_BASE =
  'Aachen, Region Aachen, Nordrhein-Westfalen, NRW, Eschweiler, Stolberg, Düren, Würselen, Alsdorf, Herzogenrath';

const ORG_REF = { '@id': `${SITE_URL}/#organization` };
const LOCAL_BIZ_REF = { '@id': `${SITE_URL}/#localbusiness` };

function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

// ─── Services (Detailseiten unter /leistungen/<key>) ────────────────────────────
export interface ServiceSeo {
  key: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  serviceName: string;
}

export const SERVICE_SEO: ServiceSeo[] = [
  {
    key: 'krankenversicherung',
    slug: 'krankenversicherung',
    title: 'Krankenversicherung Aachen – GKV vs. PKV Beratung | DK Finanzkanzlei',
    description:
      'Private oder gesetzliche Krankenversicherung? Unabhängiger Vergleich über 500+ Tarife – kostenlose Beratung aus Aachen für ganz NRW & Deutschland.',
    keywords:
      'Krankenversicherung Aachen, PKV Beratung Aachen, GKV Vergleich, private Krankenversicherung NRW, Krankenkasse wechseln, Zahnzusatzversicherung',
    serviceName: 'Krankenversicherung – PKV & GKV Beratung',
  },
  {
    key: 'arbeitskraft',
    slug: 'arbeitskraft',
    title: 'Berufsunfähigkeitsversicherung Aachen | DK Finanzkanzlei',
    description:
      'Arbeitskraftabsicherung & BU-Versicherung – die richtige Police für deinen Beruf. Unabhängige Beratung aus Aachen, deutschlandweit per Video-Call.',
    keywords:
      'Berufsunfähigkeitsversicherung Aachen, BU-Versicherung NRW, Arbeitskraftabsicherung, Grundfähigkeitsversicherung, Erwerbsunfähigkeitsversicherung',
    serviceName: 'Arbeitskraftabsicherung & Berufsunfähigkeit',
  },
  {
    key: 'kfz',
    slug: 'kfz',
    title: 'KFZ-Versicherung vergleichen | DK Finanzkanzlei Aachen',
    description:
      'Über 300 KFZ-Tarife im Vergleich – Haftpflicht, Teil- & Vollkasko. Spare im Schnitt 300 € pro Jahr. Kostenlose Beratung aus Aachen.',
    keywords:
      'KFZ-Versicherung Aachen, Autoversicherung vergleichen, Vollkasko, Teilkasko, KFZ-Haftpflicht NRW',
    serviceName: 'KFZ-Versicherung',
  },
  {
    key: 'sach',
    slug: 'sach',
    title: 'Sachversicherungen Aachen – Hausrat, Haftpflicht, Rechtsschutz',
    description:
      'Hausrat, Privathaftpflicht, Wohngebäude & Rechtsschutz – unabhängiger Tarifvergleich. Kostenlose Beratung aus Aachen für ganz Deutschland.',
    keywords:
      'Hausratversicherung Aachen, Haftpflichtversicherung NRW, Wohngebäudeversicherung, Rechtsschutz Aachen',
    serviceName: 'Sachversicherungen',
  },
  {
    key: 'gewerbe',
    slug: 'gewerbe',
    title: 'Gewerbeversicherungen Aachen | DK Finanzkanzlei',
    description:
      'Gewerbeversicherungen für Selbstständige & Unternehmen – Haftpflicht, Inhalts-, Cyber- & D&O-Versicherung. Beratung aus Aachen, Region & NRW.',
    keywords:
      'Gewerbeversicherung Aachen, Betriebshaftpflicht NRW, Cyberversicherung, D&O Versicherung, Inhaltsversicherung',
    serviceName: 'Gewerbe- & Sachversicherungen',
  },
  {
    key: 'rente',
    slug: 'rente',
    title: 'Private Altersvorsorge & Rente Aachen | DK Finanzkanzlei',
    description:
      'Private Rentenversicherung, Rürup, Riester & ETF-Rente – wir vergleichen alle Modelle. Kostenlose, unabhängige Beratung aus Aachen.',
    keywords:
      'private Altersvorsorge Aachen, Rentenversicherung NRW, Rürup-Rente, Riester-Rente, ETF-Rente',
    serviceName: 'Private Altersvorsorge & Rente',
  },
  {
    key: 'hinterbliebene',
    slug: 'hinterbliebene',
    title: 'Hinterbliebenenvorsorge & Risikolebensversicherung | DK Finanzkanzlei',
    description:
      'Risikolebensversicherung & Hinterbliebenenschutz – die richtige Absicherung für deine Familie. Unabhängige Beratung aus Aachen.',
    keywords:
      'Risikolebensversicherung Aachen, Hinterbliebenenvorsorge, Familienabsicherung NRW',
    serviceName: 'Hinterbliebenenvorsorge',
  },
  {
    key: 'immobilien',
    slug: 'immobilien',
    title: 'Immobilien & Baufinanzierung Aachen | DK Finanzkanzlei',
    description:
      'Immobilienberatung, Baufinanzierung & Kapitalanlage in Aachen, NRW & deutschlandweit. Bestpreis aus 400+ Banken.',
    keywords:
      'Baufinanzierung Aachen, Immobilienfinanzierung NRW, Kapitalanlage Immobilie, Immobilienberatung Aachen',
    serviceName: 'Immobilienberatung & Finanzierung',
  },
  {
    key: 'sparprodukte',
    slug: 'sparprodukte',
    title: 'Sparprodukte & Tagesgeld | DK Finanzkanzlei Aachen',
    description:
      'Tagesgeld, Festgeld & Sparpläne im Vergleich – die besten Konditionen ohne Provisionsinteresse. Beratung aus Aachen.',
    keywords:
      'Tagesgeld Vergleich, Festgeld, Sparplan, Sparen Aachen, Geld anlegen NRW',
    serviceName: 'Sparprodukte',
  },
  {
    key: 'geldanlagen',
    slug: 'geldanlagen',
    title: 'Geldanlage & Vermögensaufbau Aachen | DK Finanzkanzlei',
    description:
      'ETF, Fonds & strukturierte Geldanlagen – maßgeschneidert für deine Lebenssituation. Unabhängige Beratung aus Aachen.',
    keywords:
      'Geldanlage Aachen, ETF Beratung NRW, Fondsanlage, Vermögensaufbau Region Aachen',
    serviceName: 'Vermögensaufbau & Geldanlagen',
  },
  {
    key: 'vorsorge',
    slug: 'vorsorge',
    title: 'Vorsorgekonzepte Aachen – ganzheitliche Vorsorge | DK Finanzkanzlei',
    description:
      'Ganzheitliche Vorsorgekonzepte: Rente, Pflege, Hinterbliebene & Vermögen. Eine Strategie, alle Lebensphasen. Beratung aus Aachen.',
    keywords:
      'Vorsorge Aachen, Vorsorgekonzept NRW, ganzheitliche Finanzplanung, Pflegevorsorge',
    serviceName: 'Vorsorgekonzepte',
  },
  {
    key: 'finanzierungen',
    slug: 'finanzierungen',
    title: 'Finanzierungen & Kredite Aachen | DK Finanzkanzlei',
    description:
      'Bau-, Auto- und Ratenkredite zum Bestpreis. Vergleich aus 400+ Banken – kostenfrei & unabhängig. Beratung aus Aachen.',
    keywords:
      'Finanzierung Aachen, Kredit Vergleich NRW, Baufinanzierung, Autokredit, Ratenkredit',
    serviceName: 'Finanzierungen',
  },
  {
    key: 'aktien',
    slug: 'aktien',
    title: 'Aktien & Depot-Beratung Aachen | DK Finanzkanzlei',
    description:
      'Strategische Aktien- und Depot-Beratung – passend zu deinen Zielen und deinem Risikoprofil. Beratung aus Aachen, deutschlandweit per Video.',
    keywords:
      'Aktien Beratung Aachen, Depot eröffnen NRW, Wertpapierberatung, Börse',
    serviceName: 'Aktien & Depot-Beratung',
  },
  {
    key: 'vwl',
    slug: 'vwl',
    title: 'Vermögenswirksame Leistungen (VL) | DK Finanzkanzlei Aachen',
    description:
      'Hol dir bis zu 480 € Arbeitgeberzuschuss pro Jahr. VL-Sparen sinnvoll anlegen mit unabhängiger Beratung aus Aachen.',
    keywords:
      'Vermögenswirksame Leistungen, VL Sparen, Arbeitgeberzuschuss, VL Aachen',
    serviceName: 'Vermögenswirksame Leistungen',
  },
];

function serviceJsonLd(s: ServiceSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.serviceName,
    serviceType: s.serviceName,
    provider: LOCAL_BIZ_REF,
    areaServed: [
      { '@type': 'City', name: 'Aachen' },
      { '@type': 'AdministrativeArea', name: 'Nordrhein-Westfalen' },
      { '@type': 'Country', name: 'Deutschland' },
    ],
    url: `${SITE_URL}/leistungen/${s.slug}`,
  };
}

// ─── Statische Routen ────────────────────────────────────────────────────────────
const FAQ_HOME = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wo findet die Beratung statt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Die Beratung findet vollständig online per Video-Call statt – bequem von zu Hause aus, ohne Fahrtzeit oder Warteraum. Du brauchst lediglich ein Gerät mit Internetzugang.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie lange dauert eine Beratung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Ein erstes Kennenlerngespräch dauert in der Regel 30–45 Minuten. Tiefergehende Beratungen können je nach Thema auch 60–90 Minuten umfassen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Warum bietet ihr die Beratung kostenlos an?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Wir verdienen nur dann, wenn du von unserer Empfehlung überzeugt bist und einen Vertrag abschließt. So haben wir einen echten Anreiz, dir nur das Beste zu empfehlen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie sieht das unverbindliche Beratungsgespräch aus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Im ersten Gespräch analysieren wir deine finanzielle Situation, klären deine Ziele und zeigen dir, welche Stellschrauben wir gemeinsam optimieren können – ohne Verkaufsdruck.',
      },
    },
  ],
};

const STATIC_ROUTES: Record<Exclude<RouteKey, `service:${string}`>, SeoData> = {
  home: {
    path: '/',
    title: 'DK Finanzkanzlei Aachen | Unabhängige Finanzberatung in NRW',
    description:
      'Unabhängige Finanzberatung aus Aachen für ganz NRW & Deutschland. Versicherungen, Vorsorge, Immobilien & Vermögensaufbau – persönlich, transparent, kostenlos. 100+ Google-Bewertungen ★ 5,0.',
    keywords: `Finanzberatung Aachen, Versicherungsmakler Aachen, Finanzkanzlei Aachen, unabhängige Finanzberatung NRW, Altersvorsorge Aachen, ${LOCAL_KEYWORDS_BASE}`,
    prerenderH1: 'DK Finanzkanzlei – Unabhängige Finanzberatung in Aachen & NRW',
    prerenderBody:
      'Versicherungen, Altersvorsorge, Immobilien und Vermögensaufbau – persönlich, transparent und kostenlos. Mit über 100 fünf-Sterne-Bewertungen bei Google ist die DK Finanzkanzlei aus Aachen einer der bestbewerteten Finanzdienstleister in Nordrhein-Westfalen.',
    jsonLd: [FAQ_HOME, breadcrumb([{ name: 'Startseite', path: '/' }])],
  },
  ueberuns: {
    path: '/ueber-uns',
    title: 'Über uns – Team & Werte der DK Finanzkanzlei Aachen',
    description:
      'Lerne das Team der DK Finanzkanzlei aus Aachen kennen. Junge, unabhängige Finanzexpertinnen und -experten für ganz NRW & Deutschland.',
    keywords: `Über uns DK Finanzkanzlei, Joel Dakaj Aachen, Finanzberater Team NRW, ${LOCAL_KEYWORDS_BASE}`,
    prerenderH1: 'Über die DK Finanzkanzlei',
    prerenderBody:
      'Joel Dakaj und das Team der DK Finanzkanzlei beraten unabhängig zu allen Finanzthemen – mit Sitz in Aachen und Mandanten in ganz Deutschland.',
    jsonLd: [
      breadcrumb([
        { name: 'Startseite', path: '/' },
        { name: 'Über uns', path: '/ueber-uns' },
      ]),
    ],
  },
  leistungen: {
    path: '/leistungen',
    title: 'Leistungen – Versicherungen, Vorsorge & Vermögensaufbau | DK Finanzkanzlei',
    description:
      'Alle Leistungen im Überblick: Krankenversicherung, BU, KFZ, Sach- & Gewerbeversicherung, Altersvorsorge, Immobilien, Geldanlagen & mehr. Beratung aus Aachen.',
    keywords: `Finanzdienstleistungen Aachen, Versicherungen NRW, Vorsorge, Vermögensaufbau, ${LOCAL_KEYWORDS_BASE}`,
    prerenderH1: 'Leistungen der DK Finanzkanzlei',
    prerenderBody:
      'Von Krankenversicherung über Berufsunfähigkeit, KFZ-, Sach- und Gewerbeversicherungen bis hin zu Altersvorsorge, Immobilienfinanzierung, Geldanlagen und ETF-Sparplänen – alles aus einer Hand, unabhängig und transparent.',
    jsonLd: [
      breadcrumb([
        { name: 'Startseite', path: '/' },
        { name: 'Leistungen', path: '/leistungen' },
      ]),
    ],
  },
  karriere: {
    path: '/karriere',
    title: 'Karriere bei DK Finanzkanzlei Aachen – Jobs in der Finanzberatung',
    description:
      'Werde Teil eines der bestbewerteten Finanzteams in NRW. Karrierechancen für Finanzberater, Versicherungsmakler & Quereinsteiger in Aachen und remote.',
    keywords: `Karriere Aachen Finanzberatung, Jobs Finanzberater NRW, Versicherungsmakler werden, Quereinsteiger Finanzen, ${LOCAL_KEYWORDS_BASE}`,
    prerenderH1: 'Karriere bei der DK Finanzkanzlei',
    prerenderBody:
      'Wir suchen ambitionierte Menschen, die in der Finanzbranche durchstarten wollen. Standort Aachen, deutschlandweite Mandanten, transparente Karrierepfade.',
    jsonLd: [
      breadcrumb([
        { name: 'Startseite', path: '/' },
        { name: 'Karriere', path: '/karriere' },
      ]),
    ],
  },
  kontakt: {
    path: '/kontakt',
    title: 'Kontakt – DK Finanzkanzlei Aachen | Kostenlose Beratung anfragen',
    description:
      'Vereinbare jetzt dein kostenloses Erstgespräch mit der DK Finanzkanzlei aus Aachen. Per Telefon, E-Mail oder Kontaktformular.',
    keywords: `Kontakt DK Finanzkanzlei Aachen, Finanzberatung anfragen, Termin Finanzberater NRW, ${LOCAL_KEYWORDS_BASE}`,
    prerenderH1: 'Kontakt zur DK Finanzkanzlei',
    prerenderBody:
      'Telefon: +49 173 1038570 · E-Mail: dakaj@dk-finanzkanzlei.de · Adresse: Eilendorfer Straße 215, 52078 Aachen. Wir beraten dich kostenlos und unabhängig.',
    jsonLd: [
      breadcrumb([
        { name: 'Startseite', path: '/' },
        { name: 'Kontakt', path: '/kontakt' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Kontakt zur DK Finanzkanzlei',
        url: `${SITE_URL}/kontakt`,
        about: ORG_REF,
      },
    ],
  },
  impressum: {
    path: '/impressum',
    title: 'Impressum | DK Finanzkanzlei Aachen',
    description: 'Impressum der DK Finanzkanzlei – Joel Dakaj, Eilendorfer Straße 215, 52078 Aachen.',
    robots: 'noindex, follow',
    jsonLd: [
      breadcrumb([
        { name: 'Startseite', path: '/' },
        { name: 'Impressum', path: '/impressum' },
      ]),
    ],
  },
  datenschutz: {
    path: '/datenschutz',
    title: 'Datenschutzerklärung | DK Finanzkanzlei Aachen',
    description: 'Datenschutzerklärung der DK Finanzkanzlei nach DSGVO.',
    robots: 'noindex, follow',
    jsonLd: [
      breadcrumb([
        { name: 'Startseite', path: '/' },
        { name: 'Datenschutz', path: '/datenschutz' },
      ]),
    ],
  },
};

export function getSeoForRoute(key: RouteKey): SeoData {
  if (key.startsWith('service:')) {
    const slug = key.slice('service:'.length);
    const s = SERVICE_SEO.find((x) => x.slug === slug);
    if (s) {
      return {
        path: `/leistungen/${s.slug}`,
        title: s.title,
        description: s.description,
        keywords: `${s.keywords}, ${LOCAL_KEYWORDS_BASE}`,
        prerenderH1: s.serviceName,
        prerenderBody: s.description,
        jsonLd: [
          serviceJsonLd(s),
          breadcrumb([
            { name: 'Startseite', path: '/' },
            { name: 'Leistungen', path: '/leistungen' },
            { name: s.serviceName, path: `/leistungen/${s.slug}` },
          ]),
        ],
      };
    }
  }
  const k = key as Exclude<RouteKey, `service:${string}`>;
  return STATIC_ROUTES[k] ?? STATIC_ROUTES.home;
}

export function listAllRoutes(): SeoData[] {
  const base = (Object.keys(STATIC_ROUTES) as Array<keyof typeof STATIC_ROUTES>).map((k) =>
    STATIC_ROUTES[k],
  );
  const services = SERVICE_SEO.map((s) => getSeoForRoute(`service:${s.slug}` as RouteKey));
  return [...base, ...services];
}

// ─── Runtime-Anwendung im Browser ───────────────────────────────────────────────
const MANAGED_META_ATTR = 'data-dk-seo';
const MANAGED_LDJSON_ID = 'dk-seo-jsonld';

function setMeta(name: string, content: string, useProperty = false) {
  const sel = useProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(sel);
  if (!el) {
    el = document.createElement('meta');
    if (useProperty) el.setAttribute('property', name);
    else el.setAttribute('name', name);
    el.setAttribute(MANAGED_META_ATTR, '1');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_META_ATTR, '1');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  if (extra) for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
}

export function applySeo(data: SeoData) {
  if (typeof document === 'undefined') return;
  const url = `${SITE_URL}${data.path}`;

  document.title = data.title;
  setMeta('description', data.description);
  if (data.keywords) setMeta('keywords', data.keywords);
  setMeta('robots', data.robots ?? 'index, follow, max-snippet:-1, max-image-preview:large');

  setLink('canonical', url);

  setMeta('og:url', url, true);
  setMeta('og:title', data.title, true);
  setMeta('og:description', data.description, true);
  setMeta('og:image', data.ogImage ?? DEFAULT_OG_IMAGE, true);
  setMeta('og:type', 'website', true);
  setMeta('og:locale', 'de_DE', true);
  setMeta('og:site_name', SITE_NAME, true);

  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', data.title);
  setMeta('twitter:description', data.description);
  setMeta('twitter:image', data.ogImage ?? DEFAULT_OG_IMAGE);

  // Per-Route-JSON-LD (das Site-weite Schema aus index.html bleibt unangetastet)
  document.querySelectorAll(`script[id^="${MANAGED_LDJSON_ID}"]`).forEach((n) => n.remove());
  (data.jsonLd ?? []).forEach((obj, i) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = `${MANAGED_LDJSON_ID}-${i}`;
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

export function routeKeyForPage(
  page: 'home' | 'ueberuns' | 'impressum' | 'datenschutz' | 'kontakt' | 'leistungen' | 'service' | 'karriere',
  service?: string,
): RouteKey {
  if (page === 'service' && service) return `service:${service}` as RouteKey;
  return page as RouteKey;
}
