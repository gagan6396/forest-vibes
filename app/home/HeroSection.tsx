"use client";

import { useState } from "react";

export default function HeroSection() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [people, setPeople] = useState("");
  const [bookingError, setBookingError] = useState(false);

  const handleBook = () => {
    if (!arrivalDate || !departureDate || !people) {
      setBookingError(true);
      setTimeout(() => setBookingError(false), 600);
      return;
    }
    alert(`Booking: ${arrivalDate} → ${departureDate}, ${people} guest(s)`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@200;300;400;500&display=swap');

        .hero-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .anim-fade-up-1 { opacity: 0; animation: fadeUp 0.7s 0.10s forwards; }
        .anim-fade-up-2 { opacity: 0; animation: fadeUp 0.7s 0.22s forwards; }
        .anim-fade-up-3 { opacity: 0; animation: fadeUp 0.7s 0.34s forwards; }
        .anim-fade-up-4 { opacity: 0; animation: fadeUp 0.7s 0.46s forwards; }
        .anim-fade-up-5 { opacity: 0; animation: fadeUp 0.7s 0.62s forwards; }

        .hero-img-zoom {
          transform: scale(1.07);
          animation: zoomIn 1.6s 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }

        .booking-btn-sweep {
          position: relative;
          overflow: hidden;
        }
        .booking-btn-sweep::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1e3f2b;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .booking-btn-sweep:hover::before { transform: scaleX(1); }

        .cta-arrow { transition: transform 0.25s; }
        .btn-primary-hero:hover .cta-arrow { transform: translateX(4px); }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          cursor: pointer;
          filter: invert(30%) sepia(50%) saturate(400%) hue-rotate(100deg);
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>

      <section
        className="relative w-full bg-[#f5f0e8] hero-grain overflow-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ── MAIN SPLIT ── */}
        {/* Mobile: column (image → text). Desktop: row (text | image) */}
        <div className="flex flex-col md:flex-row relative z-[2]">
          {/* IMAGE — top on mobile, right on desktop */}
          <div
            className="w-full md:w-[48%] md:order-2 relative overflow-hidden"
            style={{ minHeight: "280px" }}
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=85"
              alt="Forest Vibes pool"
              className="hero-img-zoom absolute inset-0 w-full h-full object-cover"
            />
            {/* Diagonal left blend — desktop only */}
            <div className="hidden md:block absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#f5f0e8] to-transparent z-[2]" />
            {/* Bottom fade — mobile only, blends into text section */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f5f0e8] to-transparent z-[2]" />
            {/* Top overlay */}
            <div className="absolute top-0 left-0 right-0 h-[72px] bg-gradient-to-b from-black/20 to-transparent z-[2]" />
          </div>

          {/* TEXT — below image on mobile, left on desktop */}
          <div className="w-full md:w-[52%] md:order-1 flex flex-col justify-center px-7 md:px-16 lg:px-[72px] pt-8 md:pt-[130px] pb-10 md:pb-20 relative">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 anim-fade-up-1">
              {/* <span className="w-9 h-px bg-[#2d5a3d]" /> */}
              {/* <span className="text-[10px] font-[400] tracking-[0.22em] uppercase text-[#2d5a3d]">
                Comfy Place
              </span> */}
            </div>

            {/* Heading */}
            <h1
              className="text-[#191914] leading-[1.06] mb-6 anim-fade-up-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.2vw, 3.8rem)",
                fontWeight: 400,
              }}
            >
              Your Home Away,
              <br />
              <em className="italic text-[#2d5a3d]">Reimagined</em>
              <br />
              for the Extraordinary
            </h1>

            {/* Body */}
            <p
              className="text-black text-[13.5px] leading-[1.78] max-w-[360px] mb-10 anim-fade-up-3"
              style={{ fontWeight: 300 }}
            >
              Immerse Yourself in Elegance and Comfort at Paradista. Our
              Exceptional Accommodations, Impeccable Service, and Unrivaled
              Hospitality Await Your Arrival. Your Perfect Getaway Starts Here.
            </p>

            {/* CTA row */}
            <div className="flex items-center gap-6 anim-fade-up-4">
              <button
                className="btn-primary-hero inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#2d5a3d] text-[#f5f0e8] text-[10px] tracking-[0.18em] uppercase font-[400] border-none cursor-pointer transition-colors duration-200 hover:bg-[#1e3f2b]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Explore Stays
                <svg
                  className="cta-arrow w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              {/* <button
                className="text-[12px] text-[#2d5a3d] font-[300] bg-transparent border-none cursor-pointer underline underline-offset-4 hover:opacity-60 transition-opacity"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                View Gallery
              </button> */}
            </div>

            {/* Trust badge — desktop only (stays pinned bottom-left) */}
            <div className="anim-fade-up-5 hidden md:flex absolute bottom-16 left-[72px] items-center gap-3.5 bg-white/70 backdrop-blur-sm border border-[#2d5a3d]/[0.15] px-5 py-3">
              <div className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center flex-shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f5f0e8"
                  strokeWidth="1.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-[500] text-[#191914]">
                  4.98 / 5.0
                </span>
                <span className="text-[11px] font-[300] text-[#8a8176] tracking-[0.04em]">
                  1,200+ Guest Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOOKING BAR ── */}
        <div className="relative z-10 mx-4 md:mx-12 lg:mx-[72px] md:-mt-7 pb-14">
          <div
            className="bg-white border border-[#2d5a3d]/[0.12] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto]"
            style={{ boxShadow: "0 20px 60px rgba(30,50,30,0.09)" }}
          >
            {/* Arrival Date */}
            <label className="flex items-center gap-3.5 px-7 py-5 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 md:border-r border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[18px] h-[18px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Arrival Date
                </span>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="text-[13px] font-[300] text-[#2d2d28] bg-transparent border-none outline-none cursor-pointer w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* Departure Date */}
            <label className="flex items-center gap-3.5 px-7 py-5 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 md:border-r border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[18px] h-[18px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Departure Date
                </span>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="text-[13px] font-[300] text-[#2d2d28] bg-transparent border-none outline-none cursor-pointer w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* Number of People */}
            <label className="flex items-center gap-3.5 px-7 py-5 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[18px] h-[18px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Number of People
                </span>
                <input
                  type="number"
                  min={1}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="How many guests?"
                  className="text-[13px] font-[300] text-[#2d2d28] placeholder-[#c5bfb4] bg-transparent border-none outline-none w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* CTA */}
            <button
              onClick={handleBook}
              className={`booking-btn-sweep flex flex-col items-center justify-center gap-1 px-10 py-3 border-none cursor-pointer transition-colors duration-200 ${
                bookingError ? "bg-[#7a3020]" : "bg-[#2d5a3d]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="text-[9px] font-[500] tracking-[0.22em] uppercase text-[#f5f0e8]/70 relative z-[1]">
                Reserve Now
              </span>
              <span
                className="text-[18px] italic text-[#f5f0e8] relative z-[1]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                }}
              >
                Book a Stay
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
