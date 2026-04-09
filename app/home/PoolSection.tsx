"use client";

import { useState, useEffect, useRef } from "react";

// 🔁 Replace these with your actual pool image paths
const poolImages = [
  { src: "/pool1.jpg", label: "The Pool" },
  { src: "/pool2.jpg", label: "Poolside" },
  { src: "/pool3.jpg", label: "Evening View" },
];

const perks = [
  { icon: "🕕", label: "Open 6 AM – 9 PM" },
//   { icon: "🌡️", label: "Heated to 28°C" },
  { icon: "🏊", label: "25m Length" },
  { icon: "🌿", label: "Forest-Facing" },
  { icon: "🍹", label: "Poolside Refreshments" },
  { icon: "🛁", label: "Towels Provided" },
];

export default function PoolSection() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % poolImages.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Outfit:wght@300;400;500&display=swap');
        .pool-sec { font-family: 'Outfit', sans-serif; }

        .ps-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .ps-reveal.in { opacity: 1; transform: none; }
        .ps-d1 { transition-delay: 0.05s; }
        .ps-d2 { transition-delay: 0.18s; }
        .ps-d3 { transition-delay: 0.30s; }

        .ps-img { transition: opacity 0.7s ease; }

        .ps-dot { transition: all 0.3s ease; cursor: pointer; }

        .ps-thumb {
          cursor: pointer;
          transition: opacity 0.25s ease, box-shadow 0.25s ease;
        }
        .ps-thumb:hover { opacity: 0.85; }
        .ps-thumb.active { box-shadow: 0 0 0 2px #2d5a3d; }

        .ps-perk { transition: background 0.2s ease; }
        .ps-perk:hover { background: #2d5a3d0d; }
      `}</style>

      <section ref={ref} className="pool-sec w-full bg-[#f5f0e8]">
        <div className="w-full h-px bg-[#2d5a3d]/10" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">

          {/* Header */}
          <div className={`ps-reveal ps-d1 ${visible ? "in" : ""} mb-10 md:mb-12`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-7 bg-[#2d5a3d]" />
              <span className="text-[10px] font-[500] tracking-[0.25em] uppercase text-[#2d5a3d]">
                Resort Amenities
              </span>
            </div>
            <h2
              className="text-[#191914] leading-[1.1]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
              }}
            >
              Unwind by the <em className="italic text-[#2d5a3d]">Pool</em>
            </h2>
            <p className="mt-3 text-[13px] font-[300] text-[#6b6459] leading-[1.75] max-w-lg">
              A tranquil escape surrounded by nature. Whether you're looking for a morning
              swim or a lazy afternoon by the water, our pool is yours to enjoy.
            </p>
          </div>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">

            {/* Left — image gallery */}
            <div className={`ps-reveal ps-d2 ${visible ? "in" : ""}`}>

              {/* Main image */}
              <div
                className="relative overflow-hidden mb-3"
                style={{ borderRadius: "2px", aspectRatio: "16/9" }}
              >
                {poolImages.map((img, i) => (
                  <div
                    key={i}
                    className="ps-img absolute inset-0"
                    style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <span
                      className="absolute bottom-4 left-4 text-white text-[16px] italic"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {img.label}
                    </span>
                  </div>
                ))}

                {/* Dot indicators */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
                  {poolImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`ps-dot rounded-full ${
                        i === active
                          ? "w-5 h-1.5 bg-white"
                          : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-2.5">
                {poolImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`ps-thumb overflow-hidden ${i === active ? "active" : ""}`}
                    style={{ borderRadius: "2px", aspectRatio: "4/3" }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — perks + note */}
            <div className={`ps-reveal ps-d3 ${visible ? "in" : ""} flex flex-col gap-5`}>

              {/* Perks list */}
              <div
                className="bg-white border border-[#2d5a3d]/10 px-5 py-5"
                style={{ borderRadius: "2px", boxShadow: "0 6px 24px rgba(30,50,30,0.06)" }}
              >
                <p className="text-[9px] font-[500] tracking-[0.22em] uppercase text-[#a09888] mb-4">
                  What's Included
                </p>
                <div className="space-y-0.5">
                  {perks.map((p, i) => (
                    <div
                      key={i}
                      className="ps-perk flex items-center gap-3 px-2 py-2.5 rounded-sm"
                    >
                      <span className="text-[16px] flex-shrink-0">{p.icon}</span>
                      <span className="text-[12.5px] font-[300] text-[#4a4540]">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complimentary note */}
              <div
                className="bg-[#2d5a3d] px-5 py-5"
                style={{ borderRadius: "2px" }}
              >
                <p
                  className="text-[#c8e6d9] text-[15px] italic leading-[1.6] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "Complimentary for all in-house guests — no booking required."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-px bg-[#7db89a]" />
                  <span className="text-[10px] font-[400] tracking-[0.15em] uppercase text-[#7db89a]">
                    Forrest Vibes
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#2d5a3d] text-[#f5f0e8] text-[10px] tracking-[0.2em] uppercase font-[400] border-none cursor-pointer hover:bg-[#1e3f2b] transition-colors duration-200 group"
                style={{ fontFamily: "'Outfit', sans-serif", borderRadius: "2px" }}
              >
                Book Your Stay
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#2d5a3d]/10" />
      </section>
    </>
  );
}