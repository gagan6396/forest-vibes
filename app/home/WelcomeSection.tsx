"use client";

import { useEffect, useRef } from "react";

export default function WelcomeSection() {
  const forestImageRef = useRef<HTMLImageElement>(null);
  const bannerBgRef = useRef<HTMLImageElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Parallax for first section image
      if (forestImageRef.current && section1Ref.current) {
        const rect = section1Ref.current.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const translateY = scrollPercent * 60;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          forestImageRef.current.style.transform = `translateY(${translateY * 0.3}px) scale(1.04)`;
        }
      }

      // Parallax for banner section background
      if (bannerBgRef.current && section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const translateY = scrollPercent * 80;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          bannerBgRef.current.style.transform = `translateY(${translateY * 0.2}px) scale(1.04)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }
        .welcome-img-wrap:hover .welcome-img { transform: scale(1.04); }
        .welcome-img { transition: transform 0.3s ease; }
        .banner-bg { transition: transform 0.3s ease; }
        .banner-section:hover .banner-bg { transform: scale(1.04); }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* ── Section 1: Forest Vibes ── */}
      <section 
        ref={section1Ref}
        className="bg-[#f0ece0] px-16 py-24 grid grid-cols-2 gap-20 items-center min-h-[700px] max-[900px]:grid-cols-1 max-[900px]:px-8 max-[900px]:py-16 max-[900px]:gap-12"
      >
        {/* Image with parallax */}
        <div className="welcome-img-wrap overflow-hidden rounded-sm">
          <img
            ref={forestImageRef}
            className="welcome-img w-full h-[580px] object-cover rounded-sm will-change-transform"
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85"
            alt="Ancient forest at Paradista"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col">

          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-9 h-px bg-[#2d5a3d] opacity-60" />
            <span className="font-jost text-[10px] font-semibold tracking-[0.24em] uppercase text-[#2d5a3d]">
              Forest Vibes
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-playfair text-[#1a1a1a] font-medium leading-[1.2] mb-7"
            style={{ fontSize: "clamp(2.2rem, 3vw, 3rem)" }}>
            Step Into the Forest,
            <br />
            <em className="text-[#2d5a3d]">Leave the World Behind.</em>
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-[#2d5a3d] opacity-30 mb-7" />

          {/* Body */}
          <p className="font-jost text-md font-light leading-[1.9] text-black mb-5">
            At Paradista, the forest isn't just a backdrop — it's the whole experience.
            Wake up to birdsong filtering through pine, breathe air rich with cedar
            and earth, and feel the stillness that only ancient trees can offer.
          </p>

          <p className="font-jost text-md font-light leading-[1.9] text-black mb-12">
            From the moment you arrive, the canopy wraps around you. Every pathway,
            every room, every view is woven into the living green that surrounds us —
            because we believe nature is the finest luxury of all.
          </p>

          {/* CTA */}
          <a
            href="/about-us"
            className="font-jost self-start text-[11px] font-semibold tracking-[0.2em] uppercase text-white bg-[#2d5a3d] px-9 py-4 rounded-sm hover:bg-[#1e3f2b] transition-colors duration-200"
          >
            About Us
          </a>
        </div>

      </section>

      {/* ── Section 2: Rooms Banner with Parallax ── */}
      <section 
        ref={section2Ref}
        className="banner-section relative w-full h-[680px] overflow-hidden"
      >
        <img
          ref={bannerBgRef}
          className="banner-bg absolute inset-0 w-full h-full object-cover will-change-transform"
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85"
          alt="Forest cabin at Paradista"
        />

        {/* Overlay */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,20,12,0.72) 0%, rgba(10,20,12,0.38) 55%, rgba(10,20,12,0.08) 100%)" }}
        />

        {/* Content with fade-up animation on scroll */}
        <div 
          className="relative z-10 h-full flex flex-col justify-center px-24 py-20 max-w-[680px] max-[900px]:px-10 max-[900px]:py-14"
          style={{
            animation: "fadeUp 0.8s ease-out forwards",
            opacity: 0,
          }}
          onScroll={(e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
              target.style.opacity = "1";
            }
          }}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-9 h-px bg-white opacity-50" />
            <span className="font-jost text-[10px] font-semibold tracking-[0.24em] uppercase text-white/60">
              Explore Our Rooms
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-playfair font-bold text-white leading-[1.1] mb-7"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
            Rooms Wrapped
            <br />
            in <em className="font-normal text-white/70">Living Green.</em>
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-white opacity-30 mb-7" />

          {/* Body */}
          <p className="font-jost text-xl font-light leading-[1.9] text-white mb-14 max-w-[440px]">
            Each space is thoughtfully set into the woodland — natural timber,
            warm stone, and floor-to-ceiling views that make every morning
            feel like a quiet discovery.
          </p>

          {/* CTA */}
          <a
            href="/rooms"
            className="font-jost self-start text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a3d] bg-[#f0ece0] px-9 py-4 rounded-sm hover:bg-white transition-colors duration-200"
          >
            Inquire Now
          </a>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}