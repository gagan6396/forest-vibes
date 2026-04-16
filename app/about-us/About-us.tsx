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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@200;300;400;500&display=swap');

        .about-section { font-family: 'Outfit', sans-serif; }

        .rv    { opacity:0; transform:translateY(24px); transition:opacity .75s ease,transform .75s ease; }
        .rv.on { opacity:1; transform:none; }
        .rv.d1 { transition-delay:.08s }
        .rv.d2 { transition-delay:.20s }
        .rv.d3 { transition-delay:.32s }

        .rv-r    { opacity:0; transform:translateX(28px); transition:opacity .9s ease,transform .9s ease; }
        .rv-r.on { opacity:1; transform:none; }

        .banner-bg {
          background-image: url('abbt.png');
          background-size: cover;
          background-position: center 40%;
        }
        @media (max-width: 768px) {
          .banner-bg { background-position: center 30%; }
        }
        .banner-bg::after {
          content:'';
          position:absolute;
          inset:0;
          background: linear-gradient(
            to top,
            rgba(10,14,10,0.88) 0%,
            rgba(10,14,10,0.42) 55%,
            rgba(10,14,10,0.18) 100%
          );
        }

        .img-hover { overflow:hidden; border-radius: 12px; }
        .img-hover img {
          display:block; width:100%; height:100%; object-fit:cover;
          transition: transform .6s cubic-bezier(.25,.46,.45,.94);
        }
        .img-hover:hover img { transform: scale(1.04); }
      `}</style>

      <div className="about-section bg-[#f5f0e8]">

        {/* ── BANNER ── */}
        <div className="relative w-full h-[62vh] sm:h-[85vh] md:h-screen banner-bg">
          {/* On mobile: text sits ~60% down (justify-end with pb); on sm+ it stays centered */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end sm:justify-center px-5 sm:px-10 md:px-16 lg:px-[72px] pb-8 sm:pb-0">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                /* Changed: clamp floor 2.2rem → 1.6rem for smaller mobile size */
                fontSize: "clamp(1.6rem, 6.5vw, 6rem)",
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#f5f0e8",
              }}
            >
              More than<br />
              <em style={{ fontStyle: "italic", color: "#7db896" }}>just a stay</em><br />
              — a place called home.
            </h1>
            <p
              className="mt-4 sm:mt-6 text-[#c9d8cc] leading-[1.8] font-[300] max-w-[420px]"
              /* Changed: clamp floor 12px → 11px for smaller mobile size */
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(11px, 1.3vw, 14px)" }}
            >
              Forrest Vibes is more than just a stay. Our dream is to create a place that feels
              like home, where children, elderly guests, and families can experience warmth,
              comfort, with a touch of luxury.
            </p>
          </div>
        </div>

        {/* ── SPLIT SECTION ── */}
        <div ref={s1.ref} className="bg-[#f5f0e8] px-5 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — text */}
            <div className="order-2 lg:order-1 flex flex-col">
              <div className="max-w-lg w-full">

                <div className={`rv ${s1.inView ? "on" : ""} mb-3`}>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#2d5a3d] font-[400]">
                    — Our Dream
                  </span>
                </div>

                <h2
                  className={`rv d1 ${s1.inView ? "on" : ""} mb-6`}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)",
                    fontWeight: 400,
                    color: "#191914",
                    lineHeight: 1.2,
                  }}
                >
                  A place that feels like home, with a{" "}
                  <em className="italic text-[#2d5a3d]">touch of luxury</em>
                  {" "}— just like your own space, but even more special.
                </h2>

                <div className={`rv d2 ${s1.inView ? "on" : ""} flex flex-col gap-4 mb-10`}>
                  <p className="text-[#3a3830] text-[14px] sm:text-[15px] font-[300] leading-[1.85]">
                    Come enjoy your stay, with a restaurant catering to all your needs, a forest
                    that speaks to you and a story that connects you to us indefinitely.
                  </p>
                  <p className="text-[#3a3830] text-[14px] sm:text-[15px] font-[300] leading-[1.85]">
                    Our unique selling proposition is that guests are invited to enjoy their
                    experience and during the final billing, contribute an amount they feel is
                    appropriate, based on their satisfaction. No strings attached.
                  </p>
                </div>

                {/* Stats */}
                <div className={`rv d3 ${s1.inView ? "on" : ""} grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 border-t border-[#2d5a3d]/[0.14] pt-7`}>
                  {[
                    { n: "48",   l: "Properties" },
                    { n: "19",   l: "Destinations" },
                    { n: "12K+", l: "Stays" },
                    { n: "11",   l: "Team members" },
                  ].map((s) => (
                    <div key={s.l} className="flex flex-col gap-1">
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(1.5rem, 2vw, 2rem)",
                          fontWeight: 400,
                          lineHeight: 1,
                          color: "#191914",
                        }}
                      >
                        {s.n}
                      </span>
                      <span className="text-[#a09888] text-[10px] font-[300] tracking-[0.06em]">{s.l}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* RIGHT — single image */}
            <div className={`rv-r ${s1.inView ? "on" : ""} order-1 lg:order-2 h-[60vw] sm:h-[50vw] lg:h-[580px]`}>
              <div className="img-hover w-full h-full">
                <img src="about-us-1.webp" alt="Aerial view of the property" />
              </div>
            </div>

          </div>
        </div>

        <div className="h-8 md:h-12" />

      </div>
    </>
  );
}