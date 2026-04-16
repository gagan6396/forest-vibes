"use client";

import Link from "next/link";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";

// Slide data with mobile and desktop images
const slides = [
  {
    id: 1,
    imageDesktop: "bann1.webp",
    imageMobile: "home2.jpeg",
    title: "Your Home Away,",
    emphasis: "Reimagined",
    subtitle: "for the Extraordinary",
    description:
      "Immerse Yourself in Elegance and Comfort at Forrest Vibes. Our Exceptional Accommodations, Impeccable Service, and Unrivaled Hospitality Await Your Arrival. Your Perfect Getaway Starts Here.",
    mobileOnly: true, // Show only image on mobile
  },
  {
    id: 2,
    imageDesktop: "ban3.webp",
    imageMobile: "home-2.jpeg",
    title: "Where Nature Meets",
    emphasis: "Luxury",
    subtitle: "in Perfect Harmony",
    description:
      "Wake up to the sounds of nature and experience unparalleled comfort in our eco-friendly luxury suites. Designed for those who seek tranquility without compromising on modern amenities.",
    mobileOnly: true,
  },
  {
    id: 3,
    imageDesktop: "ban4.webp",
    imageMobile: "home-3.jpeg",
    title: "Create Unforgettable",
    emphasis: "Memories",
    subtitle: "with Your Loved Ones",
    description:
      "Whether it's a romantic getaway or a family vacation, our curated experiences and world-class service ensure every moment becomes a cherished memory.",
    mobileOnly: true,
  },
];

export default function HeroSection() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [people, setPeople] = useState("");
  const [bookingError, setBookingError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [dateError, setDateError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const roomTypes = [
    { id: "lily", name: "Lily Room", price: 11000, maxGuests: 8 },
    { id: "daisy", name: "Daisy Room", price: 11000, maxGuests: 8 },
    { id: "rose", name: "Rose Room", price: 11000, maxGuests: 8 },
    { id: "iris", name: "Iris Room", price: 11000, maxGuests: 8 },
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate slides with improved handling
  const startAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (isAutoPlaying && !isTransitioning) {
        goToNextSlide();
      }
    }, 6000);
  }, [isAutoPlaying, isTransitioning]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isAutoPlaying, currentSlide, startAutoplay, stopAutoplay]);

  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    stopAutoplay();
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
    startAutoplay();
  };

  // Pure validation function - doesn't set state
  const isValidDateRange = useCallback((arrival: string, departure: string) => {
    if (!arrival || !departure) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const arrivalDateObj = new Date(arrival);
    const departureDateObj = new Date(departure);

    if (arrivalDateObj < today) return false;
    if (departureDateObj <= arrivalDateObj) return false;

    const nights = Math.ceil(
      (departureDateObj.getTime() - arrivalDateObj.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights > 30) return false;

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    if (arrivalDateObj > oneYearFromNow) return false;

    return true;
  }, []);

  // Separate function for setting error messages
  const validateDatesAndSetError = useCallback((arrival: string, departure: string) => {
    if (!arrival || !departure) {
      setDateError("");
      return true;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const arrivalDateObj = new Date(arrival);
    const departureDateObj = new Date(departure);

    if (arrivalDateObj < today) {
      setDateError("Arrival date cannot be in the past");
      return false;
    }

    if (departureDateObj <= arrivalDateObj) {
      setDateError("Departure date must be after arrival date");
      return false;
    }

    const nights = Math.ceil(
      (departureDateObj.getTime() - arrivalDateObj.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights > 30) {
      setDateError("Maximum stay is 30 nights");
      return false;
    }

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    if (arrivalDateObj > oneYearFromNow) {
      setDateError("Bookings can only be made up to 1 year in advance");
      return false;
    }

    setDateError("");
    return true;
  }, []);

  const handleArrivalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArrival = e.target.value;
    setArrivalDate(newArrival);
    if (departureDate) {
      validateDatesAndSetError(newArrival, departureDate);
    } else {
      setDateError("");
    }
  };

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDeparture = e.target.value;
    setDepartureDate(newDeparture);
    if (arrivalDate) {
      validateDatesAndSetError(arrivalDate, newDeparture);
    } else {
      setDateError("");
    }
  };

  const handleBook = () => {
    if (!arrivalDate || !departureDate || !people) {
      setBookingError(true);
      setTimeout(() => setBookingError(false), 600);
      return;
    }

    if (!validateDatesAndSetError(arrivalDate, departureDate)) {
      setBookingError(true);
      setTimeout(() => setBookingError(false), 600);
      return;
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom("");
    setSpecialRequests("");
  };

  const handleConfirmBooking = () => {
    if (!selectedRoom) {
      alert("Please select a room type");
      return;
    }
    
    const selectedRoomData = roomTypes.find((room) => room.id === selectedRoom);
    const totalPrice = calculateNights * (selectedRoomData?.price || 0);
    
    // Format message for WhatsApp
    const message = `*New Booking Request*%0A%0A` +
      `*Guest Details:*%0A` +
      `${people} ${parseInt(people) === 1 ? "Guest" : "Guests"}%0A%0A` +
      `*Stay Details:*%0A` +
      `Arrival: ${new Date(arrivalDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}%0A` +
      `Departure: ${new Date(departureDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}%0A` +
      `Nights: ${calculateNights} nights%0A%0A` +
      `*Room Selection:*%0A` +
      `${selectedRoomData?.name}%0A` +
      `Rate: ₹${selectedRoomData?.price}/night%0A` +
      `Total: ₹${totalPrice}%0A%0A` +
      `*Special Requests:*%0A${specialRequests || "None"}`;
    
    // WhatsApp number (without + or spaces)
    const phoneNumber = "917500131319";
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    
    // Close modal and reset form
    setIsModalOpen(false);
    setArrivalDate("");
    setDepartureDate("");
    setPeople("");
    setSelectedRoom("");
    setSpecialRequests("");
    setDateError("");
  };

  // Calculate nights - pure computation without state updates
  const calculateNights = useMemo(() => {
    if (arrivalDate && departureDate && isValidDateRange(arrivalDate, departureDate)) {
      return Math.ceil(
        (new Date(departureDate).getTime() - new Date(arrivalDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }
    return 0;
  }, [arrivalDate, departureDate, isValidDateRange]);

  const getTotalPrice = useMemo(() => {
    const selectedRoomData = roomTypes.find((room) => room.id === selectedRoom);
    if (selectedRoomData && calculateNights > 0) {
      return selectedRoomData.price * calculateNights;
    }
    return 0;
  }, [selectedRoom, calculateNights]);

  const getMinArrivalDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMinDepartureDate = () => {
    if (arrivalDate) {
      const nextDay = new Date(arrivalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split("T")[0];
    }
    return getMinArrivalDate();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@200;300;400;500&display=swap');

        .hero-grain::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        .anim-fade-up-1 { opacity: 0; animation: fadeUp 0.6s 0.10s forwards; }
        .anim-fade-up-2 { opacity: 0; animation: fadeUp 0.6s 0.22s forwards; }
        .anim-fade-up-3 { opacity: 0; animation: fadeUp 0.6s 0.34s forwards; }
        .anim-fade-up-4 { opacity: 0; animation: fadeUp 0.6s 0.46s forwards; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-img-zoom {
          transform: scale(1.07);
          animation: zoomIn 1.5s 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes zoomIn {
          from { transform: scale(1.07); }
          to   { transform: scale(1); }
        }

        .booking-btn-sweep {
          position: relative;
          overflow: hidden;
        }
        .booking-btn-sweep::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #1e3f2b;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .booking-btn-sweep:hover::before { transform: scaleX(1); }

        .cta-arrow { transition: transform 0.25s; }
        .btn-primary-hero:hover .cta-arrow { transform: translateX(4px); }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          cursor: pointer;
          filter: invert(30%) sepia(50%) saturate(400%) hue-rotate(100deg);
        }
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; }

        /* Modal animations */
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(35px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-backdrop {
          animation: modalFadeIn 0.25s ease forwards;
        }
        .modal-content {
          animation: modalSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Room card hover effect */
        .room-card {
          transition: all 0.2s ease;
        }
        .room-card:hover {
          transform: translateX(4px);
        }
        .room-card.selected {
          border-color: #2d5a3d;
          background-color: #f5f0e8;
        }

        /* Error shake animation */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .error-shake {
          animation: shake 0.3s ease-in-out;
        }

        /* Slider dot active animation */
        .slider-dot {
          transition: all 0.3s ease;
        }
        .slider-dot-active {
          background-color: #2d5a3d;
          transform: scale(1.2);
        }

        /* Navigation buttons hover effect */
        .slider-nav-btn {
          transition: all 0.3s ease;
        }
        .slider-nav-btn:hover {
          background-color: #2d5a3d;
          color: white;
          border-color: #2d5a3d;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hero-title-mobile {
            display: none !important;
          }
          .hero-desc-mobile {
            display: none !important;
          }
          .booking-bar-mobile {
            margin-left: 1rem !important;
            margin-right: 1rem !important;
          }
          .booking-btn-mobile span:last-child {
            font-size: 13px !important;
          }
          /* Hide text content on mobile */
          .mobile-text-hidden {
            display: none;
          }
        }
      `}</style>

      <section
        className="relative w-full bg-[#f5f0e8] hero-grain overflow-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* SLIDER CONTAINER */}
        <div className="relative h-[550px] md:h-[680px] flex flex-col">
          {/* Slides */}
          <div className="relative h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* IMAGE - Responsive with mobile support */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${isMobile ? slide.imageMobile : slide.imageDesktop})`,
                    backgroundSize: "cover",
                    backgroundPosition: isMobile ? "center" : "center",
                    transform: index === currentSlide ? "scale(1)" : "scale(1.05)",
                    transition: "transform 7s ease-out",
                  }}
                />
                
                {/* TEXT CONTENT - Hidden on mobile, visible on desktop */}
                {!isMobile && (
                  <div className="relative z-20 flex flex-col justify-center h-full px-5 md:px-12 lg:px-20">
                    <div className="max-w-3xl">
                      <h1
                        className="text-white leading-[1.2] md:leading-[1.08] mb-3 md:mb-4 anim-fade-up-2"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                          fontWeight: 400,
                        }}
                      >
                        {slide.title}
                        <br />
                        <em className="italic text-[#c8e6d9]">{slide.emphasis}</em>
                        <br />
                        {slide.subtitle}
                      </h1>

                      <p
                        className="text-white/90 text-[12px] md:text-[14px] leading-[1.6] md:leading-[1.7] max-w-2xl mb-5 md:mb-7 anim-fade-up-3"
                        style={{ fontWeight: 300 }}
                      >
                        {slide.description}
                      </p>

                      <div className="flex items-center gap-4 md:gap-5 anim-fade-up-4">
                       <Link href="/rooms">
                       <button
                          className="btn-primary-hero inline-flex items-center gap-2 px-5 py-2.5 md:px-7 md:py-3 bg-[#2d5a3d] text-[#f5f0e8] text-[9px] md:text-[10px] tracking-[0.18em] uppercase font-[400] border-none cursor-pointer transition-colors duration-200 hover:bg-[#1e3f2b]"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          Explore Rooms
                          <svg
                            className="cta-arrow w-3 h-3 md:w-4 md:h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                       </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
       
          {/* Slider Navigation Arrows - Hide on mobile */}
          {!isMobile && (
            <>
              <button
                onClick={goToPrevSlide}
                className="slider-nav-btn absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#2d5a3d] hover:border-[#2d5a3d] transition-all duration-300"
                aria-label="Previous slide"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNextSlide}
                className="slider-nav-btn absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#2d5a3d] hover:border-[#2d5a3d] transition-all duration-300"
                aria-label="Next slide"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Slider Dots */}
          <div className="absolute bottom-3 md:bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`slider-dot transition-all duration-300 ${
                  index === currentSlide
                    ? "w-4 md:w-6 h-1.5 md:h-2 bg-[#2d5a3d] slider-dot-active"
                    : "w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 hover:bg-white/80 rounded-full"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* BOOKING BAR - Responsive, overlapping slider */}
        <div className="relative z-30 mx-3 md:mx-4 lg:mx-12 -mt-10 md:-mt-14 pb-8 md:pb-10 booking-bar-mobile">
          <div
            className={`bg-white border border-[#2d5a3d]/[0.12] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] ${
              bookingError ? "error-shake" : ""
            }`}
            style={{ boxShadow: "0 16px 50px rgba(30,50,30,0.09)" }}
          >
            {/* Arrival Date */}
            <label className="flex items-center gap-2.5 md:gap-3.5 px-4 md:px-6 py-3 md:py-4 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 md:border-r border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[14px] h-[14px] md:w-[17px] md:h-[17px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
                <span className="text-[8px] md:text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Arrival
                </span>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={handleArrivalDateChange}
                  min={getMinArrivalDate()}
                  className="text-[11px] md:text-[12px] font-[300] text-[#2d2d28] bg-transparent border-none outline-none cursor-pointer w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* Departure Date */}
            <label className="flex items-center gap-2.5 md:gap-3.5 px-4 md:px-6 py-3 md:py-4 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 md:border-r border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[14px] h-[14px] md:w-[17px] md:h-[17px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
                <span className="text-[8px] md:text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Departure
                </span>
                <input
                  type="date"
                  value={departureDate}
                  onChange={handleDepartureDateChange}
                  min={getMinDepartureDate()}
                  className="text-[11px] md:text-[12px] font-[300] text-[#2d2d28] bg-transparent border-none outline-none cursor-pointer w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* Number of People */}
            <label className="flex items-center gap-2.5 md:gap-3.5 px-4 md:px-6 py-3 md:py-4 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[14px] h-[14px] md:w-[17px] md:h-[17px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="flex flex-col gap-0.5 md:gap-1 flex-1">
                <span className="text-[8px] md:text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Guests
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="How many?"
                  className="text-[11px] md:text-[12px] font-[300] text-[#2d2d28] placeholder-[#c5bfb4] bg-transparent border-none outline-none w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* CTA */}
            <button
              onClick={handleBook}
              className={`booking-btn-sweep flex flex-col items-center justify-center gap-0.5 md:gap-1 px-5 md:px-8 py-3 md:py-3.5 border-none cursor-pointer transition-colors duration-200 ${
                bookingError ? "bg-[#7a3020]" : "bg-[#2d5a3d]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="text-[8px] md:text-[9px] font-[500] tracking-[0.22em] uppercase text-[#f5f0e8]/70 relative z-[1]">
                Reserve Now
              </span>
              <span
                className="text-[13px] md:text-[16px] italic text-[#f5f0e8] relative z-[1]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                }}
              >
                Book a Stay
              </span>
            </button>
          </div>

          {dateError && (
            <div className="mt-2 text-center">
              <p className="text-[9px] md:text-[10.5px] text-[#7a3020] bg-white/90 inline-block px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-full">
                {dateError}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div
            className="modal-content bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#2d5a3d] px-5 py-4 sticky top-0 z-10">
              <h3
                className="text-white text-xl font-normal italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Complete Your Booking
              </h3>
              <p className="text-white/70 text-[11px] mt-0.5 font-light">
                Please review your dates and select a room
              </p>
            </div>

            <div className="p-5">
              <div className="bg-[#f5f0e8] rounded-lg p-3 mb-5">
                <h4 className="text-[10px] font-[500] tracking-[0.2em] uppercase text-[#a09888] mb-2">
                  Your Stay Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[9px] text-[#a09888] mb-0.5">Arrival</p>
                    <p className="text-[12px] font-[500] text-[#2d2d28]">
                      {new Date(arrivalDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#a09888] mb-0.5">Departure</p>
                    <p className="text-[12px] font-[500] text-[#2d2d28]">
                      {new Date(departureDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#a09888] mb-0.5">Total Nights</p>
                    <p className="text-[12px] font-[500] text-[#2d5a3d]">
                      {calculateNights} nights
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#a09888] mb-0.5">Guests</p>
                    <p className="text-[12px] font-[500] text-[#2d2d28]">
                      {people} {parseInt(people) === 1 ? "Guest" : "Guests"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-[500] tracking-[0.2em] uppercase text-[#a09888] mb-2">
                  Select Room Type
                </label>
                <div className="space-y-2">
                  {roomTypes.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`room-card cursor-pointer border-2 rounded-lg p-3 ${
                        selectedRoom === room.id
                          ? "border-[#2d5a3d] bg-[#f5f0e8]"
                          : "border-[#e8e4dc] hover:border-[#2d5a3d]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-[#1a1a1a] text-sm">
                            {room.name}
                          </h4>
                          <p className="text-[10px] text-[#a09888] mt-0.5">
                            Max {room.maxGuests} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[18px] font-semibold text-[#2d5a3d]">
                            ₹{room.price}
                          </p>
                          <p className="text-[9px] text-[#a09888]">per night</p>
                        </div>
                      </div>
                      {selectedRoom === room.id && calculateNights > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#2d5a3d]/20">
                          <p className="text-[10px] text-[#2d5a3d]">
                            ✓ Selected for {calculateNights} nights — Total: ₹{room.price * calculateNights}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-[500] tracking-[0.2em] uppercase text-[#a09888] mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={2}
                  placeholder="Any special requests or preferences? (e.g., dietary restrictions, room preferences, etc.)"
                  className="w-full px-3 py-2 text-[12px] text-[#2d2d28] border border-[#e8e4dc] rounded-lg focus:outline-none focus:border-[#2d5a3d] transition-colors resize-none"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              {selectedRoom && calculateNights > 0 && (
                <div className="bg-[#f5f0e8] rounded-lg p-3 mb-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#a09888]">Room rate</span>
                      <span className="text-[#2d2d28]">
                        ₹{roomTypes.find((r) => r.id === selectedRoom)?.price} × {calculateNights} nights
                      </span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-[#a09888]">Taxes & fees</span>
                      <span className="text-[#2d2d28]">Included</span>
                    </div>
                    <div className="border-t border-[#d4cfc4] pt-2 mt-1.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#2d2d28]">Total Amount</span>
                        <span className="text-[18px] text-[#2d5a3d] font-bold">
                          ₹{getTotalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-3 py-2.5 border border-[#2d5a3d] text-[#2d5a3d] text-[10px] font-[500] tracking-[0.18em] uppercase hover:bg-[#f5f0e8] transition-colors rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-3 py-2.5 bg-[#2d5a3d] text-white text-[10px] font-[500] tracking-[0.18em] uppercase hover:bg-[#1e3f2b] transition-colors rounded-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}