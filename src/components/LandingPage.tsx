import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  TrendingUp, 
  ShieldCheck, 
  PieChart, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Menu,
  X,
  Wallet,
  Calculator,
  Building2
} from 'lucide-react';

// --- Components ---

// --- Constants ---

const LOGO_SRC = "/dk-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={LOGO_SRC}
            alt="DK Finanzkanzlei"
            className="h-12 w-auto object-contain"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#services" className="hover:text-white transition-colors">Leistungen</a>
          <a href="#about" className="hover:text-white transition-colors">Über uns</a>
          <a href="#proof" className="hover:text-white transition-colors">Erfolge</a>
          <button className="relative px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-white/90 transition-all overflow-hidden group">
            <span className="relative z-10">Kostenlose Beratung</span>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-6"
        >
          <a href="#services" onClick={() => setIsOpen(false)}>Leistungen</a>
          <a href="#about" onClick={() => setIsOpen(false)}>Über uns</a>
          <a href="#proof" onClick={() => setIsOpen(false)}>Erfolge</a>
          <button className="w-full py-3 bg-white text-black rounded-lg font-semibold">
            Kostenlose Beratung
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      title: "Finanzplanung",
      desc: "Ganzheitliche Strategien für jede Lebensphase.",
      icon: <PieChart className="w-6 h-6 text-blue-400" />,
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Steueroptimierung",
      desc: "Hol dir dein Geld vom Staat zurück.",
      icon: <Calculator className="w-6 h-6 text-emerald-400" />,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Wealth Building",
      desc: "ETFs, Immobilien & alternative Investments.",
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      className: "md:col-span-1 md:row-span-2"
    },
    {
      title: "Versicherungen",
      desc: "Smarte Absicherung ohne unnötige Kosten.",
      icon: <ShieldCheck className="w-6 h-6 text-red-400" />,
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: "Langfristige Begleitung",
      desc: "Wir bleiben an deiner Seite, wenn sich das Leben ändert.",
      icon: <CheckCircle2 className="w-6 h-6 text-orange-400" />,
      className: "md:col-span-3 md:row-span-1"
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Unsere Expertise</h2>
          <p className="text-white/40">Maßgeschneiderte Lösungen für deine finanziellen Ziele.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className={`glow-card p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col justify-between group ${s.className}`}
            >
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  {s.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
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
  );
};

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium tracking-widest uppercase mb-8">
            <span className="text-blue-400">●</span> Unabhängig & Persönlich
          </span>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Hör auf, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Geld liegen zu lassen.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            Viele Menschen verschenken jährlich Tausende Euro an Steuervorteilen und staatlichen Förderungen. Wir helfen dir, dieses Potenzial zu heben und echtes Vermögen aufzubauen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 flex items-center gap-2">
                Kostenlose Beratung sichern <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="border-beam" />
            </button>
            <button className="px-8 py-4 border border-white/10 rounded-full font-semibold hover:bg-white/5 transition-colors backdrop-blur-sm">
              Unsere Strategie entdecken
            </button>
          </div>
        </motion.div>

        {/* Dotted Line Separator */}
        <div className="mt-32 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>
      </div>
    </section>
  );
};

const ValueProposition = () => {
  const cards = [
    {
      title: "Unabhängige Beratung",
      description: "Wir sind an keine Bank oder Versicherung gebunden. Unser einziger Maßstab ist dein finanzieller Erfolg.",
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      tag: "Objektivität"
    },
    {
      title: "Steueroptimierung",
      description: "Nutze staatliche Förderungen und Steuervorteile, die 90% der Menschen ignorieren. Dein Geld gehört dir.",
      icon: <Calculator className="w-8 h-8 text-emerald-400" />,
      tag: "Effizienz"
    },
    {
      title: "Strategischer Aufbau",
      description: "Kein Glücksspiel, sondern mathematisch fundierte Strategien mit ETFs und Immobilien für langfristige Freiheit.",
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      tag: "Wachstum"
    }
  ];

  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Warum DK Finanzkanzlei?</h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Finanzieller Erfolg ist kein Zufall, sondern das Ergebnis der richtigen Strategie. Wir begleiten dich auf jedem Schritt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glow-card group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {card.icon}
              </div>
              <div className="mb-6 p-3 w-fit rounded-2xl bg-white/5 border border-white/10">
                {card.icon}
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2 block">
                {card.tag}
              </span>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-white/60 leading-relaxed">
                {card.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/40 group-hover:text-white transition-colors cursor-pointer">
                Mehr erfahren <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DetailedValue = () => {
  const items = [
    {
      title: "Finanzplanung & Strategie",
      desc: "Ein maßgeschneiderter Fahrplan, der sich deiner Lebenssituation anpasst – nicht umgekehrt.",
      icon: <PieChart className="w-6 h-6" />
    },
    {
      title: "Vermögensaufbau (ETFs & Immobilien)",
      desc: "Wissenschaftlich fundierte Investments für nachhaltiges Wachstum ohne unnötiges Risiko.",
      icon: <Wallet className="w-6 h-6" />
    },
    {
      title: "Absicherung & Risikoschutz",
      desc: "Schütze das, was dir wichtig ist, mit den besten Tarifen am Markt zu fairen Konditionen.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-32 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Dein Partner für <br />
            <span className="text-blue-400">echte Sicherheit.</span>
          </h2>
          <p className="text-white/60 text-lg mb-12">
            Wir glauben nicht an Standardlösungen. Jeder Mensch hat andere Ziele, Ängste und Träume. Deshalb ist unsere Beratung so individuell wie dein Fingerabdruck.
          </p>
          
          <div className="space-y-8">
            {items.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center p-12">
             <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-mono text-white/40">Portfolio Performance</span>
                    <span className="text-emerald-400 text-sm font-bold">+12.4%</span>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${40 + i * 15}%` }}
                          className="h-full bg-blue-500/40"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold mb-2">€142.500</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">Optimiertes Kapital</p>
                </div>
             </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
        </div>
      </div>
    </section>
  );
};

const Proof = () => {
  const testimonials = [
    {
      name: "Michael S.",
      role: "Unternehmer",
      text: "Dank der DK Finanzkanzlei konnte ich meine Steuerlast massiv senken und das gesparte Geld direkt in meinen Vermögensaufbau reinvestieren. Absolut empfehlenswert!",
      avatar: "https://picsum.photos/seed/man1/100/100"
    },
    {
      name: "Sarah L.",
      role: "Ärztin",
      text: "Endlich jemand, der mir die komplexen Themen einfach erklärt. Ich fühle mich zum ersten Mal wirklich sicher in meinen finanziellen Entscheidungen.",
      avatar: "https://picsum.photos/seed/woman1/100/100"
    },
    {
      name: "Thomas K.",
      role: "IT-Berater",
      text: "Die Unabhängigkeit war mir wichtig. Hier wird nicht verkauft, sondern beraten. Die Strategie ist klar und die Ergebnisse sprechen für sich.",
      avatar: "https://picsum.photos/seed/man2/100/100"
    }
  ];

  return (
    <section id="proof" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Was unsere Mandanten sagen</h2>
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Über 500+ zufriedene Kunden</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full grayscale border border-white/10" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
              <p className="text-white/70 italic leading-relaxed">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-b from-blue-600 to-blue-900 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Bereit für deine <br /> finanzielle Freiheit?</h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Sichere dir jetzt dein kostenloses Erstgespräch und lass uns gemeinsam herausfinden, wie viel Potenzial in deinen Finanzen steckt.
          </p>
          <button className="px-10 py-5 bg-white text-blue-900 rounded-full font-bold text-xl hover:shadow-xl hover:shadow-white/20 transition-all active:scale-95">
            Kostenlose Beratung buchen
          </button>
          <p className="mt-6 text-sm text-white/60">
            Unverbindlich • 100% Unabhängig • In 2 Minuten erledigt
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <Building2 className="text-black w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tighter uppercase">DK Finanzkanzlei</span>
          </div>
          <p className="text-white/40 max-w-sm mb-8">
            Deine unabhängige Kanzlei für Vermögensaufbau und Steueroptimierung. Wir machen Finanzen einfach und profitabel.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-xs font-bold">IG</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <span className="text-xs font-bold">LI</span>
            </div>
          </div>
        </div>
        
        <div>
          <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Leistungen</h5>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="hover:text-white cursor-pointer transition-colors">Finanzplanung</li>
            <li className="hover:text-white cursor-pointer transition-colors">Steueroptimierung</li>
            <li className="hover:text-white cursor-pointer transition-colors">ETF-Investments</li>
            <li className="hover:text-white cursor-pointer transition-colors">Immobilien</li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-white/40">Rechtliches</h5>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="hover:text-white cursor-pointer transition-colors">Impressum</li>
            <li className="hover:text-white cursor-pointer transition-colors">Datenschutz</li>
            <li className="hover:text-white cursor-pointer transition-colors">Erstinformation</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
        <p>© 2026 DK Finanzkanzlei. Alle Rechte vorbehalten.</p>
        <p>Design inspiriert von Klarheit & Präzision.</p>
      </div>
    </footer>
  );
};

const DottedLine = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative my-20">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full" />
  </div>
);

export default function LandingPage() {
  // Mouse proximity effect for cards
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName('glow-card');
      for (const card of Array.from(cards) as HTMLElement[]) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white">
      <Navbar />
      <Hero />
      <DottedLine />
      <ServicesGrid />
      <DottedLine />
      <ValueProposition />
      <DottedLine />
      <DetailedValue />
      <DottedLine />
      <Proof />
      <CTA />
      <Footer />
    </div>
  );
}