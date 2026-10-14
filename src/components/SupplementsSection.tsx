"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ImageOff, ShoppingBag } from "lucide-react";

const supplements = [
  {
    name: "WHEY ISOLATE",
    description: "Récupération rapide, goût net.",
    price: "39€",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "CREATINE PURE",
    description: "Plus de puissance à chaque série.",
    price: "24€",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "BCAA RECOVERY",
    description: "Endurance et récupération ciblées.",
    price: "29€",
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "VITAMINS+",
    description: "Le quotidien soutenu, naturellement.",
    price: "19€",
    image: "https://hilifevitamins.com/cdn/shop/files/Codeage_850049609692_92644cf6-7af9-4f22-88c6-fef6a18c7c4c.jpg?v=1722377772",
  },
];

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex size-full items-center justify-center bg-[#13251a] text-[#4ade80]" role="img" aria-label={`${alt} — image indisponible`}>
        <ImageOff className="size-10 opacity-70" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover opacity-70 mix-blend-screen grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
      onError={() => setFailed(true)}
    />
  );
}

export function SupplementsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="supplements" className="border-y border-[#4ade80]/20 bg-[#0a0a0a] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[0.25em] text-[#4ade80]">02 / FUEL THE WORK</p>
            <h2 className="font-heading text-5xl font-black tracking-[-0.04em] md:text-7xl">COMPLÉMENTS <span className="text-[#4ade80]">IRON.</span></h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">Les essentiels sélectionnés pour soutenir chaque séance et chaque étape de ta progression.</p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-[#4ade80] transition hover:gap-3">VOIR LA COLLECTION <ArrowRight className="size-4" /></a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {supplements.map((product, index) => (
            <motion.article
              key={product.name}
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.06, ease: "easeOut" }}
              whileHover={reducedMotion ? undefined : { y: -6, boxShadow: "0 18px 38px rgba(74, 222, 128, 0.12)" }}
              className="group overflow-hidden border border-white/10 bg-[#0f1f17]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#13251a]">
                <ProductImage src={product.image} alt={product.name} />
                <span className="absolute left-4 top-4 border border-[#4ade80]/50 bg-[#0a0a0a]/80 px-2 py-1 text-[9px] font-black tracking-widest text-[#4ade80]">IRONFORGE LAB</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3"><div><h3 className="font-heading text-2xl font-black">{product.name}</h3><p className="mt-2 text-xs text-white/50">{product.description}</p></div><span className="shrink-0 text-lg font-black text-[#4ade80]">{product.price}</span></div>
                <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 border border-[#4ade80]/60 px-4 py-3 text-[10px] font-black tracking-widest text-[#4ade80] transition hover:bg-[#4ade80] hover:text-black active:scale-[0.98]"><ShoppingBag className="size-4" /> VOIR LE PRODUIT</button>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 flex items-center gap-2 text-[10px] text-white/35"><Check className="size-3 text-[#4ade80]" /> Produits présentés à titre indicatif, disponibles à l&apos;accueil du club.</p>
      </div>
    </section>
  );
}
