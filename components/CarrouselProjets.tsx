"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { srcSetResponsive } from "@/lib/images";

export interface SlideCarrousel {
  id: string;
  nom: string;
  href: string;
  image: string;
  largeurImage: number;
}

const SEUIL_GLISSEMENT = 40;

export default function CarrouselProjets({ slides }: { slides: SlideCarrousel[] }) {
  const [index, setIndex] = useState(0);
  // Suivi du glissement (souris ou tactile, via Pointer Events qui unifient les deux)
  // dans une ref plutôt qu'un state : ça évite un re-rendu à chaque pixel de
  // déplacement, seul le résultat final (changement de slide + annulation du clic
  // sur le lien si le geste était bien un glissement) nous intéresse.
  const glissement = useRef({ enCours: false, depart: 0, delta: 0 });

  useEffect(() => {
    const minuteur = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(minuteur);
  }, [slides.length]);

  if (slides.length === 0) return null;

  function onPointerDown(e: React.PointerEvent) {
    glissement.current = { enCours: true, depart: e.clientX, delta: 0 };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!glissement.current.enCours) return;
    glissement.current.delta = e.clientX - glissement.current.depart;
  }

  function onPointerUp() {
    const { delta } = glissement.current;
    if (delta > SEUIL_GLISSEMENT) {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    } else if (delta < -SEUIL_GLISSEMENT) {
      setIndex((i) => (i + 1) % slides.length);
    }
    glissement.current.enCours = false;
  }

  // Un glissement qui dépasse un petit seuil ne doit pas déclencher la navigation du
  // lien sous le doigt/curseur : on l'annule en phase de capture, avant que le clic
  // n'atteigne le <Link>.
  function onClickCapture(e: React.MouseEvent) {
    if (Math.abs(glissement.current.delta) > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm dark:border-slate-800">
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        className="relative h-64 select-none [touch-action:pan-y] sm:h-80 lg:h-96"
      >
        {slides.map((slide, i) => (
          <Link
            key={slide.id}
            href={slide.href}
            draggable={false}
            className={`absolute inset-0 cursor-grab transition-opacity duration-700 active:cursor-grabbing ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* <img> natif plutôt que next/image : `unoptimized: true` (export statique)
                empêche next/image de générer un srcset, donc on le construit nous-mêmes
                à partir des paliers pré-générés (lib/images.ts). */}
            <img
              src={slide.image}
              srcSet={srcSetResponsive(slide.image, slide.largeurImage)}
              sizes="(min-width: 1024px) 896px, 100vw"
              alt={slide.nom}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
              <p className="text-lg sm:text-xl font-semibold text-white">{slide.nom}</p>
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        aria-label="Photo précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:text-brand-600"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        aria-label="Photo suivante"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:text-brand-600"
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
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-5 bg-brand-400" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
