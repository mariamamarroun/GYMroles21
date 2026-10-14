"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Dumbbell,
  Flame,
  Menu,
  MoveUpRight,
  Play,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { SupplementsSection } from "@/components/SupplementsSection";

const categories = [
  { title: "MUSCULATION", text: "Développe ta masse et ta force.", icon: Dumbbell, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85" },
  { title: "HIIT & CARDIO", text: "Brûle des calories et améliore ton endurance.", icon: Flame, image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85" },
  { title: "FORCE & POWER", text: "Augmente ta puissance et tes performances.", icon: Zap, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=85" },
  { title: "MOBILITÉ", text: "Améliore ta mobilité et préviens les blessures.", icon: Sparkles, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85" },
];

const benefits = [
  ["01", "PROGRAMMES PERSONNALISÉS", "Des entraînements adaptés à ton niveau et à tes objectifs."],
  ["02", "NUTRITION ADAPTÉE", "Des plans alimentaires pour optimiser tes résultats."],
  ["03", "SUIVI & PROGRESSION", "Suis tes performances et progresse chaque jour."],
  ["04", "COMMUNAUTÉ MOTIVANTE", "Rejoins une communauté qui te pousse à te dépasser."],
];

const plans = [
  { name: "BASIC", price: "29€", note: "Idéal pour commencer", features: ["Accès libre 6j/7", "3 programmes guidés", "Suivi des performances"] },
  { name: "PREMIUM", price: "59€", note: "Pour des résultats optimaux", popular: true, features: ["Accès illimité 7j/7", "Programmes personnalisés", "Plan nutrition adapté", "Bilan mensuel avec un coach"] },
  { name: "ULTIMATE", price: "99€", note: "Accompagnement complet", features: ["Tout le plan Premium", "Coach dédié", "Accès zone recovery", "Bilan hebdomadaire"] },
];

const testimonials = [
  { quote: "Je n'avais jamais réussi à tenir une routine. Ici, chaque séance me donne envie de revenir.", name: "Sarah M.", result: "-12KG EN 3 MOIS", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80" },
  { quote: "Une énergie différente, une vraie communauté et des résultats que je peux enfin mesurer.", name: "Yanis B.", result: "+40KG AU SQUAT", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" },
  { quote: "Le coaching est précis, humain et exigeant. J'ai dépassé des limites que je croyais fixes.", name: "Léa R.", result: "PREMIÈRE COMPÉTITION", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion || !ref.current) {
      setCount(value);
      return;
    }

    const node = ref.current;
    let frame = 0;
    let start: number | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const animate = (time: number) => {
        start ??= time;
        const progress = Math.min((time - start) / 1100, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, value]);

  return <span ref={ref}>{count.toLocaleString("fr-FR")}{suffix}</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const reducedMotion = useReducedMotion();
  const current = testimonials[testimonial];

  const moveTestimonial = (direction: number) => {
    setTestimonial((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  return (
    <main className="ironforge-page overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#4ade80] selection:text-black">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="flex size-9 items-center justify-center bg-[#4ade80] text-black"><Zap className="size-5 fill-current" /></span>
            <span><strong className="block text-sm font-black tracking-[0.2em]">IRONFORGE</strong><small className="block text-[8px] font-bold tracking-[0.35em] text-[#4ade80]">BUILT DIFFERENT</small></span>
          </Link>
          <div className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[76px] flex-col gap-6 border-b border-white/10 bg-[#0a0a0a] p-6 lg:static lg:flex lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0`}>
            {["ACCUEIL", "PROGRAMMES", "COACHS", "À PROPOS", "BLOG", "CONTACT"].map((item, index) => <a key={item} href={index === 0 ? "#accueil" : `#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setMenuOpen(false)} className={`text-[11px] font-bold tracking-[0.14em] transition-colors hover:text-[#4ade80] ${index === 0 ? "text-[#4ade80]" : "text-white/65"}`}>{item}</a>)}
            <div className="flex flex-col gap-3 sm:flex-row lg:ml-4"><Link href="/login" className="border border-[#4ade80]/70 px-5 py-3 text-center text-[10px] font-bold tracking-[0.12em] text-[#4ade80] transition hover:bg-[#4ade80] hover:text-black">SE CONNECTER</Link><a href="#pricing" className="bg-[#4ade80] px-5 py-3 text-center text-[10px] font-black tracking-[0.12em] text-black transition hover:bg-[#86efac]">COMMENCER</a></div>
          </div>
          <button type="button" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} className="lg:hidden" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <section id="accueil" className="relative mx-auto grid min-h-[760px] max-w-[1320px] items-center gap-10 px-5 pb-20 pt-36 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pt-32">
        <motion.div
          className="relative z-10"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.08 }}
        >
          <p className="mb-7 flex items-center gap-3 text-[10px] font-bold tracking-[0.32em] text-[#4ade80]"><span className="h-px w-8 bg-[#4ade80]" /> NO ORDINARY GYM</p>
          <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 18 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }} className="font-heading text-[clamp(4.6rem,12vw,10rem)] font-black leading-[0.8] tracking-[-0.07em]"><span className="block">FORGE</span><span className="block text-[#4ade80]">YOUR</span><span className="block text-[#4ade80]">STRENGTH</span></motion.h1>
          <motion.p initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }} className="mt-9 max-w-md text-sm font-medium uppercase tracking-[0.16em] text-white/60">Transforme ton corps.<br />Dépasse tes limites.</motion.p>
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }} className="mt-9 flex flex-wrap gap-3"><motion.a whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }} href="#pricing" className="inline-flex items-center gap-3 bg-[#4ade80] px-6 py-4 text-[11px] font-black tracking-[0.1em] text-black transition hover:bg-[#86efac]">COMMENCER MAINTENANT <ArrowDownRight className="size-4" /></motion.a><motion.a whileHover={reducedMotion ? undefined : { y: -3 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }} href="#programmes" className="inline-flex items-center gap-3 border border-[#4ade80]/70 px-6 py-4 text-[11px] font-bold tracking-[0.08em] text-[#4ade80] transition hover:bg-[#4ade80] hover:text-black">DÉCOUVRIR <Play className="size-3 fill-current" /></motion.a></motion.div>
          <div className="mt-12 flex items-center gap-4"><div className="flex -space-x-3">{["photo-1534528741775-53994a69daeb", "photo-1506794778202-cad84cf45f1d", "photo-1438761681033-6461ffad8d80", "photo-1507003211169-0a1dd7228f2d"].map((image) => <img key={image} src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=80&q=80`} alt="Membre Ironforge" className="size-9 rounded-full border-2 border-[#0a0a0a] object-cover" />)}</div><div><p className="text-[10px] font-bold tracking-[0.08em]">+15K MEMBRES TRANSFORMÉS</p><p className="mt-1 text-xs text-[#4ade80]">★★★★★ <span className="text-white/45">4.9/5</span></p></div></div>
        </motion.div>
        <div className="relative min-h-[450px] lg:min-h-[650px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1400&q=85')] bg-cover bg-center grayscale-[15%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/20" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute bottom-7 right-5 border border-[#4ade80]/50 bg-[#0a0a0a]/80 px-4 py-3 backdrop-blur-sm"><p className="text-[9px] font-bold tracking-[0.2em] text-[#4ade80]">IRONFORGE 20</p><p className="mt-1 text-[9px] text-white/50">FORGED FOR MORE</p></div>
          <div className="absolute -right-1 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"><span className="text-xs text-[#4ade80]">01</span><span className="h-16 w-px bg-[#4ade80]" /><span className="text-xs text-white/35">02</span><span className="text-xs text-white/35">03</span></div>
        </div>
      </section>

      <section id="programmes" className="mx-auto max-w-[1320px] px-5 py-24 lg:px-8"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#4ade80]">01 / TRAIN WITH PURPOSE</p><h2 className="font-heading text-5xl font-black tracking-[-0.04em] md:text-7xl">CHOOSE YOUR <span className="text-[#4ade80]">FIGHT.</span></h2></div><ArrowRight className="mb-2 hidden size-8 text-[#4ade80] md:block" /></div><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{categories.map(({ title, text, icon: Icon, image }) => <motion.a key={title} href="#pricing" whileHover={reducedMotion ? undefined : { y: -6, boxShadow: "0 18px 38px rgba(74, 222, 128, 0.12)" }} transition={{ duration: 0.24, ease: "easeOut" }} className="group relative min-h-[360px] overflow-hidden border border-white/10 bg-[#0f1f17]"><img src={image} alt={title} className="absolute inset-0 size-full object-cover opacity-55 grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" /><div className="relative flex h-full flex-col justify-between p-5"><Icon className="size-7 text-[#4ade80]" /><div><h3 className="font-heading text-3xl font-black tracking-tight">{title}</h3><p className="mt-2 max-w-[210px] text-xs leading-relaxed text-white/60">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#4ade80]">EXPLORER <MoveUpRight className="size-3" /></span></div></div></motion.a>)}</div></section>

      <section className="border-y border-[#4ade80]/20 bg-[#0f1f17] px-5 py-12 lg:px-8"><div className="mx-auto grid max-w-[1320px] gap-8 md:grid-cols-2 lg:grid-cols-4">{benefits.map(([number, title, text]) => <div key={number} className="border-l border-[#4ade80]/50 pl-5"><span className="text-xs font-bold text-[#4ade80]">{number}</span><h3 className="mt-5 text-xs font-black tracking-widest">{title}</h3><p className="mt-3 max-w-[230px] text-xs leading-relaxed text-white/50">{text}</p></div>)}</div></section>

      <SupplementsSection />

      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#4ade80]">03 / THE NUMBERS</p><h2 className="font-heading text-6xl font-black leading-none md:text-8xl">BUILT<br /><span className="text-[#4ade80]">TO LAST.</span></h2></div><div className="grid grid-cols-2 gap-x-5 gap-y-12 border-t border-white/15 pt-8 sm:grid-cols-4 lg:pt-0 lg:border-t-0">{[[15000, "+", "MEMBRES ACTIFS"], [100, "+", "PROGRAMMES"], [2000000, "+", "ENTRAÎNEMENTS"], [98, "%", "SATISFACTION"]].map(([number, suffix, label]) => <motion.div key={label} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.45, ease: "easeOut" }}><p className="font-heading text-5xl font-black text-[#4ade80]"><CountUp value={Number(number)} suffix={String(suffix)} /></p><p className="mt-3 max-w-[100px] text-[9px] font-bold tracking-widest text-white/45">{label}</p></motion.div>)}</div></section>

      <section id="pricing" className="bg-[#0f1f17] px-5 py-24 lg:px-8"><div className="mx-auto max-w-[1320px]"><div className="mb-12 text-center"><p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#4ade80]">04 / NO EXCUSES</p><h2 className="font-heading text-5xl font-black md:text-7xl">CHOISIS TON <span className="text-[#4ade80]">PLAN.</span></h2></div><div className="grid items-stretch gap-4 lg:grid-cols-3">{plans.map((plan) => <motion.div key={plan.name} whileHover={reducedMotion ? undefined : { y: -6, boxShadow: "0 18px 38px rgba(74, 222, 128, 0.12)" }} transition={{ duration: 0.24, ease: "easeOut" }} className={`relative flex flex-col border p-7 ${plan.popular ? "border-[#4ade80] bg-gradient-to-b from-[#193c27] to-[#0c1710] lg:-translate-y-4" : "border-white/10 bg-[#0a0a0a]/50"}`}>{plan.popular && <span className="absolute right-5 top-5 bg-[#4ade80] px-2 py-1 text-[9px] font-black tracking-widest text-black">LE PLUS POPULAIRE</span>}<h3 className="font-heading text-3xl font-black">{plan.name}</h3><p className="mt-7 font-heading text-6xl font-black text-[#4ade80]">{plan.price}<span className="font-sans text-xs font-normal text-white/50"> / MOIS</span></p><p className="mt-3 text-xs text-white/55">{plan.note}</p><ul className="my-8 space-y-4 border-t border-white/10 pt-7">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-xs text-white/75"><Check className="size-4 shrink-0 text-[#4ade80]" />{feature}</li>)}</ul><motion.a whileTap={reducedMotion ? undefined : { scale: 0.97 }} href="#contact" className={`mt-auto flex items-center justify-center gap-2 px-5 py-4 text-[10px] font-black tracking-widest transition hover:-translate-y-1 ${plan.popular ? "bg-[#4ade80] text-black hover:bg-[#86efac]" : "border border-[#4ade80] text-[#4ade80] hover:bg-[#4ade80] hover:text-black"}`}>CHOISIR CE PLAN <ArrowRight className="size-4" /></motion.a></motion.div>)}</div></div></section>

      <section id="contact" className="mx-auto max-w-[1320px] px-5 py-24 lg:px-8"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#4ade80]">04 / REAL PEOPLE. REAL WORK.</p><h2 className="font-heading text-5xl font-black md:text-7xl">THEY DID<br /><span className="text-[#4ade80]">THE WORK.</span></h2></div><div className="flex gap-2"><button type="button" aria-label="Témoignage précédent" onClick={() => moveTestimonial(-1)} className="border border-white/20 p-3 text-white/60 transition hover:border-[#4ade80] hover:text-[#4ade80]"><ArrowLeft className="size-4" /></button><button type="button" aria-label="Témoignage suivant" onClick={() => moveTestimonial(1)} className="border border-[#4ade80] p-3 text-[#4ade80] transition hover:bg-[#4ade80] hover:text-black"><ArrowRight className="size-4" /></button></div></div><div className="grid gap-4 md:grid-cols-3">{testimonials.map((item, index) => <article key={item.name} className={`border border-white/10 bg-[#0f1f17] p-6 transition ${index === testimonial ? "md:scale-[1.03] md:border-[#4ade80]/60" : "opacity-60"}`}><div className="flex items-center gap-3"><img src={item.image} alt={item.name} className="size-11 rounded-full object-cover grayscale" /><div><p className="text-sm font-bold">{item.name}</p><p className="mt-1 text-[10px] font-bold tracking-widest text-[#4ade80]">{item.result}</p></div></div><p className="mt-8 text-sm leading-relaxed text-white/65">“{item.quote}”</p></article>)}</div><div className="mt-8 text-center text-[10px] font-bold tracking-widest text-white/30">{current.name} · {testimonial + 1} / {testimonials.length}</div></section>

      <footer className="border-t border-white/10 px-5 py-8 lg:px-8"><div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-5 text-[10px] font-bold tracking-widest text-white/40 sm:flex-row"><span>© 2026 IRONFORGE. BUILT DIFFERENT.</span><span>FORGED WITH DISCIPLINE <span className="text-[#4ade80]">●</span></span></div></footer>
    </main>
  );
}
