"use client";

import { useState } from "react";

const attractions = [
  {
    id: 1,
    name: "Haridwar",
    tagline: "Gateway to the Gods",
    distance: "58 km",
    time: "1.5 hrs",
    highlights: ["Har Ki Pauri", "Ganga Aarti", "Chandi Devi Temple"],
    backgroundImage: "harid.jfif",
  },
  {
    id: 2,
    name: "Rishikesh",
    tagline: "Yoga Capital of the World",
    distance: "75 km",
    time: "2 hrs",
    highlights: ["Laxman Jhula", "White-water Rafting", "Beatles Ashram"],
    backgroundImage: "/rish2.jpg",
  },
  {
    id: 3,
    name: "Mussoorie",
    tagline: "Queen of the Hills",
    distance: "95 km",
    time: "2.5 hrs",
    highlights: ["Kempty Falls", "Gun Hill", "Camel's Back Road"],
    backgroundImage: "mussoorie.jfif",
  },
  {
    id: 4,
    name: "Thano",
    tagline: "Hidden Forest Retreat",
    distance: "12 km",
    time: "20 mins",
    highlights: ["Rajaji National Park", "Elephant Safari", "Bird Watching"],
    backgroundImage: "thano.jfif",
  },
  {
    id: 5,
    name: "Rajaji National Park",
    tagline: "The Wild Corridor",
    distance: "18 km",
    time: "30 mins",
    highlights: ["Jeep Safari", "Elephant Sightings", "Chilla Range"],
    backgroundImage: "rajaji.webp",
  },
  {
    id: 6,
    name: "Dehradun",
    tagline: "City in the Doon Valley",
    distance: "35 km",
    time: "55 mins",
    highlights: ["Robber's Cave", "Sahastradhara", "Tapkeshwar Temple"],
    backgroundImage: "ddn.jpg",
  },
  // {
  //   id: 7,
  //   name: "Forrest Orchard Trek",
  //   tagline: "Nature's Hidden Trail",
  //   distance: "8 km",
  //   time: "25 mins",
  //   highlights: ["Orchard Walk", "Forest Trail", "Bird Watching", "Nature Photography"],
  //   backgroundImage: "https://images.unsplash.com/photo-1441974231531-c622288dbd62?w=800&h=400&fit=crop",
  // },
  {
    id: 8,
    name: "Digu Waterfall",
    tagline: "Cascading Beauty",
    distance: "15 km",
    time: "35 mins",
    highlights: ["Natural Pool", "Picnic Spot", "Nature Walk", "Photography"],
    backgroundImage: "diggu.jfif",
  },
  {
    id: 9,
    name: "Khalanga Memorial",
    tagline: "Tribute to Valor",
    distance: "25 km",
    time: "45 mins",
    highlights: ["War Memorial", "Historical Museum", "Panoramic Views", "Heritage Walk"],
    backgroundImage: "khal.jfif",
  },
  {
    id: 10,
    name: "Malsi Deer Park",
    tagline: "Wildlife Encounters",
    distance: "30 km",
    time: "50 mins",
    highlights: ["Spotted Deer", "Peacock Sanctuary", "Children's Park", "Nature Trails"],
    backgroundImage: "malsi.jfif",
  },
  {
    id: 11,
    name: "Sahastradhara",
    tagline: "Thousand-fold Spring",
    distance: "38 km",
    time: "1 hr",
    highlights: ["Sulfur Springs", "Stalactite Caves", "Cable Car Ride", "Picnic Spots"],
    backgroundImage: "shas.jpg",
  },
  {
    id: 12,
    name: "Robber's Cave",
    tagline: "Nature's Mystery",
    distance: "35 km",
    time: "55 mins",
    highlights: ["River Cave", "Underground Stream", "Adventure Trek", "Photography"],
    backgroundImage: "robbers.jpg",
  },
  {
    id: 13,
    name: "Dhanaulti",
    tagline: "Peaceful Mountain Getaway",
    distance: "85 km",
    time: "2 hrs",
    highlights: ["Eco Park", "Apple Orchards", "Sunset Point", "Camping Sites"],
    backgroundImage: "dhanaulti.jfif",
  },
];

export default function NearbyAttractions() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="w-full py-16 px-4 bg-[#f5f2ed]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#7a6e5f] mb-2">Explore the Region</p>
          <h2 className="text-3xl font-semibold text-[#2a3424] mb-3">Beyond Our Gates</h2>
          <div className="w-10 h-0.5 bg-[#4a6741] mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {attractions.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="group bg-white rounded-xl overflow-hidden border border-[#e8e2d9] cursor-pointer hover:border-[#c8c0b4] transition-all duration-200"
              >
                {/* Image */}
                <div
                  className="h-36 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute top-3 right-3 bg-black/40 rounded px-2 py-1">
                    <p className="text-white text-xs font-medium">{item.distance}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="font-semibold text-[#2a3424] text-sm">{item.name}</p>
                  <p className="text-xs text-[#9a8e7f] mt-0.5 mb-3 italic">{item.tagline}</p>

                  {/* Highlights — always visible, clipped when collapsed */}
                  <div className={`flex flex-wrap gap-1.5 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40" : "max-h-6"}`}>
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#edf0ea] text-[#4a6741] whitespace-nowrap"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0ece6]">
                    <span className="text-xs text-[#9a8e7f]">{item.time} drive</span>
                    <span className="text-xs text-[#4a6741] font-medium group-hover:underline">
                      {isOpen ? "Less ↑" : "More ↓"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}