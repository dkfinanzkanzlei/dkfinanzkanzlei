import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp, ShieldCheck, PieChart, ArrowRight, CheckCircle2, ChevronRight,
  Menu, X, Wallet, Calculator, Building2, Home, Heart, BarChart3, Users,
  Star, Eye, Zap, Leaf, UserCircle
} from 'lucide-react';

// ─── Brand Configuration ────────────────────────────────────────────────────────
type Brand = 'dk' | 'vorsorge' | 'immo';
type Page = 'home' | 'ueberuns' | 'impressum' | 'datenschutz' | 'kontakt' | 'leistungen' | 'service';
type ServiceKey = 'krankenversicherung' | 'arbeitskraft' | 'kfz' | 'sach' | 'gewerbe' | 'rente' | 'hinterbliebene' | 'immobilien' | 'sparprodukte' | 'geldanlagen' | 'vorsorge' | 'finanzierungen' | 'aktien' | 'vwl';

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
} as const;

const BRAND_ORDER: Brand[] = ['dk', 'vorsorge', 'immo'];

const BRAND_BG: Record<Brand, string> = {
  dk:       '/DK Finanz BG.jpeg',
  vorsorge: '/DK Vorsorge.jpeg',
  immo:     '/DK Immo BG.jpeg',
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
  { src: '/arag-logo.png', alt: 'ARAG', filter: 'grayscale(1) brightness(1.4)', opacity: 0.55, scale: 1.0 },
];

const LogoMarquee = () => (
  <div className="py-12 overflow-hidden">
    <div className="flex logo-marquee" style={{ width: 'max-content' }}>
      {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
        <div key={i} className="flex items-center justify-center mx-8 flex-shrink-0" style={{ width: '120px', height: '44px' }}>
          <img
            src={logo.src}
            alt={logo.alt}
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
  {
    q: 'Seid ihr wirklich unabhängig?',
    a: 'Ja – wir sind nicht an eine Bank oder Versicherung gebunden. Wir vergleichen Hunderte von Anbietern und empfehlen ausschließlich das, was objektiv am besten zu deiner Situation passt.',
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
  { name: "Hedi Abid", date: "Mai 2025", text: "Herrn Jannik Förster kann man nicht genug loben – absolute Top-Beratung! Fachlich brillant, extrem kompetent, alles lief reibungslos und professionell. Seine Empfehlungen waren punktgenau. Einfach stark!" },
  { name: "Patrick Decker", date: "Mai 2025", text: "Ich hatte heute eine Beratung bei Jannik Förster, super freundlich und professionell, sehr angenehmer Gesprächsfluss. Hab absolut nichts negatives zu sagen, top." },
  { name: "Jonas Klang", date: "Mai 2025", text: "Wirklich nette, transparente und vor allem sinnige Beratung. Die Terminzeiten sind wirklich flexibel – 10–21 Uhr. Von solchen Zeiten können sich Banken eine Scheibe abschneiden." },
  { name: "Lilli Gruschka", date: "Mai 2025", text: "Ich hatte eine kompetente Beratung mit Tamaz Tordia, kann ich nur weiterempfehlen!!" },
  { name: "Lara Schomaker", date: "Mai 2025", text: "Ich hatte ein Gespräch mit Jannik Förster über vermögenswirksame Leistungen. Durch seine lockere und persönliche Art war es ein super Gespräch. Er hat alles sofort erledigt und bei Fragen steht er jederzeit zur Verfügung. Einfach toll!!" },
  { name: "Yasmin Rothinger", date: "Mai 2025", text: "Ich hatte ein sehr nettes Meeting mit dem Herrn Tordia. Sehr informativ und wirklich freundlich. Konnte alle meine Fragen super beantworten 👍" },
  { name: "Michelle Bartel", date: "Mai 2025", text: "Mein Gespräch mit Tamaz Tordia war sehr nett. Er hat alle meine Fragen beantwortet und mir weitere Tipps gegeben. Ich habe mich gut aufgehoben gefühlt." },
  { name: "Julian Weinberg", date: "Mai 2025", text: "Sehr gute und schnelle Beratung! Vielen Dank nochmal Jannik!" },
  { name: "Munavar C K", date: "Mai 2025", text: "Die Beraterin Aleyna Uysal war unglaublich freundlich, geduldig und hat sich viel Zeit genommen. Man fühlt sich hier wirklich gut aufgehoben – absolut empfehlenswert!" },
  { name: "Lars Heckmann", date: "Mai 2025", text: "Ich hatte ein Meeting mit dem Herrn Tordia über Vermögenswirksame Leistungen. Eine sehr nette und kompetente Beratung. Er konnte mir alle Fragen super beantworten." },
  { name: "A Haideri", date: "Apr. 2025", text: "Tamaz Tordia war super hilfsbereit. Hat mir alle Fragen und inhaltlichen Themen super erklärt. Jederzeit wieder!" },
  { name: "H. Brühl", date: "Apr. 2025", text: "Ich hatte ein tolles Beratungsgespräch mit J. Förster. Er hat mir alles gut erklärt und alle Fragen beantwortet. Sehr weiter zu empfehlen." },
  { name: "Max Wohlfahrt", date: "Apr. 2025", text: "Beratungsgespräch mit Herrn Tordia: Sehr aufklärendes Gespräch, es wurde auf alle Fragen eingegangen. Die Atmosphäre war die ganze Zeit über entspannt. 5/5★" },
  { name: "Wambo 809", date: "Apr. 2025", text: "Tamaz Tordia ist mit mir alle Punkte nochmals ausführlich durchgegangen und war sehr nett und kompetent." },
  { name: "Philipp", date: "Apr. 2025", text: "Tamaz Tordia hat mich super beraten. Tolle Erklärungen. Sehr verständlich." },
  { name: "Skripton", date: "Apr. 2025", text: "Tamaz Tordia hat mich freundlich beraten und ist individuell auf mich persönlich eingegangen. Sehr geduldig und angenehm." },
  { name: "Nesrin K", date: "Apr. 2025", text: "Super Beratung. Nichts auszusetzen ☺" },
  { name: "Tabea Burska", date: "Apr. 2025", text: "Als Auszubildende ist es eine große Erleichterung professionelle Hilfe zu bekommen. Alle Themen wurden mir genau erklärt mit ihren Vor- und Nachteilen. Ich finde es sehr gut, dass diese Möglichkeit kostenlos angeboten wird." },
  { name: "Christopher Lange", date: "Mär. 2025", text: "Ich habe sehr gute Erfahrungen gemacht. Das Kundengespräch war sehr aufschlussreich und unkompliziert. Der Berater Denis Martynewski war sehr nett und hat jede Frage beantwortet." },
  { name: "Alex", date: "Mär. 2025", text: "Ich wurde als Azubi zu verschiedensten Themen von Philipp Jagiella beraten und bin sehr zufrieden. Ich konnte alles mögliche an Fragen stellen und es wurde sich zu jeder Frage ausführlich geäußert." },
  { name: "Jason P", date: "Feb. 2025", text: "Ein kompetentes und engagiertes Team. Stets höflich und zuvorkommend. Im Videocall mit Herrn Jagiella gesprochen, welcher stets hilfsbereit war und Ahnung von seinen Themen hatte. Nur weiterzuempfehlen!" },
  { name: "Jieuigyeom Luka Hwang", date: "Feb. 2025", text: "Hatte Beratung bei Phillip Jagiella. Bei diesem jungen Mann sieht man, dass er hochqualifiziert ist und auch Spaß hat in diesem Beruf. Gerne wieder!" },
  { name: "Franek Hitzing", date: "Feb. 2025", text: "Ich hatte einen Beratungstermin als Auszubildender. Ich habe mich gut beraten gefühlt und wurde sehr freundlich durch das Antragsformular geführt von Herrn Tamaz Tordia." },
  { name: "martha wt", date: "Feb. 2025", text: "Die Beratung war toll! Ich habe mit Denis Martynewski gesprochen und er war total zuvorkommend und freundlich! Kann ich nur empfehlen 😊" },
  { name: "Yunes Abdullah", date: "Feb. 2025", text: "Ich wurde von Denis Martynewski beraten. Das freundliche Gespräch hat mir sehr weitergeholfen. Er war sehr sachlich und hat mir jede Frage sehr gut beantworten können. Auf jeden Fall weiter zu empfehlen." },
  { name: "Volodya Yeranosyan", date: "Feb. 2025", text: "Tamaz Tordia und Philipp Jagiella haben mich erstklassig beraten. Sie sind genau auf meine Anliegen eingegangen. Alles ging schneller als erwartet." },
  { name: "Firat Özel", date: "Jan. 2025", text: "Ich möchte aufmerksam machen für die tolle Arbeit von Philipp. Er ist sehr kompetent und konnte mich sehr gut aufklären bzw. beraten. Sehr empfehlenswert ⭐⭐⭐⭐⭐" },
  { name: "Dominik Loh", date: "Jan. 2025", text: "Sehr kompetente und faire Beratung. Zu empfehlen." },
  { name: "Maia-Teodora Cireap", date: "Dez. 2024", text: "Ich hatte das Glück, von Phillip Jagiella beraten zu werden. Seine Informationen sind beeindruckend. Besonders schätze ich seine freundliche Kommunikation. Würde ich auf jeden Fall weiterempfehlen!" },
  { name: "Schadowdream | Luca", date: "Mai 2025", text: "Danke an J. Förster. Hat sehr gut beraten und hat sich meiner Skepsis ehrlich und offen gezeigt und mich gut aufgeklärt." },
  { name: "der zoblix", date: "Mai 2025", text: "Ich hatte ein Meeting mit Herrn Förster. Es war sehr informativ, unkompliziert, leicht zu verstehen. Würd ihn weiterempfehlen, sehr sympathisch!" },
  { name: "7VelqEnte", date: "Mai 2025", text: "Ich hatte ein Meeting mit Jannik Förster und kann ihn nur weiterempfehlen. Super nett und hilfsbereit und konnte es super einfach erklären." },
  { name: "Nesrin K", date: "Apr. 2025", text: "Super Beratung. Nichts auszusetzen ☺" },
  { name: "silakto", date: "Jan. 2025", text: "War ein informativ reiches Gespräch und bin sehr zufrieden mit dem Service. Alles wurde direkt aufgeklärt und jede Frage ausführlich beantwortet. Hab vieles herausgefunden was ich noch nicht wusste über die Förderung. Bin sehr zufrieden mit dem Herr Förster als Berater – immer schnell und einfach." },
  { name: "Jule Cappelmann", date: "Jan. 2025", text: "Jannik hat mir eine Top Beratung gegeben und mir geholfen in Minuten Papiere durchzugehen, für die ich ewig gebraucht hätte. Kann ich jedem nur weiter empfehlen." },
  { name: "Bär HD", date: "Jan. 2025", text: "Super Beratung bei Herr Förster. Auch im Nachhinein immer meine Fragen zufriedenstellend beantwortet." },
  { name: "Paula Jacob", date: "Nov. 2024", text: "Tolle und freundliche Beratung durch Jannik Förster mit guten Einblicken für eine weitere Zusammenarbeit. Vielen Dank für die Möglichkeiten :)" },
  { name: "Sky Hachmann", date: "Nov. 2024", text: "War eine sehr gute Beratung mit Jannik :) Hat mich gefreut." },
  { name: "Alina Trumpf", date: "Nov. 2024", text: "Herr Förster war ein sehr freundlicher, kompetenter, lustiger Berater. Er hat mir von Anfang bis Ende super beraten und mir für meine Fragen viel Zeit genommen. Dank ihm bin ich über Vermögenswirksame Leistungen um einiges schlauer geworden. Kann Herrn Förster nur weiterempfehlen – bei ihm ist man in sehr guten Händen." },
  { name: "Naomi Barry", date: "Nov. 2024", text: "Ist cool da, sympathische Leute und top Beratung." },
  { name: "Das Kommentar", date: "Dez. 2024", text: "Sehr gut beraten worden! Alles wird ausführlich erklärt und es wird auf alle Fragen eingegangen. Vielen Dank noch mal an Tamaz Tordia der mich beraten hat." },
  { name: "jette", date: "Dez. 2024", text: "Tamaz Tordia hat mich sehr gut, souverän und freundlich beraten. Gerne wieder :)" },
  { name: "Daniel Wolf", date: "Dez. 2024", text: "Mit Humor und sehr detaillierten Erklärungen ein sehr informatives Gespräch gehabt. Tamaz Tordia hat alle Themen nach einer gut geplanten Struktur erklärt, so dass man jedem Schritt wirklich gut folgen konnte. Danke nochmal." },
  { name: "André Franke", date: "Dez. 2024", text: "Ich bin sehr zufrieden mit dem Service. Tamaz war mein Berater und hat alles bis ins kleinste Detail genauestens erläutert. Der Umgang ist stets freundlich und respektvoll. Super Arbeit, weiter so!" },
  { name: "Tunahan Ercetin", date: "Dez. 2024", text: "Bester Berater 100% Weiterempfehlung – immer hilfsbereit und immer erreichbar." },
  { name: "Semion Kraus", date: "Jan. 2025", text: "Ich wurde von Herr Förster beraten. Es war ein unglaublich nettes und aufschlussreiches Gespräch. Er konnte mir jede Frage gut erklären und es wurde auch nicht langweilig. Kann man insgesamt einfach nur weiterempfehlen." },
  { name: "Benja", date: "Jan. 2025", text: "Ein Team von jungen kompetenten Beratern, auf die man sich verlassen kann. Absolut empfehlenswert!" },
  { name: "Marvin Barsch", date: "Jan. 2025", text: "Hatte ein sehr nettes Gespräch mit einem jungen Mann namens Jannik. Klasse Team wirklich." },
  { name: "Luca Kaufmann", date: "Jan. 2025", text: "Top zufrieden mit der Beratung von Tamaz Tordia – sehr sympathisch der Mann!!!" },
  { name: "Roman K", date: "2024", text: "Tamaz verfügt über ein beeindruckendes Wissen über Zulagen, Zuschüsse und Förderungen. Er hat mir die verschiedenen finanziellen Vorteile nicht nur verständlich erklärt, sondern auch individuell auf meine Situation eingegangen. Dank seiner wertvollen Tipps konnte ich Fördermöglichkeiten entdecken, die mir zuvor nicht bekannt waren. Ich kann Tamaz uneingeschränkt nur weiterempfehlen." },
  { name: "Sandro B. Vogt", date: "Apr. 2025", stars: 4, text: "Dauerte nach der Anmeldung zwar lange, bis ich eine Rückmeldung erhielt, aber dann wurde ich von Dennis umfassend und informativ beraten." },
  { name: "Lea Nguyen", date: "Apr. 2025", stars: 4, text: "Jannik Förster war sehr sympathisch und konnte hilfreich meine Fragen beantworten. Ich habe mich sehr wohl gefühlt während der Beratung und konnte ihm auch folgen bei seinen Erklärungen." },
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
            <span>100+ Google-Rezensionen · Ø 5,0 Sterne</span>
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
  <footer className="py-20 px-6 border-t border-white/10">
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
          <li><button onClick={() => onPageChange('home')} className="hover:text-white transition-colors text-left">Erfolge</button></li>
          <li><button onClick={() => onPageChange('home', 'faq')} className="hover:text-white transition-colors">FAQ</button></li>
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

const Navbar = ({ brand, onBrandChange, onPageChange, currentPage, onService }: { brand: Brand; onBrandChange: (b: Brand) => void; onPageChange: (p: Page) => void; currentPage: Page; onService: (k: ServiceKey) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [leistungenOpen, setLeistungenOpen] = useState(false);
  const cfg = BRANDS[brand];

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-[#F8FAFC] backdrop-blur-xl overflow-visible">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 lg:h-20 flex items-center justify-between">

        {/* Left: Logo */}
        <button onClick={() => onPageChange('home')} className="cursor-pointer flex-shrink-0">
          <img
            src="/dk-logo.png"
            alt="DK"
            className="h-10 lg:h-48 w-auto object-contain"
            style={{ filter: cfg.logoFilter, transition: 'filter 0.6s ease' }}
          />
        </button>

        {/* Brand slash-nav – desktop only */}
        <nav className="slash-nav hidden lg:flex">
          {BRAND_ORDER.map((b, i) => (
            <React.Fragment key={b}>
              {i > 0 && <span className="slash-sep">/</span>}
              <a
                className={brand === b ? 'active' : ''}
                style={brand === b ? { color: BRANDS[b].color } : undefined}
                onClick={() => onBrandChange(b)}
              >
                {BRANDS[b].label}
              </a>
            </React.Fragment>
          ))}
        </nav>

        {/* Right: Nav + CTA */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#1E293B]/70">
          <div className="relative" onMouseEnter={() => setLeistungenOpen(true)} onMouseLeave={() => setLeistungenOpen(false)}>
            <button onClick={() => onPageChange('home')} className="flex items-center gap-1 hover:text-[#1E293B] transition-colors">
              Leistungen <ChevronRight className={`w-3.5 h-3.5 transition-transform ${leistungenOpen ? 'rotate-90' : ''}`} />
            </button>
            <AnimatePresence>
              {leistungenOpen && <LeistungenDropdown color={cfg.color} onPageChange={onPageChange} onService={onService} />}
            </AnimatePresence>
          </div>
          <button
            onClick={() => onPageChange(currentPage === 'ueberuns' ? 'home' : 'ueberuns')}
            className={`hover:text-[#1E293B] transition-colors font-medium ${currentPage === 'ueberuns' ? 'text-[#4d7abd]' : ''}`}
          >
            Über uns
          </button>
          <a href="#proof" onClick={() => onPageChange('home')} className="hover:text-[#1E293B] transition-colors">Erfolge</a>
          <button
            onClick={() => onPageChange('kontakt')}
            className="px-5 py-2 text-white rounded-full text-sm font-semibold"
            style={{ backgroundColor: cfg.color, transition: 'background-color 0.5s ease' }}
          >
            {cfg.ctaText}
          </button>
        </div>

        <button className="lg:hidden text-[#1E293B] min-w-[44px] min-h-[44px] flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

    </nav>

      {/* Mobile menu – rendered outside <nav> as its own fixed layer so iOS Safari passes touch events correctly */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-0 right-0 z-40 bg-[#F8FAFC] border-b border-black/10 p-6 flex flex-col gap-5 text-[#1E293B] overflow-y-auto lg:hidden"
          style={{ top: '3.5rem', maxHeight: 'calc(100dvh - 3.5rem)' }}
        >
          {/* Brand switcher */}
          <div className="flex items-center gap-4 pb-3 border-b border-black/10">
            {BRAND_ORDER.map((b) => (
              <button
                key={b}
                onClick={() => { onBrandChange(b); setIsOpen(false); }}
                className={`text-xs font-bold tracking-widest uppercase transition-colors ${brand === b ? '' : 'text-[#1E293B]/40'}`}
                style={brand === b ? { color: BRANDS[b].color } : undefined}
              >
                {BRANDS[b].label}
              </button>
            ))}
          </div>
          <div>
            <button onClick={() => { setIsOpen(false); onPageChange('leistungen'); }} className="font-semibold text-left w-full">Leistungen</button>
            <div className="mt-3 pl-3 flex flex-col gap-1 text-sm text-[#1E293B]/60">
              <p className="text-xs font-bold uppercase mb-1" style={{ color: cfg.color }}>Versicherungen</p>
              {([
                ['Krankenversicherung', 'krankenversicherung'],
                ['Arbeitskraftabsicherung', 'arbeitskraft'],
                ['KFZ-Versicherung', 'kfz'],
                ['Sachversicherungen', 'sach'],
                ['Gewerbeversicherungen', 'gewerbe'],
                ['Private Rentenversicherung', 'rente'],
                ['Hinterbliebenenvorsorge', 'hinterbliebene'],
              ] as [string, ServiceKey][]).map(([label, key]) => (
                <button key={key} className="text-left py-2 w-full hover:text-[#1E293B] transition-colors" onClick={() => { setIsOpen(false); onService(key); }}>{label}</button>
              ))}
              <p className="text-xs font-bold uppercase mt-2 mb-1" style={{ color: cfg.color }}>Vermögensaufbau</p>
              {([
                ['Immobilien', 'immobilien'],
                ['Sparprodukte', 'sparprodukte'],
                ['Geldanlagen', 'geldanlagen'],
                ['Vorsorgekonzepte', 'vorsorge'],
                ['Finanzierungen', 'finanzierungen'],
                ['Aktien', 'aktien'],
                ['Vermögenswirksame Leistungen', 'vwl'],
              ] as [string, ServiceKey][]).map(([label, key]) => (
                <button key={key} className="text-left py-2 w-full hover:text-[#1E293B] transition-colors" onClick={() => { setIsOpen(false); onService(key); }}>{label}</button>
              ))}
            </div>
          </div>
          <button className="text-left" onClick={() => { setIsOpen(false); onPageChange(currentPage === 'ueberuns' ? 'home' : 'ueberuns'); }}>Über uns</button>
          <button className="text-left" onClick={() => { setIsOpen(false); onPageChange('home'); }}>Erfolge</button>
          <button onClick={() => { setIsOpen(false); onPageChange('kontakt'); }} className="w-full py-3 text-white rounded-lg font-semibold" style={{ backgroundColor: cfg.color }}>
            {cfg.ctaText}
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

const DKContent = ({ onPageChange }: { onPageChange: (p: Page) => void }) => {
  const color = BRANDS.dk.color;
  const services = [
    { title: "Finanzplanung", desc: "Ganzheitliche Strategien für jede Lebensphase.", icon: <PieChart className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Wealth Building", desc: "ETFs, Immobilien & alternative Investments.", icon: <TrendingUp className="w-6 h-6" style={{ color }} />, className: "md:col-span-1 md:row-span-2" },
    { title: "Versicherungen", desc: "Smarte Absicherung ohne unnötige Kosten.", icon: <ShieldCheck className="w-6 h-6 text-red-400" />, className: "md:col-span-2 md:row-span-1" },
    { title: "Steueroptimierung", desc: "Hol dir dein Geld vom Staat zurück.", icon: <Calculator className="w-6 h-6 text-[#22C55E]" />, className: "md:col-span-2 md:row-span-1" },
    { title: "Langfristige Begleitung", desc: "Wir bleiben an deiner Seite, wenn sich das Leben ändert.", icon: <CheckCircle2 className="w-6 h-6 text-orange-400" />, className: "md:col-span-1 md:row-span-1" },
  ];
  const valueCards = [
    { title: "Unabhängige Beratung", description: "Wir sind an keine Bank oder Versicherung gebunden. Unser einziger Maßstab ist dein finanzieller Erfolg.", icon: <ShieldCheck className="w-8 h-8" style={{ color }} />, tag: "Objektivität" },
    { title: "Steueroptimierung", description: "Nutze staatliche Förderungen und Steuervorteile, die 90% der Menschen ignorieren. Dein Geld gehört dir.", icon: <Calculator className="w-8 h-8 text-[#22C55E]" />, tag: "Effizienz" },
    { title: "Strategischer Aufbau", description: "Kein Glücksspiel, sondern mathematisch fundierte Strategien mit ETFs und Immobilien für langfristige Freiheit.", icon: <TrendingUp className="w-8 h-8" style={{ color }} />, tag: "Wachstum" },
  ];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 md:pt-40 pb-6 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#4d7abd]/20 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#22C55E]/10 blur-[100px] rounded-full opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
          {/* Left: Text – appears below image on mobile */}
          <motion.div className="flex-1 text-left order-2 md:order-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col items-start gap-2 mb-4 md:mb-8 w-full">
              <div className="inline-flex flex-col items-center gap-0">
                <img src="/dk-logo-small.png" alt="DK Finanzkanzlei" className="h-16 md:h-24 w-auto object-contain" />
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase -mt-3">
                  Eigenständig & Persönlich
                </span>
              </div>
              <button onClick={() => onPageChange('kontakt')} className="group relative w-full md:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Kostenlose Beratung sichern <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="border-beam" />
              </button>
            </div>
            <h1 className="text-3xl md:text-7xl font-bold tracking-tight mb-4 md:mb-8 leading-[1.1]">
              Dein Problem. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Unsere Lösung.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Deine Zukunft.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mb-6 md:mb-8 leading-relaxed">
              Wir hören zu, denken mit und handeln. Damit aus deinem Problem von heute dein Erfolg von morgen wird.
            </p>
          </motion.div>
          {/* Right: Team image – appears above text on mobile */}
          <motion.div className="flex-1 flex self-stretch order-1 md:order-2 h-[40vh] md:h-auto" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full h-full">
              <img src="/joel-flamur.png" alt="DK Finanzkanzlei" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
        <div className="mt-20 max-w-7xl mx-auto w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>
      </section>

      <LogoMarquee />

      <DottedLine />

      {/* Services Grid */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Unsere Expertise</h2>
            <p className="text-white/40">Maßgeschneiderte Lösungen für deine finanziellen Ziele.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto md:auto-rows-[180px]">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 0.98 }} className={`glow-card p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col justify-between group min-h-[140px] md:min-h-0 ${s.className}`}>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">{s.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-white/40">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Value Proposition */}
      <section id="services" className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Warum DK Finanzkanzlei?</h2>
            <p className="text-white/50 max-w-xl mx-auto">Finanzieller Erfolg ist kein Zufall, sondern das Ergebnis der richtigen Strategie. Wir begleiten dich auf jedem Schritt.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {valueCards.map((card, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glow-card group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">{card.icon}</div>
                <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10">{card.icon}</div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">{card.tag}</span>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Detailed Value */}
      <section className="py-8 md:py-16 px-6 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              Dein Partner für <br /><span style={{ color }}>echte Sicherheit.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg mb-8">Wir glauben nicht an Standardlösungen. Jeder Mensch hat andere Ziele, Ängste und Träume. Deshalb ist unsere Beratung so individuell wie dein Fingerabdruck.</p>
            <div className="space-y-5">
              {[
                { title: "Finanzplanung & Strategie", desc: "Ein maßgeschneiderter Fahrplan, der sich deiner Lebenssituation anpasst – nicht umgekehrt.", icon: <PieChart className="w-6 h-6" /> },
                { title: "Vermögensaufbau (ETFs & Immobilien)", desc: "Wissenschaftlich fundierte Investments für nachhaltiges Wachstum ohne unnötiges Risiko.", icon: <Wallet className="w-6 h-6" /> },
                { title: "Absicherung & Risikoschutz", desc: "Schütze das, was dir wichtig ist, mit den besten Tarifen am Markt zu fairen Konditionen.", icon: <ShieldCheck className="w-6 h-6" /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">{item.icon}</div>
                  <div><h4 className="text-lg font-bold mb-1">{item.title}</h4><p className="text-white/50 text-sm">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-[#4d7abd]/20 to-[#22C55E]/20 border border-white/10 p-4 md:p-8">
              <div className="rounded-2xl bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 p-5 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span className="text-xs text-white/40 tracking-widest uppercase">Ø Ersparnis pro Kunde</span>
                </div>
                <ErsparniCounter />
                <p className="text-sm text-white/40 mt-2 mb-6">pro Jahr — durch optimierte Steuer- &amp; Förderstrategien</p>
                <div className="border-t border-white/10 pt-4 flex gap-4">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Steuer</p>
                    <p className="text-sm font-semibold">€742</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Förderungen</p>
                    <p className="text-sm font-semibold">€545</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Gesamt</p>
                    <p className="text-sm font-semibold text-[#22c55e]">€1.287</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DottedLine />
      <Proof color={color} />

      <DottedLine />
      <FAQSection />

      {/* CTA */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(to bottom, ${color}, #1E293B)`, boxShadow: `0 25px 50px ${color}33` }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
            <h2 className="text-3xl md:text-6xl font-bold mb-8">Bereit für deine <br /> finanzielle Freiheit?</h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Sichere dir jetzt dein kostenloses Erstgespräch und lass uns gemeinsam herausfinden, wie viel Potenzial in deinen Finanzen steckt.</p>
            <button onClick={() => onPageChange('kontakt')} className="px-10 py-5 bg-white text-[#1E293B] rounded-full font-bold text-xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-95">
              Kostenlose Beratung buchen
            </button>
            <p className="mt-6 text-sm text-white/60">Unverbindlich • 100% Unabhängig • In 2 Minuten erledigt</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ─── DK Vorsorge Content ─────────────────────────────────────────────────────────
const VorsorgeContent = ({ onPageChange }: { onPageChange: (p: Page) => void }) => {
  const color = BRANDS.vorsorge.color;
  const services = [
    { title: "Betriebliche Altersvorsorge", desc: "Steuerliche Vorteile durch arbeitgeberfinanzierte Vorsorgelösungen.", icon: <Building2 className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Berufsunfähigkeit", desc: "Dein Einkommensschutz bei gesundheitlichen Einschränkungen.", icon: <ShieldCheck className="w-6 h-6" style={{ color }} />, className: "md:col-span-1 md:row-span-2" },
    { title: "Private Rentenversicherung", desc: "Flexible Rentenmodelle für deinen gesicherten Ruhestand.", icon: <Heart className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Krankenversicherung", desc: "Optimale Absicherung mit den besten Tarifen am Markt.", icon: <CheckCircle2 className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Pflegevorsorge", desc: "Frühzeitig und günstig absichern – bevor es zu spät ist.", icon: <Users className="w-6 h-6" style={{ color }} />, className: "md:col-span-1 md:row-span-1" },
  ];
  const valueCards = [
    { title: "Unabhängige Beratung", description: "Kein Versicherungsvertreter – wir sind ausschließlich deinen Interessen verpflichtet.", icon: <ShieldCheck className="w-8 h-8" style={{ color }} />, tag: "Unabhängigkeit" },
    { title: "Steueroptimierte Vorsorge", description: "Nutze staatliche Förderungen wie Riester, Rürup und bAV vollumfänglich aus.", icon: <Calculator className="w-8 h-8" style={{ color }} />, tag: "Steuervorteile" },
    { title: "Lebenslange Begleitung", description: "Deine Vorsorge wächst mit dir – wir passen sie an jede Lebensphase an.", icon: <TrendingUp className="w-8 h-8" style={{ color }} />, tag: "Langfristig" },
  ];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] blur-[120px] rounded-full opacity-40" style={{ backgroundColor: color + '33' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full opacity-30" style={{ backgroundColor: color + '1a' }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex flex-col items-center gap-0 mb-8">
              <img src="/dk-logo-small.png" alt="DK Vorsorge" className="h-16 md:h-24 w-auto object-contain" style={{ filter: BRANDS.vorsorge.logoFilter }} />
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase -mt-3">
                Vorsorge & Absicherung
              </span>
            </div>
            <h1 className="text-3xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Deine Vorsorge. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Heute planen.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Sicher leben.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Die Mehrheit unterschätzt den Wert frühzeitiger Absicherung. Wir analysieren deine Situation und entwickeln eine maßgeschneiderte Vorsorgsstrategie für dein Leben.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => onPageChange('kontakt')} className="group relative px-8 py-4 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: color }}>
                <span className="relative z-10 flex items-center gap-2">
                  Vorsorgecheck starten <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>
          <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Services */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Vorsorge-Lösungen</h2>
            <p className="text-white/40">Maßgeschneiderte Absicherung für jede Lebensphase.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto md:auto-rows-[180px]">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 0.98 }} className={`glow-card p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col justify-between group min-h-[140px] md:min-h-0 ${s.className}`}>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">{s.icon}</div>
                </div>
                <div><h3 className="text-xl font-bold mb-2">{s.title}</h3><p className="text-sm text-white/40">{s.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Value Proposition */}
      <section id="services" className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Warum DK Vorsorge?</h2>
            <p className="text-white/50 max-w-xl mx-auto">Deine Absicherung ist unsere Priorität. Gemeinsam entwickeln wir eine Strategie, die wirklich zu dir passt.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {valueCards.map((card, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glow-card group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">{card.icon}</div>
                <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10">{card.icon}</div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">{card.tag}</span>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />
      <Proof color={color} />

      {/* CTA */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(to bottom, ${color}, #14532d)`, boxShadow: `0 25px 50px ${color}33` }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
            <h2 className="text-3xl md:text-6xl font-bold mb-8">Bereit für deine <br /> sichere Zukunft?</h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Starte jetzt deinen kostenlosen Vorsorgecheck und erfahre, wie gut du wirklich abgesichert bist.</p>
            <button onClick={() => onPageChange('kontakt')} className="px-10 py-5 bg-white rounded-full font-bold text-xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-95" style={{ color: '#14532d' }}>
              Vorsorgecheck starten
            </button>
            <p className="mt-6 text-sm text-white/60">Unverbindlich • 100% Unabhängig • In 2 Minuten erledigt</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ─── DK Immo Content ─────────────────────────────────────────────────────────────
const ImmoContent = ({ onPageChange }: { onPageChange: (p: Page) => void }) => {
  const color = BRANDS.immo.color;
  const services = [
    { title: "Immobilienfinanzierung", desc: "Optimale Konditionen für dein Wunschobjekt – herstellerunabhängig.", icon: <Home className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Kapitalanlage", desc: "Renditestarke Investments in Wohn- und Gewerbeimmobilien.", icon: <TrendingUp className="w-6 h-6" style={{ color }} />, className: "md:col-span-1 md:row-span-2" },
    { title: "Vermietungsmanagement", desc: "Professionelle Verwaltung deiner Mietobjekte von A bis Z.", icon: <Building2 className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Bestandsoptimierung", desc: "Analyse und Optimierung deines bestehenden Immobilienportfolios.", icon: <BarChart3 className="w-6 h-6" style={{ color }} />, className: "md:col-span-2 md:row-span-1" },
    { title: "Standortanalyse", desc: "Datenbasierte Marktanalysen für sichere Investitionsentscheidungen.", icon: <PieChart className="w-6 h-6" style={{ color }} />, className: "md:col-span-1 md:row-span-1" },
  ];
  const valueCards = [
    { title: "Marktkenntnis", description: "Jahrelange Erfahrung und tiefes Marktverständnis für die besten Objekte zum richtigen Preis.", icon: <BarChart3 className="w-8 h-8" style={{ color }} />, tag: "Expertise" },
    { title: "Renditemaximierung", description: "Mathematisch fundierte Strategien für maximale Rendite bei kalkulierbarem Risiko.", icon: <TrendingUp className="w-8 h-8" style={{ color }} />, tag: "Performance" },
    { title: "Rundum-Service", description: "Von der Suche über die Finanzierung bis zur Verwaltung – alles aus einer Hand.", icon: <Home className="w-8 h-8" style={{ color }} />, tag: "Vollservice" },
  ];
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 md:pt-40 pb-10 md:pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] blur-[120px] rounded-full opacity-40" style={{ backgroundColor: color + '33' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full opacity-30" style={{ backgroundColor: color + '1a' }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex flex-col items-center gap-0 mb-8">
              <img src="/dk-logo-small.png" alt="DK Immo" className="h-16 md:h-24 w-auto object-contain" style={{ filter: BRANDS.immo.logoFilter }} />
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase -mt-3">
                Immobilien & Investments
              </span>
            </div>
            <h1 className="text-3xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
              Immobilien. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Intelligent.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Rentabel.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Immobilien sind eine der sichersten Anlageformen – wenn man weiß, wie. Wir analysieren den Markt und finden die richtigen Objekte für dein Portfolio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => onPageChange('kontakt')} className="group relative px-8 py-4 text-white rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: color }}>
                <span className="relative z-10 flex items-center gap-2">
                  Immobilienberatung anfragen <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>
          <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Services */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Immo-Leistungen</h2>
            <p className="text-white/40">Vom Kauf bis zur Verwaltung – wir begleiten dich bei jedem Schritt.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto md:auto-rows-[180px]">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 0.98 }} className={`glow-card p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col justify-between group min-h-[140px] md:min-h-0 ${s.className}`}>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">{s.icon}</div>
                </div>
                <div><h3 className="text-xl font-bold mb-2">{s.title}</h3><p className="text-sm text-white/40">{s.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Value Proposition */}
      <section id="services" className="py-8 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Warum DK Immo?</h2>
            <p className="text-white/50 max-w-xl mx-auto">Wir kennen den Markt. Wir kennen die Zahlen. Und wir kennen die Objekte, die wirklich Rendite bringen.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {valueCards.map((card, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="glow-card group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">{card.icon}</div>
                <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10">{card.icon}</div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">{card.tag}</span>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-white/60 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />
      <Proof color={color} />

      {/* CTA */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl" style={{ background: `linear-gradient(to bottom, ${color}, #7f1d1d)`, boxShadow: `0 25px 50px ${color}33` }}>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}>
            <h2 className="text-3xl md:text-6xl font-bold mb-8">Bereit für dein <br /> nächstes Objekt?</h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Starte jetzt deine kostenlose Immobilienberatung und erfahre, welche Objekte wirklich zu deiner Strategie passen.</p>
            <button onClick={() => onPageChange('kontakt')} className="px-10 py-5 bg-white rounded-full font-bold text-xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-95" style={{ color: '#7f1d1d' }}>
              Immobilienberatung anfragen
            </button>
            <p className="mt-6 text-sm text-white/60">Unverbindlich • 100% Unabhängig • In 2 Minuten erledigt</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// ─── Impressum Content ───────────────────────────────────────────────────────────
const ImpressumContent = () => (
  <section className="pt-48 pb-32 px-6">
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-6xl font-bold mb-4">Impressum</h1>
        <div className="w-16 h-1 rounded-full mb-12" style={{ backgroundColor: '#4d7abd' }} />
        <div className="text-white/70 leading-relaxed space-y-10 text-base">

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Angaben gemäß § 5 DDG</h2>
            <p>Joel Dakaj<br />Eilendorfer Straße 215<br />52078 Aachen<br />Deutschland</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Kontakt</h2>
            <p>Telefon: +49 173 1038570<br />WhatsApp: +49 178 3261091<br />E-Mail: dakaj@dk-finanzkanzlei.de<br />Internet: www.dk-finanzkanzlei.de</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Unternehmensangaben</h2>
            <p>Geschäftsführer: Joel Dakaj<br />Steuernummer: 201/5075/7052</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Aufsichtsbehörde</h2>
            <p className="mb-2">Zuständige Aufsichtsbehörde nach § 34c GewO:</p>
            <p>IHK Aachen<br />Theaterstraße 6–10<br />52062 Aachen</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Berufsrechtliche Regelungen</h2>
            <p className="mb-3">Berufliche Bezeichnung: Finanzanlagenvermittler</p>
            <ul className="space-y-2 text-white/60">
              <li>Erlaubnis zur Versicherungsvermittlung gem. § 34d Abs. 1 S. 1 Nr. 1<br /><span className="text-white/40 text-sm">Registernummer: D-71EV-ED38Z-51</span></li>
              <li>Erlaubnis zur Finanzanlagenvermittlung gem. § 34f Abs. 1 S. 1 Nr. 1<br /><span className="text-white/40 text-sm">Registernummer: D-F-101-ARS7-55</span></li>
            </ul>
            <p className="mt-3 text-sm text-white/50">Die Eintragungen können im Vermittlerregister überprüft werden unter: <span className="text-white/70">www.vermittlerregister.info</span></p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Berufshaftpflichtversicherung</h2>
            <p>Nürnberger Versicherung<br />Ostendstraße 100, 90334 Nürnberg<br />Geltungsbereich: Deutschland</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Streitschlichtung</h2>
            <p className="mb-3">Die Europäische Plattform zur Online-Streitbeilegung (OS) ist erreichbar unter: <span className="text-white/80">https://ec.europa.eu/consumers/odr</span></p>
            <p className="mb-2">Zuständige Schlichtungsstellen:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin – www.versicherungsombudsmann.de</li>
              <li>Ombudsmann für die private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin – www.pkv-ombudsmann.de</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Haftungsausschluss</h2>
            <h3 className="text-lg font-semibold text-white/90 mb-2">1. Inhalt des Onlineangebotes</h3>
            <p className="mb-4">Der Autor übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Autor, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.</p>
            <h3 className="text-lg font-semibold text-white/90 mb-2">2. Verweise und Links</h3>
            <p>Bei direkten oder indirekten Verweisen auf fremde Internetseiten ("Links"), die außerhalb des Verantwortungsbereiches des Autors liegen, würde eine Haftungsverpflichtung ausschließlich in dem Fall in Kraft treten, in dem der Autor von den Inhalten Kenntnis hat und es ihm technisch möglich und zumutbar wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">Urheberrecht</h2>
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
        <div className="text-white/70 leading-relaxed space-y-10 text-base">

          <div>
            <h2 className="text-xl font-bold text-white mb-3">1. Verantwortlicher</h2>
            <p>Joel Dakaj<br />Eilendorfer Straße 215<br />52078 Aachen<br />Tel.: 0173 1038570<br />E-Mail: dakaj@dk-finanzkanzlei.de</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
            <p className="mb-3">Als Finanzberater verarbeiten wir folgende personenbezogene Daten:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Name, Anschrift, Kontaktdaten</li>
              <li>Geburtsdatum und -ort</li>
              <li>Familienstand</li>
              <li>Einkommens- und Vermögensverhältnisse</li>
              <li>Bankverbindungen</li>
              <li>Versicherungsdaten</li>
              <li>Anlagepräferenzen und Risikoneigung</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Zweck der Datenverarbeitung</h2>
            <p className="mb-3">Die Verarbeitung erfolgt zum Zweck der:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Finanzberatung und Vermittlung von Finanzprodukten</li>
              <li>Erfüllung vertraglicher Pflichten</li>
              <li>Gesetzliche Dokumentationspflichten</li>
              <li>Risikobewertung und Anlageempfehlungen</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Rechtsgrundlagen</h2>
            <p className="mb-3">Die Verarbeitung erfolgt auf Grundlage von:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
              <li>Art. 6 Abs. 1 lit. c DSGVO (Rechtliche Verpflichtung)</li>
              <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">5. Aufbewahrungsfristen</h2>
            <p className="mb-3">Wir speichern Ihre Daten:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Beratungsprotokolle: 10 Jahre</li>
              <li>Vertragsdaten: 10 Jahre nach Vertragsende</li>
              <li>Steuerliche Unterlagen: 10 Jahre</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">6. Ihre Rechte</h2>
            <p className="mb-3">Sie haben folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Auskunftsrecht (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">7. Datensicherheit</h2>
            <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulation, Verlust und unberechtigten Zugriff zu schützen.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Datenerhebung auf unserer Website</h2>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">3.1 Cookies</h3>
            <p>Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir nutzen sowohl technisch notwendige Cookies als auch Analyse-Cookies. Sie können in Ihren Browsereinstellungen festlegen, ob Sie alle Cookies akzeptieren, nur technisch notwendige Cookies zulassen oder alle Cookies ablehnen möchten.</p>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">3.2 Server-Logfiles</h3>
            <p className="mb-3">Bei jedem Zugriff auf unsere Website werden automatisch Informationen in Server-Logfiles erfasst. Diese beinhalten:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL (die zuvor besuchte Seite)</li>
              <li>IP-Adresse des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">3.3 Kontaktformular</h3>
            <p className="mb-3">Wenn Sie unser Kontaktformular nutzen, werden folgende Daten verarbeitet:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Name und Anschrift</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Zeitpunkt der Übermittlung</li>
              <li>Betreff und Inhalt Ihrer Anfrage</li>
            </ul>
            <p className="mt-3">Die Daten werden ausschließlich zum Zweck der Kommunikation mit Ihnen verwendet und nach abschließender Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</p>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">3.4 Newsletter und Marketing</h3>
            <p className="mb-3">Für unseren Newsletter verwenden wir das Double-Opt-In-Verfahren. Dies bedeutet:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60 mb-3">
              <li>Nach Ihrer Anmeldung erhalten Sie eine E-Mail mit einem Bestätigungslink</li>
              <li>Ihre Anmeldung wird erst wirksam, wenn Sie diesen Link anklicken</li>
              <li>Wir protokollieren Anmeldung, Bestätigung und IP-Adresse</li>
            </ul>
            <p className="mb-3">Sie können Ihre Einwilligung jederzeit widerrufen durch:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Klicken des Abmeldelinks im Newsletter</li>
              <li>E-Mail an unsere Kontaktadresse</li>
              <li>Nachricht über unser Kontaktformular</li>
            </ul>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">3.5 Analyse-Tools und Tracking – Google Analytics</h3>
            <p className="mb-3">Wir nutzen Google Analytics zur Analyse des Nutzerverhaltens. Dabei werden:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>IP-Adressen anonymisiert</li>
              <li>Keine personenbezogenen Daten an Google übermittelt</li>
              <li>Cookies mit einer Laufzeit von maximal 14 Monaten gesetzt</li>
            </ul>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">3.6 Social Media</h3>
            <p className="mb-3">Auf unserer Website sind Social-Media-Plugins integriert. Diese sind zunächst deaktiviert und übertragen keine Daten. Wir haben Präsenzen in folgenden sozialen Netzwerken:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>LinkedIn</li>
              <li>XING</li>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Detaillierte Verarbeitungszwecke</h2>

            <h3 className="text-lg font-semibold text-white/90 mt-4 mb-2">4.1 Anlageberatung</h3>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Erstellung Ihres Anlegerprofils</li>
              <li>Durchführung der Geeignetheitsprüfung</li>
              <li>Dokumentation der Beratung gemäß WpHG</li>
              <li>Überwachung von Anlagestrategien</li>
              <li>Regelmäßige Portfolioüberprüfung</li>
            </ul>

            <h3 className="text-lg font-semibold text-white/90 mt-5 mb-2">4.2 Versicherungsvermittlung</h3>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Risikoanalyse und Bedarfsermittlung</li>
              <li>Einholung von Vergleichsangeboten</li>
              <li>Antragstellung und Vertragsvermittlung</li>
              <li>Betreuung im Schadenfall</li>
              <li>Unterstützung bei der Vertragsanpassung</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">5. Technische Sicherheitsmaßnahmen</h2>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>SSL/TLS-Verschlüsselung der Website</li>
              <li>Firewall-Systeme</li>
              <li>Regelmäßige Sicherheitsupdates</li>
              <li>Zwei-Faktor-Authentifizierung</li>
              <li>Verschlüsselte Datenspeicherung</li>
              <li>Regelmäßige Backups</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">6. Internationale Datenübermittlung</h2>
            <p className="mb-3">Eine Datenübermittlung in Drittländer findet nur statt, wenn:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Ein Angemessenheitsbeschluss der EU-Kommission vorliegt</li>
              <li>Geeignete Garantien bestehen (z.B. EU-Standardvertragsklauseln)</li>
              <li>Sie ausdrücklich eingewilligt haben</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">7. Besondere Kategorien personenbezogener Daten</h2>
            <p className="mb-3">Als Finanzberater können wir unter Umständen auch besonders sensible Daten verarbeiten, wie beispielsweise:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Gesundheitsdaten (bei Abschluss von Versicherungen)</li>
              <li>Informationen über Ihre finanzielle Situation</li>
              <li>Daten über Ihre familiäre Situation</li>
            </ul>
            <p className="mt-3">Diese Daten werden mit besonderer Sorgfalt behandelt und nur verarbeitet, wenn Sie uns hierzu ausdrücklich Ihre Einwilligung erteilt haben oder wenn dies zur Erfüllung des Vertrags notwendig ist.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">8. Weitergabe von Daten</h2>
            <p className="mb-3">Eine Übermittlung Ihrer persönlichen Daten an Dritte erfolgt nur, wenn Sie Ihre ausdrückliche Einwilligung erteilt haben, dies für die Vertragsabwicklung notwendig ist oder eine gesetzliche Verpflichtung besteht. Wir arbeiten mit folgenden Kategorien von Empfängern zusammen:</p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li>Versicherungsgesellschaften</li>
              <li>Banken und Finanzinstitute</li>
              <li>IT-Dienstleister</li>
              <li>Wirtschaftsprüfer und Steuerberater</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">9. Datenschutzbeauftragter</h2>
            <p>Joel Dakaj<br />Eilendorfer Straße 215<br />52078 Aachen<br />Tel.: 0173 1038570<br />E-Mail: dakaj@dk-finanzkanzlei.de</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-3">10. Beschwerderecht</h2>
            <p className="mb-3">Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt:</p>
            <p>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />Kavalleriestraße 2–4<br />40213 Düsseldorf<br /><br />Tel.: 0211 38424-0<br />Fax: 0211 38424-10<br />E-Mail: poststelle@ldi.nrw.de</p>
          </div>

          <p className="text-white/30 text-sm pt-4 border-t border-white/10">Diese Datenschutzerklärung wurde zuletzt am 29.01.2026 aktualisiert.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Über Uns Content ────────────────────────────────────────────────────────────
const UeberUnsContent = () => {
  const color = '#4d7abd';

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

  const team = [
    { name: 'Joel Dakaj', role: 'Geschäftsführer', img: '/Joel Logo.png', linkedin: 'https://www.linkedin.com/in/joel-dakaj-11766239b/' },
    { name: 'Flamur Kastrati', role: 'Geschäftsführer', img: '/Flamur 4.png', linkedin: 'https://www.linkedin.com/in/flamur-kastrati-75864839b/' },
    { name: 'Aydan Ekinci', role: 'Assistenz der Geschäftsführung', img: '/Aydan.png', linkedin: '' },
    { name: 'Muayyad Anis', role: 'Recruiting & Controlling', img: '/Muyooo.png', linkedin: 'https://www.linkedin.com/in/muayyad-anis-b159211b9/' },
    { name: 'Philipp Jagiella', role: 'Vertriebsleiter', img: '/Philipp 2.png', linkedin: 'https://www.linkedin.com/in/philipp-scott-jagiella-07ba7233b/' },
    { name: 'Jannik Förster', role: 'Vertriebsleiter', img: '/Jannik 3.png', linkedin: 'https://www.linkedin.com/in/jannik-f%C3%B6rster-9a8b5722a/' },
    { name: 'Norik Dakaj', role: 'Vertriebsleiter', img: '/Norik.png', linkedin: 'https://www.linkedin.com/in/norik-dakaj-694402398/' },
    { name: 'Tommy Melcher', role: 'Fachberater', img: '/Tommy.png', linkedin: 'https://www.linkedin.com/in/tommy-melcher-8b2419326/' },
    { name: 'Julius Ferreira Schmitz', role: 'Fachberater', img: '/Julius 2.png', linkedin: 'https://www.linkedin.com/in/julius-ferreira-schmitz-26a2903b6/' },
    { name: 'Jamila Frydrych', role: 'Fachberaterin', img: '/Jamila.png', linkedin: '' },
    { name: 'Denis Martynewski', role: 'Fachberater', img: '/Denis 2.png', linkedin: '' },
    { name: 'Tabita Mbolo', role: 'Fachberaterin', img: '/Tabita.png', linkedin: '' },
    { name: 'Cesur Ogul', role: 'Fachberater', img: '/Cesur 2.png', linkedin: '' },
    { name: 'Aleyna Uysal', role: 'Fachberaterin', img: '/Aleyna 2.png', linkedin: '' },
    { name: 'Ülkem Terzioglu', role: 'Assistentin', img: '/Ulkem.png', linkedin: '' },
    { name: 'Ceylin Demir', role: 'Assistentin', img: '/Ceylin.png', linkedin: '' },
    { name: 'Tamaz Tordia', role: 'Head of Digital', img: '/Gio.png', linkedin: 'https://www.linkedin.com/in/tamaz-tordia-362935367/' },
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase mb-8">
              <Users className="w-3.5 h-3.5" style={{ color }} />
              Wer wir sind
            </span>
            <h1 className="text-3xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
              Unser Team macht<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">den Unterschied.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
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
            <p className="text-white/50 max-w-xl mx-auto">
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
                className="glow-card group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="mb-5 p-3 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{v.desc}</p>
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
            <p className="text-white/50 max-w-xl mx-auto">
              Erfahrene Berater, die mit Leidenschaft und Expertise für deine finanzielle Zukunft arbeiten.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i % 4) * 0.07, duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative mb-5 w-full aspect-square rounded-3xl overflow-hidden border border-white/10">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/60 via-transparent to-transparent" />
                  {member.linkedin && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-center gap-3">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-white/45">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DottedLine />

      {/* Bewerbungsbereich */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0"
            style={{ background: 'linear-gradient(135deg, #4d7abd 0%, #3a5f9a 60%, #2a4a7f 100%)' }}
          >
            {/* Bild links */}
            <div className="relative min-h-[340px] md:min-h-[420px]">
              <img
                src="/Team.jpg"
                alt="DK Finanzkanzlei Team"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#3a5f9a]/60 md:block hidden" />
            </div>

            {/* Text rechts */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Werde Teil<br />unseres Teams
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Wir sind immer auf der Suche nach talentierten Menschen, die unsere Werte teilen und mit uns gemeinsam wachsen möchten.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
                {[
                  'Flexible Arbeitszeiten',
                  'Homeoffice-Möglichkeit',
                  'Mitarbeiter-Rabatt',
                  'Flache Hierarchien',
                  'Spannende Aufgaben',
                  'Kaffee ohne Ende',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:dakaj@dk-finanzkanzlei.de"
                className="inline-flex items-center gap-2 text-white font-bold text-base hover:gap-3 transition-all"
              >
                Jetzt bewerben <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <DottedLine />
      <Proof color={color} />
    </>
  );
};

// ─── Service Detail Pages ─────────────────────────────────────────────────────────
const SERVICE_DATA: Record<ServiceKey, { category: string; title: string; hook: string; problems: string[]; solution: string; cta: string }> = {
  krankenversicherung: {
    category: 'Versicherungen',
    title: 'Krankenversicherung',
    hook: 'Die falsche Krankenversicherung kostet dich jeden Monat bares Geld – und du merkst es erst, wenn du sie brauchst.',
    problems: [
      'Du zahlst zu viel für zu wenig Leistung – ohne es zu wissen.',
      'Im Krankheitsfall warten gesetzlich Versicherte monatelang auf einen Facharzttermin.',
      'Viele wechseln nie – obwohl sie mit einem anderen Tarif Hunderte Euro im Jahr sparen könnten.',
      'Selbstständige riskieren alles, wenn sie falsch versichert sind.',
    ],
    solution: 'Wir vergleichen unabhängig alle Anbieter und finden den Tarif, der wirklich zu dir passt – gesetzlich oder privat. Keine Provision, keine Bevorzugung.',
    cta: 'Kostenlose Analyse starten',
  },
  arbeitskraft: {
    category: 'Versicherungen',
    title: 'Arbeitskraftabsicherung',
    hook: 'Jeder vierte Arbeitnehmer wird im Laufe seines Lebens berufsunfähig. Der Staat zahlt dir dann gerade mal 30% deines letzten Gehalts.',
    problems: [
      'Du kannst morgen nicht mehr arbeiten – aber deine Miete, Kredite und Kosten laufen weiter.',
      'Die staatliche Erwerbsminderungsrente reicht in keinem Fall zum Leben.',
      'Viele Berufsgruppen werden von Versicherern abgelehnt oder zu überhöhten Preisen versichert.',
      'Ohne Absicherung verlierst du alles, was du dir aufgebaut hast.',
    ],
    solution: 'Wir sichern deine Arbeitskraft mit den richtigen Produkten – BU, Grundfähigkeits- oder Erwerbsunfähigkeitsversicherung. Maßgeschneidert für deinen Beruf.',
    cta: 'Jetzt absichern lassen',
  },
  kfz: {
    category: 'Versicherungen',
    title: 'KFZ-Versicherung',
    hook: 'Die meisten zahlen für ihre Autoversicherung viel zu viel – und bekommen trotzdem zu wenig.',
    problems: [
      'Tausende Tarife, kaum Transparenz – die Wahl des falschen Anbieters kostet dich Jahr für Jahr.',
      'Im Schadensfall zeigt sich erst, ob deine Versicherung wirklich zahlt.',
      'Wer nie vergleicht, verschenkt im Schnitt über 300 € pro Jahr.',
    ],
    solution: 'Wir vergleichen für dich unabhängig und finden den optimalen Schutz für dein Fahrzeug – zum besten Preis.',
    cta: 'Jetzt Tarif vergleichen',
  },
  sach: {
    category: 'Versicherungen',
    title: 'Sachversicherungen',
    hook: 'Ein Wasserschaden, ein Einbruch, ein Unfall – und plötzlich stehst du vor Kosten, die dich finanziell Jahre zurückwerfen.',
    problems: [
      'Hausrat, Haftpflicht, Wohngebäude: Die meisten sind entweder doppelt oder gar nicht richtig versichert.',
      'Im Schadensfall streiten viele Versicherer um Zuständigkeiten – du bleibst auf den Kosten sitzen.',
      'Veraltete Verträge decken moderne Risiken oft nicht ab.',
    ],
    solution: 'Wir analysieren deine bestehenden Verträge, schließen Lücken und sichern dich vollständig ab – ohne Überversicherung.',
    cta: 'Absicherung prüfen lassen',
  },
  gewerbe: {
    category: 'Versicherungen',
    title: 'Gewerbeversicherungen',
    hook: 'Ein einziger Fehler in deinem Unternehmen kann dich persönlich ruinieren – wenn du nicht richtig versichert bist.',
    problems: [
      'Betriebshaftpflicht, Cyber, Betriebsunterbrechung: Selbstständige und Unternehmer unterschätzen regelmäßig ihre Risiken.',
      'Standardpolicen passen selten zur tatsächlichen Tätigkeit – im Schadensfall zahlt die Versicherung nicht.',
      'Ohne Absicherung haftest du mit deinem Privatvermögen.',
    ],
    solution: 'Wir entwickeln ein maßgeschneidertes Versicherungskonzept für dein Unternehmen – damit du dich auf dein Business konzentrieren kannst.',
    cta: 'Unternehmen absichern',
  },
  rente: {
    category: 'Versicherungen',
    title: 'Private Rentenversicherung',
    hook: 'Die gesetzliche Rente wird nicht reichen. Das ist keine Meinung – das sind Zahlen.',
    problems: [
      'Das Rentenniveau sinkt seit Jahren – wer heute 40 ist, bekommt im Alter deutlich weniger als erwartet.',
      'Wer zu spät anfängt, zahlt doppelt so viel für dasselbe Ergebnis.',
      'Ohne private Vorsorge riskierst du Altersarmut – trotz jahrzehntelanger Arbeit.',
    ],
    solution: 'Wir finden das staatlich geförderte Vorsorgemodell, das zu deiner Lebenssituation passt – und das sich wirklich rechnet.',
    cta: 'Vorsorgelücke berechnen',
  },
  hinterbliebene: {
    category: 'Versicherungen',
    title: 'Hinterbliebenenvorsorge',
    hook: 'Was passiert mit deiner Familie, wenn du morgen nicht mehr da bist?',
    problems: [
      'Die gesetzliche Witwen- und Waisenrente deckt nur einen Bruchteil des tatsächlichen Bedarfs.',
      'Kredite, Miete und Lebenshaltungskosten laufen weiter – auch ohne dein Einkommen.',
      'Viele schieben das Thema auf – und hinterlassen ihre Familie ungeschützt.',
    ],
    solution: 'Wir sichern deine Familie mit dem richtigen Schutz ab – Risikolebensversicherung, Sterbegeldversicherung und mehr. Günstig, schnell, wirksam.',
    cta: 'Familie jetzt absichern',
  },
  immobilien: {
    category: 'Vermögensaufbau',
    title: 'Immobilien',
    hook: 'Immobilien machen reich – aber nur, wenn man weiß, welche man kauft, wo man finanziert und wann man einsteigt.',
    problems: [
      'Wer falsch finanziert, zahlt Zehntausende Euro zu viel – über die Laufzeit.',
      'Die meisten kaufen emotional statt strategisch – und bereuen es.',
      'Ohne Marktzugang bekommst du nicht die besten Objekte und nicht die besten Konditionen.',
    ],
    solution: 'Wir begleiten dich beim Kauf der richtigen Immobilie – mit Zugang zu über 500 Banken, objektiver Bewertung und jahrelanger Erfahrung.',
    cta: 'Immobilienberatung starten',
  },
  sparprodukte: {
    category: 'Vermögensaufbau',
    title: 'Sparprodukte',
    hook: 'Geld auf dem Girokonto zu lassen ist keine Strategie – es ist ein schleichender Vermögensverlust.',
    problems: [
      'Inflation frisst dein Erspartes auf – 3% Inflation bedeuten in 10 Jahren 26% weniger Kaufkraft.',
      'Die meisten Sparer nutzen Produkte, die sich für die Bank rechnen – nicht für sie.',
      'Ohne Struktur bleibt Sparen zufällig und ineffizient.',
    ],
    solution: 'Wir strukturieren dein Sparverhalten mit den richtigen Produkten – von Tagesgeld bis Bausparvertrag – passend zu deinen Zielen.',
    cta: 'Sparstrategie entwickeln',
  },
  geldanlagen: {
    category: 'Vermögensaufbau',
    title: 'Geldanlagen',
    hook: 'Wer sein Geld nicht für sich arbeiten lässt, arbeitet sein Leben lang für Geld.',
    problems: [
      'Die meisten legen ihr Geld zu konservativ an und verlieren real an Wert.',
      'Ohne Strategie und Diversifikation ist jede Geldanlage ein Glücksspiel.',
      'Banken empfehlen oft die Produkte, die ihnen am meisten einbringen – nicht dir.',
    ],
    solution: 'Wir entwickeln eine wissenschaftlich fundierte Anlagestrategie mit ETFs, Fonds und weiteren Instrumenten – unabhängig und auf dich zugeschnitten.',
    cta: 'Anlagestrategie erstellen',
  },
  vorsorge: {
    category: 'Vermögensaufbau',
    title: 'Vorsorgekonzepte',
    hook: 'Die Rentenlücke ist real. Und je später du handelst, desto teurer wird es.',
    problems: [
      'Viele unterschätzen, wie viel Geld sie im Alter tatsächlich brauchen werden.',
      'Staatliche Förderungen wie Riester, Rürup oder bAV werden massiv unterschätzt.',
      'Ohne ganzheitliches Konzept verlierst du bares Geld – durch Steuern, Gebühren und falsche Produkte.',
    ],
    solution: 'Wir erstellen dein persönliches Vorsorgekonzept – mit allen staatlichen Förderungen, steueroptimiert und auf deine Ziele ausgerichtet.',
    cta: 'Rentenlücke berechnen',
  },
  finanzierungen: {
    category: 'Vermögensaufbau',
    title: 'Finanzierungen',
    hook: 'Der Unterschied zwischen einer guten und einer schlechten Finanzierung kann dich leicht 50.000 € kosten.',
    problems: [
      'Wer nur bei seiner Hausbank fragt, bekommt selten das beste Angebot.',
      'Kleine Unterschiede im Zinssatz machen über 20 Jahre einen riesigen Unterschied.',
      'Ohne Vergleich bezahlst du zu viel – oft ohne es zu merken.',
    ],
    solution: 'Wir vergleichen für dich über 500 Banken und Finanzierungspartner – für Immobilien, Fahrzeuge und mehr. Der beste Zins für dich.',
    cta: 'Finanzierung vergleichen',
  },
  aktien: {
    category: 'Vermögensaufbau',
    title: 'Aktien',
    hook: 'Die reichsten Menschen der Welt haben eines gemeinsam: Sie besitzen Unternehmensanteile. Du auch?',
    problems: [
      'Viele trauen sich nicht an Aktien – und verpassen damit die kraftvollste Form des Vermögensaufbaus.',
      'Ohne Strategie ist der Aktienmarkt ein Casino. Mit Strategie ist er eine Maschine.',
      'Wer zu spät einsteigt oder emotional handelt, verliert – systematisch.',
    ],
    solution: 'Wir begleiten dich beim Einstieg in den Kapitalmarkt – mit klarer Strategie, langfristiger Perspektive und wissenschaftlich belegten Ansätzen.',
    cta: 'Kapitalmarkt-Beratung starten',
  },
  vwl: {
    category: 'Vermögensaufbau',
    title: 'Vermögenswirksame Leistungen',
    hook: 'Dein Arbeitgeber zahlt dir Geld für den Vermögensaufbau – nutzt du es schon?',
    problems: [
      'Viele Arbeitnehmer wissen nicht, dass ihr Arbeitgeber bis zu 40 € monatlich als VWL-Zuschuss zahlt – Geld, das einfach verfällt.',
      'Ohne den richtigen Anlagevertrag fließen die VWL auf ein schlechtverzinstes Konto und verlieren real an Wert.',
      'Staatliche Arbeitnehmer-Sparzulage wird nicht beantragt, weil niemand über die Voraussetzungen informiert hat.',
    ],
    solution: 'Wir richten deinen VWL-Vertrag optimal ein – passend zu deinem Einkommen, deinen staatlichen Förderansprüchen und deiner langfristigen Anlagestrategie. So holst du das Maximum aus deinem Arbeitgeberzuschuss heraus.',
    cta: 'VWL kostenlos optimieren',
  },
};

const ServiceDetailPage = ({ serviceKey, color, onPageChange }: { serviceKey: ServiceKey; color: string; onPageChange: (p: Page) => void }) => {
  const data = SERVICE_DATA[serviceKey];
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [serviceKey]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-36 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#1E293B]/40 mb-10">
          <button onClick={() => onPageChange('leistungen')} className="hover:text-[#1E293B] transition-colors">Leistungen</button>
          <ChevronRight className="w-3 h-3" />
          <span style={{ color }}>{data.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1E293B]/70">{data.title}</span>
        </div>

        {/* Header */}
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color }}>{data.category}</p>
        <h1 className="text-3xl md:text-7xl font-bold text-[#1E293B] mb-8 leading-tight">{data.title}</h1>

        {/* Hook */}
        <p className="text-xl md:text-2xl text-[#1E293B]/80 leading-relaxed mb-16 max-w-3xl font-medium">{data.hook}</p>

        {/* Problems */}
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase text-[#1E293B]/40 mb-6">Das Problem</h2>
          <div className="flex flex-col gap-4">
            {data.problems.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-black/5 shadow-sm">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ backgroundColor: color }}>
                  {i + 1}
                </div>
                <p className="text-[#1E293B]/75 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div className="mb-16 p-8 rounded-3xl text-white" style={{ backgroundColor: color }}>
          <h2 className="text-sm font-bold tracking-widest uppercase text-white/60 mb-4">Unsere Lösung</h2>
          <p className="text-xl leading-relaxed font-medium">{data.solution}</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => onPageChange('kontakt')} className="px-12 py-5 text-white font-bold rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg" style={{ backgroundColor: color }}>
            {data.cta}
          </button>
          <p className="mt-4 text-sm text-[#1E293B]/40">Kostenlos • Unverbindlich • In wenigen Minuten</p>
        </div>

      </div>
    </div>
  );
};

// ─── Leistungen Page ─────────────────────────────────────────────────────────────
const VERSICHERUNGEN: { title: string; desc: string; key: ServiceKey }[] = [
  { key: 'krankenversicherung', title: 'Krankenversicherung',      desc: 'Gesetzlich oder privat – wir finden die optimale Absicherung für deine Gesundheit und deinen Geldbeutel.' },
  { key: 'arbeitskraft',        title: 'Arbeitskraftabsicherung',  desc: 'Deine Arbeitskraft ist dein größtes Kapital. Wir sichern sie ab – bevor es zu spät ist.' },
  { key: 'kfz',                 title: 'KFZ-Versicherung',         desc: 'Der beste Schutz für dein Fahrzeug zum besten Preis – unabhängig verglichen.' },
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
  { key: 'finanzierungen',title: 'Finanzierungen',                  desc: 'Günstige Finanzierungen für Immobilien, Fahrzeuge und mehr – unabhängig verglichen.' },
  { key: 'aktien',        title: 'Aktien',                          desc: 'Direkte Beteiligungen am Kapitalmarkt – mit fundierter Beratung und klarer Strategie.' },
  { key: 'vwl',           title: 'Vermögenswirksame Leistungen',   desc: 'Arbeitgeberzuschuss und staatliche Förderung optimal nutzen – für maximalen Vermögensaufbau ohne Mehrkosten.' },
];

const LeistungenPage = ({ color, onPageChange, onService }: { color: string; onPageChange: (p: Page) => void; onService: (k: ServiceKey) => void }) => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-36 pb-24">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color }}>Was wir für dich tun</p>
        <h1 className="text-3xl md:text-7xl font-bold text-[#1E293B] mb-6 leading-tight">Unsere Leistungen</h1>
        <p className="text-[#1E293B]/60 text-lg max-w-2xl leading-relaxed">
          Jahrelanges Vertrauen von tausenden Kunden bekommt man nicht geschenkt. Wir beraten unabhängig, wissenschaftlich fundiert und vollständig digital – für das beste Ergebnis für dich.
        </p>
      </div>

      {/* 3 Differentiators */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck className="w-7 h-7" />, title: 'Ungebunden', desc: 'Wir sind an keinen Anbieter gebunden und rechtlich zur besten Beratung verpflichtet – ohne versteckte Provisionsinteressen.' },
            { icon: <BarChart3 className="w-7 h-7" />, title: 'Wissenschaftlich', desc: 'Unsere Strategien basieren auf Finanzmathematik und wissenschaftlich bewiesenen Methoden – nicht auf Bauchgefühl.' },
            { icon: <Zap className="w-7 h-7" />, title: 'Digital & Effizient', desc: 'Durch digitale Prozesse sparen wir Zeit und Kosten – und geben diese Vorteile direkt an dich weiter.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-8 rounded-2xl bg-white border border-black/5 shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: color + '18', color }}>
                {icon}
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">{title}</h3>
              <p className="text-[#1E293B]/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Versicherungen */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1 h-10 rounded-full" style={{ backgroundColor: color }} />
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#1E293B]/40 mb-1">Absicherung</p>
            <h2 className="text-3xl font-bold text-[#1E293B]">Versicherungen</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERSICHERUNGEN.map(({ title, desc, key }) => (
            <div key={title} className="group p-7 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all cursor-pointer" onClick={() => onService(key)}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-bold text-[#1E293B]">{title}</h3>
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
              <p className="text-sm text-[#1E293B]/55 leading-relaxed">{desc}</p>
              <div className="mt-5 pt-4 border-t border-black/5">
                <span className="text-xs font-semibold" style={{ color }}>Mehr erfahren →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vermögensaufbau */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1 h-10 rounded-full" style={{ backgroundColor: color }} />
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#1E293B]/40 mb-1">Wachstum</p>
            <h2 className="text-3xl font-bold text-[#1E293B]">Vermögensaufbau</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VERMOEGEN.map(({ title, desc, key }) => (
            <div key={title} className="group p-7 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all cursor-pointer" onClick={() => onService(key)}>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-base font-bold text-[#1E293B]">{title}</h3>
                <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }} />
              </div>
              <p className="text-sm text-[#1E293B]/55 leading-relaxed">{desc}</p>
              <div className="mt-5 pt-4 border-t border-black/5">
                <span className="text-xs font-semibold" style={{ color }}>Mehr erfahren →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl p-12 text-center text-white" style={{ backgroundColor: color }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Bereit für deine Beratung?</h2>
          <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">Kostenlos, unverbindlich und in wenigen Minuten erledigt.</p>
          <button onClick={() => onPageChange('kontakt')} className="px-10 py-4 bg-white font-bold rounded-full text-lg hover:opacity-90 transition-opacity" style={{ color }}>
            Jetzt kostenlos beraten lassen
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Kontakt Page ────────────────────────────────────────────────────────────────
const KontaktPage = ({ color, onPageChange }: { color: string; onPageChange: (p: Page) => void }) => {
  const [form, setForm] = useState({ name: '', plz: '', email: '', tel: '', nachricht: '', datenschutz: false });
  const [sent, setSent] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up real form submission
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-36 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Contact Form ── */}
          <div>
            <h1 className="text-2xl md:text-5xl font-bold text-[#1E293B] mb-6">Kontaktformular</h1>
            <p className="text-[#1E293B]/70 mb-10 leading-relaxed max-w-lg">
              Wir freuen uns sehr, dass du dich entschieden hast zu handeln und deine offenen Fragen zu klären. Schreibe uns hier kurz deine Nachricht und wir melden uns spätestens nach 48 Stunden bei dir zurück, um mit dir einen Termin für ein kostenloses Erstgespräch zu vereinbaren.
            </p>

            {sent ? (
              <div className="p-8 rounded-2xl border-2 text-center" style={{ borderColor: color }}>
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color }} />
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Nachricht gesendet!</h3>
                <p className="text-[#1E293B]/60">Wir melden uns innerhalb von 48 Stunden bei dir.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Vorname und Nachname" className="border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white text-[#1E293B] placeholder:text-[#1E293B]/40" />
                  <input value={form.plz} onChange={e => setForm({...form, plz: e.target.value})} placeholder="Postleitzahl" className="border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white text-[#1E293B] placeholder:text-[#1E293B]/40" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="E-Mail" className="border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white text-[#1E293B] placeholder:text-[#1E293B]/40" />
                  <input value={form.tel} onChange={e => setForm({...form, tel: e.target.value})} placeholder="Telefonnummer" className="border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white text-[#1E293B] placeholder:text-[#1E293B]/40" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1E293B]/70 mb-2">Deine Nachricht</label>
                  <textarea required value={form.nachricht} onChange={e => setForm({...form, nachricht: e.target.value})} placeholder="Liebes DK Finanzkanzlei-Team, ..." rows={5} className="w-full border border-[#1E293B]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1E293B]/50 bg-white resize-none text-[#1E293B] placeholder:text-[#1E293B]/40" />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input required type="checkbox" checked={form.datenschutz} onChange={e => setForm({...form, datenschutz: e.target.checked})} className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#1E293B]" />
                  <span className="text-xs text-[#1E293B]/60 leading-relaxed">
                    Ich bin einverstanden, dass die eingegebenen Daten zur Bearbeitung meines Anliegens verwendet werden. Weitere Informationen findest du in der{' '}
                    <button type="button" onClick={() => onPageChange('datenschutz')} className="underline" style={{ color }}>Datenschutzerklärung</button>.{' '}
                    Deine Einwilligung kannst du jederzeit widerrufen. Hierzu genügt eine E-Mail an{' '}
                    <a href="mailto:info@dk-finanzkanzlei.de" className="underline" style={{ color }}>info@dk-finanzkanzlei.de</a> <span className="text-red-500">*</span>
                  </span>
                </label>
                <button type="submit" className="w-full py-4 text-white font-semibold rounded-xl text-sm tracking-wide hover:opacity-90 transition-opacity" style={{ backgroundColor: color }}>
                  Absenden
                </button>
              </form>
            )}

            {/* Contact info */}
            <div className="mt-10 flex flex-col gap-5">
              <a href="tel:+491731038570" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
                  <svg className="w-5 h-5" style={{ color }} fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                </div>
                <span className="text-lg font-bold text-[#1E293B] group-hover:opacity-70 transition-opacity">+49 173 1038570</span>
              </a>
              <a href="mailto:info@dk-finanzkanzlei.de" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
                  <svg className="w-5 h-5" style={{ color }} fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <span className="text-lg font-bold text-[#1E293B] group-hover:opacity-70 transition-opacity">info@dk-finanzkanzlei.de</span>
              </a>
            </div>
          </div>

          {/* ── Right: Google Calendar ── */}
          <div className="lg:sticky lg:top-36">
            <div className="mb-4">
              <p className="text-xs font-bold tracking-widest uppercase mb-1 text-[#1E293B]/40">Oder direkt</p>
              <h2 className="text-2xl font-bold text-[#1E293B]">Termin buchen</h2>
              <p className="text-sm text-[#1E293B]/60 mt-1">Wähle direkt einen passenden Zeitslot aus – kostenlos & unverbindlich.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-white" style={{ height: 680 }}>
              <iframe
                src="https://calendar.google.com/calendar/u/0/appointments/AcZssZ0XOK3fyXkX0sX-D4_HMuAMb4zUDce51Bb9wKg="
                width="100%"
                height="100%"
                frameBorder="0"
                title="Termin buchen"
              />
            </div>
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
};

const PATH_TO_PAGE: Record<string, Page> = {
  '/':            'home',
  '/ueber-uns':   'ueberuns',
  '/impressum':   'impressum',
  '/datenschutz': 'datenschutz',
  '/kontakt':     'kontakt',
  '/leistungen':  'leistungen',
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
  const [brand, setBrand] = useState<Brand>('dk');
  const [prevIndex, setPrevIndex] = useState(0);

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

  const direction = BRAND_ORDER.indexOf(brand) >= prevIndex ? 1 : -1;

  const handleBrandChange = (b: Brand) => {
    if (b === brand) return;
    setPrevIndex(BRAND_ORDER.indexOf(brand));
    setBrand(b);
  };


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
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
    exit: (dir: number) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.35, ease: 'easeIn' as const } }),
  };

  return (
    <div className="min-h-screen selection:bg-[#4d7abd] selection:text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={brand}
          className="bg-building"
          style={{ backgroundImage: `url('${BRAND_BG[brand]}')` }}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <CookieBanner onDatenschutz={() => navigate('datenschutz')} />
      <Navbar brand={brand} onBrandChange={(b) => { handleBrandChange(b); navigate('home'); }} onPageChange={navigate} currentPage={page} onService={goToService} />
      <AnimatePresence mode="wait" custom={direction}>
        {page === 'ueberuns' ? (
          <motion.div key="ueberuns" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <UeberUnsContent />
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'impressum' ? (
          <motion.div key="impressum" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <ImpressumContent />
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'datenschutz' ? (
          <motion.div key="datenschutz" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <DatenschutzContent />
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'service' ? (
          <motion.div key={`service-${currentService}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <ServiceDetailPage serviceKey={currentService} color={BRANDS[brand].color} onPageChange={navigate} />
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'leistungen' ? (
          <motion.div key="leistungen" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <LeistungenPage color={BRANDS[brand].color} onPageChange={navigate} onService={goToService} />
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        ) : page === 'kontakt' ? (
          <motion.div key="kontakt" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
            <KontaktPage color={BRANDS[brand].color} onPageChange={navigate} />
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        ) : (
          <motion.div key={brand} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit">
            {brand === 'dk' && <DKContent onPageChange={navigate} />}
            {brand === 'vorsorge' && <VorsorgeContent onPageChange={navigate} />}
            {brand === 'immo' && <ImmoContent onPageChange={navigate} />}
            <Footer color={BRANDS[brand].color} onPageChange={navigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
