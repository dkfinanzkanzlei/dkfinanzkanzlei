import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  TrendingUp, ShieldCheck, PieChart, ArrowRight, CheckCircle2, ChevronRight,
  Menu, X, Wallet, Calculator, Building2, Home, Heart, BarChart3, Users,
  Star, Eye, Zap, Leaf, UserCircle, Briefcase, GraduationCap, Wrench, MousePointerClick, Globe, Download, FileText, Play, Search
} from 'lucide-react';
import { applySeo, getSeoForRoute, routeKeyForPage } from '../seo';
import { SERVICE_DATA, type ServiceKey, type ServicePageData } from '../serviceContent';

// ─── Brand Configuration ────────────────────────────────────────────────────────
type Brand = 'dk' | 'vorsorge' | 'immo' | 'consulting';
type Page = 'home' | 'ueberuns' | 'impressum' | 'datenschutz' | 'kontakt' | 'leistungen' | 'service' | 'karriere';


const BRANDS = {
  dk: {
    name: 'DK Finanzkanzlei',
    label: 'Finanzkanzlei',
    color: '#4d7abd',
    ctaText: 'Kostenlose Beratung',
    logoFilter: 'none',
  },
  vorsorge: {
    name: 'DK Vorsorge',
    label: 'Vorsorge',
    color: '#22C55E',
    ctaText: 'Vorsorgecheck starten',
    logoFilter: 'brightness(0) saturate(100%) invert(45%) sepia(80%) saturate(600%) hue-rotate(100deg) brightness(82%)',
  },
  immo: {
    name: 'DK Immo',
    label: 'Immo',
    color: '#C4A135',
    ctaText: 'Immobilienberatung',
    logoFilter: 'brightness(0) saturate(100%) invert(62%) sepia(60%) saturate(600%) hue-rotate(5deg) brightness(90%)',
  },
  consulting: {
    name: 'DK Consulting',
    label: 'Consulting',
    color: '#8B5CF6',
    ctaText: 'Erstberatung anfragen',
    logoFilter: 'brightness(0) saturate(100%) invert(42%) sepia(90%) saturate(800%) hue-rotate(228deg) brightness(95%)',
  },
} as const;

const CONSULTING_URL = "https://www.bva-consulting.de/";
const ACCENT = "#4d7abd";   // DK-Blau
const GOLD = "#C4A135";     // Akzent
const BRAND_ORDER: Brand[] = ['dk', 'vorsorge', 'immo', 'consulting'];

const BRAND_BG: Record<Brand, string> = {
  dk:         '/DK Finanz BG.jpeg',
  vorsorge:   '/DK Vorsorge.jpeg',
  immo:       '/DK Immo BG.jpeg',
  consulting: '/DK Consulting BG.jpeg',
};

// ─── Shared ─────────────────────────────────────────────────────────────────────
const DottedLine = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative my-6">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full" />
  </div>
);

const PARTNER_LOGOS = [
  { src: '/roland-logo.png', alt: 'Roland', filter: 'brightness(0) invert(1)', opacity: 0.5, scale: 0.9 },
  { src: '/gothaer-logo.png', alt: 'Gothaer', filter: 'brightness(0) invert(1)', opacity: 0.5, scale: 1 },
  { src: '/bay-logo.png', alt: 'Bayerische', filter: 'brightness(0) invert(1)', opacity: 0.5, scale: 0.7 },
  { src: '/barmenia-logo.png', alt: 'Barmenia', filter: 'brightness(0) invert(1)', opacity: 0.5, scale: 1 },
  { src: '/axa-logo.png', alt: 'AXA', filter: 'brightness(0) invert(1)', opacity: 0.5, scale: 0.85 },
  { src: '/allianz-logo.png', alt: 'Allianz', filter: 'brightness(0) invert(1)', opacity: 0.5, scale: 1 },
  { src: '/hdi-logo.png', alt: 'HDI', filter: 'invert(1) grayscale(1) brightness(3) contrast(2)', opacity: 0.7, scale: 0.45 },
  { src: '/arag-logo.png', alt: 'ARAG', filter: 'grayscale(1) brightness(1.4)', opacity: 0.55, scale: 1.0, light: 'grayscale(1) contrast(0.85)' },
];

const LogoMarquee = () => (
  <div className="pt-10 pb-4 overflow-hidden">
    <div className="flex logo-marquee" style={{ width: 'max-content' }}>
      {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
        <div key={i} className="flex items-center justify-center mx-8 flex-shrink-0" style={{ width: '120px', height: '44px' }}>
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
            style={{ filter: logo.filter, opacity: logo.opacity, transform: `scale(${logo.scale})` }}
          />
        </div>
      ))}
    </div>
  </div>
);

const FAQ_ITEMS = [
  {
    q: 'Wo findet die Beratung statt?',
    a: 'Die Beratung findet vollständig online per Video-Call statt – bequem von zu Hause aus, ohne Fahrtzeit oder Warteraum. Du brauchst lediglich ein Gerät mit Internetzugang.',
  },
  {
    q: 'Wie lange dauert so eine Beratung?',
    a: 'Ein erstes Kennenlerngespräch dauert in der Regel 30–45 Minuten. Tiefergehende Beratungen können je nach Thema auch 60–90 Minuten umfassen.',
  },
  {
    q: 'Warum bietet ihr die Beratung kostenlos an?',
    a: 'Wir verdienen nur dann, wenn du von unserer Empfehlung überzeugt bist und einen Vertrag abschließt. So haben wir einen echten Anreiz, dir nur das Beste zu empfehlen – keine versteckten Kosten für dich.',
  },
  {
    q: 'Wie sieht das unverbindliche Beratungsgespräch aus?',
    a: 'Im ersten Gespräch analysieren wir deine aktuelle finanzielle Situation, klären deine Ziele und zeigen dir, welche Stellschrauben wir gemeinsam optimieren können. Kein Verkaufsdruck – nur echte Beratung.',
  },
  {
    q: 'Wie kann ich mir das unverbindliche Beratungsgespräch sichern?',
    a: 'Klicke einfach auf den Button „Kostenlose Beratung buchen" und wähle einen Termin aus, der dir passt. In weniger als 2 Minuten bist du dabei.',
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-8 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold mb-4">Häufig gestellte Fragen</h2>
          <p className="text-white/50">Hier findest du die Antworten auf deine Fragen</p>
        </div>
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-t border-white/10">
              <button
                className="w-full flex items-center justify-between py-7 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-lg font-medium text-white group-hover:text-white/80 transition-colors pr-8">{item.q}</span>
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-white/50 group-hover:text-white transition-all">
                  {open === i
                    ? <X className="w-5 h-5" />
                    : <span className="text-2xl leading-none font-light">+</span>
                  }
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 text-white/60 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};

const StarRating = ({ stars = 5 }: { stars?: number }) => (
  <div className="flex gap-0.5 mb-4">
    {[1,2,3,4,5].map(i => (
      <svg key={i} className={`w-4 h-4 ${i <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-white/20 fill-white/20'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    ))}
  </div>
);

const ALL_TESTIMONIALS = [
  { name: "Jonas Klang", date: "Mai 2025", text: "Wirklich nette, transparente und vor allem sinnige Beratung. Die Terminzeiten sind wirklich flexibel – 10–21 Uhr. Von solchen Zeiten können sich Banken eine Scheibe abschneiden." },
  { name: "Nesrin K", date: "Apr. 2025", text: "Super Beratung. Nichts auszusetzen ☺" },
  { name: "Tabea Burska", date: "Apr. 2025", text: "Als Auszubildende ist es eine große Erleichterung professionelle Hilfe zu bekommen. Alle Themen wurden mir genau erklärt mit ihren Vor- und Nachteilen. Ich finde es sehr gut, dass diese Möglichkeit kostenlos angeboten wird." },
  { name: "Christopher Lange", date: "Mär. 2025", text: "Ich habe sehr gute Erfahrungen gemacht. Das Kundengespräch war sehr aufschlussreich und unkompliziert. Der Berater Denis Martynewski war sehr nett und hat jede Frage beantwortet." },
  { name: "Alex", date: "Mär. 2025", text: "Ich wurde als Azubi zu verschiedensten Themen von Philipp Jagiella beraten und bin sehr zufrieden. Ich konnte alles mögliche an Fragen stellen und es wurde sich zu jeder Frage ausführlich geäußert." },
  { name: "Jason P", date: "Feb. 2025", text: "Ein kompetentes und engagiertes Team. Stets höflich und zuvorkommend. Im Videocall mit Herrn Jagiella gesprochen, welcher stets hilfsbereit war und Ahnung von seinen Themen hatte. Nur weiterzuempfehlen!" },
  { name: "Jieuigyeom Luka Hwang", date: "Feb. 2025", text: "Hatte Beratung bei Phillip Jagiella. Bei diesem jungen Mann sieht man, dass er hochqualifiziert ist und auch Spaß hat in diesem Beruf. Gerne wieder!" },
  { name: "martha wt", date: "Feb. 2025", text: "Die Beratung war toll! Ich habe mit Denis Martynewski gesprochen und er war total zuvorkommend und freundlich! Kann ich nur empfehlen 😊" },
  { name: "Yunes Abdullah", date: "Feb. 2025", text: "Ich wurde von Denis Martynewski beraten. Das freundliche Gespräch hat mir sehr weitergeholfen. Er war sehr sachlich und hat mir jede Frage sehr gut beantworten können. Auf jeden Fall weiter zu empfehlen." },
  { name: "Firat Özel", date: "Jan. 2025", text: "Ich möchte aufmerksam machen für die tolle Arbeit von Philipp. Er ist sehr kompetent und konnte mich sehr gut aufklären bzw. beraten. Sehr empfehlenswert ⭐⭐⭐⭐⭐" },
  { name: "Dominik Loh", date: "Jan. 2025", text: "Sehr kompetente und faire Beratung. Zu empfehlen." },
  { name: "Maia-Teodora Cireap", date: "Dez. 2024", text: "Ich hatte das Glück, von Phillip Jagiella beraten zu werden. Seine Informationen sind beeindruckend. Besonders schätze ich seine freundliche Kommunikation. Würde ich auf jeden Fall weiterempfehlen!" },
  { name: "Nesrin K", date: "Apr. 2025", text: "Super Beratung. Nichts auszusetzen ☺" },
  { name: "Naomi Barry", date: "Nov. 2024", text: "Ist cool da, sympathische Leute und top Beratung." },
  { name: "Tunahan Ercetin", date: "Dez. 2024", text: "Bester Berater 100% Weiterempfehlung – immer hilfsbereit und immer erreichbar." },
  { name: "Benja", date: "Jan. 2025", text: "Ein Team von jungen kompetenten Beratern, auf die man sich verlassen kann. Absolut empfehlenswert!" },
  { name: "Sandro B. Vogt", date: "Apr. 2025", stars: 4, text: "Dauerte nach der Anmeldung zwar lange, bis ich eine Rückmeldung erhielt, aber dann wurde ich von Dennis umfassend und informativ beraten." },
];

const ReviewCard = ({ t }: { t: { name: string; date: string; text: string; stars?: number } }) => (
  <div className="flex-shrink-0 w-80 p-6 rounded-2xl border border-white/5 bg-white/[0.03] flex flex-col mx-3">
    <StarRating stars={t.stars ?? 5} />
    <p className="text-white/65 italic leading-relaxed text-sm flex-1 line-clamp-4">„{t.text}"</p>
    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
      <p className="font-bold text-sm">{t.name}</p>
      <p className="text-xs text-white/30">{t.date}</p>
    </div>
  </div>
);

// ─── Testimonial Cards ───────────────────────────────────────────────────────────
const TESTIMONIAL_CARDS_DATA = [
  {
    color: '#22C55E',
    badge: 'Selbstständiger',
    name: 'Tamaz Tordia',
    role: 'Online-Marketing Berater',
    icon: Briefcase,
    iconLabel: 'Selbstständig',
    text: 'Ich habe mich zuvor selbst um meine Finanzen gekümmert, dabei jedoch nicht alle Möglichkeiten ausgeschöpft. In meinem Fall konnte ich durch eine Optimierung meiner Kranken- und Vorsorgestruktur meine monatlichen Kosten deutlich senken und profitiere aktuell von Einsparungen im Bereich von mehreren tausend Euro pro Jahr. Zudem baue ich durch staatliche Förderungen heute spürbar mehr Rentenkapital auf.',
    stats: [
      { value: 4000, suffix: '€', label: 'Ersparnis durch PKV-Wechsel' },
      { value: 30,   suffix: '%', label: 'mehr Rentenkapital' },
    ],
    total: 5300,
    totalLabel: 'Gesamtersparnis pro Jahr',
    result: 'Gesamtersparnis: ca. 5.300€ pro Jahr',
  },
  {
    color: '#7aabec',
    badge: 'Azubi',
    name: 'Svenja Jansen',
    role: 'Auszubildende Industriekauffrau',
    icon: GraduationCap,
    iconLabel: 'Ausbildung',
    text: 'Als Azubi hätte ich nie gedacht, dass ich überhaupt so viele Vorteile nutzen kann. Meine Berufsunfähigkeitsversicherung ist jetzt etwa 25% günstiger durch Zuschüsse der Krankenkasse. Zusätzlich bekomme ich 480€ jährlich vom Arbeitgeber.',
    stats: [
      { value: 25,   suffix: '%', label: 'günstigere BU-Versicherung' },
      { value: 480,  suffix: '€', label: 'Arbeitgeberzuschuss p.a.' },
    ],
    total: 1080,
    totalLabel: 'Gesamtersparnis pro Jahr',
    result: 'Gesamtersparnis: ca. 1.080€ pro Jahr',
  },
  {
    color: '#C4A135',
    badge: 'Arbeitnehmer',
    name: 'Daniel Schneider',
    role: 'Projektingenieur Maschinenbau',
    icon: Wrench,
    iconLabel: 'Angestellt',
    text: 'Ich verdiene über 3.000€ netto und dachte, ich hätte alles gut geregelt. Durch die Optimierung spare ich jetzt rund 3.721€ an Steuern und erhalte zusätzlich etwa 2.500€ staatliche Förderung.',
    stats: [
      { value: 3721, suffix: '€', label: 'Steuerersparnis' },
      { value: 2500, suffix: '€', label: 'staatliche Förderung' },
    ],
    total: 6221,
    totalLabel: 'Gesamtersparnis pro Jahr',
    result: 'Gesamtersparnis: ca. 6.221€ pro Jahr',
  },
];

const AnimatedCounter = ({ value, suffix, color, large }: { value: number; suffix: string; color: string; large?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    setDone(false);
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className={`font-bold tabular-nums transition-[text-shadow] duration-700 ${large ? 'text-3xl md:text-4xl' : 'text-lg'}`}
      style={{
        color,
        textShadow: done ? `0 0 18px ${color}90, 0 0 36px ${color}40` : 'none',
      }}
    >
      {count.toLocaleString('de-DE')}{suffix}
    </span>
  );
};

const StarRow = () => (
  <motion.div
    className="flex gap-0.5"
    whileHover={{ scale: 1.12 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
  >
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
    ))}
  </motion.div>
);

const TestimonialCards = ({ color }: { color: string }) => (
  <section id="testimonials" className="py-8 md:py-20 px-6">
    <div className="max-w-7xl mx-auto">

      {/* Section header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Erfolge</h2>
        <p className="text-white/45 max-w-lg mx-auto text-base">
          Konkrete Zahlen, echte Menschen – das erreichen wir gemeinsam.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIAL_CARDS_DATA.map((card, i) => {
          const c = card.color;
          return (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              y: -8,
              boxShadow: `0 28px 56px ${c}2a, 0 8px 24px ${c}1a, 0 0 0 1px ${c}55`,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            style={{ cursor: 'default' }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${c}, ${c}44)` }} />

            <div className="flex flex-col flex-1 p-7">
              {/* Badge + stars row */}
              <div className="flex items-center justify-between mb-5">
                <motion.span
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                  style={{ color: c, borderColor: `${c}50`, background: `${c}15` }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                >
                  {card.badge}
                </motion.span>
                <StarRow />
              </div>

              {/* Large quote mark */}
              <div className="text-6xl font-serif leading-none mb-1 select-none" style={{ color: `${c}35` }}>"</div>

              {/* Quote text */}
              <p className="text-white/65 text-sm leading-relaxed mb-7 flex-1">
                {card.text}
              </p>

              {/* Stats rows */}
              <div className="space-y-2 mb-5">
                {card.stats.map((s) => (
                  <motion.div
                    key={s.label}
                    className="flex items-center justify-between gap-3 py-1.5 border-b border-white/5 last:border-0"
                    whileHover={{ x: 2, transition: { duration: 0.15 } }}
                  >
                    <span className="text-xs text-white/40 leading-tight">{s.label}</span>
                    <AnimatedCounter value={s.value} suffix={s.suffix} color={c} />
                  </motion.div>
                ))}
              </div>

              {/* Total result block */}
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 10px ${c}20, inset 0 0 16px ${c}08`,
                    `0 0 26px ${c}45, inset 0 0 24px ${c}12`,
                    `0 0 10px ${c}20, inset 0 0 16px ${c}08`,
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-xl px-5 py-5 mb-6 text-center"
                style={{
                  background: `linear-gradient(135deg, ${c}1c 0%, ${c}0c 100%)`,
                  border: `1px solid ${c}45`,
                }}
              >
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-2">{card.totalLabel}</p>
                <AnimatedCounter value={card.total} suffix="€" color={c} large />
              </motion.div>

              {/* Name + Persona-Icon */}
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
                  style={{ background: `${c}18`, borderColor: `${c}40` }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
                >
                  <card.icon className="w-5 h-5" style={{ color: c }} />
                </motion.div>
                <div>
                  <p className="text-sm font-bold leading-tight">{card.name}</p>
                  <p className="text-xs text-white/40 leading-tight mt-0.5">{card.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );})}
      </div>

    </div>
  </section>
);

const Proof = ({ color }: { color: string }) => {
  const row1 = ALL_TESTIMONIALS.slice(0, 17);
  const row2 = ALL_TESTIMONIALS.slice(17);

  return (
    <section id="proof" className="py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Was unsere Mandanten sagen</h2>
          <div className="flex items-center justify-center gap-2 font-bold" style={{ color }}>
            <CheckCircle2 className="w-5 h-5" />
            <span>Ausgezeichnet bewertet bei Google</span>
          </div>
        </div>
      </div>

      {/* Row 1 – scrolls left */}
      <div className="relative mb-4">
        <div className="flex marquee-left" style={{ width: 'max-content' }}>
          {[...row1, ...row1].map((t, i) => <ReviewCard key={i} t={t} />)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1E293B] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1E293B] to-transparent z-10" />
      </div>

      {/* Row 2 – scrolls right */}
      <div className="relative">
        <div className="flex marquee-right" style={{ width: 'max-content', animationDuration: '165s' }}>
          {[...row2, ...row2].map((t, i) => <ReviewCard key={i} t={t} />)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1E293B] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1E293B] to-transparent z-10" />
      </div>
    </section>
  );
};

const Footer = ({ color, onPageChange }: { color: string; onPageChange: (p: Page, scrollTarget?: string) => void }) => (
  <footer className="py-20 px-6 bg-[#0F172A] text-white">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-bold text-lg tracking-tighter uppercase">DK Finanzkanzlei</span>
        </div>
        <p className="text-white/40 max-w-sm mb-8">
          Deine Finanzen in guten Händen.
        </p>
        <div className="flex gap-4">
          <a href="https://www.instagram.com/dk_finanzkanzlei/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://de.linkedin.com/company/dk-finanzkanzlei" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.tiktok.com/@dk_finanzkanzlei" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Unternehmen</h5>
        <ul className="space-y-4 text-sm text-white/60">
          <li><button onClick={() => onPageChange('ueberuns')} className="hover:text-white transition-colors text-left">Über uns</button></li>
          <li><button onClick={() => onPageChange('leistungen')} className="hover:text-white transition-colors text-left">Leistungen</button></li>
          <li><button onClick={() => onPageChange('home', 'testimonials')} className="hover:text-white transition-colors text-left">Erfolge</button></li>
          <li><button onClick={() => onPageChange('home', 'faq')} className="hover:text-white transition-colors">FAQ</button></li>
          <li><button onClick={() => onPageChange('karriere')} className="hover:text-white transition-colors text-left">Karriere</button></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Rechtliches</h5>
        <ul className="space-y-4 text-sm text-white/60">
          <li><button onClick={() => onPageChange('impressum')} className="hover:text-white transition-colors text-left">Impressum</button></li>
          <li><button onClick={() => onPageChange('datenschutz')} className="hover:text-white transition-colors text-left">Datenschutz</button></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col items-center gap-3 text-white/40">
      <p className="text-sm">© 2026 DK Finanzkanzlei. Alle Rechte vorbehalten.</p>
      <p className="text-base font-medium">built with ♥ by <a href="https://hookhero.de" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors underline underline-offset-2">Hook Hero</a></p>
    </div>
  </footer>
);

// ─── Navbar ──────────────────────────────────────────────────────────────────────
const LeistungenDropdown = ({ color, onPageChange, onService }: { color: string; onPageChange: (p: Page) => void; onService: (k: ServiceKey) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.18 }}
    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-black/10 shadow-2xl rounded-xl overflow-hidden z-50"
    style={{ width: 620 }}
  >
    <div className="flex">
      {/* Sidebar */}
      <div className="w-44 bg-[#F1F5F9] border-r border-black/8 p-5 flex flex-col gap-3">
        <button onClick={() => onPageChange('leistungen')} className="text-xs font-bold tracking-widest uppercase text-[#1E293B] hover:opacity-70 transition-opacity text-left">Alle Leistungen</button>
        <button onClick={() => onPageChange('kontakt')} className="text-xs font-bold tracking-widest uppercase text-[#1E293B] hover:opacity-70 transition-opacity text-left">Kontaktiere uns</button>
      </div>
      {/* Columns */}
      <div className="flex flex-1 p-6 gap-8">
        {/* Versicherungen */}
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color }}>Versicherungen</p>
          {([['Krankenversicherung','krankenversicherung'],['Arbeitskraftabsicherung','arbeitskraft'],['KFZ-Versicherung','kfz'],['Sachversicherungen','sach'],['Gewerbeversicherungen','gewerbe'],['Private Rentenversicherung','rente'],['Hinterbliebenenvorsorge','hinterbliebene']] as [string, ServiceKey][]).map(([label, key]) => (
            <button key={key} onClick={() => onService(key)} className="block text-xs tracking-wider uppercase text-[#1E293B]/60 hover:text-[#1E293B] transition-colors py-1.5 text-left w-full">{label}</button>
          ))}
        </div>
        {/* Vermögensaufbau */}
        <div className="flex-1">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color }}>Vermögensaufbau</p>
          {([['Immobilien','immobilien'],['Sparprodukte','sparprodukte'],['Geldanlagen','geldanlagen'],['Vorsorgekonzepte','vorsorge'],['Finanzierungen','finanzierungen'],['Aktien','aktien'],['Vermögenswirksame Leistungen','vwl']] as [string, ServiceKey][]).map(([label, key]) => (
            <button key={key} onClick={() => onService(key)} className="block text-xs tracking-wider uppercase text-[#1E293B]/60 hover:text-[#1E293B] transition-colors py-1.5 text-left w-full">{label}</button>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// ─── Cookie Banner ────────────────────────────────────────────────────────────
const CookieBanner = ({ onDatenschutz }: { onDatenschutz: () => void }) => {
  const [accepted, setAccepted] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('dk-cookie-consent') === 'true'
  );

  if (accepted) return null;

  const accept = () => {
    localStorage.setItem('dk-cookie-consent', 'true');
    setAccepted(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-[999] bg-[#1E293B] border-t border-white/10 px-6 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.4)]"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="flex-1">
            <p className="text-white font-semibold text-base mb-1">Diese Website verwendet Cookies</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Wir nutzen Cookies, um dir das bestmögliche Erlebnis zu bieten und unsere Website zu verbessern.
              Mit dem Klick auf „Akzeptieren" stimmst du unserer{' '}
              <button
                onClick={onDatenschutz}
                className="underline text-[#4d7abd] hover:text-white transition-colors"
              >
                Datenschutzerklärung
              </button>{' '}
              zu.
            </p>
          </div>
          <button
            onClick={accept}
            className="w-full md:w-auto flex-shrink-0 px-8 py-3 bg-[#4d7abd] hover:bg-[#3d6aad] text-white rounded-full font-semibold transition-colors shadow-[0_0_20px_rgba(77,122,189,0.4)]"
          >
            Alle akzeptieren
          </button>
        </div>
      </motion.div>
    </>
  );
};

const NAV_SERVICES: { label: string; items: [string, ServiceKey][] }[] = [
  { label: 'Versicherungen', items: [
    ['Krankenversicherung', 'krankenversicherung'],
    ['Arbeitskraftabsicherung', 'arbeitskraft'],
    ['KFZ-Versicherung', 'kfz'],
    ['Sachversicherungen', 'sach'],
    ['Gewerbeversicherungen', 'gewerbe'],
    ['Private Rentenversicherung', 'rente'],
    ['Hinterbliebenenvorsorge', 'hinterbliebene'],
  ]},
  { label: 'Vermögensaufbau', items: [
    ['Immobilien', 'immobilien'],
    ['Sparprodukte', 'sparprodukte'],
    ['Geldanlagen', 'geldanlagen'],
    ['Vorsorgekonzepte', 'vorsorge'],
    ['Finanzierungen', 'finanzierungen'],
    ['Aktien', 'aktien'],
    ['Vermögenswirksame Leistungen', 'vwl'],
  ]},
];

const Navbar = ({ onPageChange, currentPage, onService }: { onPageChange: (p: Page, t?: string) => void; currentPage: Page; onService: (k: ServiceKey) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [leistungenOpen, setLeistungenOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const link = 'text-[#0F172A]/70 hover:text-[#0F172A] transition-colors font-medium';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl transition-shadow ${scrolled ? 'shadow-[0_1px_0_rgba(15,23,42,0.08),0_8px_24px_-16px_rgba(15,23,42,0.25)]' : 'border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 lg:h-20 flex items-center justify-between gap-6">

          <button onClick={() => onPageChange('home')} className="cursor-pointer flex-shrink-0 flex items-center gap-2.5" aria-label="Zur Startseite">
            <img src="/dk-mark.png" alt="" width="830" height="830" fetchPriority="high" decoding="async"
              className="h-9 md:h-11 w-auto object-contain" style={{ filter: "saturate(1.3) brightness(0.82)" }} />
            <span className="text-[1.05rem] md:text-xl font-extrabold tracking-[-0.02em] text-[#0F172A] whitespace-nowrap">
              DK Finanzkanzlei
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-7 text-sm">
            <div className="relative" onMouseEnter={() => setLeistungenOpen(true)} onMouseLeave={() => setLeistungenOpen(false)}>
              <span className={`flex items-center gap-1 cursor-default select-none ${link}`}>
                Leistungen <ChevronRight className={`w-3.5 h-3.5 transition-transform ${leistungenOpen ? 'rotate-90' : ''}`} />
              </span>
              <AnimatePresence>
                {leistungenOpen && <LeistungenDropdown color={ACCENT} onPageChange={onPageChange} onService={onService} />}
              </AnimatePresence>
            </div>
            <button onClick={() => onPageChange('home', 'erfolge')} className={link}>Erfolge</button>
            <button onClick={() => onPageChange(currentPage === 'ueberuns' ? 'home' : 'ueberuns')} className={`${link} ${currentPage === 'ueberuns' ? 'text-[#4d7abd]' : ''}`}>Über uns</button>
            <button onClick={() => onPageChange(currentPage === 'karriere' ? 'home' : 'karriere')} className={`${link} ${currentPage === 'karriere' ? 'text-[#4d7abd]' : ''}`}>Karriere</button>
            <a href={CONSULTING_URL} className={link}>Consulting</a>
            <button onClick={() => onPageChange('kontakt')}
              className="shine group px-5 py-2.5 text-white rounded-full text-sm font-bold inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-[0_6px_18px_-8px_rgba(77,122,189,0.9)]"
              style={{ backgroundColor: ACCENT }}>
              Kostenlos starten <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <button className="lg:hidden text-[#0F172A] min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => setIsOpen(!isOpen)} aria-label="Menü">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-0 right-0 z-40 bg-white border-b border-black/10 p-6 flex flex-col gap-5 text-[#0F172A] overflow-y-auto lg:hidden"
          style={{ top: '4rem', maxHeight: 'calc(100dvh - 4rem)' }}
        >
          <div>
            <button onClick={() => { setIsOpen(false); onPageChange('leistungen'); }} className="font-bold text-left w-full">Leistungen</button>
            <div className="mt-3 pl-3 flex flex-col gap-1 text-sm text-[#0F172A]/60">
              {NAV_SERVICES.map((group) => (
                <React.Fragment key={group.label}>
                  <p className="text-xs font-bold uppercase mt-2 mb-1" style={{ color: ACCENT }}>{group.label}</p>
                  {group.items.map(([label, key]) => (
                    <button key={key} className="text-left py-2 w-full hover:text-[#0F172A] transition-colors" onClick={() => { setIsOpen(false); onService(key); }}>{label}</button>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <button className="text-left" onClick={() => { setIsOpen(false); onPageChange('home', 'erfolge'); }}>Erfolge</button>
          <button className="text-left" onClick={() => { setIsOpen(false); onPageChange(currentPage === 'ueberuns' ? 'home' : 'ueberuns'); }}>Über uns</button>
          <button className="text-left" onClick={() => { setIsOpen(false); onPageChange(currentPage === 'karriere' ? 'home' : 'karriere'); }}>Karriere</button>
          <a href={CONSULTING_URL} className="text-left">Consulting</a>
          <button onClick={() => { setIsOpen(false); onPageChange('kontakt'); }} className="w-full py-3.5 text-white rounded-xl font-bold" style={{ backgroundColor: ACCENT }}>
            Kostenlos starten
          </button>
        </motion.div>
      )}
    </>
  );
};

// ─── DK Finanzkanzlei Content ────────────────────────────────────────────────────
const ErsparniCounter = () => {
  const [value, setValue] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const started = React.useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const target = 1287;
        const duration = 1800;
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(easeOut(progress) * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-5xl font-medium leading-none tracking-tight">
      €{value.toLocaleString('de-DE')}
    </div>
  );
};

// ─── Startseite ──────────────────────────────────────────────────────────────────

/** Sanftes Einblenden von unten – die Grundanimation aller Sektionen. */
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const SectionLabel = ({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'gold' }) => (
  <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5"
    style={tone === 'gold' ? { backgroundColor: GOLD + '1F', color: '#8A7024' } : { backgroundColor: ACCENT + '1A', color: ACCENT }}>
    {children}
  </span>
);

/** Schwebende Kennzahl-Karte im Hero. */
const FloatCard = ({ icon, label, value, sub, className, delay, tone }: {
  icon: React.ReactNode; label: string; value: string; sub: string; className: string; delay: number; tone: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.94 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute ${className} z-20`}
  >
    <div className="card-float rounded-2xl bg-white shadow-[0_18px_45px_-18px_rgba(15,23,42,0.35)] border border-black/5 px-4 py-3 min-w-[9rem] md:min-w-[10rem]"
      style={{ animationDelay: `${delay * 2}s` }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: tone + '1F', color: tone }}>{icon}</span>
        <span className="text-[11px] md:text-xs font-semibold text-[#0F172A]/60">{label}</span>
      </div>
      <p className="text-lg md:text-xl font-extrabold text-[#0F172A] leading-none">{value}</p>
      <p className="text-[11px] text-[#0F172A]/45 mt-1">{sub}</p>
    </div>
  </motion.div>
);

const HERO_AVATARS = ['/kunde1-w.png', '/kunde2-w.png', '/kunde3-w.png', '/kunde4-w.png'];

const HomeHero = ({ onPageChange }: { onPageChange: (p: Page, t?: string) => void }) => (
  <section className="relative pt-24 md:pt-28 pb-8 md:pb-10 px-6 overflow-hidden">
    <div className="absolute inset-0 -z-10 dot-grid" />
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.12fr] gap-10 items-center">

      {/* Text */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2.5">
            {HERO_AVATARS.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" decoding="async"
                className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-white bg-[#E8EDF5]" />
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-sm text-[#0F172A]/55">
            <ShieldCheck className="w-4 h-4" style={{ color: ACCENT }} />
            Ausgezeichnet bewertet bei Google
          </span>
        </div>

        <h1 className="text-[2.35rem] leading-[1.03] md:text-5xl lg:text-[3.85rem] font-extrabold tracking-[-0.03em] text-[#0F172A] mb-5">
          Dein Problem.<br />
          Unsere Lösung.<br />
          <span style={{ color: GOLD }}>Deine Zukunft.</span>
        </h1>

        <p className="text-base md:text-lg text-[#0F172A]/55 max-w-md leading-relaxed mb-7">
          Wir hören zu, denken mit und handeln. Damit aus deinem Problem von heute dein Erfolg von morgen wird.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => onPageChange('kontakt')}
            className="shine group px-7 py-3.5 rounded-full text-white font-bold text-base inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_14px_32px_-14px_rgba(77,122,189,0.95)]"
            style={{ backgroundColor: ACCENT }}>
            Kostenlos starten <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => onPageChange('home', 'ablauf')}
            className="px-7 py-3.5 rounded-full font-bold text-base inline-flex items-center justify-center gap-2.5 border border-black/10 text-[#0F172A] hover:bg-[#0F172A]/[0.03] transition-colors">
            <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT + '18' }}>
              <Play className="w-3 h-3 fill-current" style={{ color: ACCENT }} />
            </span>
            So funktioniert&rsquo;s
          </button>
        </div>
      </motion.div>

      {/* Bild mit schwebenden Karten */}
      <div className="relative order-first lg:order-last">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-end justify-center lg:h-[29rem]">
          {/* Freigestellt: die beiden stehen ohne Rahmen auf der weißen Seite */}
          <img src="/hero-echt.png" alt="Joel Dakaj und Flamur – DK Finanzkanzlei Aachen" width="965" height="633" fetchPriority="high" decoding="async"
            className="w-full max-w-[30rem] lg:max-w-none h-auto object-contain"
            style={{ filter: "drop-shadow(0 18px 28px rgba(15,23,42,0.16)) drop-shadow(0 4px 10px rgba(15,23,42,0.10))" }} />
        </motion.div>

        <FloatCard className="-left-2 md:-left-8 top-[14%]" delay={0.35} tone={GOLD}
          icon={<Calculator className="w-3 h-3" />} label="Steuer" value="+742 €" sub="pro Jahr" />
        <FloatCard className="-right-1 md:-right-6 top-[4%]" delay={0.5} tone={ACCENT}
          icon={<TrendingUp className="w-3 h-3" />} label="Ø Ersparnis" value="1.287 €" sub="pro Jahr und Mandant" />
        <FloatCard className="-left-1 md:-left-10 bottom-[20%]" delay={0.65} tone="#22C55E"
          icon={<Wallet className="w-3 h-3" />} label="Förderungen" value="+545 €" sub="pro Jahr" />
        <FloatCard className="-right-2 md:-right-4 bottom-[6%]" delay={0.8} tone={ACCENT}
          icon={<ShieldCheck className="w-3 h-3" />} label="Vergleich" value="100+" sub="geprüfte Anbieter" />
      </div>
    </div>
  </section>
);

/** Partnerlogos auf einer weißen Karte, die den Hero überlappt. */
const PartnerBar = () => (
  <div className="relative z-30 px-6 -mt-8 md:-mt-10 mb-[-2.5rem] md:mb-[-3.25rem]">
    <motion.div {...reveal} className="max-w-4xl mx-auto">
      <p className="text-center text-sm text-[#0F172A]/30 mb-3">Wir vergleichen u.&nbsp;a.</p>
      <div className="rounded-[1.5rem] bg-[#F4F6FA] px-6 py-7 overflow-hidden">
        <div className="flex logo-marquee items-center" style={{ width: 'max-content' }}>
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
            <div key={i} className="flex items-center justify-center mx-9 flex-shrink-0" style={{ width: '130px', height: '44px' }}>
              <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="w-full h-full object-contain"
                style={{ filter: (logo as { light?: string }).light ?? "brightness(0)", opacity: 0.42, transform: `scale(${logo.scale})` }} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

/** Blauer Vollflächen-Block mit den kostenlosen Übersichten. */
const GUIDES = [
  { title: 'PKV-Übersicht', desc: 'GKV oder PKV? Beitragslogik, Leistungs-Checkliste und die teuersten Fehler beim Wechsel.', href: '/guides/pkv-uebersicht', icon: <ShieldCheck className="w-5 h-5" />, badge: 'Neu' },
  { title: 'BU-Übersicht', desc: 'Die 9 Klauseln, die im Ernstfall zählen – und wie du trotz Vorerkrankungen versicherbar bleibst.', href: '/guides/bu-uebersicht', icon: <Heart className="w-5 h-5" />, badge: 'Neu' },
  { title: 'Altersvorsorge-Übersicht', desc: 'Riester, Rürup, bAV und private Vorsorge im Vergleich – inklusive Rentenlücken-Rechnung.', href: '/guides/altersvorsorge-uebersicht', icon: <PieChart className="w-5 h-5" />, badge: 'Neu' },
  { title: 'ETF-Weltportfolio', desc: 'Wie ein weltweit gestreutes ETF-Portfolio nach wissenschaftlichen Kriterien aufgebaut wird.', href: '/guides/etf-weltportfolio', icon: <TrendingUp className="w-5 h-5" />, badge: null },
];

const GuidesBlock = () => (
  <section className="py-20 md:py-28 px-6" style={{ backgroundColor: ACCENT }}>
    <div className="max-w-7xl mx-auto">
      <motion.div {...reveal} className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-[-0.02em] mb-4">Dein Finanzstart</h2>
        <p className="text-white/70 max-w-xl mx-auto leading-relaxed">
          Vier kostenlose Übersichten, mit denen du die wichtigsten Entscheidungen selbst einordnen kannst – ohne Termin, ohne Verpflichtung.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GUIDES.map((g, i) => (
          <motion.a key={g.href} href={g.href} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="lift group flex flex-col rounded-2xl bg-white p-7 shadow-[0_20px_45px_-30px_rgba(0,0,0,0.5)]">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: ACCENT + '18', color: ACCENT }}>{g.icon}</span>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">{g.title}</h3>
            <p className="text-sm text-[#0F172A]/55 leading-relaxed flex-1">{g.desc}</p>
            <div className="mt-6 flex items-center justify-between">
              {g.badge
                ? <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: GOLD + '22', color: '#8A7024' }}>{g.badge}</span>
                : <span />}
              <span className="text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: ACCENT }}>
                Ansehen <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);


/** Herzstück: ein Schalter, der das Chaos in eine Struktur um die DK-Mitte kippt. */
const SWITCH_ITEMS = [
  { icon: <Calculator className="w-4 h-4" />, tilt: 1.8,
    scattered: { left: '2%', top: '10%' }, grid: { left: '25%', top: '4%' },
    off: { title: 'Steuervorteile', note: 'Jahr für Jahr verschenkt' },
    on:  { title: 'Steuervorteile', note: 'Erledigt' } },
  { icon: <ShieldCheck className="w-4 h-4" />, tilt: -1.6,
    scattered: { left: '58%', top: '0%' }, grid: { left: '53%', top: '4%' },
    off: { title: 'Versicherung teurer', note: 'Beitrag erneut erhöht' },
    on:  { title: 'Versicherungen', note: 'Geprüft und optimiert' } },
  { icon: <Search className="w-4 h-4" />, tilt: -1.2,
    scattered: { left: '26%', top: '44%' }, grid: { left: '4%', top: '42%' },
    off: { title: 'etf sparplan welcher', note: '1.240.000 Ergebnisse' },
    on:  { title: 'ETF-Sparplan', note: 'Eingerichtet' } },
  { icon: <Heart className="w-4 h-4" />, tilt: 1.4,
    scattered: { left: '74%', top: '30%' }, grid: { left: '74%', top: '42%' },
    off: { title: 'BU-Schutz', note: 'Seit Jahren aufgeschoben' },
    on:  { title: 'BU-Schutz', note: 'Steht' } },
  { icon: <Home className="w-4 h-4" />, tilt: 1.6,
    scattered: { left: '0%', top: '76%' }, grid: { left: '25%', top: '80%' },
    off: { title: 'Immobilie kaufen?', note: 'Eigenkapital fehlt' },
    on:  { title: 'Immobilie', note: 'In Reichweite' } },
  { icon: <PieChart className="w-4 h-4" />, tilt: -1.8,
    scattered: { left: '50%', top: '74%' }, grid: { left: '53%', top: '80%' },
    off: { title: 'GKV oder PKV?', note: 'Ungeklärt seit Jahren' },
    on:  { title: 'PKV-Frage', note: 'Geklärt' } },
];

const SwitchCard = ({ item, on, i }: { item: typeof SWITCH_ITEMS[number]; on: boolean; i: number }) => {
  const s = on ? item.on : item.off;
  return (
    <motion.div
      initial={false}
      animate={{ ...(on ? item.grid : item.scattered), rotate: on ? 0 : item.tilt }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.03 }}
      className="lg:absolute w-full lg:w-[22%] z-10"
    >
      <div className={`rounded-full px-5 py-3.5 flex items-center gap-3 transition-shadow duration-500 ${on ? 'bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)]' : 'bg-white shadow-[0_14px_34px_-18px_rgba(15,23,42,0.3)]'}`}>
        <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500"
          style={on ? { backgroundColor: ACCENT + '1F', color: ACCENT } : { backgroundColor: 'rgba(15,23,42,0.04)', color: 'rgba(15,23,42,0.45)' }}>
          {on ? <CheckCircle2 className="w-4 h-4" /> : item.icon}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={on ? 'on' : 'off'}
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }} className="min-w-0">
            <p className="font-bold text-sm text-[#0F172A] leading-tight">{s.title}</p>
            <p className="text-xs mt-0.5" style={{ color: on ? '#16A34A' : '#EF4444' }}>{s.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SwitchSection = ({ onPageChange }: { onPageChange: (p: Page, t?: string) => void }) => {
  const [on, setOn] = useState(false);

  // Endpunkte der Speichen im 1000x600-Koordinatensystem der SVG
  const spokes = [[367, 60], [632, 60], [170, 300], [830, 300], [367, 540], [632, 540]];

  return (
    <motion.section
      animate={{ backgroundColor: on ? ACCENT : '#F5F7FA' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-16 md:py-20 px-6 overflow-hidden"
    >
      {/* Punktraster nur im Ohne-Zustand, im Mit-Zustand traegt das Blau */}
      <div className="absolute inset-0 dot-grid-full pointer-events-none transition-opacity duration-500" style={{ opacity: on ? 0 : 1 }} />
      <div className="relative max-w-5xl mx-auto">
        <motion.div {...reveal} className="text-center mb-8">
          <h2 className="text-3xl md:text-[2.6rem] font-extrabold tracking-[-0.02em] mb-3 transition-colors duration-500"
            style={{ color: on ? '#fff' : '#0F172A' }}>
            {on
              ? <>Ein Ansprechpartner. <span style={{ color: GOLD }}>Alles geregelt.</span></>
              : <>Kommt dir das <span style={{ color: GOLD }}>bekannt</span> vor?</>}
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed transition-colors duration-500" style={{ color: on ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.45)' }}>
            {on
              ? 'Wir kümmern uns. Du behältst mehr Geld, bist besser abgesichert und hast den Kopf frei.'
              : 'Zwischen ungeöffneter Post, offenen Tabs und gutem Vorsatz.'}
          </p>
        </motion.div>

        {/* Schalter */}
        <motion.div {...reveal} className="flex items-center justify-center gap-4 mb-10">
          <span className="text-base font-medium transition-colors duration-500" style={{ color: on ? 'rgba(255,255,255,0.5)' : '#0F172A' }}>Ohne</span>
          <button onClick={() => setOn(!on)} role="switch" aria-checked={on} aria-label="Vorher-Nachher umschalten"
            className="relative w-[5rem] h-11 rounded-full transition-colors duration-500 flex-shrink-0"
            style={{
              backgroundColor: on ? '#FFFFFF' : '#1B1D2A',
              boxShadow: on ? '0 0 0 5px rgba(255,255,255,0.18)' : `0 0 0 5px ${GOLD}26`,
            }}>
            <motion.span layout transition={{ type: 'spring', stiffness: 480, damping: 32 }}
              className="absolute top-1.5 w-8 h-8 rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.25)]"
              style={{ left: on ? 'calc(100% - 2.375rem)' : '0.375rem', backgroundColor: on ? ACCENT : '#FFFFFF' }} />
          </button>
          <span className="text-base font-medium transition-colors duration-500" style={{ color: on ? '#fff' : 'rgba(15,23,42,0.3)' }}>Mit DK</span>
        </motion.div>

        {/* Karten – Desktop verstreut bzw. um die Mitte, Mobil gestapelt */}
        <div className="relative lg:h-[24rem] flex flex-col gap-3 lg:block">
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
            {/* Chaos: lose Kurven */}
            <g style={{ opacity: on ? 0 : 1, transition: 'opacity .4s' }}>
              {['M 190 120 C 280 190, 320 210, 360 250', 'M 640 60 C 720 90, 780 140, 810 200',
                'M 830 320 C 790 400, 700 450, 620 480', 'M 560 500 C 430 530, 300 530, 190 500',
                'M 150 470 C 190 420, 250 370, 320 300'].map((d, i) => (
                <path key={i} d={d} fill="none" stroke="rgba(15,23,42,0.18)" strokeWidth="1.5" strokeDasharray="6 8" vectorEffect="non-scaling-stroke" />
              ))}
            </g>
            {/* Struktur: Speichen zur Mitte */}
            <g style={{ opacity: on ? 1 : 0, transition: 'opacity .5s .15s' }}>
              {spokes.map(([x, y], i) => (
                <line key={i} x1="500" y1="300" x2={x} y2={y} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="6 7" vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          </svg>

          {/* DK-Logo in der Mitte */}
          <motion.div
            initial={false}
            animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: on ? 0.2 : 0 }}
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full items-center justify-center z-20"
            style={{ backgroundColor: 'rgba(255,255,255,0.14)' }}
          >
            <img src="/dk-mark.png" alt="" width="830" height="830" loading="lazy" decoding="async"
              className="w-12 h-12 object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
          </motion.div>

          {SWITCH_ITEMS.map((item, i) => <SwitchCard key={i} item={item} on={on} i={i} />)}
        </div>

        <motion.div {...reveal} className="text-center mt-10 lg:mt-4">
          <AnimatePresence mode="wait" initial={false}>
            {on ? (
              <motion.div key="cta" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <button onClick={() => onPageChange('kontakt')}
                  className="shine group px-8 py-3.5 rounded-full bg-white font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ color: ACCENT }}>
                  Kostenloses Erstgespräch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-white/60 mt-4">Kostenlos · Unverbindlich · Antwort innerhalb von 48 Stunden</p>
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-[#0F172A]/35">
                Leg den Schalter um.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};

/** Echte Google-Rezensionen als Karten. */
const ReviewsSection = () => (
  <section id="erfolge" className="py-20 md:py-28 px-6 bg-white scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <motion.div {...reveal} className="text-center mb-14">
        <SectionLabel tone="gold">Erfolge</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#0F172A] mb-4">
          Menschen, bei denen es <span style={{ color: GOLD }}>geklickt</span> hat
        </h2>
        <p className="text-[#0F172A]/50 max-w-xl mx-auto leading-relaxed">
          Echte Bewertungen von echten Mandanten – unverändert übernommen aus unserem Google-Profil.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {ALL_TESTIMONIALS.slice(0, 3).map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="lift rounded-2xl border border-black/5 bg-white p-7 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.4)] flex flex-col">
            <div className="flex gap-0.5 mb-4">
              {[...Array(t.stars ?? 5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-[#0F172A]/70 leading-relaxed flex-1">„{t.text}"</p>
            <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between">
              <p className="font-bold text-sm text-[#0F172A]">{t.name}</p>
              <p className="text-xs text-[#0F172A]/35">{t.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/** Über uns: Text links, versetzte Bildcollage rechts. */
const AboutSection = ({ onPageChange }: { onPageChange: (p: Page, t?: string) => void }) => (
  <section className="py-20 md:py-28 px-6 bg-white">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      <motion.div {...reveal}>
        <SectionLabel>Über uns</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#0F172A] mb-6 leading-[1.1]">
          Das ist die <span style={{ color: ACCENT }}>DK Finanzkanzlei</span>
        </h2>
        <p className="text-[#0F172A]/60 leading-relaxed mb-5">
          Wir sind ein junges Team aus Aachen-Eilendorf, das Finanzen verständlich macht – ohne Fachchinesisch,
          ohne Verkaufsdruck und ohne Bindung an eine einzelne Bank oder Versicherung. Wir vergleichen über
          100 geprüfte Anbieter und empfehlen das, was rechnerisch zu deiner Lebenssituation passt.
        </p>
        <p className="text-[#0F172A]/60 leading-relaxed mb-8">
          Beraten wird persönlich in Aachen oder deutschlandweit per Video-Call – montags bis samstags von
          10 bis 20 Uhr. Die Erstberatung ist kostenlos und unverbindlich, weil wir über die Anbieter vergütet
          werden und nicht über dich.
        </p>
        <button onClick={() => onPageChange('ueberuns')}
          className="group inline-flex items-center gap-2 font-bold hover:gap-3 transition-all" style={{ color: ACCENT }}>
          Mehr zum Team <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      <motion.div {...reveal} className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 pt-10">
          <img src="/Team.jpg" alt="Das Team der DK Finanzkanzlei in Aachen" loading="lazy" decoding="async"
            className="rounded-2xl object-cover w-full aspect-[4/5] shadow-[0_24px_50px_-30px_rgba(15,23,42,0.5)]" />
          <div className="rounded-2xl p-6 text-white shadow-[0_24px_50px_-30px_rgba(15,23,42,0.5)]" style={{ backgroundColor: ACCENT }}>
            <p className="text-3xl font-extrabold leading-none mb-1">Mo&nbsp;–&nbsp;Sa</p>
            <p className="text-sm text-white/75 leading-snug">10 bis 20 Uhr erreichbar – vor Ort in Aachen oder per Video-Call.</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <img src="/joel-flamur.png" alt="Joel Dakaj und Flamur von der DK Finanzkanzlei" loading="lazy" decoding="async"
            className="rounded-2xl object-cover w-full aspect-square shadow-[0_24px_50px_-30px_rgba(15,23,42,0.5)]"
            style={{ objectPosition: "50% 72%" }} />
          <img src="/DK Finanz BG.jpeg" alt="Standort der DK Finanzkanzlei in Aachen-Eilendorf" loading="lazy" decoding="async"
            className="rounded-2xl object-cover w-full aspect-[4/5] shadow-[0_24px_50px_-30px_rgba(15,23,42,0.5)]" />
        </div>
      </motion.div>
    </div>
  </section>
);

/** Kennzahlen, die beim Scrollen hochzählen. */
const NUMBERS = [
  { value: 100, suffix: '+', label: 'geprüfte Anbieter im Vergleich' },
  { value: 1287, suffix: ' €', label: 'Ø Ersparnis pro Jahr und Mandant' },
  { value: 14, suffix: '', label: 'Leistungsfelder aus einer Hand' },
  { value: 10, suffix: ' h', label: 'täglich erreichbar, Mo bis Sa' },
];

const NumbersSection = () => (
  <section className="py-16 md:py-24 px-6 bg-white border-y border-black/5">
    <div className="max-w-6xl mx-auto">
      <motion.div {...reveal} className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#0F172A] mb-4">Zahlen, die überzeugen</h2>
        <p className="text-[#0F172A]/50 max-w-lg mx-auto leading-relaxed">
          Kein Vertrieb von der Stange – sondern ein Vergleich über den gesamten Markt.
        </p>
      </motion.div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {NUMBERS.map((n, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] mb-2" style={{ color: ACCENT }}>
              <AnimatedCounter value={n.value} suffix={n.suffix} color={ACCENT} large />
            </div>
            <p className="text-sm text-[#0F172A]/45 leading-snug max-w-[11rem] mx-auto">{n.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


/** 3-Schritte-Plan als vertikale Timeline mit goldener Linie. */
const STEPS = [
  {
    kicker: 'Schritt 1', title: 'Geld verstehen.',
    body: 'Du verdienst gut – und fragst dich am Monatsende trotzdem, wo es hin ist. Verträge, die du irgendwann mal abgeschlossen hast. Ein Konto, das sich nicht bewegt. Das Gefühl, dass andere weiter sind.',
    body2: 'Wir starten dort, wo du gerade stehst. Kein Urteil, nur Klarheit: Wir gehen deine Situation gemeinsam durch und zeigen dir, was sie dich heute kostet.',
    tags: ['Finanzanalyse', 'GKV / PKV-Vergleich'], img: '/Team.jpg',
    quoteLabel: 'Wo du gerade stehst', quote: '„Ich weiß, dass ich mich kümmern müsste – nur nicht, wo ich anfangen soll."',
  },
  {
    kicker: 'Schritt 2', title: 'Geld behalten.',
    body: 'Steuern und Versicherungen kosten Geld, wenn man sie ignoriert. Die meisten zahlen zu viel oder sind an den falschen Stellen abgesichert – oft ohne es zu merken.',
    body2: 'Wir optimieren, was da ist. Du behältst mehr von dem, was du verdienst – ohne Tricks, sondern mit einer Struktur, die zu deiner Lebenssituation passt.',
    tags: ['Steueroptimierung', 'Absicherung', 'Fixkosten-Check'], img: '/joel-flamur.png',
    quoteLabel: 'Was sich verändert', quote: '„Zum ersten Mal habe ich das Gefühl, dass mein Geld für mich arbeitet."',
  },
  {
    kicker: 'Schritt 3', title: 'Vermögen aufbauen.',
    body: 'Jetzt wird es interessant. Das Fundament steht – Zeit, etwas aufzubauen. Ob ETF-Sparplan, der im Hintergrund für dich läuft, oder eine Immobilie als nächster großer Schritt.',
    body2: 'Wir zeigen dir Wege, die zu dir passen, binden staatliche Förderungen gezielt ein und rechnen jede Variante mit deinen Zahlen durch – nicht mit Musterbeispielen.',
    tags: ['ETF-Sparpläne', 'Immobilien', 'Förderungen'], img: '/DK Immo BG.jpeg',
    quoteLabel: 'Wo wir dich hinführen', quote: '„Ich habe einen Plan – und weiß zum ersten Mal, dass er funktioniert."',
  },
];

const StepsSection = () => (
  <section id="ablauf" className="py-20 md:py-28 px-6 bg-white scroll-mt-24">
    <div className="max-w-6xl mx-auto">
      <motion.div {...reveal} className="text-center mb-16 md:mb-20">
        <SectionLabel tone="gold">Dein 3-Schritte-Plan</SectionLabel>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#0F172A] mb-4">
          Finanzen fühlen sich endlich <span style={{ color: GOLD }}>richtig</span> an
        </h2>
        <p className="text-[#0F172A]/50 max-w-xl mx-auto leading-relaxed">
          Du musst kein Experte sein. Du brauchst jemanden, der dich versteht – und einen Plan, der zu deinem Leben passt.
        </p>
      </motion.div>

      <div className="relative">
        {/* Goldene Linie – nur Desktop */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: GOLD + '55' }} />

        <div className="flex flex-col gap-16 md:gap-28">
          {STEPS.map((s, i) => {
            const textFirst = i % 2 === 0;
            return (
              <motion.div key={i} {...reveal} className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Nummer auf der Linie */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center font-extrabold text-white z-10 shadow-lg"
                  style={{ backgroundColor: GOLD }}>
                  {i + 1}
                </div>

                <div className={textFirst ? 'md:order-1 md:pr-10' : 'md:order-2 md:pl-10'}>
                  <p className="text-xs font-bold tracking-[0.18em] uppercase mb-3" style={{ color: GOLD }}>{s.kicker}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-4">{s.title}</h3>
                  <p className="text-[#0F172A]/60 leading-relaxed mb-4">{s.body}</p>
                  <p className="text-[#0F172A]/60 leading-relaxed mb-6">{s.body2}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="px-4 py-2 rounded-full text-sm font-medium bg-[#0F172A]/[0.04] text-[#0F172A]/70">{t}</span>
                    ))}
                  </div>
                </div>

                <div className={textFirst ? 'md:order-2 md:pl-10' : 'md:order-1 md:pr-10'}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/11] shadow-[0_30px_60px_-35px_rgba(15,23,42,0.6)]">
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/25 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/55 mb-2">{s.quoteLabel}</p>
                      <p className="text-white font-medium leading-snug">{s.quote}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

/** Endlos scrollende Bewertungs-Spalten. */
const ReviewColumn = ({ items, speed, className }: { items: typeof ALL_TESTIMONIALS; speed: string; className?: string }) => (
  <div className={`marquee-col overflow-hidden h-[34rem] ${className ?? ''}`}>
    <div className="marquee-up flex flex-col gap-4" style={{ ['--speed' as string]: speed }}>
      {[...items, ...items].map((t, i) => (
        <div key={i} className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.45)]">
          <div className="flex gap-0.5 mb-3">
            {[...Array(t.stars ?? 5)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-sm text-[#0F172A]/70 leading-relaxed mb-4">„{t.text}"</p>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: ACCENT + '18', color: ACCENT }}>
              {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
            <div>
              <p className="text-sm font-bold text-[#0F172A] leading-tight">{t.name}</p>
              <p className="text-xs text-[#0F172A]/35">{t.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestimonialColumns = () => {
  const n = Math.ceil(ALL_TESTIMONIALS.length / 3);
  return (
    <section id="testimonials" className="py-20 md:py-28 px-6 scroll-mt-24" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div {...reveal} className="text-center mb-14">
          <SectionLabel>Bewertungen</SectionLabel>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#0F172A] mb-4">
            Was unsere <span style={{ color: ACCENT }}>Mandanten</span> sagen
          </h2>
          <p className="text-[#0F172A]/50 max-w-xl mx-auto leading-relaxed">
            Echte Stimmen von Menschen, die ihre Finanzen mit uns sortiert haben.
          </p>
        </motion.div>

        <div className="fade-y grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReviewColumn items={ALL_TESTIMONIALS.slice(0, n)} speed="46s" />
          <ReviewColumn items={ALL_TESTIMONIALS.slice(n, n * 2)} speed="58s" />
          <ReviewColumn items={ALL_TESTIMONIALS.slice(n * 2)} speed="52s" className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

/** Drei Schritte bis zum Termin. */
const HOW = [
  { icon: <FileText className="w-6 h-6" />, title: 'Anfrage stellen', desc: 'Trag dich kostenlos ein und beantworte ein paar kurze Fragen zu deiner Situation.' },
  { icon: <BarChart3 className="w-6 h-6" />, title: 'Analyse im Gespräch', desc: 'Wir gehen deine Zahlen gemeinsam durch und erstellen deinen persönlichen Fahrplan.' },
  { icon: <Wallet className="w-6 h-6" />, title: 'Mehr behalten', desc: 'Du setzt die Empfehlungen um – wir übernehmen den Papierkram und bleiben an deiner Seite.' },
];

const HowItWorks = () => (
  <section className="py-20 md:py-28 px-6 bg-white">
    <div className="max-w-5xl mx-auto">
      <motion.div {...reveal} className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-[#0F172A] mb-4">So einfach funktioniert&rsquo;s</h2>
        <p className="text-[#0F172A]/50 max-w-xl mx-auto leading-relaxed">
          Mehr aus deinem Geld machen war noch nie so unkompliziert. Ehrlich, persönlich und kostenlos.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4">
        {HOW.map((h, i) => (
          <React.Fragment key={i}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }} className="flex-1 text-center max-w-xs mx-auto">
              <span className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: ACCENT + '14', color: ACCENT }}>
                {h.icon}
              </span>
              <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">{h.title}</h3>
              <p className="text-sm text-[#0F172A]/50 leading-relaxed">{h.desc}</p>
            </motion.div>
            {i < HOW.length - 1 && (
              <ArrowRight className="hidden md:block w-6 h-6 text-[#0F172A]/15 flex-shrink-0 mt-5" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

/** FAQ auf blauem Vollflächen-Block. */
const HOME_FAQ = [
  { q: 'Wie läuft ein Erstgespräch ab?', a: 'Wir nehmen uns rund 60 Minuten Zeit, gehen deine aktuelle Situation durch und schauen uns an, wo Geld liegen bleibt. Danach weißt du, was sich lohnt – und was nicht. Ob du danach etwas umsetzt, entscheidest du.' },
  { q: 'Was kostet mich die Beratung?', a: 'Nichts. Wir werden über die Anbieter vergütet, nicht über dich. Für dich entstehen weder Beratungs- noch Vermittlungskosten – auch nicht, wenn du dich am Ende gegen eine Umsetzung entscheidest.' },
  { q: 'Seid ihr an bestimmte Anbieter gebunden?', a: 'Nein. Wir haben keinen Exklusivvertrag mit einer Bank oder Versicherung und vergleichen über 100 geprüfte Anbieter am Markt. Welche Empfehlung am Ende steht, entscheidet die Rechnung – nicht die Provision.' },
  { q: 'Für wen lohnt sich das?', a: 'Für alle, die mehr aus ihrem Einkommen machen wollen: Berufseinsteiger, Angestellte, Familien, Selbstständige und Beamte. Du brauchst kein Vorwissen und kein großes Vermögen – nur die Bereitschaft, dir einmal eine Stunde Zeit zu nehmen.' },
  { q: 'Wie schnell bekomme ich einen Termin?', a: 'In der Regel innerhalb weniger Tage. Wir beraten montags bis samstags von 10 bis 20 Uhr, persönlich in Aachen oder deutschlandweit per Video-Call – auch abends nach Feierabend.' },
  { q: 'Was passiert nach dem Erstgespräch?', a: 'Du bekommst deine Auswertung schriftlich mit konkreten Empfehlungen. Wenn du etwas umsetzen willst, übernehmen wir Anträge und Schriftverkehr. Wenn nicht, hast du trotzdem einen klaren Überblick – ohne Nachfassen und ohne Verkaufsdruck.' },
];

const FaqSectionBlue = ({ onPageChange }: { onPageChange: (p: Page, t?: string) => void }) => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 px-6" style={{ backgroundColor: ACCENT }}>
      <div className="max-w-3xl mx-auto">
        <motion.div {...reveal} className="text-center mb-12">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide mb-5 bg-white/15 text-white">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-[-0.02em] text-white mb-4">Häufig gestellte Fragen</h2>
          <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
            Die wichtigsten Antworten auf einen Blick, damit du weißt, was dich erwartet.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {HOME_FAQ.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/15 bg-white/[0.20] hover:bg-white/[0.27] transition-colors overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-semibold text-white">{item.q}</span>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 text-white/80 transition-transform duration-300 ${open === i ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-white/85 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div {...reveal} className="mt-12 rounded-2xl bg-white p-8 text-center">
          <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">Noch Fragen?</h3>
          <p className="text-sm text-[#0F172A]/50 mb-6">Wir helfen dir gerne persönlich weiter – kostenlos und unverbindlich.</p>
          <button onClick={() => onPageChange('kontakt')}
            className="shine group px-8 py-3.5 rounded-full text-white font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: ACCENT }}>
            Kostenlos starten <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const DKContent = ({ onPageChange }: { onPageChange: (p: Page, t?: string) => void }) => (
  <>
    <HomeHero onPageChange={onPageChange} />
    <PartnerBar />
    <GuidesBlock />
    <SwitchSection onPageChange={onPageChange} />
    <ReviewsSection />
    <AboutSection onPageChange={onPageChange} />
    <NumbersSection />
    <StepsSection />
    <TestimonialColumns />
    <HowItWorks />
    <FaqSectionBlue onPageChange={onPageChange} />
  </>
);


const ImpressumContent = () => (
  <section className="pt-48 pb-32 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Impressum</h1>
        <div className="w-16 h-1 rounded-full mb-12" style={{ backgroundColor: '#4d7abd' }} />
        <div className="text-[#0F172A]/60 leading-relaxed space-y-10 text-base">

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Angaben gemäß § 5 DDG</h2>
            <p>Joel Dakaj<br />Eilendorfer Straße 215<br />52078 Aachen<br />Deutschland</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Kontakt</h2>
            <p>Telefon: +49 173 1038570<br />WhatsApp: +49 178 3261091<br />E-Mail: dakaj@dk-finanzkanzlei.de<br />Internet: www.dk-finanzkanzlei.de</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Unternehmensangaben</h2>
            <p>Geschäftsführer: Joel Dakaj<br />Steuernummer: 201/5075/7052</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Aufsichtsbehörde</h2>
            <p className="mb-2">Zuständige Aufsichtsbehörde nach § 34c GewO:</p>
            <p>IHK Aachen<br />Theaterstraße 6–10<br />52062 Aachen</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Berufsrechtliche Regelungen</h2>
            <p className="mb-3">Berufliche Bezeichnung: Finanzanlagenvermittler</p>
            <ul className="space-y-2 text-[#0F172A]/60">
              <li>Erlaubnis zur Versicherungsvermittlung gem. § 34d Abs. 1 S. 1 Nr. 1<br /><span className="text-[#0F172A]/45 text-sm">Registernummer: D-71EV-ED38Z-51</span></li>
              <li>Erlaubnis zur Finanzanlagenvermittlung gem. § 34f Abs. 1 S. 1 Nr. 1<br /><span className="text-[#0F172A]/45 text-sm">Registernummer: D-F-101-ARS7-55</span></li>
            </ul>
            <p className="mt-3 text-sm text-[#0F172A]/60">Die Eintragungen können im Vermittlerregister überprüft werden unter: <span className="text-[#0F172A]/60">www.vermittlerregister.info</span></p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Berufshaftpflichtversicherung</h2>
            <p>Nürnberger Versicherung<br />Ostendstraße 100, 90334 Nürnberg<br />Geltungsbereich: Deutschland</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Streitschlichtung</h2>
            <p className="mb-3">Die Europäische Plattform zur Online-Streitbeilegung (OS) ist erreichbar unter: <span className="text-[#0F172A]/70">https://ec.europa.eu/consumers/odr</span></p>
            <p className="mb-2">Zuständige Schlichtungsstellen:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin – www.versicherungsombudsmann.de</li>
              <li>Ombudsmann für die private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin – www.pkv-ombudsmann.de</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Haftungsausschluss</h2>
            <h3 className="text-lg font-semibold text-[#0F172A]/70 mb-2">1. Inhalt des Onlineangebotes</h3>
            <p className="mb-4">Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.</p>
            <h3 className="text-lg font-semibold text-[#0F172A]/70 mb-2">2. Verweise und Links</h3>
            <p>Bei direkten oder indirekten Verweisen auf fremde Internetseiten ("Links"), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </div>

        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Datenschutz Content ─────────────────────────────────────────────────────────
const DatenschutzContent = () => (
  <section className="pt-48 pb-32 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Datenschutzerklärung</h1>
        <div className="w-16 h-1 rounded-full mb-12" style={{ backgroundColor: '#4d7abd' }} />
        <div className="text-[#0F172A]/60 leading-relaxed space-y-10 text-base">

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Verantwortlicher</h2>
            <p>Joel Dakaj<br />Eilendorfer Straße 215<br />52078 Aachen<br />Tel.: 0173 1038570<br />E-Mail: dakaj@dk-finanzkanzlei.de</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Ansprechpartner für den Datenschutz</h2>
            <p>Für Fragen zum Datenschutz und zur Ausübung Ihrer Rechte erreichen Sie uns unter den oben genannten Kontaktdaten.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Welche personenbezogenen Daten wir verarbeiten</h2>
            <p className="mb-3">Im Rahmen unserer Tätigkeit als Finanz-, Vorsorge-, Immobilien- und Versicherungsberatung verarbeiten wir je nach Anliegen insbesondere:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Name, Anschrift und Kontaktdaten (Telefon, E-Mail, ggf. Messenger-Kennung)</li>
              <li>Geburtsdatum und -ort</li>
              <li>Familienstand</li>
              <li>Einkommens- und Vermögensverhältnisse</li>
              <li>Bankverbindungen</li>
              <li>Versicherungsdaten</li>
              <li>Anlagepräferenzen und Risikoneigung</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Zwecke und Rechtsgrundlagen der Verarbeitung</h2>
            <p className="mb-3">Wir verarbeiten Ihre Daten zu folgenden Zwecken:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60 mb-3">
              <li>Finanz-, Vorsorge-, Immobilien- und Versicherungsberatung sowie Vermittlung entsprechender Produkte</li>
              <li>Erfüllung vertraglicher Pflichten und vorvertraglicher Maßnahmen</li>
              <li>Erfüllung gesetzlicher Dokumentations- und Aufbewahrungspflichten</li>
              <li>Risikobewertung und Erstellung von Empfehlungen</li>
              <li>Beantwortung Ihrer Anfragen und Kontaktaufnahme mit Ihnen (siehe Ziffer 5)</li>
            </ul>
            <p className="mb-3">Die Verarbeitung erfolgt auf Grundlage von:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung und vorvertragliche Maßnahmen)</li>
              <li>Art. 6 Abs. 1 lit. c DSGVO (Erfüllung rechtlicher Verpflichtungen)</li>
              <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung, z. B. für die Kontaktaufnahme zu Werbezwecken)</li>
              <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, z. B. Sicherheit unserer Website)</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">4.1 Anlageberatung im Detail</h3>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Erstellung Ihres Anlegerprofils</li>
              <li>Durchführung der Geeignetheitsprüfung</li>
              <li>Dokumentation der Beratung gemäß WpHG</li>
              <li>Überwachung von Anlagestrategien</li>
              <li>Regelmäßige Portfolioüberprüfung</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">4.2 Versicherungsvermittlung im Detail</h3>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Risikoanalyse und Bedarfsermittlung</li>
              <li>Einholung von Vergleichsangeboten</li>
              <li>Antragstellung und Vertragsvermittlung</li>
              <li>Betreuung im Schadenfall</li>
              <li>Unterstützung bei der Vertragsanpassung</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Kontaktaufnahme per Telefon, WhatsApp, SMS und E-Mail</h2>
            <p className="mb-3">Sie können uns Ihre Kontaktdaten über verschiedene Wege übermitteln, insbesondere über:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60 mb-3">
              <li>unsere Website bzw. unser Kontakt- und Beratungsformular</li>
              <li>Meta/Facebook Lead Ads (Kontaktformulare in Werbeanzeigen auf Facebook)</li>
              <li>Instagram-Lead-Formulare</li>
              <li>Lead-Formulare bzw. Direktnachrichten auf TikTok</li>
              <li>Lead-Formulare bzw. Direktnachrichten auf LinkedIn</li>
              <li>eine von Ihnen begonnene Konversation per WhatsApp</li>
            </ul>
            <p className="mb-3">In diesen Fällen möchten wir Sie kontaktieren, um Ihre Anfrage zu bearbeiten und Ihnen ein unverbindliches Beratungsangebot zu unterbreiten.</p>
            <p className="mb-3"><b className="text-[#0F172A]">Maßgeblich ist Ihre Einwilligung, nicht diese Datenschutzerklärung:</b> Ein Recht, Sie zu Werbezwecken zu kontaktieren, ergibt sich nicht aus dieser Datenschutzerklärung, sondern ausschließlich aus der Einwilligung, die Sie uns im jeweiligen Formular bzw. auf dem jeweiligen Kanal erteilen. Diese Datenschutzerklärung informiert lediglich darüber, wie wir Ihre Daten in diesem Zusammenhang verarbeiten.</p>
            <p className="mb-3">Eine Kontaktaufnahme per <b className="text-[#0F172A]">Telefon, WhatsApp oder SMS</b> erfolgt nur, soweit Sie hierfür eine gesonderte Einwilligung erteilt haben – je nach Ihrer Auswahl für den jeweiligen Kanal. Gleiches gilt für werbliche E-Mails, soweit keine gesetzliche Ausnahme (§ 7 Abs. 3 UWG) greift.</p>
            <p className="mb-3"><b className="text-[#0F172A]">WhatsApp-Erstkontakt:</b> Eine von uns ausgehende werbliche Nachricht per WhatsApp versenden wir nur, wenn uns zuvor Ihre Einwilligung für den Kanal WhatsApp vorliegt.</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60 mb-3">
              <li><b className="text-[#0F172A]">Zweck:</b> Beantwortung Ihrer Anfrage, Terminvereinbarung sowie Information über unsere Finanz-, Vorsorge-, Immobilien- und Versicherungsdienstleistungen</li>
              <li><b className="text-[#0F172A]">Rechtsgrundlage:</b> Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) i. V. m. § 7 Abs. 2 UWG</li>
              <li><b className="text-[#0F172A]">Freiwilligkeit:</b> Die Einwilligung ist freiwillig und keine Voraussetzung dafür, dass wir eine von Ihnen selbst gestellte Anfrage beantworten</li>
              <li><b className="text-[#0F172A]">Dokumentation:</b> Wir protokollieren Ihre Einwilligung (Zeitpunkt und freigegebene Kanäle) und bewahren den Nachweis gemäß § 7a UWG auf</li>
              <li><b className="text-[#0F172A]">Widerruf:</b> Jederzeit mit Wirkung für die Zukunft möglich – z. B. per E-Mail an dakaj@dk-finanzkanzlei.de, telefonisch oder durch eine kurze Nachricht über den jeweiligen Kanal (z. B. „STOPP" per WhatsApp/SMS). Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt</li>
            </ul>
            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">Nutzung von WhatsApp</h3>
            <p>Wenn Sie der Kontaktaufnahme per WhatsApp zustimmen, verarbeiten wir Ihre Daten über den Dienst WhatsApp. Anbieter ist WhatsApp Ireland Limited; dabei kann es zu einer Übermittlung von Daten an Meta Platforms bzw. in Drittländer kommen. Bitte beachten Sie, dass wir auf die Datenverarbeitung durch WhatsApp selbst nur begrenzten Einfluss haben.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Datenerhebung auf unserer Website</h2>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">6.1 Cookies und Einwilligungsverwaltung</h3>
            <p>Unsere Website verwendet Cookies – kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Technisch notwendige Cookies setzen wir auf Grundlage von § 25 Abs. 2 TDDDG bzw. Art. 6 Abs. 1 lit. f DSGVO ein. Nicht notwendige Cookies (z. B. für Analyse) setzen wir nur, wenn Sie zuvor eingewilligt haben (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). Ihre Auswahl können Sie jederzeit über Ihre Cookie-Einstellungen ändern.</p>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">6.2 Server-Logfiles</h3>
            <p className="mb-3">Bei jedem Zugriff auf unsere Website werden automatisch Informationen in Server-Logfiles erfasst. Diese beinhalten:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60 mb-3">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>IP-Adresse des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>
            <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (sicherer und stabiler Betrieb der Website).</p>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">6.3 Kontakt- und Beratungsformular</h3>
            <p className="mb-3">Wenn Sie unser Formular nutzen, verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Zeitpunkt der Übermittlung sowie Inhalt Ihrer Anfrage). Diese Daten verwenden wir zur Bearbeitung Ihrer Anfrage und – soweit Sie eingewilligt haben – zur Kontaktaufnahme gemäß Ziffer 5. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bzw. Art. 6 Abs. 1 lit. a DSGVO.</p>
            <p>Die Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">6.4 Newsletter und Marketing</h3>
            <p className="mb-3">Für unseren Newsletter verwenden wir das Double-Opt-In-Verfahren: Nach Ihrer Anmeldung erhalten Sie eine E-Mail mit einem Bestätigungslink; Ihre Anmeldung wird erst mit dessen Bestätigung wirksam. Wir protokollieren Anmeldung, Bestätigung und IP-Adresse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.</p>
            <p className="mb-3">Sie können Ihre Einwilligung jederzeit widerrufen durch:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Klicken des Abmeldelinks im Newsletter</li>
              <li>E-Mail an unsere Kontaktadresse</li>
              <li>Nachricht über unser Kontaktformular</li>
            </ul>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">6.5 Webanalyse – Google Analytics</h3>
            <p>Soweit Sie eingewilligt haben, nutzen wir Google Analytics zur Analyse des Nutzungsverhaltens. Dabei werden Nutzungsdaten (z. B. anonymisierte IP-Adresse, aufgerufene Seiten, Verweildauer) verarbeitet; hierbei kann es zu einer Übermittlung an Google, auch in die USA, kommen. Cookies werden mit einer Laufzeit von maximal 14 Monaten gesetzt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.</p>

            <h3 className="text-lg font-semibold text-[#0F172A]/70 mt-5 mb-2">6.6 Social Media und Lead-Formulare</h3>
            <p className="mb-3">Wir sind in sozialen Netzwerken präsent (u. a. LinkedIn, XING, Facebook, Instagram, TikTok) und schalten dort teilweise Werbeanzeigen mit Kontaktformularen (Lead-Formulare). Tragen Sie sich über ein solches Formular ein, erhalten wir die von Ihnen dort angegebenen Daten und verarbeiten sie zur Kontaktaufnahme gemäß Ziffer 5.</p>
            <p className="mb-3">Bei Meta/Facebook Lead Ads holen wir die Einwilligung in die werbliche Kontaktaufnahme über ein eigenes, nicht vorausgewähltes Einwilligungsfeld innerhalb des Lead-Formulars der Plattform ein; die dort angegebenen Daten nutzen wir für die Kontaktaufnahme nur, wenn diese Einwilligung vorliegt.</p>
            <p>Für die Datenverarbeitung auf den Plattformen selbst sind die jeweiligen Anbieter (mit-)verantwortlich; es gelten zusätzlich deren Datenschutzhinweise.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Empfänger und Weitergabe von Daten</h2>
            <p className="mb-3">Eine Übermittlung Ihrer Daten an Dritte erfolgt nur, wenn Sie eingewilligt haben, dies zur Vertragsabwicklung erforderlich ist oder eine gesetzliche Verpflichtung besteht. Empfänger können sein:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Versicherungsgesellschaften</li>
              <li>Banken und Finanzinstitute</li>
              <li>IT-Dienstleister als Auftragsverarbeiter nach Art. 28 DSGVO, insbesondere unser Hosting-Anbieter (Vercel Inc.)</li>
              <li>Wirtschaftsprüfer und Steuerberater</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">8. Aufbewahrungsfristen</h2>
            <p className="mb-3">Wir speichern Ihre Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen es vorschreiben, insbesondere:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Beratungsprotokolle: 10 Jahre</li>
              <li>Vertragsdaten: 10 Jahre nach Vertragsende</li>
              <li>Steuerlich relevante Unterlagen: 10 Jahre</li>
              <li>Nachweise zu Werbe-Einwilligungen: gemäß § 7a UWG für die Dauer der Nachweispflicht</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">9. Internationale Datenübermittlung</h2>
            <p className="mb-3">Eine Datenübermittlung in Drittländer außerhalb des EWR findet nur statt, wenn:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Ein Angemessenheitsbeschluss der EU-Kommission vorliegt</li>
              <li>Geeignete Garantien bestehen (z. B. EU-Standardvertragsklauseln)</li>
              <li>Sie ausdrücklich eingewilligt haben</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">10. Besondere Kategorien personenbezogener Daten</h2>
            <p className="mb-3">Im Rahmen unserer Tätigkeit können wir besonders sensible Daten verarbeiten, wie beispielsweise:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Gesundheitsdaten (bei Abschluss bestimmter Versicherungen)</li>
              <li>Informationen über Ihre finanzielle Situation</li>
              <li>Daten über Ihre familiäre Situation</li>
            </ul>
            <p className="mt-3">Diese Daten behandeln wir mit besonderer Sorgfalt und verarbeiten sie nur, wenn Sie ausdrücklich eingewilligt haben (Art. 9 Abs. 2 lit. a DSGVO) oder eine andere gesetzliche Grundlage besteht.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">11. Datensicherheit</h2>
            <p>Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten gegen Manipulation, Verlust und unberechtigten Zugriff zu schützen, u. a. SSL-/TLS-Verschlüsselung der Website, gesicherte Systeme, regelmäßige Updates und Backups sowie Zugriffsbeschränkungen. Wir passen diese Maßnahmen fortlaufend an den Stand der Technik an.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">12. Ihre Rechte</h2>
            <p className="mb-3">Sie haben nach der DSGVO folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1 text-[#0F172A]/60">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-3">13. Beschwerderecht</h2>
            <p className="mb-3">Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten nicht rechtmäßig erfolgt. Zuständig für uns ist:</p>
            <p>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />Kavalleriestraße 2–4<br />40213 Düsseldorf<br /><br />Tel.: 0211 38424-0<br />Fax: 0211 38424-10<br />E-Mail: poststelle@ldi.nrw.de</p>
          </div>

          <p className="text-[#0F172A]/45 text-sm pt-4 border-t border-black/8">Diese Datenschutzerklärung wurde zuletzt am 29.01.2026 aktualisiert.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Über Uns Content ────────────────────────────────────────────────────────────
// ─── Team Flip Card ─────────────────────────────────────────────────────────
type TeamMember = {
  name: string;
  role: string;
  img: string;
  linkedin?: string;
  website?: string;
  desc: string;
  bullets: string[];
  funFact?: string;
};

function TeamFlipCard({ member, i, color }: { member: TeamMember; i: number; color: string }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped(f => !f);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.07, duration: 0.4 }}
      whileHover={{ scale: 1.025 }}
      style={{ perspective: '1200px' }}
      className="w-full h-[370px] md:h-[390px] relative"
    >
      <div
        className={`flip-card-inner${flipped ? ' is-flipped' : ''}`}
        onClick={toggle}
        onKeyDown={handleKey}
        tabIndex={0}
        role="button"
        aria-label={`Mehr über ${member.name} erfahren`}
        aria-pressed={flipped}
      >
        {/* ── Front ── */}
        <div className="flip-face border border-black/8">
          <img
            src={member.img}
            alt={`${member.name} – DK Finanzkanzlei`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0d1829]/80 via-[#0d1829]/25 to-transparent" />

          {/* name + role */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-base font-bold leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{member.name}</h3>
            <p className="text-xs text-white/75 mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{member.role}</p>
          </div>

          {/* CTA badge */}
          <div className="flip-cta-pulse absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 text-[10px] font-medium text-white/85 select-none pointer-events-none">
            <MousePointerClick className="w-3 h-3" />
            Mehr erfahren
          </div>
        </div>

        {/* ── Back ── */}
        <div className="flip-face flip-face-back">
          {/* avatar overflowing top */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden border-2 z-10 flex-shrink-0"
            style={{
              borderColor: color,
              boxShadow: `0 0 0 3px #0d1829, 0 0 18px ${color}55`,
            }}
          >
            <img src={member.img} alt={`${member.name} – DK Finanzkanzlei`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>

          {/* card body */}
          <div
            className="flip-back-body border border-black/8 flex flex-col items-center text-center"
            style={{ background: 'linear-gradient(160deg, #1a2740 0%, #0d1829 100%)' }}
          >
            <div className="pt-11 px-4 pb-4 flex flex-col items-center w-full h-full">
              {/* Name + Role */}
              <h3 className="text-[12px] font-bold leading-tight text-white">{member.name}</h3>
              <p className="text-[10px] mt-0.5 mb-2.5 font-semibold tracking-wide" style={{ color }}>{member.role}</p>

              {/* Intro sentence */}
              <p className="text-[11px] font-semibold text-white/80 leading-snug mb-3 text-center">{member.desc}</p>

              {/* Bullets */}
              <ul className="space-y-1 text-left w-full mb-3">
                {member.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-[11px] text-white/70">
                    <span className="w-1 h-1 rounded-full mt-[5px] flex-shrink-0" style={{ background: color }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Fun Fact */}
              {member.funFact && (
                <div className="w-full mt-auto pt-2 border-t border-white/[0.07]">
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-0.5">Fun Fact</span>
                  <p className="text-[10px] text-white/60 leading-snug">{member.funFact}</p>
                </div>
              )}

              {/* Links */}
              {(member.linkedin || member.website) && (
                <div className={`flex gap-2 ${member.funFact ? 'mt-2' : 'mt-auto'}`}>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1 rounded-full border transition-all hover:bg-white/10"
                      style={{ borderColor: `${color}55`, color }}
                    >
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1 rounded-full border transition-all hover:bg-white/10"
                      style={{ borderColor: `${color}55`, color }}
                    >
                      <Globe className="w-2.5 h-2.5" />
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Karriere Page ───────────────────────────────────────────────────────────────
const KarriereStatItem = ({ num, suffix, prefix = '', decimals = 0, label, color }: {
  num: number; suffix: string; prefix?: string; decimals?: number; label: string; color: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const factor = Math.pow(10, decimals);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * num * factor) / factor);
      if (progress < 1) requestAnimationFrame(tick);
      else setDone(true);
    };
    requestAnimationFrame(tick);
  }, [isInView, num, factor]);

  const display = decimals > 0
    ? count.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : count.toLocaleString('de-DE');

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <div
        className="text-3xl md:text-4xl font-bold mb-1 tabular-nums transition-[text-shadow] duration-700"
        style={{ color, textShadow: done ? `0 0 20px ${color}99, 0 0 42px ${color}55` : 'none' }}
      >
        {prefix}{display}{suffix}
      </div>
      <div className="text-sm text-[#0F172A]/45">{label}</div>
    </motion.div>
  );
};

const KarrierePage = ({ onPageChange }: { onPageChange: (p: Page) => void }) => {
  const color = BRANDS.dk.color;
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({ name: '', email: '', tel: '', nachricht: '', datenschutz: false });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };
  const removeFile = (i: number) => setFiles(prev => prev.filter((_, idx) => idx !== i));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  const resetForm = () => { setShowForm(false); setSent(false); setFiles([]); setForm({ name: '', email: '', tel: '', nachricht: '', datenschutz: false }); };

  const stories = [
    {
      name: 'Philipp Jagiella', role: 'Vertriebsleiter', img: '/Philipp 2.png', tag: 'Aufsteiger',
      quote: 'DK hat mir die Möglichkeit gegeben, mein volles Potenzial zu entfalten. Innerhalb eines Jahres bin ich vom Berater zum Vertriebsleiter aufgestiegen – das wäre in einer klassischen Firma nicht möglich gewesen.',
    },
    {
      name: 'Julius Ferreira Schmitz', role: 'Fachberater', img: '/Julius 3.png', tag: 'Quereinsteiger',
      quote: 'Als junger Quereinsteiger bin ich direkt bei DK eingestiegen – und durch Schulungen, Coaching und meinen eigenen Antrieb in 2 Jahren zu einem der besten Fachberater geworden. Hier zählt nicht wo du herkommst, sondern wohin du willst.',
    },
  ];

  const benefits = [
    { icon: <TrendingUp className="w-7 h-7" style={{ color }} />, title: 'Überdurchschnittliches Einkommen', desc: 'Keine Einkommensgrenzen. Dein Erfolg bestimmt, was du verdienst.' },
    { icon: <GraduationCap className="w-7 h-7" style={{ color }} />, title: 'Professionelles Training', desc: 'Strukturierte Einarbeitung, Webinare und persönliches Mentoring von Beginn an.' },
    { icon: <Users className="w-7 h-7" style={{ color }} />, title: 'Starke Community', desc: 'Ein junges, ambitioniertes Team, das zusammenhält und gemeinsam wächst.' },
    { icon: <Globe className="w-7 h-7" style={{ color }} />, title: 'Ortsunabhängig arbeiten', desc: 'Online-Beratung – du arbeitest von überall, wann immer du willst.' },
    { icon: <Zap className="w-7 h-7" style={{ color }} />, title: 'Moderne Tools & KI-Support', desc: 'State-of-the-art Tools und KI-Automatisierung für maximale Effizienz.' },
    { icon: <Star className="w-7 h-7" style={{ color }} />, title: 'Schnelle Karriere', desc: 'Keine veralteten Hierarchien. Leistung wird direkt honoriert und befördert.' },
  ];

  const steps = [
    { step: '01', title: 'Erstgespräch', desc: 'Wir lernen uns kennen – deine Ziele, deine Stärken, deine Vorstellungen. Offen und auf Augenhöhe.' },
    { step: '02', title: 'Onboarding & Training', desc: 'Du erhältst Zugang zu unseren Einsteiger-Webinaren und wirst von einem persönlichen Mentor begleitet.' },
    { step: '03', title: 'Erste Praxiserfahrung', desc: 'Du wächst in die Rolle hinein – mit echten Kunden, echtem Feedback und vollem Teamrückhalt.' },
    { step: '04', title: 'Deine Karriere', desc: 'Du entscheidest, wie weit du gehst. Ob Fachberater, Vertriebsleiter oder eigener Teamaufbau – der Weg ist deiner.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] blur-[120px] rounded-full opacity-40" style={{ backgroundColor: color + '33' }} />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/8 bg-[#0F172A]/[0.03] text-xs font-medium tracking-widest uppercase mb-8">
              <Briefcase className="w-3.5 h-3.5" style={{ color }} />
              Karriere bei DK
            </span>
            <h1 className="text-4xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
              Deine Karriere<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#0F172A] to-[#0F172A]/40">beginnt hier.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#0F172A]/60 max-w-2xl mx-auto leading-relaxed mb-12">
              Unabhängig. Ambitioniert. Zukunftsorientiert. Werde Teil eines der aufstrebendsten Finanzteams Deutschlands und gestalte deine Karriere selbst.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('kontakt')}
                className="group px-10 py-5 text-white rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: color }}
              >
                <span className="flex items-center gap-2 justify-center">
                  Jetzt bewerben <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => onPageChange('ueberuns')}
                className="px-10 py-5 rounded-full font-bold text-lg border border-black/8 hover:bg-[#0F172A]/[0.05] transition-colors"
              >
                Unser Team kennenlernen
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <DottedLine />

      {/* Stats */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <KarriereStatItem num={14}   suffix="+"  label="Teammitglieder"       color={color} />
          <KarriereStatItem num={3000} suffix="+"  label="Beratungen pro Jahr"  color={color} />
          <KarriereStatItem num={4.9}  suffix="★"  prefix="∅ " decimals={1}     label="Google-Bewertung"    color={color} />
          <KarriereStatItem num={100}  suffix="%"  label="Remote möglich"       color={color} />
        </div>
      </section>

      <DottedLine />

      {/* Stories */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Echte Geschichten. Echte Karrieren.</h2>
            <p className="text-[#0F172A]/45 max-w-xl mx-auto">Hör von Menschen, die den Schritt gewagt haben – und was daraus wurde.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {stories.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-black/8 bg-[#0F172A]/[0.03] overflow-hidden flex flex-col"
              >
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-6 self-start" style={{ color, borderColor: `${color}50`, background: `${color}15` }}>{s.tag}</span>
                  <div className="text-4xl font-serif leading-none mb-3 select-none" style={{ color: `${color}55` }}>"</div>
                  <p className="text-[#0F172A]/60 text-sm leading-relaxed italic flex-1 mb-6">„{s.quote}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-black/8">
                    <img src={s.img} alt={s.name} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover object-top border border-black/8" />
                    <div>
                      <p className="font-bold text-sm">{s.name}</p>
                      <p className="text-xs text-[#0F172A]/45">{s.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Benefits */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Deine Vorteile bei DK</h2>
            <p className="text-[#0F172A]/45 max-w-xl mx-auto">Das erwartet dich, wenn du Teil unseres Teams wirst.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="glow-card group p-7 rounded-3xl border border-black/8 bg-[#0F172A]/[0.03] flex gap-5"
              >
                <div className="flex-shrink-0 p-3 rounded-2xl bg-[#0F172A]/[0.03] border border-black/8 group-hover:border-black/15 transition-colors h-fit">{b.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-[#0F172A]/60 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Process */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">So startest du durch</h2>
            <p className="text-[#0F172A]/45 max-w-xl mx-auto">Von deinem ersten Gespräch bis zur eigenen Karriere – in vier Schritten.</p>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex gap-6 items-start p-7 rounded-3xl border border-black/8 bg-[#0F172A]/[0.03] hover:border-black/15 transition-colors"
              >
                <span className="text-4xl font-bold flex-shrink-0 tabular-nums leading-none mt-1" style={{ color: `${color}70` }}>{step.step}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-[#0F172A]/60 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* CTA / Bewerbungsformular */}
      <section className="py-8 md:py-16 px-6">
        <div
          className="max-w-5xl mx-auto rounded-[3rem] relative overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(to bottom, ${color}, #1E293B)`, boxShadow: `0 25px 50px ${color}33` }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>

          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="p-12 md:p-24 text-center">
                <h2 className="text-3xl md:text-6xl font-bold mb-6">Bereit für den<br />nächsten Schritt?</h2>
                <p className="text-[#0F172A]/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                  Bewirb dich jetzt und erfahre, ob DK zu dir passt – unverbindlich und auf Augenhöhe.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-10 py-5 bg-white rounded-full font-bold text-xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-95"
                  style={{ color: '#1E293B' }}
                >
                  Jetzt bewerben
                </button>
                <p className="mt-6 text-sm text-[#0F172A]/60">Unverbindlich • 100% kostenlos • In 2 Minuten erledigt</p>
              </motion.div>
            ) : sent ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 md:p-24 text-center">
                <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-[#0F172A]" />
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Bewerbung eingegangen!</h2>
                <p className="text-[#0F172A]/70 text-lg mb-10 max-w-xl mx-auto">Vielen Dank! Wir melden uns innerhalb von 3 Werktagen bei dir.</p>
                <button onClick={resetForm} className="px-8 py-3 bg-[#0F172A]/[0.03] border border-black/8 rounded-full text-sm hover:bg-[#0F172A]/[0.05] transition-colors">
                  ← Zurück
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="p-8 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setShowForm(false)} className="text-[#0F172A]/60 hover:text-[#0F172A] transition-colors text-sm flex items-center gap-1.5">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Zurück
                  </button>
                  <h2 className="text-2xl md:text-4xl font-bold">Deine Bewerbung</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Vorname & Nachname"
                      className="bg-[#0F172A]/[0.03] border border-black/8 rounded-xl px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/45 focus:outline-none focus:border-black/8 text-sm w-full"
                    />
                    <input
                      required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="E-Mail-Adresse"
                      className="bg-[#0F172A]/[0.03] border border-black/8 rounded-xl px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/45 focus:outline-none focus:border-black/8 text-sm w-full"
                    />
                  </div>
                  <input
                    value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })}
                    placeholder="Telefonnummer (optional)"
                    className="bg-[#0F172A]/[0.03] border border-black/8 rounded-xl px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/45 focus:outline-none focus:border-black/8 text-sm w-full"
                  />
                  <textarea
                    required value={form.nachricht} onChange={e => setForm({ ...form, nachricht: e.target.value })}
                    placeholder="Warum möchtest du bei DK durchstarten? Erzähl uns kurz von dir und deiner Motivation..."
                    rows={4}
                    className="bg-[#0F172A]/[0.03] border border-black/8 rounded-xl px-4 py-3 text-[#0F172A] placeholder:text-[#0F172A]/45 focus:outline-none focus:border-black/8 text-sm w-full resize-none"
                  />

                  {/* File upload */}
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]/60 mb-2">Unterlagen hochladen</p>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-black/8 rounded-xl cursor-pointer hover:border-black/15 bg-[#0F172A]/[0.03] hover:bg-[#0F172A]/[0.05] transition-all">
                      <Eye className="w-6 h-6 text-[#0F172A]/45 mb-1" />
                      <span className="text-sm text-[#0F172A]/60">Dateien auswählen oder hierher ziehen</span>
                      <span className="text-xs text-[#0F172A]/45 mt-1">Lebenslauf, Anschreiben, Zeugnisse · PDF, DOC, JPG bis 10 MB</span>
                      <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                    </label>
                    {files.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {files.map((f, i) => (
                          <span key={i} className="flex items-center gap-1.5 text-xs bg-[#0F172A]/[0.03] border border-black/8 rounded-full px-3 py-1.5 text-[#0F172A]/70">
                            {f.name}
                            <button type="button" onClick={() => removeFile(i)} className="text-[#0F172A]/45 hover:text-[#0F172A] transition-colors leading-none">×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      required type="checkbox" checked={form.datenschutz}
                      onChange={e => setForm({ ...form, datenschutz: e.target.checked })}
                      className="mt-0.5 w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-xs text-[#0F172A]/60 leading-relaxed">
                      Ich bin einverstanden, dass meine Daten zur Bearbeitung meiner Bewerbung verwendet werden. Weitere Informationen in der{' '}
                      <button type="button" onClick={() => onPageChange('datenschutz')} className="underline text-[#0F172A]/70">Datenschutzerklärung</button>.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 bg-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm tracking-wide"
                    style={{ color: '#1E293B' }}
                  >
                    Bewerbung absenden
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

const UeberUnsContent = () => {
  const color = '#4d7abd';
  const [bewerbungOpen, setBewerbungOpen] = useState(false);
  const [bewForm, setBewForm] = useState({ name: '', email: '', telefon: '', nachricht: '' });
  const [bewFile, setBewFile] = useState<File | null>(null);
  const [bewSubmitted, setBewSubmitted] = useState(false);

  const handleBewerbungSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Bewerbung von ${bewForm.name}`);
    const fileInfo = bewFile ? `\nAnhang: ${bewFile.name} (bitte manuell anhängen)` : '';
    const body = encodeURIComponent(
      `Name: ${bewForm.name}\nE-Mail: ${bewForm.email}\nTelefon: ${bewForm.telefon}${fileInfo}\n\nNachricht / Motivation:\n${bewForm.nachricht}`
    );
    window.open(`mailto:info@dk-finanzkanzlei.de?subject=${subject}&body=${body}`);
    setBewSubmitted(true);
  };
  const resetBew = () => { setBewerbungOpen(false); setBewSubmitted(false); setBewForm({ name: '', email: '', telefon: '', nachricht: '' }); setBewFile(null); };

  const values = [
    {
      title: 'Expertise',
      desc: 'Unsere Berater verfügen über jahrelange Erfahrung und kontinuierliche Weiterbildung im Finanzsektor.',
      icon: <Star className="w-7 h-7" style={{ color }} />,
    },
    {
      title: 'Verantwortung',
      desc: 'Wir handeln stets im besten Interesse unserer Kunden und übernehmen Verantwortung für unsere Empfehlungen.',
      icon: <ShieldCheck className="w-7 h-7" style={{ color }} />,
    },
    {
      title: 'Transparenz',
      desc: 'Klare und verständliche Kommunikation sowie vollständige Offenlegung aller Kosten und Chancen.',
      icon: <Eye className="w-7 h-7" style={{ color }} />,
    },
    {
      title: 'Innovation',
      desc: 'Wir verbinden traditionelle Finanzberatung mit modernsten digitalen Lösungen für optimale Ergebnisse.',
      icon: <Zap className="w-7 h-7" style={{ color }} />,
    },
    {
      title: 'Nachhaltigkeit',
      desc: 'Nachhaltige Anlagestrategien und verantwortungsvolles Investieren stehen im Fokus unserer Beratung.',
      icon: <Leaf className="w-7 h-7 text-[#22C55E]" />,
    },
    {
      title: 'Individualität',
      desc: 'Jeder Kunde erhält eine maßgeschneiderte Strategie, die perfekt auf seine Bedürfnisse abgestimmt ist.',
      icon: <UserCircle className="w-7 h-7" style={{ color }} />,
    },
  ];

  const team: TeamMember[] = [
    {
      name: 'Joel Dakaj', role: 'Geschäftsführer', img: '/Joel Logo.png',
      linkedin: 'https://www.linkedin.com/in/joel-dakaj-11766239b/',
      desc: 'Hey, ich bin Joel, Geschäftsführer der DK Finanzkanzlei – und das sind meine Schwerpunkte:',
      bullets: ['Strategie & Vermögensaufbau', 'Lebensversicherung & Investment', 'Immobilienlösungen'],
      funFact: 'Chat-GPT als Mensch',
    },
    {
      name: 'Flamur Kastrati', role: 'Geschäftsführer', img: '/Flamur 4.png',
      linkedin: 'https://www.linkedin.com/in/flamur-kastrati-75864839b/',
      desc: 'Hi, ich bin Flamur, Geschäftsführer – ich sorge dafür, dass deine Werte optimal abgesichert sind:',
      bullets: ['Sachversicherungen optimieren', 'Risikoanalyse für Vermögenswerte', 'Individuelle Absicherungskonzepte'],
      funFact: 'BMW-Fan',
    },
    {
      name: 'Aydan Ekinci', role: 'Assistenz der Geschäftsführung', img: '/Aydan.png',
      desc: 'Hi, ich bin Aydan – ich halte im Hintergrund alles am Laufen, damit du dich auf das Wesentliche konzentrieren kannst:',
      bullets: ['Office & Organisation', 'Prozesse & Koordination', 'Ansprechpartnerin im Hintergrund'],
      funFact: 'Büromama',
    },
    {
      name: 'Muayyad Anis', role: 'Recruiting & Controlling', img: '/Muyooo.png',
      linkedin: 'https://www.linkedin.com/in/muayyad-anis-b159211b9/',
      desc: 'Hi, ich bin Muayyad – ich sorge dafür, dass die richtigen Menschen im Team sind und alles reibungslos läuft:',
      bullets: ['Recruiting & Teamaufbau', 'Vertriebssteuerung', 'Prozessoptimierung'],
      funFact: 'Vater einer kleinen Prinzessin',
    },
    {
      name: 'Philipp Jagiella', role: 'Vertriebsleiter', img: '/Philipp 2.png',
      linkedin: 'https://www.linkedin.com/in/philipp-scott-jagiella-07ba7233b/',
      website: 'https://philippjagiella.de/',
      desc: 'Hi, ich bin Philipp – ich unterstütze das Team im Vertrieb und sorge für starke Beratung:',
      bullets: ['Vertriebsstrategie', 'Individuelle Beratungskonzepte', 'Teamentwicklung'],
      funFact: 'Liebt Wein',
    },
    {
      name: 'Jannik Förster', role: 'Vertriebsleiter', img: '/Jannik.png',
      desc: 'Hi, ich bin Jannik – ich sorge dafür, dass unser Team stets sorgfältig und auf höchstem Niveau berät:',
      bullets: ['Qualitätssicherung in der Beratung', 'Weiterbildung & Entwicklung des Teams', 'Verlässliche Beratungsstandards'],
    },
    {
      name: 'Norik Dakaj', role: 'Vertriebsleiter', img: '/Norik.png',
      desc: 'Hi, ich bin Norik – ich begleite dich zuverlässig auf dem Weg zu deinen finanziellen Zielen:',
      bullets: ['Persönliche Finanzberatung', 'Individuelle Absicherungskonzepte', 'Langfristige Kundenbetreuung'],
    },
    {
      name: 'Julius Ferreira Schmitz', role: 'Fachberater', img: '/Julius 3.png',
      linkedin: 'https://www.linkedin.com/in/julius-ferreira-schmitz-26a2903b6/',
      desc: 'Hi, ich bin Julius – ich höre genau zu, um die beste Lösung für dich zu finden:',
      bullets: ['Kundenanalyse durch Zuhören', 'Individuelle Lösungsfindung', 'Vertrauensvolle Beratung'],
      funFact: 'RS3-Fan',
    },
    {
      name: 'Jamila Frydrych', role: 'Fachberaterin', img: '/Jamila.png',
      desc: 'Hi, ich bin Jamila – ich helfe dir, deine Zukunft finanziell sauber aufzustellen:',
      bullets: ['Altersvorsorge-Strategien', 'Ganzheitliche Finanzanalyse', 'Langfristige Planung'],
      funFact: 'Beste Kundenbindung',
    },
    {
      name: 'Denis Martynewski', role: 'Fachberater', img: '/Denis 2.png',
      desc: 'Hi, ich bin Denis – ich sorge dafür, dass deine Werte optimal abgesichert sind:',
      bullets: ['Sachversicherungen', 'Risikoabsicherung', 'Strukturierung von Vermögenswerten'],
      funFact: 'BMW-Fan durch Flamur',
    },
    {
      name: 'Cesur Ogul', role: 'Fachberater', img: '/Cesur 2.png',
      desc: 'Hi, ich bin Cesur – ich entwickle mich täglich weiter, um dich bestmöglich zu beraten:',
      bullets: ['Kundenbetreuung', 'Entwicklung im Vertrieb', 'Lernbereitschaft'],
      funFact: 'Der netteste Kollege',
    },
    {
      name: 'Sara Abdul Hak', role: 'Fachberaterin', img: '/Sara.png',
      desc: 'Hi, ich bin Sara – ich mache komplexe Themen für dich einfach verständlich:',
      bullets: ['Komplexe Themen erklären', 'Kundenorientierte Beratung', 'Individuelle Lösungen'],
      funFact: 'Chillige Kollegin',
    },
    {
      // ponytail: Platzhalter-Foto – durch /Arda.png ersetzen, sobald das Foto da ist
      name: 'Arda Askin', role: 'Fachberater', img: '/dk-logo-small.png',
      desc: 'Hi, ich bin Arda – ich finde die Absicherung, die wirklich zu dir passt:',
      bullets: ['Persönliche Bedarfsanalyse', 'Passgenaue Absicherung', 'Verlässliche Betreuung'],
    },
    {
      name: 'Ceylin Demir', role: 'Assistentin', img: '/Ceylin.png',
      desc: 'Hi, ich bin Ceylin – ich sorge im Hintergrund für Struktur und Ordnung:',
      bullets: ['Organisation & Dokumente', 'Backoffice-Struktur', 'Sichere Abläufe'],
      funFact: 'Galatasaray-Fan',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#4d7abd]/15 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/8 bg-[#0F172A]/[0.03] text-xs font-medium tracking-widest uppercase mb-8">
              <Users className="w-3.5 h-3.5" style={{ color }} />
              Wer wir sind
            </span>
            <h1 className="text-3xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
              Unser Team macht<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#0F172A] to-[#0F172A]/40">den Unterschied.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#0F172A]/60 max-w-2xl mx-auto leading-relaxed">
              Hinter DK Finanzkanzlei stehen Menschen, die selbst wissen, was es bedeutet, finanzielle Klarheit zu gewinnen – und die genau das für ihre Kunden möglich machen.
            </p>
          </motion.div>
        </div>
      </section>

      <DottedLine />

      {/* Werte */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Unsere Werte</h2>
            <p className="text-[#0F172A]/60 max-w-xl mx-auto">
              Diese Grundsätze leiten uns in unserer täglichen Arbeit und prägen unsere Beziehung zu unseren Kunden.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="glow-card group p-8 rounded-3xl border border-black/8 bg-[#0F172A]/[0.03] backdrop-blur-sm"
              >
                <div className="mb-5 p-3 w-fit rounded-2xl bg-[#0F172A]/[0.03] border border-black/8 group-hover:border-black/15 transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-[#0F172A]/60 leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Team */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Unser Team</h2>
            <p className="text-[#0F172A]/60 max-w-xl mx-auto">
              Erfahrene Berater, die mit Leidenschaft und Expertise für deine finanzielle Zukunft arbeiten.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <TeamFlipCard key={i} member={member} i={i} color={color} />
            ))}

            {/* CTA – Freie Stelle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (team.length % 4) * 0.07, duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <button
                className="group flex flex-col items-center w-full"
                onClick={() => {
                  const el = document.getElementById('bewerbung');
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  window.scrollTo({ top, behavior: 'smooth' });
                }}
              >
                {/* Placeholder-Karte */}
                <div className="relative mb-5 w-full aspect-square rounded-3xl border-2 border-dashed border-black/8 bg-[#0F172A]/[0.025] flex flex-col items-center justify-center gap-2 group-hover:border-black/15 group-hover:bg-[#0F172A]/[0.05] transition-all duration-300">
                  {/* Person-Icon mit ? im Kopf */}
                  <svg viewBox="0 0 80 80" className="w-20 h-20 text-[#0F172A]/25 group-hover:text-[#0F172A]/40 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="40" cy="26" r="15" />
                    <text x="40" y="33" textAnchor="middle" fontSize="17" fontWeight="700" fill="currentColor" stroke="none">?</text>
                    <path d="M10 72 Q10 54 40 54 Q70 54 70 72" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold mb-1 text-[#0F172A]/60 group-hover:text-[#0F172A] transition-colors">Du?</h3>
                <p className="text-sm text-[#0F172A]/45 mb-4">Fachberater/in</p>

                {/* Pfeil + CTA */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-0.5 mb-1"
                >
                  <ChevronRight className="w-5 h-5 text-[#4d7abd] rotate-90" />
                  <ChevronRight className="w-5 h-5 text-[#4d7abd]/50 rotate-90 -mt-3" />
                </motion.div>
                <span className="text-sm font-bold text-[#4d7abd] group-hover:text-[#0F172A] transition-colors">
                  Bewirb dich jetzt!
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Bewerbungsbereich */}
      <section id="bewerbung" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #4d7abd 0%, #3a5f9a 60%, #2a4a7f 100%)' }}
          >
            <AnimatePresence mode="wait">
              {!bewerbungOpen ? (
                <motion.div
                  key="default"
                  className="grid md:grid-cols-2 gap-0"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  {/* Bild links – fährt nach oben raus */}
                  <motion.div
                    className="relative min-h-[340px] md:min-h-[420px] overflow-hidden"
                    exit={{ y: '-100%', opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }}
                  >
                    <img src="/Team.jpg" alt="Team der DK Finanzkanzlei Aachen" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#3a5f9a]/60 md:block hidden" />
                  </motion.div>

                  {/* Text rechts – fährt nach unten raus */}
                  <motion.div
                    className="p-10 md:p-14 flex flex-col justify-center"
                    exit={{ y: '100%', opacity: 0, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }}
                  >
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 leading-tight">
                      Werde Teil<br />unseres Teams
                    </h2>
                    <p className="text-[#0F172A]/70 text-lg mb-8 leading-relaxed">
                      Wir sind immer auf der Suche nach talentierten Menschen, die unsere Werte teilen und mit uns gemeinsam wachsen möchten.
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
                      {['Flexible Arbeitszeiten','Homeoffice-Möglichkeit','Mitarbeiter-Rabatt','Flache Hierarchien','Spannende Aufgaben','Kaffee ohne Ende'].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[#0F172A]/70 text-sm">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-[#0F172A]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setBewerbungOpen(true)}
                      className="inline-flex items-center gap-2 text-[#0F172A] font-bold text-base hover:gap-3 transition-all w-fit"
                    >
                      Jetzt bewerben <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Formular – kommt aus der Mitte */}
                  <motion.div
                    className="p-6 md:p-10 min-h-[340px] md:min-h-[420px] flex flex-col justify-center"
                    initial={{ y: '40px', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0, 0, 0.2, 1], delay: 0.1 }}
                  >
                    {!bewSubmitted ? (
                      <>
                        <h2 className="text-lg md:text-2xl font-bold text-[#0F172A] mb-1 leading-tight">Deine Bewerbung</h2>
                        <p className="text-[#0F172A]/60 text-sm mb-5">Füll das Formular aus – wir melden uns so schnell wie möglich.</p>
                        <form onSubmit={handleBewerbungSubmit} className="grid md:grid-cols-3 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[#0F172A]/60 text-[10px] font-semibold tracking-wider uppercase">Name *</label>
                            <input required type="text" value={bewForm.name} onChange={e => setBewForm(f => ({ ...f, name: e.target.value }))} placeholder="Max Mustermann"
                              className="bg-[#0F172A]/[0.03] border border-black/8 rounded-lg px-3 py-2 text-sm text-[#0F172A] placeholder-white/30 focus:outline-none focus:border-black/8 transition-colors" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[#0F172A]/60 text-[10px] font-semibold tracking-wider uppercase">E-Mail *</label>
                            <input required type="email" value={bewForm.email} onChange={e => setBewForm(f => ({ ...f, email: e.target.value }))} placeholder="max@beispiel.de"
                              className="bg-[#0F172A]/[0.03] border border-black/8 rounded-lg px-3 py-2 text-sm text-[#0F172A] placeholder-white/30 focus:outline-none focus:border-black/8 transition-colors" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[#0F172A]/60 text-[10px] font-semibold tracking-wider uppercase">Telefon</label>
                            <input type="tel" value={bewForm.telefon} onChange={e => setBewForm(f => ({ ...f, telefon: e.target.value }))} placeholder="+49 123 456789"
                              className="bg-[#0F172A]/[0.03] border border-black/8 rounded-lg px-3 py-2 text-sm text-[#0F172A] placeholder-white/30 focus:outline-none focus:border-black/8 transition-colors" />
                          </div>
                          <div className="md:col-span-3 flex flex-col gap-1">
                            <label className="text-[#0F172A]/60 text-[10px] font-semibold tracking-wider uppercase">Warum DK Finanzkanzlei? *</label>
                            <textarea required rows={2} value={bewForm.nachricht} onChange={e => setBewForm(f => ({ ...f, nachricht: e.target.value }))}
                              placeholder="Erzähl uns von dir, deiner Motivation und was dich auszeichnet …"
                              className="bg-[#0F172A]/[0.03] border border-black/8 rounded-lg px-3 py-2 text-sm text-[#0F172A] placeholder-white/30 focus:outline-none focus:border-black/8 transition-colors resize-none" />
                          </div>
                          <div className="md:col-span-3 flex flex-col gap-1">
                            <label className="text-[#0F172A]/60 text-[10px] font-semibold tracking-wider uppercase">Bewerbung & Lebenslauf (PDF)</label>
                            <label className="flex items-center gap-3 bg-[#0F172A]/[0.03] border border-black/8 border-dashed rounded-lg px-3 py-2.5 cursor-pointer hover:border-black/15 transition-colors">
                              <ArrowRight className="w-4 h-4 text-[#0F172A]/60 rotate-90 flex-shrink-0" />
                              <span className="text-sm text-[#0F172A]/60">{bewFile ? bewFile.name : 'Datei auswählen …'}</span>
                              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => setBewFile(e.target.files?.[0] ?? null)} />
                            </label>
                          </div>
                          <div className="md:col-span-3 flex items-center gap-4 pt-1">
                            <button type="submit" className="px-6 py-2.5 bg-white text-[#3a5f9a] rounded-full font-bold text-sm hover:shadow-lg hover:shadow-white/20 transition-all active:scale-95">
                              Bewerbung absenden
                            </button>
                            <button type="button" onClick={resetBew} className="text-[#0F172A]/45 text-sm hover:text-[#0F172A]/70 transition-colors">Abbrechen</button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
                        <CheckCircle2 className="w-12 h-12 text-[#0F172A] mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-[#0F172A] mb-2">Bewerbung gesendet!</h3>
                        <p className="text-[#0F172A]/60 text-sm mb-6">Vielen Dank, {bewForm.name}. Wir melden uns in Kürze.</p>
                        <button onClick={resetBew} className="text-[#0F172A]/60 text-sm hover:text-[#0F172A]/80 transition-colors">Zurück</button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <DottedLine />
      <TestimonialColumns />
    </>
  );
};

// ─── Service Detail Pages ─────────────────────────────────────────────────────────

// ─── Lead-Erfassung ──────────────────────────────────────────────────────────────
/** Sendet einen Lead an die Vercel-Function /api/lead. Fehler blockieren die UI nie. */
async function postLead(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Wiederverwendbares CTA-Band fuer die Leistungsseiten. */
const CtaBand = ({ color, headline, sub, label, onPageChange }: { color: string; headline: string; sub: string; label: string; onPageChange: (p: Page) => void }) => (
  <div className="mb-16 rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between" style={{ backgroundColor: color + '0D', borderColor: color + '30' }}>
    <div className="max-w-xl">
      <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-2">{headline}</h3>
      <p className="text-sm text-[#1E293B]/55 leading-relaxed">{sub}</p>
    </div>
    <button onClick={() => onPageChange('kontakt')} className="shine flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: color }}>
      {label} <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

/** Leadgen-Formular fuer die PDF-Uebersicht einer Leistungsseite. */
const LeadMagnetForm = ({ magnet, color, onPageChange }: { magnet: NonNullable<ServicePageData['leadMagnet']>; color: string; onPageChange: (p: Page) => void }) => {
  const [form, setForm] = useState({ name: '', email: '', consent: false });
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    await postLead({ type: 'leadmagnet', guide: magnet.fileLabel, href: magnet.href, name: form.name, email: form.email, consent: form.consent });
    setState('done');
  };

  return (
    <div className="mb-16 rounded-3xl overflow-hidden border border-black/5 shadow-lg bg-[#1E293B]">
      <div className="grid md:grid-cols-2">
        {/* Links: Nutzenargumentation */}
        <div className="p-8 md:p-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-5" style={{ backgroundColor: color + '25', color: '#fff' }}>
            <FileText className="w-3 h-3" /> Kostenloser Download
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{magnet.title}</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-6">{magnet.subtitle}</p>
          <ul className="flex flex-col gap-3">
            {magnet.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color }} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Rechts: Formular */}
        <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
          {state === 'done' ? (
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color }} />
              <h4 className="text-xl font-bold text-[#1E293B] mb-2">Fertig – hier ist deine Übersicht</h4>
              <p className="text-sm text-[#1E293B]/55 mb-6">Wir haben dir den Link zusätzlich per E-Mail geschickt.</p>
              <a href={magnet.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: color }}>
                <Download className="w-4 h-4" /> {magnet.fileLabel} öffnen
              </a>
              <p className="text-xs text-[#1E293B]/40 mt-4">Tipp: Im Browser über „Drucken → Als PDF sichern" speicherst du dir die Übersicht ab.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <h4 className="text-lg font-bold text-[#1E293B] mb-1">Jetzt kostenlos anfordern</h4>
                <p className="text-xs text-[#1E293B]/50">Name und E-Mail genügen – du bekommst den Link sofort.</p>
              </div>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Vorname und Nachname"
                className="border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white text-[#1E293B] placeholder:text-[#1E293B]/40" />
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="E-Mail-Adresse"
                className="border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white text-[#1E293B] placeholder:text-[#1E293B]/40" />
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#1E293B]" />
                <span className="text-xs text-[#1E293B]/55 leading-relaxed">
                  Ja, schickt mir die Übersicht per E-Mail. Die DK Finanzkanzlei darf mich dazu einmalig kontaktieren. Es gilt die{' '}
                  <button type="button" onClick={() => onPageChange('datenschutz')} className="underline" style={{ color }}>Datenschutzerklärung</button>.
                </span>
              </label>
              <button type="submit" disabled={state === 'sending'} className="shine w-full py-4 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60" style={{ backgroundColor: color }}>
                {state === 'sending' ? 'Wird gesendet …' : `${magnet.fileLabel} kostenlos erhalten`}
              </button>
              <p className="text-[11px] text-[#1E293B]/40 leading-relaxed">Kein Newsletter-Abo, keine Weitergabe an Dritte. Du kannst jederzeit widersprechen.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceDetailPage = ({ serviceKey, color, onPageChange }: { serviceKey: ServiceKey; color: string; onPageChange: (p: Page) => void }) => {
  const data = SERVICE_DATA[serviceKey];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [serviceKey]);

  const Check = () => (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const Cross = () => (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 12 12" fill="none">
      <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* ── Dark Hero ── */}
      <div className="relative overflow-hidden bg-white pt-32 md:pt-40 pb-16 px-6">
        <div className="absolute inset-0 -z-10 dot-grid" />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#0F172A]/35 mb-8">
            <button onClick={() => onPageChange('leistungen')} className="hover:text-[#0F172A]/70 transition-colors">Leistungen</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0F172A]/45">{data.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0F172A]/70">{data.title}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border" style={{ color, borderColor: color + '40', backgroundColor: color + '15' }}>
              {data.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] text-[#0F172A] mb-6 leading-[1.05]">{data.title}</h1>
            <p className="text-[#0F172A]/55 text-lg md:text-xl max-w-2xl leading-relaxed">{data.hook}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button onClick={() => onPageChange('kontakt')} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: color }}>
                {data.cta} <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:+491731038570" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-[#0F172A] border border-black/10 hover:bg-[#0F172A]/[0.03] transition-colors">
                Direkt anrufen
              </a>
            </div>
            <p className="text-[#0F172A]/40 text-xs mt-4">Kostenlos & unverbindlich · Antwort innerhalb von 48 Stunden</p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="max-w-5xl mx-auto px-6 mt-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-black/5 shadow-sm px-6 py-5 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color }}>{s.value}</div>
              <div className="text-xs text-[#1E293B]/45 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* ── Intro ── */}
        <p className="text-[#1E293B]/65 text-lg leading-relaxed mb-16 max-w-3xl border-l-4 pl-6" style={{ borderColor: color }}>{data.intro}</p>

        {/* ── Comparison ── */}
        {data.comparison && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-8">{data.comparison.heading}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-8">
                <h3 className="text-sm font-bold text-[#1E293B]/50 uppercase tracking-widest mb-6">{data.comparison.left.label}</h3>
                <div className="flex flex-col gap-3">
                  {data.comparison.left.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pt.pos ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}`}>
                        {pt.pos ? <Check /> : <Cross />}
                      </div>
                      <span className="text-sm text-[#1E293B]/65 leading-relaxed">{pt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border p-8" style={{ backgroundColor: color + '08', borderColor: color + '25' }}>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color }}>{data.comparison.right.label}</h3>
                <div className="flex flex-col gap-3">
                  {data.comparison.right.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pt.pos ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}`}>
                        {pt.pos ? <Check /> : <Cross />}
                      </div>
                      <span className="text-sm text-[#1E293B]/70 leading-relaxed font-medium">{pt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Inline-CTA 1 ── */}
        <CtaBand color={color} onPageChange={onPageChange}
          headline="Unsicher, welche Variante zu dir passt?"
          sub="In einem kostenlosen Erstgespräch rechnen wir dir beide Wege mit deinen Zahlen durch – ohne Verkaufsdruck, ohne Verpflichtung."
          label={data.cta} />

        {/* ── Product Types ── */}
        {data.types && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-8">Deine Optionen im Überblick</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.types.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-black/5 shadow-sm p-7">
                  {t.tag && (
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: color + '15', color }}>
                      {t.tag}
                    </span>
                  )}
                  <h3 className="text-base font-bold text-[#1E293B] mb-2">{t.title}</h3>
                  <p className="text-sm text-[#1E293B]/55 leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Problems ── */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-8">Warum die meisten Menschen falsch abgesichert sind</h2>
          <div className="flex flex-col gap-4">
            {data.problems.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-black/5 shadow-sm">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: color }}>
                  {i + 1}
                </div>
                <p className="text-[#1E293B]/70 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Solution ── */}
        <div className="mb-16 p-10 rounded-3xl text-white relative overflow-hidden" style={{ backgroundColor: color }}>
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 -translate-y-12 translate-x-12" style={{ backgroundColor: 'white' }} />
          <p className="text-sm font-bold tracking-widest uppercase text-white/60 mb-4">Unsere Lösung</p>
          <p className="text-xl md:text-2xl leading-relaxed font-medium relative">{data.solution}</p>
        </div>

        {/* ── Lead-Magnet ── */}
        {data.leadMagnet && <LeadMagnetForm magnet={data.leadMagnet} color={color} onPageChange={onPageChange} />}

        {/* ── Deep Dive ── */}
        {data.deepDive && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-8">{data.deepDive.heading}</h2>
            <div className="flex flex-col gap-4">
              {data.deepDive.sections.map((sec, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.04 }}
                  className="bg-white rounded-2xl border border-black/5 shadow-sm p-7 md:p-9">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-xs font-bold tabular-nums" style={{ color }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg md:text-xl font-bold text-[#1E293B]">{sec.title}</h3>
                  </div>
                  <p className="text-[#1E293B]/65 leading-relaxed md:pl-9">{sec.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Inline-CTA 2 ── */}
        {data.deepDive && (
          <CtaBand color={color} onPageChange={onPageChange}
            headline="Klingt nach viel? Ist es auch – deshalb machen wir das für dich."
            sub="Wir prüfen Bedingungen, Kosten und Anbieter und legen dir am Ende zwei bis drei konkrete Empfehlungen auf den Tisch. Verständlich erklärt."
            label="Kostenloses Erstgespräch" />
        )}

        {/* ── Checkliste ── */}
        {data.checklist && (
          <div className="mb-16 rounded-3xl border border-black/5 shadow-sm bg-white p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-3">{data.checklist.heading}</h2>
            {data.checklist.intro && <p className="text-[#1E293B]/55 mb-8 max-w-2xl leading-relaxed">{data.checklist.intro}</p>}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {data.checklist.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: color }}>
                    <Check />
                  </div>
                  <span className="text-sm text-[#1E293B]/70 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onPageChange('kontakt')} className="mt-8 inline-flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity" style={{ color }}>
              Checkliste gemeinsam durchgehen <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── FAQ ── */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-8">Häufige Fragen</h2>
          <div className="flex flex-col gap-3">
            {data.faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                <button className="w-full flex items-center justify-between px-7 py-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-[#1E293B] pr-4">{item.q}</span>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 text-[#1E293B]/30 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="px-7 pb-5 text-sm text-[#1E293B]/60 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-12 px-8 rounded-3xl bg-white border border-black/5 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-3">{data.cta}</h2>
          <p className="text-[#1E293B]/50 mb-8">Kostenlos • Unverbindlich • In wenigen Minuten</p>
          <button onClick={() => onPageChange('kontakt')} className="px-12 py-4 text-white font-bold rounded-full text-base hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: color }}>
            {data.cta}
          </button>
        </div>

      </div>

      {/* ── Sticky CTA (mobil) ── */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden flex gap-3 px-4 py-3 bg-white/95 backdrop-blur border-t border-black/10">
        <a href="tel:+491731038570" className="flex-shrink-0 px-5 py-3 rounded-xl text-sm font-bold border border-black/10 text-[#1E293B]">
          Anrufen
        </a>
        <button onClick={() => onPageChange('kontakt')} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ backgroundColor: color }}>
          {data.cta}
        </button>
      </div>
    </div>
  );
};

// ─── Leistungen Page ─────────────────────────────────────────────────────────────
const VERSICHERUNGEN: { title: string; desc: string; key: ServiceKey }[] = [
  { key: 'krankenversicherung', title: 'Krankenversicherung',      desc: 'Gesetzlich oder privat – wir finden die optimale Absicherung für deine Gesundheit und deinen Geldbeutel.' },
  { key: 'arbeitskraft',        title: 'Arbeitskraftabsicherung',  desc: 'Deine Arbeitskraft ist dein größtes Kapital. Wir sichern sie ab – bevor es zu spät ist.' },
  { key: 'kfz',                 title: 'KFZ-Versicherung',         desc: 'Der beste Schutz für dein Fahrzeug zum besten Preis – kundenorientiert verglichen.' },
  { key: 'sach',                title: 'Sachversicherungen',        desc: 'Von Hausrat bis Haftpflicht: umfassender Schutz für dein Eigentum und deine Finanzen.' },
  { key: 'gewerbe',             title: 'Gewerbeversicherungen',     desc: 'Maßgeschneiderte Absicherung für Selbstständige und Unternehmen – damit du dich aufs Wesentliche konzentrieren kannst.' },
  { key: 'rente',               title: 'Private Rentenversicherung',desc: 'Staatlich geförderte Altersvorsorge, die wirklich zu deiner Lebenssituation passt.' },
  { key: 'hinterbliebene',      title: 'Hinterbliebenenvorsorge',   desc: 'Schütze deine Familie – auch wenn du nicht mehr da bist.' },
];

const VERMOEGEN: { title: string; desc: string; key: ServiceKey }[] = [
  { key: 'immobilien',    title: 'Immobilien',                      desc: 'Wir begleiten dich beim Kauf, der Finanzierung und dem Aufbau eines Immobilienportfolios – mit Zugang zu über 500 Banken.' },
  { key: 'sparprodukte',  title: 'Sparprodukte',                    desc: 'Vom Tagesgeld bis zum Bausparvertrag – wir finden das Produkt, das zu deinen Zielen passt.' },
  { key: 'geldanlagen',   title: 'Geldanlagen',                     desc: 'ETFs, Fonds und mehr: wissenschaftlich fundierte Anlagestrategien für nachhaltigen Vermögensaufbau.' },
  { key: 'vorsorge',      title: 'Vorsorgekonzepte',                desc: 'Ganzheitliche Planung für deine Rente – damit du im Alter so leben kannst, wie du es dir vorstellst.' },
  { key: 'finanzierungen',title: 'Finanzierungen',                  desc: 'Günstige Finanzierungen für Immobilien, Fahrzeuge und mehr – kundenorientiert verglichen.' },
  { key: 'aktien',        title: 'Aktien',                          desc: 'Direkte Beteiligungen am Kapitalmarkt – mit fundierter Beratung und klarer Strategie.' },
  { key: 'vwl',           title: 'Vermögenswirksame Leistungen',   desc: 'Arbeitgeberzuschuss und staatliche Förderung optimal nutzen – für maximalen Vermögensaufbau ohne Mehrkosten.' },
];

const LeistungenPage = ({ color, onPageChange, onService }: { color: string; onPageChange: (p: Page) => void; onService: (k: ServiceKey) => void }) => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-white pt-32 md:pt-40 pb-16 px-6">
        <div className="absolute inset-0 -z-10 dot-grid" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/8 bg-[#0F172A]/[0.03] mb-8">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#0F172A]/50">Über 100 geprüfte Anbieter im Vergleich</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-[-0.03em] text-[#0F172A] mb-6 leading-[1.05]">
              Unsere<br />Leistungen
            </h1>
            <p className="text-[#0F172A]/55 text-lg md:text-xl max-w-2xl leading-relaxed">
              Jahrelanges Vertrauen bekommt man nicht geschenkt. Wir beraten kundenorientiert, wissenschaftlich fundiert und vollständig digital – immer für dein bestes Ergebnis.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── 3 Pillars ── */}
      <div className="max-w-7xl mx-auto px-6 mt-16 mb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { num: '01', icon: <ShieldCheck className="w-6 h-6" />, title: 'Über 100 Anbieter', desc: 'Wir vergleichen über 100 geprüfte Anbieter und beraten kundenorientiert – ohne versteckte Provisionsinteressen.' },
            { num: '02', icon: <BarChart3 className="w-6 h-6" />, title: 'Wissenschaftlich', desc: 'Unsere Strategien basieren auf Finanzmathematik und bewiesenen Methoden – nicht auf Bauchgefühl oder Provisionshöhe.' },
            { num: '03', icon: <Zap className="w-6 h-6" />,       title: 'Digital & Effizient', desc: 'Durch volldigitale Prozesse sparen wir Zeit und Kosten – und geben diese Vorteile direkt an dich weiter.' },
          ].map(({ num, icon, title, desc }) => (
            <motion.div key={num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: Number(num) * 0.08 }}
              className="relative p-8 rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-7 text-5xl font-black text-black/4 select-none leading-none">{num}</span>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ backgroundColor: color + '15', color }}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">{title}</h3>
              <p className="text-[#1E293B]/55 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Why not comparison portals ── */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="rounded-3xl overflow-hidden border border-black/5 shadow-sm bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Left: portals */}
            <div className="p-10 border-b lg:border-b-0 lg:border-r border-black/6">
              <p className="text-xs font-bold tracking-widest uppercase text-[#1E293B]/30 mb-5">Das Problem</p>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Vergleichsportale verlieren gegen unsere Berater</h2>
              <div className="flex flex-col gap-4">
                {[
                  'Empfehlen Produkte mit den höchsten Provisionen',
                  'Kein persönlicher Ansprechpartner nach dem Abschluss',
                  'Keine ganzheitliche Betrachtung deiner Situation',
                  'Algorithmen ersetzen keine individuelle Beratung',
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <p className="text-sm text-[#1E293B]/60 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: DK */}
            <div className="p-10" style={{ backgroundColor: color + '08' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color }}>Die Lösung</p>
              <h2 className="text-2xl font-bold text-[#1E293B] mb-6">So arbeiten wir bei DK Finanzkanzlei</h2>
              <div className="flex flex-col gap-4">
                {[
                  'Rechtlich zur bestmöglichen Beratung verpflichtet',
                  'Fester Ansprechpartner – langfristig und persönlich',
                  '360°-Blick auf deine gesamte finanzielle Situation',
                  'Wissenschaftlich fundierte Empfehlungen, keine Bauchentscheidungen',
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20', color }}>
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="text-sm text-[#1E293B]/70 leading-relaxed font-medium">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Versicherungen ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-1 h-10 rounded-full" style={{ backgroundColor: color }} />
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#1E293B]/35 mb-0.5">Absicherung</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">Versicherungen</h2>
          </div>
        </div>
        <p className="text-[#1E293B]/50 text-base mb-10 ml-5 pl-4 border-l border-black/6 max-w-2xl">
          Wir vergleichen über 100 geprüfte Anbieter und finden die Absicherung, die wirklich zu dir passt – nicht die, die am meisten Provision bringt.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERSICHERUNGEN.map(({ title, desc, key }, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-7 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all cursor-pointer"
              onClick={() => onService(key)}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-bold text-[#1E293B] pr-2">{title}</h3>
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
              <p className="text-sm text-[#1E293B]/50 leading-relaxed mb-5">{desc}</p>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>Mehr erfahren →</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Separator with stat ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="rounded-2xl px-10 py-8 flex flex-wrap items-center justify-between gap-6" style={{ backgroundColor: color + '10', borderLeft: `4px solid ${color}` }}>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-[#1E293B]">Vermögensaufbau mit System</p>
            <p className="text-[#1E293B]/55 text-sm mt-1 max-w-lg">Mit dem richtigen Produkt, zur richtigen Zeit, im richtigen Verhältnis. Wissenschaftlich belegt – nicht geraten.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color, color: 'white' }}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-[#1E293B]">500+ Bankpartner</span>
          </div>
        </div>
      </div>

      {/* ── Vermögensaufbau ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-1 h-10 rounded-full" style={{ backgroundColor: color }} />
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#1E293B]/35 mb-0.5">Wachstum</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">Vermögensaufbau</h2>
          </div>
        </div>
        <p className="text-[#1E293B]/50 text-base mb-10 ml-5 pl-4 border-l border-black/6 max-w-2xl">
          Von der ersten Geldanlage bis zum Immobilienportfolio – wir bauen gemeinsam mit dir einen Plan, der langfristig funktioniert.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERMOEGEN.map(({ title, desc, key }, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-7 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all cursor-pointer"
              onClick={() => onService(key)}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-bold text-[#1E293B] pr-2">{title}</h3>
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
              <p className="text-sm text-[#1E293B]/50 leading-relaxed mb-5">{desc}</p>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>Mehr erfahren →</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden" style={{ backgroundColor: color }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 50%)' }} />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Bereit für deine Beratung?</h2>
            <p className="text-white/75 mb-10 text-lg max-w-lg mx-auto">Kostenlos, unverbindlich und in wenigen Minuten erledigt.</p>
            <button onClick={() => onPageChange('kontakt')} className="px-10 py-4 bg-white font-bold rounded-full text-base hover:opacity-90 transition-opacity shadow-lg" style={{ color }}>
              Jetzt kostenlos beraten lassen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Kontakt Page ────────────────────────────────────────────────────────────────
// ─── Kontakt: mehrstufiger Qualifizierungs-Funnel ────────────────────────────────
const QUALI_QUESTIONS: { key: string; q: string; options: string[] }[] = [
  { key: 'situation', q: 'Was beschreibt deine aktuelle berufliche Situation?',
    options: ['Student/in', 'Berufseinsteiger/in', 'Angestellt', 'Beamter/Beamtin', 'Selbstständig'] },
  { key: 'einkommen', q: 'Wie hoch ist dein monatliches Nettoeinkommen?',
    options: ['Unter 1.500 €', '1.500–3.000 €', '3.000–5.000 €', 'Über 5.000 €'] },
  { key: 'sparen', q: 'Sparst du bereits regelmäßig?',
    options: ['Ja, jeden Monat', 'Ja, aber unregelmäßig', 'Nein, noch nicht'] },
  { key: 'foerderung', q: 'Nutzt du staatliche Förderungen bereits aus?',
    options: ['Ja', 'Nein', 'Weiß ich nicht'] },
  { key: 'thema', q: 'Was interessiert dich am meisten?',
    options: ['Vermögensaufbau & ETFs', 'Steueroptimierung', 'Versicherungen & Absicherung', 'Altersvorsorge', 'Immobilien'] },
];

const Stepper = ({ step }: { step: number }) => {
  const labels = ['Qualifizierung', 'Deine Daten', 'Zusammenfassung'];
  return (
    <div className="flex items-center justify-center mb-12">
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && (
            <div className="w-16 md:w-24 h-px mx-2 mb-6" style={{ backgroundColor: step > i ? ACCENT : 'rgba(15,23,42,0.12)' }} />
          )}
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300"
              style={step > i + 1
                ? { backgroundColor: ACCENT, color: '#fff' }
                : step === i + 1
                  ? { backgroundColor: ACCENT, color: '#fff' }
                  : { backgroundColor: 'rgba(15,23,42,0.06)', color: 'rgba(15,23,42,0.4)' }}>
              {step > i + 1 ? <CheckCircle2 className="w-4.5 h-4.5" /> : i + 1}
            </div>
            <span className="text-xs font-medium" style={{ color: step === i + 1 ? ACCENT : 'rgba(15,23,42,0.4)' }}>{label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const FunnelInput = ({ label, value, onChange, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) => (
  <label className="block">
    <span className="block text-sm text-[#0F172A]/45 mb-1">{label}{required && ' *'}</span>
    <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-b border-black/15 focus:border-[#4d7abd] outline-none py-2.5 text-[#0F172A] transition-colors" />
  </label>
);

const KontaktPage = ({ color, onPageChange }: { color: string; onPageChange: (p: Page) => void }) => {
  const [step, setStep] = useState(1);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [data, setData] = useState({ vorname: '', nachname: '', email: '', tel: '', nachricht: '', newsletter: false, datenschutz: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, []);

  const q = QUALI_QUESTIONS[qi];

  const pick = (opt: string) => {
    setAnswers((a) => ({ ...a, [q.key]: opt }));
    setTimeout(() => {
      if (qi < QUALI_QUESTIONS.length - 1) setQi(qi + 1);
      else setStep(2);
    }, 260);
  };

  const back = () => {
    if (step === 1 && qi > 0) setQi(qi - 1);
    else if (step === 2) { setStep(1); setQi(QUALI_QUESTIONS.length - 1); }
    else if (step === 3) setStep(2);
  };

  const submit = async () => {
    if (sending) return;
    setSending(true);
    await postLead({
      type: 'kontakt',
      name: `${data.vorname} ${data.nachname}`.trim(),
      email: data.email,
      tel: data.tel,
      nachricht: data.nachricht,
      newsletter: data.newsletter,
      datenschutz: data.datenschutz,
      qualifizierung: QUALI_QUESTIONS.map((x) => `${x.q} ${answers[x.key] ?? '–'}`).join(' | '),
    });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-36 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#0F172A]/40 mb-6">
          <button onClick={() => onPageChange('home')} className="hover:text-[#0F172A]/70 transition-colors">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: ACCENT + '18', color: ACCENT }}>Kontakt</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] text-[#0F172A] text-center mb-4">Lass uns sprechen</h1>
        <p className="text-[#0F172A]/50 text-center max-w-lg mx-auto leading-relaxed mb-12">
          Beantworte ein paar kurze Fragen, damit wir deine Situation vorab einordnen können. Dauert keine zwei Minuten.
        </p>

        {sent ? (
          <div className="rounded-3xl border border-black/5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] bg-white p-10 md:p-14 text-center">
            <CheckCircle2 className="w-14 h-14 mx-auto mb-5" style={{ color: ACCENT }} />
            <h2 className="text-2xl font-extrabold text-[#0F172A] mb-3">Danke, wir haben deine Anfrage.</h2>
            <p className="text-[#0F172A]/55 leading-relaxed mb-8">
              Wir melden uns innerhalb von 48 Stunden bei dir und schlagen dir passende Termine vor.
              Wenn es schneller gehen soll, ruf uns einfach direkt an.
            </p>
            <a href="tel:+491731038570" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold border border-black/10 text-[#0F172A] hover:bg-[#0F172A]/[0.03] transition-colors">
              +49 173 1038570
            </a>
          </div>
        ) : (
          <>
            <Stepper step={step} />

            <div className="rounded-3xl border border-black/5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] bg-white p-7 md:p-10">
              <AnimatePresence mode="wait">

                {/* ── Schritt 1: Qualifizierung ── */}
                {step === 1 && (
                  <motion.div key={`q-${qi}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="text-sm text-[#0F172A]/40 mb-1">Frage {qi + 1} von {QUALI_QUESTIONS.length}</p>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-7">{q.q}</h2>
                    <div className="flex flex-col gap-3">
                      {q.options.map((opt) => {
                        const active = answers[q.key] === opt;
                        return (
                          <button key={opt} onClick={() => pick(opt)}
                            className="w-full text-left px-6 py-4 rounded-full border transition-all duration-200"
                            style={active
                              ? { borderColor: ACCENT, backgroundColor: ACCENT + '12', color: '#0F172A' }
                              : { borderColor: 'rgba(15,23,42,0.12)', color: '#0F172A' }}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {qi > 0 && (
                      <button onClick={back} className="mt-7 inline-flex items-center gap-2 text-sm text-[#0F172A]/40 hover:text-[#0F172A]/70 transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Zurück
                      </button>
                    )}
                  </motion.div>
                )}

                {/* ── Schritt 2: Kontaktdaten ── */}
                {step === 2 && (
                  <motion.form key="daten" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-7">Deine Kontaktdaten</h2>
                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      <FunnelInput label="Vorname" value={data.vorname} onChange={(v) => setData({ ...data, vorname: v })} required />
                      <FunnelInput label="Nachname" value={data.nachname} onChange={(v) => setData({ ...data, nachname: v })} required />
                    </div>
                    <div className="mb-5"><FunnelInput label="E-Mail" type="email" value={data.email} onChange={(v) => setData({ ...data, email: v })} required /></div>
                    <div className="mb-5"><FunnelInput label="Telefon" type="tel" value={data.tel} onChange={(v) => setData({ ...data, tel: v })} /></div>
                    <div className="mb-7">
                      <span className="block text-sm text-[#0F172A]/45 mb-1">Willst du uns vorab etwas mitgeben? (optional)</span>
                      <textarea value={data.nachricht} onChange={(e) => setData({ ...data, nachricht: e.target.value })} rows={3}
                        className="w-full bg-transparent border-b border-black/15 focus:border-[#4d7abd] outline-none py-2.5 text-[#0F172A] resize-none transition-colors" />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer mb-3">
                      <input type="checkbox" checked={data.newsletter} onChange={(e) => setData({ ...data, newsletter: e.target.checked })}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#4d7abd]" />
                      <span className="text-sm text-[#0F172A]/55 leading-relaxed">Schickt mir gelegentlich Tipps rund ums Geld per E-Mail.</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer mb-7">
                      <input type="checkbox" required checked={data.datenschutz} onChange={(e) => setData({ ...data, datenschutz: e.target.checked })}
                        className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#4d7abd]" />
                      <span className="text-sm text-[#0F172A]/55 leading-relaxed">
                        Ja, die DK Finanzkanzlei darf mich zu meiner Anfrage kontaktieren – telefonisch, per WhatsApp, SMS oder E-Mail.
                        Es gilt die{' '}
                        <button type="button" onClick={() => onPageChange('datenschutz')} className="underline" style={{ color: ACCENT }}>Datenschutzerklärung</button>. *
                      </span>
                    </label>

                    <div className="flex items-center justify-between gap-4">
                      <button type="button" onClick={back} className="inline-flex items-center gap-2 text-sm text-[#0F172A]/40 hover:text-[#0F172A]/70 transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Zurück
                      </button>
                      <button type="submit" className="px-8 py-3.5 rounded-full text-white font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: ACCENT }}>
                        Weiter <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* ── Schritt 3: Zusammenfassung ── */}
                {step === 3 && (
                  <motion.div key="summary" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">Passt das so?</h2>
                    <p className="text-sm text-[#0F172A]/45 mb-7">Kurz prüfen, dann schicken wir dir Terminvorschläge.</p>

                    <dl className="rounded-2xl bg-[#0F172A]/[0.03] p-6 mb-7 flex flex-col gap-3">
                      {QUALI_QUESTIONS.map((x) => (
                        <div key={x.key} className="flex justify-between gap-6 text-sm">
                          <dt className="text-[#0F172A]/45">{x.q}</dt>
                          <dd className="font-semibold text-[#0F172A] text-right flex-shrink-0">{answers[x.key] ?? '–'}</dd>
                        </div>
                      ))}
                      <div className="border-t border-black/5 pt-3 mt-1 flex flex-col gap-2 text-sm">
                        <div className="flex justify-between gap-6"><dt className="text-[#0F172A]/45">Name</dt><dd className="font-semibold text-[#0F172A]">{data.vorname} {data.nachname}</dd></div>
                        <div className="flex justify-between gap-6"><dt className="text-[#0F172A]/45">E-Mail</dt><dd className="font-semibold text-[#0F172A] break-all">{data.email}</dd></div>
                        {data.tel && <div className="flex justify-between gap-6"><dt className="text-[#0F172A]/45">Telefon</dt><dd className="font-semibold text-[#0F172A]">{data.tel}</dd></div>}
                      </div>
                    </dl>

                    <div className="flex items-center justify-between gap-4">
                      <button onClick={back} className="inline-flex items-center gap-2 text-sm text-[#0F172A]/40 hover:text-[#0F172A]/70 transition-colors">
                        <ArrowRight className="w-4 h-4 rotate-180" /> Zurück
                      </button>
                      <button onClick={submit} disabled={sending}
                        className="shine px-8 py-3.5 rounded-full text-white font-bold inline-flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                        style={{ backgroundColor: ACCENT }}>
                        {sending ? 'Wird gesendet …' : <>Anfrage abschicken <ArrowRight className="w-4 h-4" /></>}
                      </button>
                    </div>
                    <p className="text-xs text-[#0F172A]/35 mt-5">Kostenlos und unverbindlich. Wir melden uns innerhalb von 48 Stunden.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* ── Direkter Draht ── */}
        <div className="mt-14 grid sm:grid-cols-2 gap-4">
          <a href="tel:+491731038570" className="lift rounded-2xl border border-black/5 bg-white p-6 flex items-center gap-4 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.45)]">
            <span className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT + '18', color: ACCENT }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </span>
            <div>
              <p className="text-xs text-[#0F172A]/40 mb-0.5">Mo–Sa, 10–20 Uhr</p>
              <p className="font-bold text-[#0F172A]">+49 173 1038570</p>
            </div>
          </a>
          <a href="mailto:info@dk-finanzkanzlei.de" className="lift rounded-2xl border border-black/5 bg-white p-6 flex items-center gap-4 shadow-[0_14px_36px_-30px_rgba(15,23,42,0.45)]">
            <span className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: ACCENT + '18', color: ACCENT }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </span>
            <div>
              <p className="text-xs text-[#0F172A]/40 mb-0.5">Schreib uns</p>
              <p className="font-bold text-[#0F172A] text-sm break-all">info@dk-finanzkanzlei.de</p>
            </div>
          </a>
        </div>

        {/* ── Termin direkt buchen ── */}
        <div className="mt-14">
          <div className="text-center mb-5">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#0F172A]/35 mb-1">Oder direkt</p>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Termin selbst aussuchen</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-white" style={{ height: 680 }}>
            <iframe
              src="https://calendar.google.com/calendar/u/0/appointments/AcZssZ0XOK3fyXkX0sX-D4_HMuAMb4zUDce51Bb9wKg="
              width="100%" height="100%" frameBorder="0" title="Termin buchen" loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── URL routing ─────────────────────────────────────────────────────────────────
const PAGE_TO_PATH: Record<Page, string> = {
  home:        '/',
  ueberuns:    '/ueber-uns',
  impressum:   '/impressum',
  datenschutz: '/datenschutz',
  kontakt:     '/kontakt',
  leistungen:  '/leistungen',
  service:     '/leistungen', // overridden per-service below
  karriere:    '/karriere',
};

const PATH_TO_PAGE: Record<string, Page> = {
  '/':            'home',
  '/ueber-uns':   'ueberuns',
  '/impressum':   'impressum',
  '/datenschutz': 'datenschutz',
  '/kontakt':     'kontakt',
  '/leistungen':  'leistungen',
  '/karriere':    'karriere',
};

const SERVICE_KEYS: ServiceKey[] = ['krankenversicherung','arbeitskraft','kfz','sach','gewerbe','rente','hinterbliebene','immobilien','sparprodukte','geldanlagen','vorsorge','finanzierungen','aktien','vwl'];

function getStateFromPath(): { page: Page; service: ServiceKey } {
  const path = window.location.pathname;
  // e.g. /leistungen/krankenversicherung
  if (path.startsWith('/leistungen/')) {
    const key = path.replace('/leistungen/', '') as ServiceKey;
    if (SERVICE_KEYS.includes(key)) {
      return { page: 'service', service: key };
    }
    return { page: 'leistungen', service: 'krankenversicherung' };
  }
  const p = PATH_TO_PAGE[path] ?? 'home';
  return { page: p, service: 'krankenversicherung' };
}

// ─── Main Export ─────────────────────────────────────────────────────────────────
export default function LandingPage() {

  const initial = getStateFromPath();
  const [page, setPage] = useState<Page>(initial.page);
  const [currentService, setCurrentService] = useState<ServiceKey>(initial.service);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  useEffect(() => {
    if (pendingScrollTarget && page === 'home') {
      const t = setTimeout(() => {
        document.getElementById(pendingScrollTarget)?.scrollIntoView({ behavior: 'smooth' });
        setPendingScrollTarget(null);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [page, pendingScrollTarget]);

  const navigate = (p: Page, scrollTarget?: string) => {
    const url = PAGE_TO_PATH[p];
    window.history.pushState({ page: p }, '', url);
    setPage(p);
    if (scrollTarget) {
      setPendingScrollTarget(scrollTarget);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToService = (key: ServiceKey) => {
    const url = `/leistungen/${key}`;
    window.history.pushState({ page: 'service', service: key }, '', url);
    setCurrentService(key);
    setPage('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopState = () => {
      const { page: p, service } = getStateFromPath();
      setPage(p);
      setCurrentService(service);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // SEO: Titel, Meta-Tags, Canonical & JSON-LD je nach aktueller Route setzen.
  useEffect(() => {
    applySeo(getSeoForRoute(routeKeyForPage(page, currentService)));
  }, [page, currentService]);


  // Glow card proximity effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      for (const card of Array.from(document.getElementsByClassName('glow-card')) as HTMLElement[]) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const slideVariants = {
    enter: (_dir: number) => ({ opacity: 0 }),
    center: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
    exit: (_dir: number) => ({ opacity: 0, transition: { duration: 0.25, ease: 'easeIn' as const } }),
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#4d7abd] selection:text-white">
      <CookieBanner onDatenschutz={() => navigate('datenschutz')} />
      <Navbar onPageChange={navigate} currentPage={page} onService={goToService} />
      <AnimatePresence mode="wait">
        {page === 'karriere' ? (
          <motion.div key="karriere" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <KarrierePage onPageChange={navigate} />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'ueberuns' ? (
          <motion.div key="ueberuns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <UeberUnsContent />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'impressum' ? (
          <motion.div key="impressum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <ImpressumContent />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'datenschutz' ? (
          <motion.div key="datenschutz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <DatenschutzContent />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'service' ? (
          <motion.div key={`service-${currentService}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <ServiceDetailPage serviceKey={currentService} color={BRANDS.dk.color} onPageChange={navigate} />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'leistungen' ? (
          <motion.div key="leistungen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <LeistungenPage color={BRANDS.dk.color} onPageChange={navigate} onService={goToService} />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'kontakt' ? (
          <motion.div key="kontakt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <KontaktPage color={BRANDS.dk.color} onPageChange={navigate} />
            <Footer color={BRANDS.dk.color} onPageChange={navigate} />
          </motion.div>
        ) : (
          <motion.div key="home" variants={slideVariants} initial="enter" animate="center" exit="exit">
            <DKContent onPageChange={navigate} />
            <Footer color={ACCENT} onPageChange={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
