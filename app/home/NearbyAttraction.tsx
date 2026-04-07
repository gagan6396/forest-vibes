"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants, Easing } from "framer-motion";

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

// Properly typed variants
const dropdownVariants: Variants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const desktopPanelVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const highlightVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.03, duration: 0.2 },
  }),
};

export default function NearbyAttractions() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleDropdown = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-16 px-4 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-stone-400 mb-2 block">
            Explore the Region
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-700 mb-3">
            Beyond Our Gates
          </h2>
          <motion.div
            className="w-12 h-px bg-amber-400/60 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>

        {/* Mobile: Accordion */}
        <div className="lg:hidden space-y-3">
          {attractions.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleDropdown(item.id)}
                className="w-full px-5 py-4 flex justify-between items-center text-left"
              >
                <div>
                  <h3 className="font-serif text-lg text-stone-800">{item.name}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">{item.tagline}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-600">{item.distance}</p>
                    <p className="text-xs text-stone-400">{item.time}</p>
                  </div>
                  <motion.svg
                    className="w-5 h-5 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </button>

              <AnimatePresence mode="wait">
                {openId === item.id && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="px-5 pb-5 pt-0"
                  >
                    <motion.div
                      className="h-32 bg-gradient-to-br from-stone-700 to-stone-500 rounded-lg mb-4 flex items-end p-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <p className="text-white/70 text-xs">{item.tagline}</p>
                      </div>
                    </motion.div>
                    <motion.p
                      className="text-stone-600 text-sm leading-relaxed mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.description}
                    </motion.p>
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-wide text-stone-400 mb-2">
                        Highlights
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((h, i) => (
                          <motion.span
                            key={h}
                            custom={i}
                            variants={highlightVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-600"
                          >
                            {h}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <button className="flex-1 py-2.5 rounded-lg bg-stone-800 text-white text-sm hover:bg-stone-700 transition">
                        Plan Your Visit
                      </button>
                      <button className="px-5 py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm hover:border-stone-300 transition">
                        Ask Concierge
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-8">
          {/* Left: List */}
          <div className="lg:col-span-2 space-y-2">
            {attractions.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setOpenId(item.id)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-200 border ${
                  openId === item.id
                    ? "bg-white border-stone-200 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-white/50 hover:border-stone-100"
                }`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className={`font-serif text-lg ${
                        openId === item.id ? "text-stone-800" : "text-stone-500"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{item.tagline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-stone-600">{item.distance}</p>
                    <p className="text-xs text-stone-400">{item.time}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Detail Panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {(() => {
                const selected = attractions.find((a) => a.id === openId) || attractions[0];
                return (
                  <motion.div
                    key={selected.id}
                    variants={desktopPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden"
                  >
                    <motion.div
                      className="h-48 bg-gradient-to-br from-stone-700 to-stone-500 relative flex items-end p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <motion.h3
                          className="text-2xl font-serif text-white mb-1"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {selected.name}
                        </motion.h3>
                        <motion.p
                          className="text-white/70 text-sm italic"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.15 }}
                        >
                          {selected.tagline}
                        </motion.p>
                      </div>
                      <motion.div
                        className="absolute bottom-4 right-4 text-right"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-white text-lg font-semibold">{selected.distance}</p>
                        <p className="text-white/60 text-xs">{selected.time} drive</p>
                      </motion.div>
                    </motion.div>
                    <div className="p-6">
                      <motion.p
                        className="text-stone-600 text-sm leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        {selected.description}
                      </motion.p>
                      <div className="mb-6">
                        <p className="text-xs uppercase tracking-wide text-stone-400 mb-3">
                          Highlights
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {selected.highlights.map((h, i) => (
                            <motion.span
                              key={h}
                              custom={i}
                              variants={highlightVariants}
                              initial="hidden"
                              animate="visible"
                              className="text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-600"
                            >
                              {h}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      <motion.div
                        className="flex gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button className="flex-1 py-2.5 rounded-lg bg-stone-800 text-white text-sm hover:bg-stone-700 transition">
                          Plan Your Visit
                        </button>
                        <button className="px-5 py-2.5 rounded-lg border border-stone-200 text-stone-600 text-sm hover:border-stone-300 transition">
                          Ask Concierge
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}