"use client"

import { useEffect, useRef } from "react";

const milestones = [
  {
    title: "Our Dream",
    body: "Forrest Vibes is more than just a stay. Our dream is to create a place that feels like home, where children, elderly guests, and families can experience warmth, comfort, with a touch of luxury—just like their own space, but even more special.",
  },
  {
    title: "Your Experience",
    body: "Come enjoy your stay, with a restaurant catering to all your needs, a forest that speaks to you and a story that connects you to us indefinitely.",
  },
  {
    title: "Our Promise",
    body: "Our unique selling proposition is that guests are invited to enjoy their experience and during the final billing, contribute an amount they feel is appropriate, based on their satisfaction. No strings attached.",
  },
];

const IMG_1 =
  "about4.webp";
const IMG_2 =
  "abt2.png";

export default function HotelLegacy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = sectionRef.current?.querySelectorAll("[data-reveal]");
    targets?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealClass =
    "opacity-0 translate-y-6 transition-all duration-700 ease-out";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center bg-[#f0ede4] px-6 py-20 md:px-16"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

        {/* ── Image Collage ── */}
        <div
          data-reveal
          className={`relative h-[420px] md:h-[560px] ${revealClass} [transition-delay:100ms]`}
        >
          {/* Decorative gold line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] w-px h-[85%] bg-gradient-to-b from-transparent via-[#b89a6a] to-transparent opacity-50 z-0" />

          {/* Card 1 */}
          <div className="absolute top-0 left-0 w-[62%] h-[68%] z-10 overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(28,26,23,0.18)] group">
            <img
              src={IMG_1}
              alt="Forest retreat"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Card 2 */}
          <div className="absolute bottom-0 right-0 w-[58%] h-[72%] z-20 overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(28,26,23,0.18)] group">
            <img
              src={IMG_2}
              alt="Forest vibes nature"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* ── Text Side ── */}
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <p
              data-reveal
              className={`font-serif italic font-light text-base text-black tracking-wide ${revealClass} [transition-delay:200ms]`}
            >
              Welcome to Forrest Vibes
            </p>
            <h2
              data-reveal
              className={`font-serif italic font-light text-5xl md:text-6xl text-black leading-[1.1] ${revealClass} [transition-delay:300ms]`}
            >
              More Than Just a Stay
            </h2>
            <div
              data-reveal
              className={`w-12 h-px bg-[#b89a6a] ${revealClass} [transition-delay:350ms]`}
            />
          </div>

          {/* Milestones */}
          <div className="flex flex-col gap-8">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                data-reveal
                className={`flex gap-5 ${revealClass}`}
                style={{ transitionDelay: `${400 + i * 100}ms` }}
              >
                {/* Left marker line */}
                <div className="relative flex-shrink-0 w-px bg-gradient-to-b from-[#b89a6a] to-transparent mt-1">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#b89a6a]" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-sans font-medium text-sm text-black tracking-[0.06em] uppercase mb-2">
                    {m.title}
                  </h3>
                  <p className="font-sans font-light text-sm text-black leading-relaxed">
                    {m.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}