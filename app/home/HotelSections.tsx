"use client"

import { ReactNode, useState, useEffect } from 'react';
import { X, ChevronRight, Star, Users, Bed, Wifi, Coffee, Bath, Tv, Wind } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  pricePerNight: number;
  maxGuests: number;
  maxBeds: number;
  imageUrl: string;
  imageAlt: string;
  images?: string[];
  size?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  details?: { label: string; value: string }[];
}

interface DiningFeature {
  icon: ReactNode;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const rooms: Room[] = [
  {
    id: 1,
    name: "Rose",
    description: "The Rose Room is a luxury single room that seamlessly blends elegance with comfort, accommodating a maximum of 3 guests. This thoughtfully designed room provides a private sanctuary for guests, featuring a plush king-sized bed draped in premium linens, an attached bathroom with luxury toiletries, and a private balcony overlooking lush gardens. Whether you're enjoying morning coffee on your personal balcony or unwinding in the elegant interiors, the Rose Room promises an unforgettable stay where every detail has been carefully curated for your pleasure.",
    longDescription: "Step into the Rose Room and discover a world where luxury meets tranquility. This magnificent single room accommodates a maximum of 3 guests and features floor-to-ceiling windows that flood the space with natural light, custom-designed furniture, and premium mattress toppers for the perfect night's sleep. The attached bathroom is a spa-like retreat complete with a rainfall shower, plush towels, and eco-friendly toiletries. Step outside to your private balcony and breathe in the fresh morning air as you plan your day's adventures. The room also features a modern kitchenette, a cozy dining area, and a 55-inch Smart TV. Experience the perfect harmony of comfort and elegance at the Rose Room, perfect for up to 3 guests.",
    pricePerNight: 11000,
    maxGuests: 3,
    maxBeds: 1,
    imageUrl:
      "5.png",
    imageAlt: "Rose Room",
    images: [
      "5.png",
      "4.png",
      "6.png",
    ],
    size: "42 m²",
    rating: 4.9,
    reviews: 184,
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
    details: [
      { label: "Room Size", value: "42 m²" },
      { label: "Bed Type", value: "King" },
      { label: "Floor", value: "4th – 8th" },
      { label: "View", value: "Garden / Pool" },
      { label: "Max Guests", value: "3" },
    ],
  },
  {
    id: 2,
    name: "Iris",
    description: "Welcome to the Iris Room, where contemporary design meets timeless comfort in a stunning single room that accommodates a maximum of 3 guests. This meticulously crafted room offers a unique blend of style and functionality, featuring a queen-sized bed with memory foam mattress, a sleek attached bathroom stocked with premium toiletries, and a private balcony that offers breathtaking views of the surrounding landscape. From the moment you arrive, you'll be enveloped in an atmosphere of sophisticated relaxation, where every modern convenience has been anticipated and provided for you and up to 2 other guests.",
    longDescription: "The Iris Room represents the pinnacle of contemporary luxury living. This generous single room accommodates up to 3 guests in unparalleled style. The room is a private haven, featuring an ergonomic queen-sized bed, blackout curtains for undisturbed sleep, and a dedicated work desk for those who need to stay connected. The en-suite bathroom is designed with your comfort in mind, offering hot water on demand, plush bathrobes, and a selection of natural toiletries. Your private balcony becomes your personal observation deck, perfect for sunset watching or stargazing. The room also boasts a state-of-the-art entertainment system, high-speed Wi-Fi, and a fully stocked kitchenette. Whether you're enjoying a quiet night in or preparing for a day of adventure, the Iris Room adapts to your every need and welcomes up to 3 guests maximum.",
    pricePerNight: 11000,
    maxGuests: 3,
    maxBeds: 1,
    imageUrl:
      "8.png",
    imageAlt: "Iris Room",
    images: [
      "8.png",
      "9.png",
      "7.png",
    ],
    size: "55 m²",
    rating: 4.8,
    reviews: 97,
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
    details: [
      { label: "Room Size", value: "55 m²" },
      { label: "Bed Type", value: "Queen" },
      { label: "Floor", value: "9th – 15th" },
      { label: "View", value: "City Panoramic" },
      { label: "Max Guests", value: "3" },
    ],
  },
  {
    id: 3,
    name: "Lily",
    description: "Experience the epitome of luxury at the Lily Room, our most prestigious single room that comfortably accommodates a maximum of 3 guests. This room has been transformed into a palatial retreat, featuring an emperor-sized bed with Egyptian cotton sheets, a marble-accented attached bathroom with premium spa-quality toiletries, and an expansive private balcony that seems to float above the landscape. The Lily Room isn't just accommodation—it's a destination in itself, promising an experience that will be cherished for years to come for you and up to 2 companions.",
    longDescription: "The Lily Room stands as a testament to uncompromising luxury and attention to detail. This magnificent single room can comfortably accommodate up to 3 guests in absolute opulence. The room is a sanctuary of peace, featuring a custom-crafted emperor-sized bed, premium hypoallergenic bedding, and ambient lighting that can be adjusted to suit your mood. The attached bathroom is reminiscent of Roman spas, complete with a deep soaking tub, rainfall shower, heated floors, and a curated selection of aromatic toiletries. Step onto your private balcony and be greeted by panoramic views that stretch to the horizon. The room also features a private dining area, a fully equipped gourmet kitchenette, a dedicated entertainment zone with a 65-inch 4K television, and a private terrace perfect for morning yoga or evening cocktails. At the Lily Room, every moment is designed to be extraordinary, perfect for up to 3 guests maximum.",
    pricePerNight: 11000,
    maxGuests: 3,
    maxBeds: 1,
    imageUrl:
      "11.png",
    imageAlt: "Lily Room",
    images: [
      "11.png",
      "12.png",
      "10.png",
    ],
    size: "120 m²",
    rating: 5.0,
    reviews: 42,
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
    details: [
      { label: "Room Size", value: "120 m²" },
      { label: "Bed Type", value: "Emperor" },
      { label: "Floor", value: "Penthouse" },
      { label: "View", value: "360° Panoramic" },
      { label: "Max Guests", value: "3" },
    ],
  },
  {
    id: 4,
    name: "Daisy",
    description: "Experience the epitome of luxury at the Daisy Room, our most prestigious single room that comfortably accommodates a maximum of 3 guests. This room has been transformed into a palatial retreat, featuring an emperor-sized bed with Egyptian cotton sheets, a marble-accented attached bathroom with premium spa-quality toiletries, and an expansive private balcony that seems to float above the landscape. The Daisy Room isn't just accommodation—it's a destination in itself, promising an experience that will be cherished for years to come for you and up to 2 other guests.",
    longDescription: "The Daisy Room stands as a testament to uncompromising luxury and attention to detail. This magnificent single room can comfortably accommodate up to 3 guests in absolute opulence. The room is a sanctuary of peace, featuring a custom-crafted emperor-sized bed, premium hypoallergenic bedding, and ambient lighting that can be adjusted to suit your mood. The attached bathroom is reminiscent of Roman spas, complete with a deep soaking tub, rainfall shower, heated floors, and a curated selection of aromatic toiletries. Step onto your private balcony and be greeted by panoramic views that stretch to the horizon. The room also features a private dining area, a fully equipped gourmet kitchenette, a dedicated entertainment zone with a 65-inch 4K television, and a private terrace perfect for morning yoga or evening cocktails. At the Daisy Room, every moment is designed to be extraordinary, welcoming a maximum of 3 guests.",
    pricePerNight: 11000,
    maxGuests: 3,
    maxBeds: 1,
    imageUrl:
      "11.png",
    imageAlt: "Daisy Room",
    images: [
      "11.png",
      "12.png",
      "10.png",
    ],
    size: "120 m²",
    rating: 5.0,
    reviews: 42,
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
    details: [
      { label: "Room Size", value: "120 m²" },
      { label: "Bed Type", value: "Emperor" },
      { label: "Floor", value: "Penthouse" },
      { label: "View", value: "360° Panoramic" },
      { label: "Max Guests", value: "3" },
    ],
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

// ─── Modal Component ───────────────────────────────────────────────────────────

function RoomModal({ room, onClose }: { room: Room; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);

  // Close on escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose(); 
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const roomImages = room.images || [room.imageUrl];

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-backdrop {
          animation: modalFadeIn 0.25s ease forwards;
        }
        .modal-panel {
          animation: modalSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .thumb-btn {
          transition: opacity 0.2s, transform 0.2s;
        }
        .thumb-btn:not(.active) { opacity: 0.55; }
        .thumb-btn:not(.active):hover { opacity: 0.8; transform: scale(1.03); }
        .thumb-btn.active { opacity: 1; outline: 2px solid #3a6349; outline-offset: 2px; }
        .feature-pill {
          transition: background 0.2s, color 0.2s;
        }
        .feature-pill:hover {
          background: #3a6349;
          color: white;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="modal-backdrop fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onClick={handleClose}
      >
        {/* Panel */}
        <div
          className="modal-panel bg-[#faf8f3] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Left: Images ── */}
          <div className="md:w-[42%] flex-shrink-0 flex flex-col">
            {/* Main image */}
            <div className="relative h-64 md:h-[320px] overflow-hidden rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none">
              <img
                key={activeImg}
                src={roomImages[activeImg]}
                alt={room.name}
                className="w-full h-full object-cover"
                style={{ animation: "modalFadeIn 0.3s ease" }}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 p-3 md:p-4">
              {roomImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`thumb-btn rounded-lg overflow-hidden flex-1 h-16 md:h-20 ${activeImg === i ? "active" : ""}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="flex-1 flex flex-col p-7 md:p-9 overflow-y-auto">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="self-end -mt-1 -mr-1 w-9 h-9 flex items-center justify-center rounded-full bg-[#f0ece0] hover:bg-[#e8e2d8] transition-colors text-[#5a5450] cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Rating */}
            {room.rating && (
              <div className="flex items-center gap-1.5 mb-3 -mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.floor(room.rating!) ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#d5cfc7]"}
                  />
                ))}
                <span className="text-[11px] text-[#a09890] ml-1">{room.rating} · {room.reviews} reviews</span>
              </div>
            )}

            {/* Name & size */}
            <h2
              className="text-[2rem] md:text-[2.4rem] text-[#1e1c19] leading-tight mb-1 font-serif"
            >
              {room.name}
            </h2>
            <p className="text-[11px] text-[#a09890] tracking-widest uppercase mb-5">{room.size || "Luxury Suite"}</p>

            {/* Long description */}
            <p className="text-[13.5px] text-[#4a4642] leading-[1.8] mb-7">
              {room.longDescription || room.description}
            </p>

            {/* Features */}
            {room.features && (
              <>
                <p className="text-[10px] text-[#a09890] tracking-[0.18em] uppercase mb-3">What's Included</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="feature-pill text-[11.5px] text-[#3a6349] border border-[#3a6349]/30 bg-[#3a6349]/5 px-3 py-1.5 rounded-full cursor-default"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Amenity icons */}
            <div className="flex gap-6 mb-8 py-4 border-y border-[#e8e2d8]">
              {[
                { icon: <Wifi size={18} strokeWidth={1.5} />, label: "Free Wi-Fi" },
                { icon: <Bath size={18} strokeWidth={1.5} />, label: "Rain shower" },
                { icon: <Tv size={18} strokeWidth={1.5} />, label: "Smart TV" },
                { icon: <Coffee size={18} strokeWidth={1.5} />, label: "Nespresso" },
                { icon: <Wind size={18} strokeWidth={1.5} />, label: "Climate ctrl" },
              ].map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-1.5 text-[#3a6349]">
                  {a.icon}
                  <span className="text-[9.5px] text-[#a09890] tracking-wide text-center leading-tight">{a.label}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-4 mt-auto">
              <div className="font-serif">
                <p className="text-[11px] text-[#a09890] tracking-wide mb-0.5">From</p>
                <div className="flex items-baseline gap-0.5 text-[#1e1c19]">
                  <sup className="text-lg font-normal">₹</sup>
                  <span className="text-[2.6rem] font-semibold leading-none">{room.pricePerNight}</span>
                  <span className="text-[13px] text-[#a09890] ml-1">/night</span>
                </div>
              </div>

              {/* <button className="flex items-center gap-2 bg-[#3a6349] hover:bg-[#2e4a36] text-white text-[11px] tracking-[0.16em] uppercase font-bold px-7 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
                Book This Room
                <ChevronRight size={14} />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoomCard({ room, index, onInquire }: { room: Room; index: number; onInquire: () => void }) {
  const isEven = index % 2 === 0;

  return (
    <div
      key={room.id}
      className={`flex flex-col md:flex-row ${
        isEven ? "" : "md:flex-row-reverse"
      } gap-0 items-stretch mb-4`}
    >
      {/* Image Side - Now on top for mobile */}
      <div className="flex-1 min-h-[340px] md:min-h-0 overflow-hidden order-first md:order-none">
        <img
          src={room.imageUrl}
          alt={room.imageAlt}
          className="w-full h-full object-cover"
          style={{ minHeight: 340 }}
        />
      </div>

      {/* Text Side */}
      <div className="flex-1 flex flex-col justify-center px-10 py-14 bg-[#f5f3ec]">
        <h3 className="font-serif text-3xl text-[#1a1a1a] mb-4 tracking-tight">
          {room.name}
        </h3>
        <p className="text-sm text-black leading-relaxed mb-8 max-w-md">
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
                ₹ {room.pricePerNight}
              </span>
              <span className="text-xs text-[#888]">/night</span>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col items-center gap-1 text-[#555]">
              <GuestIcon />
              <span className="text-[10px] leading-none">{room.maxGuests}</span>
              <span className="text-[10px] text-[#888]">max guests</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-[#555]">
              <BedIcon />
              <span className="text-[10px] leading-none">{room.maxBeds}</span>
              <span className="text-[10px] text-[#888]">bed</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <button 
            onClick={onInquire}
            className="bg-[#3a6349] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#2d4f39] transition-colors duration-200"
          >
            View More
          </button>
        </div>
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
          src="dining2.webp"
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
                <p className="text-xs text-black leading-relaxed">
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
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

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
          <RoomCard 
            key={room.id} 
            room={room} 
            index={index} 
            onInquire={() => setSelectedRoom(room)}
          />
        ))}
      </div>

      {/* Dining Section */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <DiningSection />
      </div>

      {/* Modal */}
      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </div>
  );
}