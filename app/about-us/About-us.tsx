"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutUs() {
  const s1 = useInView();
  const s2 = useInView();
  const s3 = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@200;300;400;500&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&display=swap');

        .about-section { font-family: 'Outfit', sans-serif; }

        .rv   { opacity:0; transform:translateY(30px); transition:opacity .8s ease,transform .8s ease; }
        .rv.on { opacity:1; transform:none; }
        .rv.d1 { transition-delay:.08s }
        .rv.d2 { transition-delay:.20s }
        .rv.d3 { transition-delay:.32s }
        .rv.d4 { transition-delay:.44s }
        .rv.d5 { transition-delay:.56s }

        .rv-r   { opacity:0; transform:translateX(36px); transition:opacity .9s ease,transform .9s ease; }
        .rv-r.on { opacity:1; transform:none; }
        .rv-r.d1 { transition-delay:.15s }
        .rv-r.d2 { transition-delay:.30s }

        /* banner */
        .banner-bg {
          background-image: url('https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1800&q=85');
          background-size: cover;
          background-position: center 40%;
        }
        .banner-bg::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(
            to top,
            rgba(10,14,10,0.82) 0%,
            rgba(10,14,10,0.45) 50%,
            rgba(10,14,10,0.22) 100%
          );
        }

        /* image hover */
        .img-hover { overflow:hidden; }
        .img-hover:hover img { transform: scale(1.04); }
        .img-hover img { transition: transform .6s cubic-bezier(.25,.46,.45,.94); }

        /* underline link */
        .ul-link {
          position:relative;
          display:inline-block;
          color:#2d5a3d;
          text-decoration:none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .ul-link::after {
          content:'';
          position:absolute;
          bottom:-1px; left:0;
          width:0; height:1px;
          background:#2d5a3d;
          transition: width .3s ease;
        }
        .ul-link:hover::after { width:100%; }

        /* grain */
        .grain::before {
          content:'';position:absolute;inset:0;pointer-events:none;z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }

      
      `}</style>

      <div className="about-section bg-[#f5f0e8]">

        {/* ══════════════════════════════════════
            1. FULL-WIDTH CINEMATIC BANNER
        ══════════════════════════════════════ */}
        <div className="relative w-full h-[92vh] banner-bg">
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-10 md:px-16 lg:px-[72px] pb-16 md:pb-20">

            <div className="flex items-center gap-3 mb-8">
              {/* <span className="w-7 h-px bg-[#a8c4b0]" /> */}
              {/* <span className="text-[10px] tracking-[0.26em] uppercase text-[#a8c4b0] font-[300]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
                About Comfy Place
              </span> */}
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(3rem, 7vw, 6.4rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                color: "#f5f0e8",
              }}
            >
              A decade of<br />
              <em style={{ fontStyle: "italic", color: "#7db896" }}>making</em> people<br />
              feel at home.
            </h1>

            <div className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <p className="text-[#c9d8cc] text-[13px] leading-[1.75] font-[300] max-w-[400px]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
                From one room in Meerut to 48 properties across 19 destinations —
                the mission has never changed. We make extraordinary ordinary.
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* <span className="text-[#a8c4b0] text-[10px] tracking-[0.18em] uppercase font-[300]">Est.</span> */}
                {/* <span className="text-[#f5f0e8] text-[2.2rem] leading-none font-[400]"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  2014
                </span> */}
              </div>
            </div>
          </div>

         
        </div>

        {/* ══════════════════════════════════════
            SPACER — gives breathing room between banner and image section
        ══════════════════════════════════════ */}
        <div className="h-16 md:h-24 lg:h-32"></div>

        {/* ══════════════════════════════════════
            2. TEXT LEFT / IMAGE RIGHT SPLIT
        ══════════════════════════════════════ */}
        <div ref={s1.ref} className="relative grain overflow-hidden bg-[#f5f0e8]">
          <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

            {/* LEFT — text */}
            <div className="flex flex-col justify-center px-10 md:px-16 lg:px-[72px] py-20 lg:py-28">

              <div className={`rv ${s1.inView ? "on" : ""} mb-4`}>
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#2d5a3d] font-[400]">
                  — The Story
                </span>
              </div>

              <h2
                className={`rv d1 ${s1.inView ? "on" : ""} mb-8`}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)",
                  fontWeight: 400,
                  color: "#191914",
                  lineHeight: 1.15,
                }}
              >
                It started with one room
                and a{" "}
                <em className="italic text-[#2d5a3d]">very strong opinion</em>{" "}
                about thread count.
              </h2>

              <div className={`rv d2 ${s1.inView ? "on" : ""} flex flex-col gap-5 mb-12`}>
                <p className="text-[#4a4540] text-xl font-[300] leading-[1.85]"
                  style={{ fontFamily: "'Cormorant', serif" }}>
                  Aryan Mehta was twenty-six when he turned his family guesthouse
                  into something guests kept returning to — not for the amenities,
                  but for the feeling. The feeling that someone had thought carefully
                  about where the morning light would land on your pillow.
                </p>
                <p className="text-[#4a4540] text-xl font-[300] leading-[1.85]"
                  style={{ fontFamily: "'Cormorant', serif" }}>
                  Today Comfy Place is a team of eleven people who share one
                  unreasonable standard: every property should feel like it was
                  designed for you specifically. That means slower growth,
                  harder choices — and guests who never want to leave.
                </p>
              </div>

              {/* stats row */}
              <div className={`rv d3 ${s1.inView ? "on" : ""} flex flex-wrap gap-x-10 gap-y-7 border-t border-[#2d5a3d]/[0.12] pt-10`}>
                {[
                  { n: "48", l: "Properties" },
                  { n: "19", l: "Destinations" },
                  { n: "12K+", l: "Stays" },
                  { n: "11", l: "Team members" },
                ].map((s) => (
                  <div key={s.n} className="flex flex-col gap-1">
                    <span className="text-[#191914]"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                        fontWeight: 400,
                        lineHeight: 1,
                      }}>
                      {s.n}
                    </span>
                    <span className="text-[#a09888] text-[11px] font-[300] tracking-[0.06em]">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — stacked images */}
            <div className={`rv-r d1 ${s1.inView ? "on" : ""} hidden lg:grid grid-rows-[1fr_1fr] h-full`}>
              {/* top image */}
              <div className="img-hover">
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80"
                  alt="Elegant room"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* bottom image — slightly inset to create an asymmetric feel */}
              <div className={`rv-r d2 ${s1.inView ? "on" : ""} img-hover ml-12 border-l-4 border-[#2d5a3d]`}>
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80"
                  alt="Pool terrace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════
            Optional: extra spacer at bottom for balance
        ══════════════════════════════════════ */}
        <div className="h-12 md:h-16"></div>

      </div>
    </>
  );
}