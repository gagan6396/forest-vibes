"use client";

import { useEffect, useRef } from "react";

export default function BannerVideo() {
  const bannerVideoRef = useRef<HTMLVideoElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const s2ContentRef = useRef<HTMLDivElement>(null);

  const bannerGradient =
    "linear-gradient(to right, rgba(10,20,12,0.72) 0%, rgba(10,20,12,0.38) 55%, rgba(10,20,12,0.08) 100%)";

  useEffect(() => {
    const handleScroll = () => {
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

    if (s2ContentRef.current) observer.observe(s2ContentRef.current);

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
        .banner-video { transition: transform 0.3s ease; }
        .banner-section:hover .banner-video { transform: scale(1.04); }
        @media (max-width: 900px) {
          .banner-content { padding: 3.5rem 2.5rem !important; }
        }
      `}</style>

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