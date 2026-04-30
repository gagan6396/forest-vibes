"use client";

import { useState, useEffect } from "react";
import { Users, BedDouble, Wifi, Monitor, Award, Home, X, ChevronRight, Star, Bath, Coffee, Tv, Wind } from "lucide-react";
import Link from "next/link";

type Amenity = {
  icon: React.ReactNode;
  label: string;
};

type Room = {
  image: string;
  images: string[];
  badge: string;
  badgeStyle?: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  amenities: Amenity[];
  details: { label: string; value: string }[];
  features: string[];
  size: string;
  rating: number;
  reviews: number;
};

const rooms: Room[] = [
  {
    image: "5.png",
    images: [
      "5.png",
      "4.png",
      "6.png",
    ],
    badge: "Most Popular",
    badgeStyle: "text-[#3b5e45]",
    name: "Rose",
    description: "The Rose Room is a luxury single room that seamlessly blends elegance with comfort, accommodating a maximum of 3 guests. This thoughtfully designed room provides a private sanctuary for guests, featuring a plush king-sized bed draped in premium linens, an attached bathroom with luxury toiletries, and a private balcony overlooking lush gardens. Whether you're enjoying morning coffee on your personal balcony or unwinding in the elegant interiors, the Rose Room promises an unforgettable stay where every detail has been carefully curated for your pleasure.",
    longDescription: "Step into the Rose Room and discover a world where luxury meets tranquility. This magnificent single room accommodates a maximum of 3 guests and features floor-to-ceiling windows that flood the space with natural light, custom-designed furniture, and premium mattress toppers for the perfect night's sleep. The attached bathroom is a spa-like retreat complete with a rainfall shower, plush towels, and eco-friendly toiletries. Step outside to your private balcony and breathe in the fresh morning air as you plan your day's adventures. The room also features a modern kitchenette, a cozy dining area, and a 55-inch Smart TV. Experience the perfect harmony of comfort and elegance at the Rose Room, perfect for up to 3 guests.",
    price: 11000,
    size: "42 m²",
    rating: 4.9,
    reviews: 184,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "3 max guests" },
      { icon: <BedDouble size={20} strokeWidth={1.5} />, label: "King bed" },
      { icon: <Wifi size={20} strokeWidth={1.5} />, label: "Wi-Fi" },
    ],
    details: [
      { label: "Room Size", value: "42 m²" },
      { label: "Bed Type", value: "King" },
      { label: "Floor", value: "4th – 8th" },
      { label: "View", value: "Garden / Pool" },
      { label: "Max Guests", value: "3" },
    ],
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
  },
  {
    image: "8.png",
    images: [
      "8.png",
      "9.png",
      "7.png",
    ],
    badge: "Business",
    badgeStyle: "text-[#8a6a1f]",
    name: "Iris",
    description: "Welcome to the Iris Room, where contemporary design meets timeless comfort in a stunning single room that accommodates a maximum of 3 guests. This meticulously crafted room offers a unique blend of style and functionality, featuring a queen-sized bed with memory foam mattress, a sleek attached bathroom stocked with premium toiletries, and a private balcony that offers breathtaking views of the surrounding landscape. From the moment you arrive, you'll be enveloped in an atmosphere of sophisticated relaxation, where every modern convenience has been anticipated and provided for you and up to 2 other guests.",
    longDescription: "The Iris Room represents the pinnacle of contemporary luxury living. This generous single room accommodates up to 3 guests in unparalleled style. The room is a private haven, featuring an ergonomic queen-sized bed, blackout curtains for undisturbed sleep, and a dedicated work desk for those who need to stay connected. The en-suite bathroom is designed with your comfort in mind, offering hot water on demand, plush bathrobes, and a selection of natural toiletries. Your private balcony becomes your personal observation deck, perfect for sunset watching or stargazing. The room also boasts a state-of-the-art entertainment system, high-speed Wi-Fi, and a fully stocked kitchenette. Whether you're enjoying a quiet night in or preparing for a day of adventure, the Iris Room adapts to your every need and welcomes up to 3 guests maximum.",
    price: 11000,
    size: "55 m²",
    rating: 4.8,
    reviews: 97,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "3 max guests" },
      { icon: <BedDouble size={20} strokeWidth={1.5} />, label: "Queen bed" },
      { icon: <Monitor size={20} strokeWidth={1.5} />, label: "Work desk" },
    ],
    details: [
      { label: "Room Size", value: "55 m²" },
      { label: "Bed Type", value: "Queen" },
      { label: "Floor", value: "9th – 15th" },
      { label: "View", value: "City Panoramic" },
      { label: "Max Guests", value: "3" },
    ],
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
  },
  {
    image: "11.png",
    images: [
      "11.png",
      "12.png",
      "10.png",
    ],
    badge: "Suite",
    badgeStyle: "bg-[#3b5e45]/90 text-white",
    name: "Lily",
    description: "Experience the epitome of luxury at the Lily Room, our most prestigious single room that comfortably accommodates a maximum of 3 guests. This room has been transformed into a palatial retreat, featuring an emperor-sized bed with Egyptian cotton sheets, a marble-accented attached bathroom with premium spa-quality toiletries, and an expansive private balcony that seems to float above the landscape. The Lily Room isn't just accommodation—it's a destination in itself, promising an experience that will be cherished for years to come for you and up to 2 companions.",
    longDescription: "The Lily Room stands as a testament to uncompromising luxury and attention to detail. This magnificent single room can comfortably accommodate up to 3 guests in absolute opulence. The room is a sanctuary of peace, featuring a custom-crafted emperor-sized bed, premium hypoallergenic bedding, and ambient lighting that can be adjusted to suit your mood. The attached bathroom is reminiscent of Roman spas, complete with a deep soaking tub, rainfall shower, heated floors, and a curated selection of aromatic toiletries. Step onto your private balcony and be greeted by panoramic views that stretch to the horizon. The room also features a private dining area, a fully equipped gourmet kitchenette, a dedicated entertainment zone with a 65-inch 4K television, and a private terrace perfect for morning yoga or evening cocktails. At the Lily Room, every moment is designed to be extraordinary, perfect for up to 3 guests maximum.",
    price: 11000,
    size: "120 m²",
    rating: 5.0,
    reviews: 42,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "3 max guests" },
      { icon: <Home size={20} strokeWidth={1.5} />, label: "Terrace" },
      { icon: <Award size={20} strokeWidth={1.5} />, label: "Butler" },
    ],
    details: [
      { label: "Room Size", value: "120 m²" },
      { label: "Bed Type", value: "Emperor" },
      { label: "Floor", value: "Penthouse" },
      { label: "View", value: "360° Panoramic" },
      { label: "Max Guests", value: "3" },
    ],
    features: [
      "Comfortable beds & clean linings",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
  },
  {
    image: "11.png",
    images: [
      "11.png",
      "12.png",
      "10.png",
    ],
    badge: "Suite",
    badgeStyle: "bg-[#3b5e45]/90 text-white",
    name: "Daisy",
    description: "Experience the epitome of luxury at the Daisy Room, our most prestigious single room that comfortably accommodates a maximum of 3 guests. This room has been transformed into a palatial retreat, featuring an emperor-sized bed with Egyptian cotton sheets, a marble-accented attached bathroom with premium spa-quality toiletries, and an expansive private balcony that seems to float above the landscape. The Daisy Room isn't just accommodation—it's a destination in itself, promising an experience that will be cherished for years to come for you and up to 2 other guests.",
    longDescription: "The Daisy Room stands as a testament to uncompromising luxury and attention to detail. This magnificent single room can comfortably accommodate up to 3 guests in absolute opulence. The room is a sanctuary of peace, featuring a custom-crafted emperor-sized bed, premium hypoallergenic bedding, and ambient lighting that can be adjusted to suit your mood. The attached bathroom is reminiscent of Roman spas, complete with a deep soaking tub, rainfall shower, heated floors, and a curated selection of aromatic toiletries. Step onto your private balcony and be greeted by panoramic views that stretch to the horizon. The room also features a private dining area, a fully equipped gourmet kitchenette, a dedicated entertainment zone with a 65-inch 4K television, and a private terrace perfect for morning yoga or evening cocktails. At the Daisy Room, every moment is designed to be extraordinary, welcoming a maximum of 3 guests.",
    price: 11000,
    size: "120 m²",
    rating: 5.0,
    reviews: 42,
    amenities: [
      { icon: <Users size={20} strokeWidth={1.5} />, label: "3 max guests" },
      { icon: <Home size={20} strokeWidth={1.5} />, label: "Terrace" },
      { icon: <Award size={20} strokeWidth={1.5} />, label: "Butler" },
    ],
    details: [
      { label: "Room Size", value: "120 m²" },
      { label: "Bed Type", value: "Emperor" },
      { label: "Floor", value: "Penthouse" },
      { label: "View", value: "360° Panoramic" },
      { label: "Max Guests", value: "3" },
    ],
    features: [
      "Comfortable beds & clean linens",
      "Attached bathroom with toiletries (soap, shampoo, towels)",
      "Wi-Fi access",
      "Air conditioning / heating",
      "Television",
      "Attached Balcony",
      "Maximum 3 guests",
    ],
  },
];

function RoomModal({ room, onClose }: { room: Room; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const handleClose = () => {
    onClose();
  };

  // Mobile version - Full screen bottom sheet
  if (isMobile) {
    return (
      <>
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .mobile-modal-backdrop {
            animation: fadeIn 0.25s ease forwards;
          }
          .mobile-modal-sheet {
            animation: slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        `}</style>

        {/* Backdrop */}
        <div
          className="mobile-modal-backdrop fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Bottom Sheet */}
          <div
            className="mobile-modal-sheet absolute bottom-0 left-0 right-0 bg-[#faf8f3] rounded-t-3xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag indicator */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-[#d0c8be] rounded-full"></div>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-sm transition-colors text-white cursor-pointer"
              aria-label="Close modal"
              type="button"
            >
              <X size={16} />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Image section */}
              <div className="relative">
                <div className="h-80 overflow-hidden">
                  <img
                    key={activeImg}
                    src={room.images[activeImg]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Badge */}
                <span
                  className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] tracking-wide font-bold uppercase ${room.badgeStyle}`}
                >
                  {room.badge}
                </span>

                {/* Thumbnails */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                  {room.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`rounded-lg overflow-hidden w-14 h-14 transition-all ${
                        activeImg === i ? "ring-2 ring-[#3b5e45] ring-offset-2" : "opacity-70"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pb-8">
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(room.rating) ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#d5cfc7]"}
                    />
                  ))}
                  <span className="text-[12px] text-[#a09890] ml-1">{room.rating} · {room.reviews} reviews</span>
                </div>

                {/* Name & size */}
                <h2
                  className="text-[1.8rem] text-[#1e1c19] leading-tight mb-1 pr-8"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                >
                  {room.name}
                </h2>
                <p className="text-[11px] text-[#a09890] tracking-widest uppercase mb-5">{room.size}</p>

                {/* Description */}
                <p className="text-[13.5px] text-[#4a4642] leading-[1.8] mb-7" style={{ fontWeight: 300 }}>
                  {room.longDescription}
                </p>

                {/* Features */}
                <p className="text-[10px] text-[#a09890] tracking-[0.18em] uppercase mb-3">What's Included</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11.5px] text-[#3b5e45] border border-[#3b5e45]/30 bg-[#3b5e45]/5 px-3 py-1.5 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-5 gap-4 mb-8 py-5 border-y border-[#e8e2d8]">
                  {[
                    { icon: <Wifi size={18} strokeWidth={1.5} />, label: "Wi-Fi" },
                    { icon: <Bath size={18} strokeWidth={1.5} />, label: "Shower" },
                    { icon: <Tv size={18} strokeWidth={1.5} />, label: "Smart TV" },
                    { icon: <Coffee size={18} strokeWidth={1.5} />, label: "Coffee" },
                    { icon: <Wind size={18} strokeWidth={1.5} />, label: "AC" },
                  ].map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-1.5 text-[#3b5e45]">
                      {a.icon}
                      <span className="text-[9px] text-[#a09890] tracking-wide text-center leading-tight">{a.label}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-4">
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    <p className="text-[11px] text-[#a09890] tracking-wide mb-0.5" style={{ fontFamily: "'Lato', sans-serif" }}>From</p>
                    <div className="flex items-baseline gap-0.5 text-[#1e1c19]">
                      <sup className="text-lg font-normal">₹</sup>
                      <span className="text-[2.4rem] font-semibold leading-none">{room.price}</span>
                      <span className="text-[12px] text-[#a09890] ml-1" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>/night</span>
                    </div>
                  </div>

                  {/* <button className="flex items-center gap-2 bg-[#3b5e45] hover:bg-[#2e4a36] text-white text-[11px] tracking-[0.18em] uppercase font-bold px-6 py-3.5 rounded-lg transition-all duration-200">
                    Book This Room
                    <ChevronRight size={14} />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop version - Original side-by-side modal
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
        .thumb-btn.active { opacity: 1; outline: 2px solid #3b5e45; outline-offset: 2px; }
        .feature-pill {
          transition: background 0.2s, color 0.2s;
        }
        .feature-pill:hover {
          background: #3b5e45;
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
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {/* ── Left: Images ── */}
          <div className="md:w-[42%] flex-shrink-0 flex flex-col">
            {/* Main image */}
            <div className="relative h-64 md:h-[320px] overflow-hidden rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none">
              <img
                key={activeImg}
                src={room.images[activeImg]}
                alt={room.name}
                className="w-full h-full object-cover"
                style={{ animation: "modalFadeIn 0.3s ease" }}
              />
              {/* Badge */}
              <span
                className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] tracking-wide font-bold uppercase ${room.badgeStyle}`}
              >
                {room.badge}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 p-3 md:p-4">
              {room.images.map((img, i) => (
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
          <div className="flex-1 flex flex-col p-7 md:p-9 overflow-y-auto relative">
            {/* Close button - moved to top right corner with higher z-index */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-[#f0ece0] hover:bg-[#e8e2d8] transition-colors text-[#5a5450] cursor-pointer"
              aria-label="Close modal"
              type="button"
            >
              <X size={18} />
            </button>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={i < Math.floor(room.rating) ? "text-[#c9a84c] fill-[#c9a84c]" : "text-[#d5cfc7]"}
                />
              ))}
              <span className="text-[11px] text-[#a09890] ml-1">{room.rating} · {room.reviews} reviews</span>
            </div>

            {/* Name & size */}
            <h2
              className="text-[2rem] md:text-[2.4rem] text-[#1e1c19] leading-tight mb-1 pr-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
            >
              {room.name}
            </h2>
            <p className="text-[11px] text-[#a09890] tracking-widest uppercase mb-5">{room.size}</p>

            {/* Long description */}
            <p className="text-[13.5px] text-[#4a4642] leading-[1.8] mb-7" style={{ fontWeight: 300 }}>
              {room.longDescription}
            </p>

            {/* Features */}
            <p className="text-[10px] text-[#a09890] tracking-[0.18em] uppercase mb-3">What's Included</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {room.features.map((f) => (
                <span
                  key={f}
                  className="feature-pill text-[11.5px] text-[#3b5e45] border border-[#3b5e45]/30 bg-[#3b5e45]/5 px-3 py-1.5 rounded-full cursor-default"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Amenity icons */}
            <div className="flex gap-6 mb-8 py-4 border-y border-[#e8e2d8]">
              {[
                { icon: <Wifi size={18} strokeWidth={1.5} />, label: "Free Wi-Fi" },
                { icon: <Bath size={18} strokeWidth={1.5} />, label: "Rain shower" },
                { icon: <Tv size={18} strokeWidth={1.5} />, label: "Smart TV" },
                { icon: <Coffee size={18} strokeWidth={1.5} />, label: "Nespresso" },
                { icon: <Wind size={18} strokeWidth={1.5} />, label: "Climate ctrl" },
              ].map((a) => (
                <div key={a.label} className="flex flex-col items-center gap-1.5 text-[#3b5e45]">
                  {a.icon}
                  <span className="text-[9.5px] text-[#a09890] tracking-wide text-center leading-tight">{a.label}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-4 mt-auto">
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                <p className="text-[11px] text-[#a09890] tracking-wide mb-0.5" style={{ fontFamily: "'Lato', sans-serif" }}>From</p>
                <div className="flex items-baseline gap-0.5 text-[#1e1c19]">
                  <sup className="text-lg font-normal">₹</sup>
                  <span className="text-[2.6rem] font-semibold leading-none">{room.price}</span>
                  <span className="text-[13px] text-[#a09890] ml-1" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>/night</span>
                </div>
              </div>

              {/* <button className="flex items-center gap-2 bg-[#3b5e45] hover:bg-[#2e4a36] text-white text-[11px] tracking-[0.18em] uppercase font-bold px-7 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0">
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

export default function RoomsSection() {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
        
        /* Section animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-header {
          animation: fadeInUp 0.6s ease forwards;
        }
        
        .animate-card {
          opacity: 0;
          animation: scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-card:nth-child(1) { animation-delay: 0.1s; }
        .animate-card:nth-child(2) { animation-delay: 0.2s; }
        .animate-card:nth-child(3) { animation-delay: 0.3s; }
        
        .animate-offer-section {
          animation: slideInBottom 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .animate-offer-content {
          animation: fadeInLeft 0.8s ease forwards;
        }
        
        .animate-image {
          animation: fadeInRight 0.8s ease forwards;
        }
      `}</style>

      <section className="bg-[#f0ece0] py-16 px-6">
        {/* Header */}
        <div className="text-center mb-14 animate-header">
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
            Explore Our Luxurious Rooms
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1020px] mx-auto">
          {rooms.map((room, index) => (
            <div
              key={room.name}
              className="animate-card bg-white rounded-2xl overflow-hidden border border-[#e0d9cf] flex flex-col group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
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
                  className="text-[13.5px] text-black leading-relaxed line-clamp-4"
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
                    <sup className="text-xl font-normal">₹</sup>
                    <span className="text-4xl font-semibold leading-none">{room.price}</span>
                    <span
                      className="text-[13px] text-[#a09890] ml-1"
                      style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
                    >
                      /night
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

              {/* CTA — opens modal */}
              <button
                onClick={() => setActiveRoom(room)}
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
      <section className="relative min-h-[580px] overflow-hidden flex items-center animate-offer-section">
        <img
          src="room-page-banner.png"
          alt="Luxury hotel lounge"
          className="absolute inset-0 w-full h-full object-cover animate-image"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 w-full px-8 md:px-20 py-16 flex items-end md:items-center min-h-[580px]">
          <div className="bg-white w-full max-w-[400px] p-10 animate-offer-content">
            <p className="text-xs italic text-[#999] font-serif mb-3">Get Yours</p>
            <h2 className="font-serif text-[2.2rem] leading-tight text-[#1a1a1a] mb-5 tracking-tight">
              Discover Special Offers Just For You Today
            </h2>
            <p className="text-[12.5px] text-[#666] leading-relaxed mb-8">
              Unlock exclusive deals and packages for your next getaway at Forrest Vibes. Take advantage of our special offers and make your stay even more memorable.
            </p>
            <Link href="/contact-us">
            <button className="bg-[#3a6349] text-white text-[11px] font-bold uppercase tracking-widest px-8 py-3 hover:bg-[#2d4f39] transition-colors">
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeRoom && (
        <RoomModal room={activeRoom} onClose={() => setActiveRoom(null)} />
      )}
    </>
  );
}