"use client"
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The attention to detail in the room decor and the plush furnishings made our stay exceptionally comfortable.",
    name: "Jessie Lake",
    role: "Teacher",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
  },
  {
    id: 2,
    quote: "Our stay at Forrest Vibes exceeded all expectations, every moment was memorable.",
    name: "Thomas Stone",
    role: "Businessman",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    id: 3,
    quote: "Our stay at Forrest Vibes exceeded all expectations, every moment was memorable.",
    name: "Polina Kranz",
    role: "Dentist",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
  },
  {
    id: 4,
    quote: "From the warm welcome to the seamless checkout, every interaction felt genuinely personal.",
    name: "Marcus Webb",
    role: "Architect",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    id: 5,
    quote: "The rooftop view at sunrise was worth every penny. We will absolutely return next summer.",
    name: "Sofia Reyes",
    role: "Photographer",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
  },
  {
    id: 6,
    quote: "Impeccable service and exquisite cuisine. Forrest Vibes has set a new benchmark for luxury.",
    name: "Daniel Park",
    role: "Chef",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
  },
];

const offers: { title: string; badge: string; description: string; validity: string }[] = [
  // Example — uncomment to test the offers state:
  // {
  //   title: "Weekend Escape",
  //   badge: "15% Off",
  //   description: "Book any weekend stay and enjoy 15% off your entire booking, including meals.",
  //   validity: "Valid till 30 June 2025",
  // },
];

const QuoteMark = () => (
  <svg width="38" height="30" viewBox="0 0 42 32" fill="none" className="mb-4 opacity-35">
    <path d="M0 32V19.2C0 14.4 1.2 10.2667 3.6 6.8C6.13333 3.2 9.86667 0.933333 14.8 0L16.4 3.6C13.4667 4.4 11.2 5.86667 9.6 8C8.13333 10 7.4 12.4 7.4 15.2H14.8V32H0ZM24.8 32V19.2C24.8 14.4 26 10.2667 28.4 6.8C30.9333 3.2 34.6667 0.933333 39.6 0L41.2 3.6C38.2667 4.4 36 5.86667 34.4 8C32.9333 10 32.2 12.4 32.2 15.2H39.6V32H24.8Z" fill="white"/>
  </svg>
);

function OffersModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(10, 22, 16, 0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-[#f5f8f6] w-full max-w-lg shadow-2xl"
        style={{ borderRadius: "2px", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#3a6349] px-8 py-7 flex items-start justify-between">
          <div>
            <p className="text-[9px] font-[400] tracking-[0.25em] uppercase text-[#7dbfa0] mb-2">
              Forrest Vibes
            </p>
            <h3 className="text-white text-[1.4rem] font-light leading-[1.2]" style={{ fontFamily: "'Georgia', serif" }}>
              Special <em className="italic">Offers</em>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#7dbfa0] hover:text-white transition-colors duration-200 mt-1 text-[18px] leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-8 py-8">
          {offers.length === 0 ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="text-[44px] mb-5">🌿</div>
              <p className="text-[#2d4a3e] text-[1.15rem] font-light leading-[1.3] mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                Something exciting is <em className="italic">coming soon</em>
              </p>
              <div className="w-8 h-px bg-[#c2ddd3] mb-4" />
              <p className="text-[12px] font-light text-[#7a9e90] leading-[1.8] max-w-xs">
                We're crafting exclusive offers tailored just for you. Stay tuned — great deals are on their way.
              </p>
              <div
                className="mt-8 px-6 py-3 border border-[#c2ddd3] text-[9px] tracking-[0.2em] uppercase text-[#2d4a3e] font-light cursor-default"
                style={{ borderRadius: "1px" }}
              >
                Check Back Soon
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer, i) => (
                <div key={i} className="bg-white border border-[#dceee7] px-6 py-5" style={{ borderRadius: "2px" }}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-[#2d4a3e] text-[1rem] font-light" style={{ fontFamily: "'Georgia', serif" }}>
                      {offer.title}
                    </p>
                    <span className="flex-shrink-0 bg-[#3a6349] text-white text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 font-light">
                      {offer.badge}
                    </span>
                  </div>
                  <p className="text-[12px] font-light text-[#7a9e90] leading-[1.75] mb-3">{offer.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-px bg-[#7dbfa0]" />
                    <span className="text-[10px] font-light tracking-[0.12em] text-[#a8c4b8]">{offer.validity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(1);
  const [page, setPage] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const perPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  useEffect(() => { setActive(isMobile ? 0 : 1); }, [page, isMobile]);

  return (
    <section className="bg-[#f0ede4] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="text-xs italic text-[#999] font-serif mb-3">Testimonials</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-tight max-w-lg">
              TESTIMONIALS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {visible.map((t, i) => {
            const isActive = i === active;
            return (
              <div
                key={t.id}
                onClick={() => setActive(i)}
                className="relative overflow-hidden cursor-pointer transition-all duration-500"
                style={{ height: isActive ? 480 : 380 }}
              >
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-all duration-400"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(8,8,8,0.96) 48%, rgba(8,8,8,0.1) 100%)"
                      : "linear-gradient(to top, rgba(8,8,8,0.85) 38%, rgba(8,8,8,0.05) 100%)",
                  }}
                />
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3a6349]" />
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  {isActive && <QuoteMark />}
                  <p className={`font-serif text-white leading-relaxed mb-5 transition-all duration-300 ${isActive ? "text-[15px]" : "text-[13px] opacity-80"}`}>
                    "{t.quote}"
                  </p>
                  {isActive && <div className="w-8 h-px bg-[#3a6349] mb-4" />}
                  <p className={`font-semibold text-white tracking-wide ${isActive ? "text-[14px]" : "text-[13px]"}`}>
                    {t.name}
                  </p>
                  <p className="text-[11px] text-[#888] mt-1 uppercase tracking-widest">
                    {t.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-11 h-11 border border-[#3a6349] text-[#3a6349] flex items-center justify-center disabled:opacity-25 hover:bg-[#3a6349] hover:text-white transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="flex gap-2 items-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="h-1.5 transition-all duration-300"
                style={{
                  width: i === page ? 32 : 12,
                  background: i === page ? "#3a6349" : "#c5c0b4",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-11 h-11 bg-[#3a6349] text-white flex items-center justify-center disabled:opacity-25 hover:bg-[#2d4f39] transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function SpecialOffersSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="relative min-h-[580px] overflow-hidden flex items-center">
      <img
        src="banner.webp"
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
            Unlock exclusive deals and packages for your next getaway at Forrest Vibes. Take advantage of our special offers and make your stay even more memorable.
          </p>
          <button
            onClick={onExplore}
            className="bg-[#3a6349] text-white text-[11px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-[#2d4f39] transition-colors"
          >
            Explore Offer
          </button>
        </div>
      </div>
    </section>
  );
}

export default function TestimonialsAndOffers() {
  const [showOffers, setShowOffers] = useState(false);

  return (
    <div className="font-sans">
      {showOffers && <OffersModal onClose={() => setShowOffers(false)} />}
      <TestimonialsSection />
      <SpecialOffersSection onExplore={() => setShowOffers(true)} />
    </div>
  );
}