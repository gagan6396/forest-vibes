"use client";

import { useState, useEffect } from "react";

const amenities = [
  {
    id: "spa",
    number: "01",
    label: "Spa & Wellness",
    description: "An 8,000 sq ft sanctuary of calm. Hot stone therapy, hammam rituals, and bespoke treatments by world-class therapists.",
    details: ["8 private rooms", "Himalayan salt cave", "Infrared sauna", "6 AM – 11 PM"],
  },
  {
    id: "dining",
    number: "02",
  
    label: "Fine Dining",
    description: "Michelin-starred Chef Antoine Lefèvre crafts seasonal tasting menus honouring local provenance with refined French technique.",
    details: ["7-course tasting menu", "800+ wine labels", "Chef's table", "Private dining room"],
  },
  {
    id: "pool",
    number: "03",
  
    label: "Infinity Pool",
    description: "A 40-metre rooftop pool with panoramic city views, open sunrise to midnight with poolside sommelier service.",
    details: ["Level 18 rooftop", "40 metres", "Heated year-round", "Cabana reservations"],
  },
  {
    id: "fitness",
    number: "04",
   
    label: "Fitness Centre",
    description: "State-of-the-art Technogym equipment meets personalised programming with elite trainers available around the clock.",
    details: ["Technogym equipment", "Yoga & Pilates studio", "Personal training", "Open 24 hours"],
  },
  {
    id: "concierge",
    number: "05",
    
    label: "Concierge",
    description: "Your dedicated lifestyle manager anticipates every desire — from private jet transfers to after-hours gallery access.",
    details: ["24/7 dedicated manager", "Private transfers", "Exclusive experiences", "Fully bespoke"],
  },
];

export default function AmenitiesShowcase() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
   <section className="bg-[#f0f7f4] px-6 py-12 md:px-24 md:py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="font-light text-[10px] tracking-[0.22em] uppercase text-[#7a9e90] mb-3">
            Crafted for You
          </p>
          <h2 className="font-serif italic font-light text-[#2d4a3e] text-4xl md:text-5xl leading-[1.08]">
            Our Amenities
          </h2>
        </div>

        {/* List */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}>
          {amenities.map((a, i) => (
            <div
              key={a.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group border-t border-[#c2ddd3] py-5 cursor-default"
            >
              <div className="flex items-start gap-6">

                {/* Number */}
                <span className={`font-light text-[10px] tracking-[0.12em] pt-0.5 transition-colors duration-300 flex-shrink-0 ${hovered === i ? "text-[#7dbfa0]" : "text-[#b8d4c8]"}`}>
                  {a.number}
                </span>



                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <div>
                      <span className={`font-serif italic font-light text-xl md:text-2xl transition-colors duration-300 ${hovered === i ? "text-[#2d4a3e]" : "text-[#4a7060]"}`}>
                        {a.label}
                      </span>
                    </div>
                    {/* Arrow */}
                    <span className={`font-light text-xs transition-all duration-300 flex-shrink-0 ${hovered === i ? "text-[#7dbfa0] translate-x-1" : "text-[#c2ddd3] translate-x-0"}`}>
                      →
                    </span>
                  </div>

                  {/* Description — reveals on hover */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${hovered === i ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="font-light text-xs leading-[1.8] text-[#7a9e90] mb-3">
                      {a.description}
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                      {a.details.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 font-light text-[10px] text-[#7a9e90]">
                          <span className="w-[2px] h-[2px] rounded-full bg-[#7dbfa0] flex-shrink-0" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
          <div className="border-t border-[#c2ddd3]" />
        </div>

        {/* Footer */}
        <div className={`mt-10 flex items-center justify-between transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
          <span className="font-light text-[9px] tracking-[0.22em] uppercase text-[#a8c4b8]">
            Forrest Vibes Hotel
          </span>
          <button className="group flex items-center gap-3 font-light text-[9px] tracking-[0.2em] uppercase text-[#2d4a3e] hover:text-[#7dbfa0] transition-colors duration-300">
            Reserve a Stay
            <span className="w-5 h-px bg-current group-hover:w-8 transition-all duration-500" />
          </button>
        </div>

      </div>
    </section>
    <section className="relative min-h-[580px] overflow-hidden flex items-center">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=80"
        alt="Luxury hotel lounge"
        className="absolute inset-0 w-full h-full object-cover"
      />
 
      {/* Very light dark veil — matches the page's subtle overlays */}
      <div className="absolute inset-0 bg-black/25" />
 
      {/* Floating card — bottom-left, matching screenshot exactly */}
      <div className="relative z-10 w-full px-8 md:px-16 py-14 flex items-end min-h-[580px]">
        <div className="bg-white w-full max-w-[360px] px-9 py-10 shadow-sm">
 
          {/* Eyebrow */}
          <p className="font-serif italic text-[11px] text-[#999] tracking-wide mb-4">
            Crafted for You
          </p>
 
          {/* Heading — matches "A decade of making people feel at home" style */}
          <h2 className="font-serif font-light text-[#1a1a1a] text-[1.75rem] leading-[1.25] tracking-tight mb-4">
            Discover Special Offers{" "}
            <em className="italic text-[#3a6349]">Just For You</em>{" "}
            Today
          </h2>
 
          {/* Thin divider */}
          <div className="w-8 h-px bg-[#c8ddd3] mb-5" />
 
          {/* Body */}
          <p className="text-[12px] text-[#888] leading-[1.85] mb-8 font-light">
            Unlock exclusive deals and packages for your next getaway at Forrest Vibes.
            Take advantage of our special offers and make your stay even more memorable.
          </p>
 
          {/* CTA — matches "EXPLORE OFFER" button from the page */}
          <button className="bg-[#3a6349] text-white text-[10px] font-semibold uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#2d4f39] transition-colors duration-300">
            Explore Offer
          </button>
 
        </div>
      </div>
    </section>
    </>
  );
}