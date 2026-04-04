"use client"

import { ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  maxBeds: number;
  imageUrl: string;
  imageAlt: string;
}

interface DiningFeature {
  icon: ReactNode;  // Changed from JSX.Element to ReactNode
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Room",
    description:
      "Stay connected with complimentary high-speed Wi-Fi and unwind with your favorite shows on the flat-screen TV, including our king-sized bed, luxurious bathrobes, designer toiletries, and a rejuvenating rainfall shower.",
    pricePerNight: 320,
    maxGuests: 2,
    maxBeds: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80",
    imageAlt: "Deluxe Room",
  },
  {
    id: 2,
    name: "Junior Suite",
    description:
      "Experience elevated luxury in our Junior Suite, featuring a separate living area, panoramic city views, premium Nespresso machine, marble bathroom with soaking tub, and exclusive access to our executive lounge.",
    pricePerNight: 520,
    maxGuests: 2,
    maxBeds: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80",
    imageAlt: "Junior Suite",
  },
  {
    id: 3,
    name: "Presidential Suite",
    description:
      "The pinnacle of indulgence. A sprawling private retreat with a butler, grand piano, private terrace with plunge pool, personalised minibar, and curated art collection — everything arranged to your exact preference before arrival.",
    pricePerNight: 1200,
    maxGuests: 4,
    maxBeds: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80",
    imageAlt: "Presidential Suite",
  },
];

const diningFeatures: DiningFeature[] = [
  {
    icon: (
      <svg key="icon1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2M5.636 5.636l1.414 1.414M16.95 16.95l1.414 1.414M3 12h2m14 0h2M5.636 18.364l1.414-1.414M16.95 7.05l1.414-1.414" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: "Fresh, Local Ingredients",
    description:
      "Highlight your commitment to using locally sourced, seasonal ingredients, promoting sustainability and supporting local producers.",
  },
  {
    icon: (
      <svg key="icon2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.75 1.715v.045c0 .549-.18 1.082-.504 1.517L18.75 21H5.25l-1.296-2.723A2.25 2.25 0 013.45 16.76v-.045c0-.663.27-1.298.75-1.715m15.6 0H4.2" />
      </svg>
    ),
    title: "Culinary Excellence",
    description:
      "Emphasize the quality and expertise of your chefs, showcasing the culinary skills and creativity that go into every dish.",
  },
  {
    icon: (
      <svg key="icon3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: "Diverse Menu Options",
    description:
      "Showcase the variety of dishes available, catering to different tastes, dietary preferences, and cultural palates.",
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

const GuestIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const BedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5V19a1 1 0 001 1h16a1 1 0 001-1v-5.5M3 13.5V8a1 1 0 011-1h16a1 1 0 011 1v5.5M3 13.5h18M7 7V5a1 1 0 011-1h8a1 1 0 011 1v2" />
  </svg>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoomCard({ room, index }: { room: Room; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      key={room.id}
      className={`flex flex-col md:flex-row ${
        isEven ? "" : "md:flex-row-reverse"
      } gap-0 items-stretch mb-4`}
    >
      {/* Text Side */}
      <div className="flex-1 flex flex-col justify-center px-10 py-14 bg-[#f5f3ec]">
        <h3 className="font-serif text-3xl text-[#1a1a1a] mb-4 tracking-tight">
          {room.name}
        </h3>
        <p className="text-sm text-[#555] leading-relaxed mb-8 max-w-md">
          {room.description}
        </p>

        <hr className="border-[#d4cfc4] mb-8" />

        {/* Price & Capacity */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-[#7a7a6a] uppercase tracking-widest mb-1">
              From
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[#1a1a1a] font-serif">
                $ {room.pricePerNight}
              </span>
              <span className="text-xs text-[#888]">/night</span>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col items-center gap-1 text-[#555]">
              <GuestIcon />
              <span className="text-[10px] leading-none">{room.maxGuests}</span>
              <span className="text-[10px] text-[#888]">guests</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-[#555]">
              <BedIcon />
              <span className="text-[10px] leading-none">{room.maxBeds}</span>
              <span className="text-[10px] text-[#888]">beds</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          {/* <button className="border border-[#3a6349] text-[#3a6349] text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#3a6349] hover:text-white transition-colors duration-200">
            Browse Room
          </button> */}
          <button className="bg-[#3a6349] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#2d4f39] transition-colors duration-200">
            Inquire Now
          </button>
        </div>
      </div>

      {/* Image Side */}
      <div className="flex-1 min-h-[340px] md:min-h-0 overflow-hidden">
        <img
          src={room.imageUrl}
          alt={room.imageAlt}
          className="w-full h-full object-cover"
          style={{ minHeight: 340 }}
        />
      </div>
    </div>
  );
}

function DiningSection() {
  return (
    <div className="flex flex-col md:flex-row items-stretch bg-[#f5f3ec]">
      {/* Image */}
      <div className="flex-1 min-h-[400px] md:min-h-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80"
          alt="Fine dining dish"
          className="w-full h-full object-cover"
          style={{ minHeight: 400 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-10 py-14 flex flex-col justify-center">
        <p className="text-xs italic text-[#888] mb-2 font-serif">Restaurant</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight mb-6 tracking-tight">
          Culinary Bliss Awaits: Explore Our Dining Delights
        </h2>
        <p className="text-sm text-[#555] leading-relaxed mb-10 max-w-sm">
          At Paradista, dining is more than just a meal – it's an unforgettable
          experience. Join us and discover the perfect fusion of flavors,
          ambiance, and impeccable service that sets us apart as a culinary
          destination of choice.
        </p>

        <div className="flex flex-col gap-7">
          {diningFeatures.map((feature, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 border border-[#d4cfc4] flex items-center justify-center text-[#3a6349] bg-white">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-[#1a1a1a] text-sm mb-1 tracking-wide">
                  {feature.title}
                </h4>
                <p className="text-xs text-[#666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HotelSections() {
  return (
    <div className="bg-[#f5f3ec] font-sans">
      {/* Rooms Header */}
      <div className="text-center pt-16 pb-12 px-4">
        <p className="text-xs italic text-[#888] mb-2 font-serif">Rooms</p>
        <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-4 tracking-tight">
          Explore Our Luxurious Rooms and Suites
        </h1>
        <p className="text-sm text-[#666] max-w-md mx-auto leading-relaxed">
          Browse through our collection and discover your perfect sanctuary for
          an unforgettable stay at Paradista
        </p>
      </div>

      {/* Rooms — alternating layout driven by the rooms array */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 pb-16">
        {rooms.map((room, index) => (
          <RoomCard key={room.id} room={room} index={index} />
        ))}
      </div>

      {/* Dining Section */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <DiningSection />
      </div>
    </div>
  );
}