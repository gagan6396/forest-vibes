"use client";

import { useEffect, useRef, useState } from "react";


const images = [
  {
    id: "suite-1",
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    alt: "Luxury suite bedroom",
    label: "Suite",
    span: "col-span-2 row-span-2",
  },
  {
    id: "pool-1",
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
    alt: "Hotel pool at dusk",
    label: "Pool",
    span: "col-span-1 row-span-1",
  },
  {
    id: "pool-1",
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
    alt: "Hotel pool at dusk",
    label: "Pool",
    span: "col-span-1 row-span-1",
  },
  {
    id: "pool-1",
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
    alt: "Hotel pool at dusk",
    label: "Pool",
    span: "col-span-1 row-span-1",
  },
  {
    id: "lobby-1",
    src: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=600&q=80",
    alt: "Lobby interior",
    label: "Lobby",
    span: "col-span-1 row-span-1",
  },
  {
    id: "workspace-1",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    alt: "Workspace desk",
    label: "Workspace",
    span: "col-span-1 row-span-1",
  },
  {
    id: "dining-1",
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    alt: "Fine dining restaurant",
    label: "Dining",
    span: "col-span-2 row-span-1",
  },
  {
    id: "bathroom-1",
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80",
    alt: "Bathroom with marble",
    label: "Bathroom",
    span: "col-span-1 row-span-1",
  },
];

type GalleryImage = (typeof images)[number];

export default function HotelGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current
      ?.querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f0ede4] px-6 py-16 md:px-16"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-14">
          <p
            data-reveal
            className="opacity-0 translate-y-6 transition-all duration-700 ease-out font-serif italic font-light text-base text-[#7a756c] tracking-wide mb-3"
          >
            A Visual Journey
          </p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700 ease-out [transition-delay:100ms] font-serif italic font-light text-5xl md:text-6xl text-[#1c1a17] leading-[1.1]"
            >
              Our Gallery
            </h2>
            <div
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700 ease-out [transition-delay:200ms] flex items-center gap-3"
            >
              <div className="w-12 h-px bg-[#b89a6a]" />
              <span className="font-sans font-light text-sm text-[#7a756c] tracking-widest uppercase">
                Forrest Vibes Hotel
              </span>
            </div>
          </div>
        </div>

        {/* ── Mosaic Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              data-reveal
              onClick={() => setLightbox(img)}
              className={`
                ${img.span}
                opacity-0 translate-y-6 transition-all duration-700 ease-out
                relative overflow-hidden rounded-sm cursor-pointer group
                shadow-[0_8px_30px_rgba(28,26,23,0.10)]
              `}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1c1a17]/0 group-hover:bg-[#1c1a17]/40 transition-all duration-500 flex items-end p-4">
                <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 font-sans font-light text-xs text-[#f0ede4] tracking-[0.12em] uppercase">
                  {img.label}
                </span>
              </div>

              {/* Gold corner accent */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#b89a6a]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          data-reveal
          className="opacity-0 translate-y-6 transition-all duration-700 ease-out [transition-delay:600ms] mt-12 flex items-center justify-center gap-4"
        >
          {/* <div className="w-16 h-px bg-[#b89a6a]" />
          <button className="font-sans font-light text-xs text-[#7a756c] tracking-[0.18em] uppercase hover:text-[#1c1a17] transition-colors duration-300">
            View Full Collection
          </button>
          <div className="w-16 h-px bg-[#b89a6a]" /> */}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#1c1a17]/90 backdrop-blur-sm flex items-center justify-center p-6 animate-[fadeIn_0.3s_ease]"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] aspect-video rounded-sm overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Label */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1c1a17]/80 to-transparent p-6">
              <p className="font-serif italic font-light text-xl text-[#f0ede4]">
                {lightbox.alt}
              </p>
              <div className="w-8 h-px bg-[#b89a6a] mt-2" />
            </div>
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#f0ede4]/70 hover:text-[#f0ede4] transition-colors duration-200"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}