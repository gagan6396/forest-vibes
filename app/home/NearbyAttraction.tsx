"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const attractions = [
  {
    id: 1,
    name: "Haridwar",
    tagline: "Gateway to the Gods",
    distance: "58 km",
    time: "1.5 hrs",
    description:
      "One of Hinduism's seven sacred cities, where the Ganga descends to the plains. Witness the mesmerizing Ganga Aarti at Har Ki Pauri.",
    highlights: ["Har Ki Pauri", "Ganga Aarti", "Chandi Devi Temple"],
  },
  {
    id: 2,
    name: "Rishikesh",
    tagline: "Yoga Capital of the World",
    distance: "75 km",
    time: "2 hrs",
    description:
      "Nestled in a valley where three mountain ranges meet — from white-water rafting to sunrise yoga, it speaks every language of the soul.",
    highlights: ["Laxman Jhula", "White-water Rafting", "Beatles Ashram"],
  },
  {
    id: 3,
    name: "Mussoorie",
    tagline: "Queen of the Hills",
    distance: "95 km",
    time: "2.5 hrs",
    description:
      "Perched at 2,000 metres, walk the mall road as mist rolls in from the valleys — time slows here.",
    highlights: ["Kempty Falls", "Gun Hill", "Camel's Back Road"],
  },
  {
    id: 4,
    name: "Thano",
    tagline: "Hidden Forest Retreat",
    distance: "12 km",
    time: "20 mins",
    description:
      "A quiet forest hamlet on the edge of Rajaji National Park — spot elephants, leopards, and hundreds of bird species.",
    highlights: ["Rajaji National Park", "Elephant Safari", "Bird Watching"],
  },
  {
    id: 5,
    name: "Rajaji National Park",
    tagline: "The Wild Corridor",
    distance: "18 km",
    time: "30 mins",
    description:
      "A UNESCO corridor home to Asian elephants, tigers, leopards, and 400+ bird species.",
    highlights: ["Jeep Safari", "Elephant Sightings", "Chilla Range"],
  },
  {
    id: 6,
    name: "Dehradun",
    tagline: "City in the Doon Valley",
    distance: "35 km",
    time: "55 mins",
    description:
      "The capital of Uttarakhand, cradled between the Ganges and Yamuna tributaries.",
    highlights: ["Robber's Cave", "Sahastradhara", "Tapkeshwar Temple"],
  },
];

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

export default function NearbyAttractions() {
  const [activeId, setActiveId] = useState<number>(1);
  const [openMobileId, setOpenMobileId] = useState<number | null>(1);
  const selected = attractions.find((a) => a.id === activeId) || attractions[0];

  return (
    <section className="w-full py-16 px-4 bg-[#f5f2ed]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-[#7a6e5f] mb-2">Explore the Region</p>
          <h2 className="text-3xl font-semibold text-[#2a3424] mb-3">Beyond Our Gates</h2>
          <div className="w-10 h-0.5 bg-[#4a6741] mx-auto" />
        </div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden space-y-2">
          {attractions.map((item) => {
            const isOpen = openMobileId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 ${
                  isOpen ? "border-[#4a6741]/30 shadow-sm" : "border-[#e8e2d9]"
                }`}
              >
                <button
                  onClick={() => setOpenMobileId(isOpen ? null : item.id)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left"
                >
                  <div>
                    <p className="font-semibold text-[#2a3424]">{item.name}</p>
                    <p className="text-xs text-[#9a8e7f] mt-0.5">{item.tagline}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#4a6741]">{item.distance}</p>
                      <p className="text-xs text-[#9a8e7f]">{item.time}</p>
                    </div>
                    <motion.svg
                      className="w-4 h-4 text-[#9a8e7f]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm text-[#5c5040] leading-relaxed mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.highlights.map((h) => (
                            <span key={h} className="text-xs px-3 py-1.5 rounded-full bg-[#edf0ea] text-[#4a6741]">
                              {h}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2.5 rounded-lg bg-[#2a3424] text-white text-sm hover:bg-[#3a4a34] transition">
                            Plan Your Visit
                          </button>
                          {/* <button className="px-4 py-2.5 rounded-lg border border-[#d5cfc5] text-[#5c5040] text-sm hover:border-[#b0a898] transition">
                            Ask Concierge
                          </button> */}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop: Split */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8">

          {/* Left list */}
          <div className="lg:col-span-2 space-y-1">
            {attractions.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 border ${
                    isActive
                      ? "bg-white border-[#d5cfc5] shadow-sm"
                      : "bg-transparent border-transparent hover:bg-white/60 hover:border-[#e8e2d9]"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`font-semibold ${isActive ? "text-[#2a3424]" : "text-[#7a6e5f]"}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-[#9a8e7f] mt-0.5">{item.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${isActive ? "text-[#4a6741]" : "text-[#9a8e7f]"}`}>
                        {item.distance}
                      </p>
                      <p className="text-xs text-[#9a8e7f]">{item.time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl border border-[#e8e2d9] shadow-sm overflow-hidden"
              >
                {/* Banner */}
                <div
                  className="h-44 flex items-end p-6"
                  style={{ background: "linear-gradient(135deg, #2a3424 0%, #4a6741 100%)" }}
                >
                  <div className="flex justify-between items-end w-full">
                    <div>
                      <p className="text-white text-xl font-semibold">{selected.name}</p>
                      <p className="text-white/60 text-sm mt-0.5 italic">{selected.tagline}</p>
                    </div>
                    <div className="text-right bg-white/10 rounded-lg px-3 py-2">
                      <p className="text-white font-semibold">{selected.distance}</p>
                      <p className="text-white/60 text-xs">{selected.time} drive</p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-[#5c5040] leading-relaxed mb-5">{selected.description}</p>

                  <p className="text-xs uppercase tracking-widest text-[#9a8e7f] mb-2.5">Highlights</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selected.highlights.map((h) => (
                      <span key={h} className="text-xs px-3 py-1.5 rounded-full bg-[#edf0ea] text-[#4a6741]">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-2.5 rounded-lg bg-[#2a3424] text-white text-sm hover:bg-[#3a4a34] transition">
                      Plan Your Visit
                    </button>
                    {/* <button className="px-5 py-2.5 rounded-lg border border-[#d5cfc5] text-[#5c5040] text-sm hover:border-[#b0a898] transition">
                      Ask Concierge
                    </button> */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}