"use client";

import { Users, BedDouble, Wifi, Monitor, Award, Home } from "lucide-react";

type Amenity = {
  icon: React.ReactNode;
  label: string;
};

type Room = {
  image: string;
  badge: string;
  badgeStyle?: string;
  name: string;
  description: string;
  price: number;
  amenities: Amenity[];
};

const rooms: Room[] = [
  {
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    badge: "Most Popular",
    badgeStyle: "text-[#3b5e45]",
    name: "Deluxe Room",
    description:
      "Stay connected with complimentary Wi-Fi and unwind with your favourite shows on the flat-screen TV, including our king-sized bed, luxurious bathrobes, designer toiletries, and a rejuvenating rainfall shower.",
    price: 320,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "4 guest" },
      { icon: <BedDouble size={20} strokeWidth={1.5} />, label: "King bed" },
      { icon: <Wifi size={20} strokeWidth={1.5} />, label: "Wi-Fi" },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    badge: "Business",
    badgeStyle: "text-[#8a6a1f]",
    name: "Executive Room",
    description:
      "Executive rooms are designed for business travellers or guests seeking added convenience and luxury. They offer work desks, ergonomic chairs, and exclusive access to our executive lounge and services.",
    price: 280,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "4 guest" },
      { icon: <BedDouble size={20} strokeWidth={1.5} />, label: "King beds" },
      { icon: <Monitor size={20} strokeWidth={1.5} />, label: "Work desk" },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    badge: "Suite",
    badgeStyle: "bg-[#3b5e45]/90 text-white",
    name: "Presidential Suite",
    description:
      "Our crown jewel. A sprawling retreat with a private terrace, personal butler service, bespoke décor, and panoramic city views — every detail curated for the most discerning guest.",
    price: 890,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "6 guest" },
      { icon: <Home size={20} strokeWidth={1.5} />, label: "Terrace" },
      { icon: <Award size={20} strokeWidth={1.5} />, label: "Butler" },
    ],
  },
];

export default function RoomsSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
      `}</style>

      <section className="bg-[#f0ece0] py-16 px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="block text-[10px] tracking-[0.22em] uppercase text-[#3b5e45] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}
          >
            Rooms
          </span>
          <h2
            className="text-4xl md:text-[54px] text-[#1e1c19] leading-[1.1] max-w-2xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            Luxury Redefined: Unwind in Our
            <br />Exquisite Rooms and Suites
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1020px] mx-auto">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="bg-white rounded-2xl overflow-hidden border border-[#e0d9cf] flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] tracking-wide font-bold uppercase ${room.badgeStyle}`}
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {room.badge}
                </span>
              </div>

              {/* Body */}
              <div className="px-6 pt-6 flex-1">
                <h3
                  className="text-2xl text-[#1e1c19] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  {room.name}
                </h3>
                <p
                  className="text-[13.5px] text-[#7a726a] leading-relaxed"
                  style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                >
                  {room.description}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e8e2d8] mx-6 my-5" />

              {/* Footer */}
              <div className="px-6 flex items-end justify-between gap-3">
                <div>
                  <p
                    className="text-[11px] text-[#a09890] tracking-wide mb-0.5"
                    style={{ fontFamily: "'Lato', sans-serif" }}
                  >
                    From
                  </p>
                  <div
                    className="flex items-baseline gap-0.5 text-[#1e1c19]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    <sup className="text-xl font-normal">$</sup>
                    <span className="text-4xl font-semibold leading-none">{room.price}</span>
                    <span
                      className="text-[13px] text-[#a09890] ml-1"
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                    >
                      /day
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  {room.amenities.map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-1">
                      <span className="text-[#3b5e45]">{a.icon}</span>
                      <span
                        className="text-[10px] text-[#a09890] tracking-wide text-center leading-tight"
                        style={{ fontFamily: "'Lato', sans-serif" }}
                      >
                        {a.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                className="mx-6 mb-6 mt-5 py-3.5 bg-[#3b5e45] hover:bg-[#2e4a36] text-white text-[11px] tracking-[0.18em] uppercase font-bold rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                More Information
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* just above footer */}
      <section className="relative min-h-[580px] overflow-hidden flex items-center">
      <img
        src="https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1600&q=80"
        alt="Luxury hotel lounge"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 w-full px-8 md:px-20 py-16 flex items-end md:items-center min-h-[580px]">
        <div className="bg-white w-full max-w-[400px] p-10">
          <p className="text-xs italic text-[#999] font-serif mb-3">Get Yours</p>
          <h2 className="font-serif text-[2.2rem] leading-tight text-[#1a1a1a] mb-5 tracking-tight">
            Discover Special Offers Just For You Today
          </h2>
          <p className="text-[12.5px] text-[#666] leading-relaxed mb-8">
            Unlock exclusive deals and packages for your next getaway at Paradista. Take advantage of our special offers and make your stay even more memorable.
          </p>
          <button className="bg-[#3a6349] text-white text-[11px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-[#2d4f39] transition-colors">
            Inquire Offer
          </button>
        </div>
      </div>
    </section>

    </>
  );
}