"use client";

import { useState } from "react";

export default function HeroSection() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [people, setPeople] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
      `}</style>

      <section className="relative w-full bg-[#f0ece0]">

        {/* Main split — full viewport height, padded top by navbar (72px) */}
        <div className="flex flex-col md:flex-row" style={{ minHeight: "100vh" }}>

          {/* LEFT — Text */}
          <div className="w-full md:w-[52%] flex flex-col justify-center px-12 md:px-20 lg:px-28 pt-[150px] pb-10 md:pb-16">
            {/* <p
              className="text-stone-500 text-sm italic tracking-wide mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your Accommodation Solution
            </p> */}

            <h1
              className="text-[#1a1a1a] leading-[1.08] mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
                fontWeight: 200,
              }}
            >
              Experience
              <br />
              Unforgettable:
              <br />
              Your Home Away
              <br />
              with Comfy Place
            </h1>

            <p
              className="text-stone-500 text-[15px] leading-relaxed max-w-md"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              Immerse Yourself in Elegance and Comfort at Paradista. Our
              Exceptional Accommodations, Impeccable Service, and Unrivaled
              Hospitality Await Your Arrival. Your Perfect Getaway Starts Here.
            </p>
          </div>

          {/* RIGHT — Image (replace src with your actual image) */}
          <div className="w-full md:w-[48%] relative overflow-hidden" style={{ minHeight: "420px" }}>
            {/* Dummy placeholder — replace with: <img src="/your-hero.webp" ... /> */}
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
              alt="Forest Vibes pool"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Top overlay to blend with navbar area */}
            <div className="absolute top-0 left-0 right-0 h-[72px] bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        </div>

        {/* Booking bar */}
        <div className="relative z-10 mx-4 md:mx-12 lg:mx-20 -mt-1 pb-10">
          <div className="bg-white shadow-xl rounded-sm flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-stone-200 overflow-hidden px-8 py-4">

            {/* Arrival Date */}
            <label className="flex-1 flex items-center gap-4 px-6 py-5 cursor-pointer hover:bg-stone-50 transition-colors">
              <svg className="w-5 h-5 text-[#2d5a3d] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col">
                <span
                  className="text-[10px] font-medium tracking-widest uppercase text-stone-400 mb-1"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Arrival Date
                </span>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="text-[14px] text-stone-700 bg-transparent border-none outline-none cursor-pointer"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>
            </label>

            {/* Departure Date */}
            <label className="flex-1 flex items-center gap-4 px-6 py-5 cursor-pointer hover:bg-stone-50 transition-colors">
              <svg className="w-5 h-5 text-[#2d5a3d] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col">
                <span
                  className="text-[10px] font-medium tracking-widest uppercase text-stone-400 mb-1"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Departure Date
                </span>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="text-[14px] text-stone-700 bg-transparent border-none outline-none cursor-pointer"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>
            </label>

            {/* Number of People */}
            <label className="flex-1 flex items-center gap-4 px-6 py-5 cursor-pointer hover:bg-stone-50 transition-colors">
              <svg className="w-5 h-5 text-[#2d5a3d] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="flex flex-col">
                <span
                  className="text-[10px] font-medium tracking-widest uppercase text-stone-400 mb-1"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  Number of People
                </span>
                <input
                  type="number"
                  min={1}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="Number of People"
                  className="text-[14px] text-stone-700 bg-transparent border-none outline-none w-full"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                />
              </div>
            </label>

            {/* CTA */}
            <button
              className="px-10 py-5 bg-[#2d5a3d] text-white text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#1e3f2b] transition-colors duration-200 whitespace-nowrap"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Book a Stay
            </button>
          </div>
        </div>

      </section>
    </>
  );
}