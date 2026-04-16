"use client";

export default function LocationSection() {
  const cards = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
      stat: "270 km",
      sub: "By road · 5.5 hrs from Delhi",
      label: "Road",
      highlight: false,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="13" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-4 0v2M8 11h8M8 15h5"/>
        </svg>
      ),
      stat: "45 mins",
      sub: "From railway station",
      label: "Railway",
      highlight: true,
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      ),
      stat: "75 mins",
      sub: "From Jolly Grant Airport, Dehradun",
      label: "Airport",
      highlight: false,
    },
  ];

  return (
    <section
      className="relative px-4 sm:px-6 md:px-8 py-12 sm:py-16 overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light mint overlay — barely-there, lets forest breathe through */}
      <div className="absolute inset-0 bg-emerald-50/82" />

      <div className="relative z-10 max-w-3xl mx-auto px-2 sm:px-0">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="flex-1 h-px bg-emerald-300" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-emerald-600">
            Getting here
          </span>
          <div className="flex-1 h-px bg-emerald-300" />
        </div>

        {/* Card grid - stacked on mobile, side by side on tablet/desktop */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-px bg-emerald-200 rounded-xl overflow-hidden border border-emerald-200">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`flex flex-col gap-4 sm:gap-5 p-6 sm:p-9
                ${card.highlight ? "bg-emerald-100/55" : "bg-white/75"}`}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/90 border border-emerald-200 flex items-center justify-center">
                {card.icon}
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-medium text-emerald-950 leading-none mb-1 sm:mb-2">
                  {card.stat}
                </div>
                <div className="text-[12px] sm:text-[13px] text-emerald-800 leading-relaxed">
                  {card.sub}
                </div>
              </div>

              <div className="mt-auto pt-4 sm:pt-5 border-t border-emerald-200">
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.1em] uppercase text-emerald-500">
                  {card.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[12px] sm:text-[13px] text-emerald-600 text-center mt-5 leading-relaxed px-2">
          Deep in the forest, yet closer than you think.
        </p>

      </div>
    </section>
  );
}