"use client";

import { useEffect, useRef } from "react";

export default function WelcomeSection() {
  const forestImageRef = useRef<HTMLImageElement>(null);
  const bannerVideoRef = useRef<HTMLVideoElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);

  const s1TagRef = useRef<HTMLDivElement>(null);
  const s1HeadRef = useRef<HTMLHeadingElement>(null);
  const s1DivRef = useRef<HTMLDivElement>(null);
  const s1P1Ref = useRef<HTMLParagraphElement>(null);
  const s1P2Ref = useRef<HTMLParagraphElement>(null);
  const s1CtaRef = useRef<HTMLAnchorElement>(null);
  const s1ImgRef = useRef<HTMLDivElement>(null);
  const s2ContentRef = useRef<HTMLDivElement>(null);

  const bannerGradient =
    "linear-gradient(to right, rgba(10,20,12,0.72) 0%, rgba(10,20,12,0.38) 55%, rgba(10,20,12,0.08) 100%)";

  useEffect(() => {
    const handleScroll = () => {
      if (forestImageRef.current && section1Ref.current) {
        const rect = section1Ref.current.getBoundingClientRect();
        const scrollPercent =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const translateY = scrollPercent * 60;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          forestImageRef.current.style.transform = `translateY(${translateY * 0.3}px) scale(1.04)`;
        }
      }
      if (bannerVideoRef.current && section2Ref.current) {
        const rect = section2Ref.current.getBoundingClientRect();
        const scrollPercent =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const translateY = scrollPercent * 80;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          bannerVideoRef.current.style.transform = `translateY(${translateY * 0.2}px) scale(1.04)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const staggered = [
      { ref: s1ImgRef,  delay: "0ms",   from: "translateX(-32px)" },
      { ref: s1TagRef,  delay: "100ms",  from: "translateY(20px)"  },
      { ref: s1HeadRef, delay: "220ms",  from: "translateY(24px)"  },
      { ref: s1DivRef,  delay: "320ms",  from: "translateY(16px)"  },
      { ref: s1P1Ref,   delay: "400ms",  from: "translateY(16px)"  },
      { ref: s1P2Ref,   delay: "480ms",  from: "translateY(16px)"  },
      { ref: s1CtaRef,  delay: "580ms",  from: "translateY(16px)"  },
    ];

    staggered.forEach(({ ref, delay, from }) => {
      if (!ref.current) return;
      ref.current.style.opacity = "0";
      ref.current.style.transform = from;
      ref.current.style.transition = `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`;
    });

    if (s2ContentRef.current) {
      s2ContentRef.current.style.opacity = "0";
      s2ContentRef.current.style.transform = "translateY(32px)";
      s2ContentRef.current.style.transition = "opacity 0.9s ease 0ms, transform 0.9s ease 0ms";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "none";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    [...staggered.map((s) => s.ref), { current: s2ContentRef.current }].forEach(
      (ref) => { if (ref.current) observer.observe(ref.current); }
    );

    return () => observer.disconnect();
  }, []);

  // Function to handle video load errors
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    console.log("Video failed to load, trying fallback...");
    // Try fallback video URL
    if (video.src === "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFunflies.mp4") {
      video.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-jost { font-family: 'Jost', sans-serif; }
        .welcome-img-wrap:hover .welcome-img { transform: scale(1.04); }
        .welcome-img { transition: transform 0.3s ease; }
        .banner-video { transition: transform 0.3s ease; }
        .banner-section:hover .banner-video { transform: scale(1.04); }
        html { scroll-behavior: smooth; }
        @media (max-width: 900px) {
          .section1-grid { grid-template-columns: 1fr !important; padding: 4rem 2rem !important; gap: 3rem !important; }
          .banner-content { padding: 3.5rem 2.5rem !important; }
        }
      `}</style>

      {/* Section 1 */}
      <section
        ref={section1Ref}
        className="section1-grid bg-[#f0ece0] px-16 py-24 grid grid-cols-2 gap-20 items-center min-h-[700px]"
      >
        <div ref={s1ImgRef} className="welcome-img-wrap overflow-hidden rounded-sm">
          <img
            ref={forestImageRef}
            className="welcome-img w-full h-[580px] object-cover rounded-sm will-change-transform"
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85"
            alt="Ancient forest at Forrest Vibes"
          />
        </div>

        <div className="flex flex-col">
          <div ref={s1TagRef} className="flex items-center gap-3 mb-8">
            <span className="block w-9 h-px bg-[#2d5a3d] opacity-60" />
            <span className="font-jost text-[10px] font-semibold tracking-[0.24em] uppercase text-[#2d5a3d]">
              Forest Vibes
            </span>
          </div>

          <h2
            ref={s1HeadRef}
            className="font-playfair text-[#1a1a1a] font-medium leading-[1.2] mb-7"
            style={{ fontSize: "clamp(2.2rem, 3vw, 3rem)" }}
          >
            Step Into the Forest,
            <br />
            <em className="text-[#2d5a3d]">Leave the World Behind.</em>
          </h2>

          <div ref={s1DivRef} className="w-12 h-px bg-[#2d5a3d] opacity-30 mb-7" />

          <p ref={s1P1Ref} className="font-jost text-md font-light leading-[1.9] text-black mb-5">
            {"At Forrest Vibes, the forest isn't just a backdrop \u2014 it's the whole experience. Wake up to birdsong filtering through pine, breathe air rich with cedar and earth, and feel the stillness that only ancient trees can offer."}
          </p>

          <p ref={s1P2Ref} className="font-jost text-md font-light leading-[1.9] text-black mb-12">
            {"From the moment you arrive, the canopy wraps around you. Every pathway, every room, every view is woven into the living green that surrounds us \u2014 because we believe nature is the finest luxury of all."}
          </p>

          <a
            ref={s1CtaRef}
            href="/about-us"
            className="font-jost self-start text-[11px] font-semibold tracking-[0.2em] uppercase text-white bg-[#2d5a3d] px-9 py-4 rounded-sm hover:bg-[#1e3f2b] transition-colors duration-200"
          >
            About Us
          </a>
        </div>
      </section>

      {/* Section 2 */}
      <section
        ref={section2Ref}
        className="banner-section relative w-full h-[680px] overflow-hidden"
      >
        <video
          ref={bannerVideoRef}
          className="banner-video absolute inset-0 w-full h-full object-cover will-change-transform"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=85"
          onError={handleVideoError}
        >
          <source src="/vid.mp4" type="video/mp4" />
          <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0" style={{ background: bannerGradient }} />

        <div
          ref={s2ContentRef}
          className="banner-content relative z-10 h-full flex flex-col justify-center px-24 py-20 max-w-[680px]"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="block w-9 h-px bg-white opacity-50" />
            <span className="font-jost text-[10px] font-semibold tracking-[0.24em] uppercase text-white/60">
              Explore Our Rooms
            </span>
          </div>

          <h2
            className="font-playfair font-bold text-white leading-[1.1] mb-7"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}
          >
            Rooms Wrapped
            <br />
            {"in "}
            <em className="font-normal text-white/70">Living Green.</em>
          </h2>

          <div className="w-12 h-px bg-white opacity-30 mb-7" />

          <p className="font-jost text-xl font-light leading-[1.9] text-white mb-14 max-w-[440px]">
            {"Each space is thoughtfully set into the woodland \u2014 natural timber, warm stone, and floor-to-ceiling views that make every morning feel like a quiet discovery."}
          </p>

          <a
            href="/rooms"
            className="font-jost self-start text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a3d] bg-[#f0ece0] px-9 py-4 rounded-sm hover:bg-white transition-colors duration-200"
          >
            Inquire Now
          </a>
        </div>
      </section>
    </>
  );
}