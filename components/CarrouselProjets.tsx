"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface SlideCarrousel {
  id: string;
  nom: string;
  href: string;
  image: string;
}

export default function CarrouselProjets({ slides }: { slides: SlideCarrousel[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const minuteur = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(minuteur);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200">
      <div className="relative h-64 sm:h-80 lg:h-96">
        {slides.map((slide, i) => (
          <Link
            key={slide.id}
            href={slide.href}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.nom}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              priority={i === 0}
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-200">
                Projet populaire
              </p>
              <p className="text-lg sm:text-xl font-semibold text-white">{slide.nom}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        aria-label="Photo précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 hover:bg-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        aria-label="Photo suivante"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 hover:bg-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Aller à la photo ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
