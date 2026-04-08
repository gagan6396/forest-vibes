"use client";

import { useState, useCallback, useMemo } from "react";

export default function HeroSection() {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [people, setPeople] = useState("");
  const [bookingError, setBookingError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [dateError, setDateError] = useState("");

  const roomTypes = [
    { id: "deluxe", name: "Deluxe Room", price: 320, maxGuests: 2 },
    { id: "junior", name: "Junior Suite", price: 520, maxGuests: 2 },
    { id: "presidential", name: "Presidential Suite", price: 1200, maxGuests: 4 },
  ];

  // Pure validation function - doesn't set state
  const isValidDateRange = useCallback((arrival: string, departure: string) => {
    if (!arrival || !departure) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const arrivalDateObj = new Date(arrival);
    const departureDateObj = new Date(departure);

    if (arrivalDateObj < today) return false;
    if (departureDateObj <= arrivalDateObj) return false;
    
    const nights = Math.ceil((departureDateObj.getTime() - arrivalDateObj.getTime()) / (1000 * 60 * 60 * 24));
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

    const nights = Math.ceil((departureDateObj.getTime() - arrivalDateObj.getTime()) / (1000 * 60 * 60 * 24));
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
    const selectedRoomData = roomTypes.find(room => room.id === selectedRoom);
    alert(`Booking Confirmed!\n\nRoom: ${selectedRoomData?.name}\nArrival: ${arrivalDate}\nDeparture: ${departureDate}\nGuests: ${people}\nSpecial Requests: ${specialRequests || "None"}`);
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
      return Math.ceil((new Date(departureDate).getTime() - new Date(arrivalDate).getTime()) / (1000 * 60 * 60 * 24));
    }
    return 0;
  }, [arrivalDate, departureDate, isValidDateRange]);

  const getTotalPrice = useMemo(() => {
    const selectedRoomData = roomTypes.find(room => room.id === selectedRoom);
    if (selectedRoomData && calculateNights > 0) {
      return selectedRoomData.price * calculateNights;
    }
    return 0;
  }, [selectedRoom, calculateNights]);

  const getMinArrivalDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinDepartureDate = () => {
    if (arrivalDate) {
      const nextDay = new Date(arrivalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay.toISOString().split('T')[0];
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

        .anim-fade-up-1 { opacity: 0; animation: fadeUp 0.7s 0.10s forwards; }
        .anim-fade-up-2 { opacity: 0; animation: fadeUp 0.7s 0.22s forwards; }
        .anim-fade-up-3 { opacity: 0; animation: fadeUp 0.7s 0.34s forwards; }
        .anim-fade-up-4 { opacity: 0; animation: fadeUp 0.7s 0.46s forwards; }
        .anim-fade-up-5 { opacity: 0; animation: fadeUp 0.7s 0.62s forwards; }

        .hero-img-zoom {
          transform: scale(1.07);
          animation: zoomIn 1.6s 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
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
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
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
      `}</style>

      <section
        className="relative w-full bg-[#f5f0e8] hero-grain overflow-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ── MAIN SPLIT ── */}
        <div className="flex flex-col md:flex-row relative z-[2]">
          {/* IMAGE */}
          <div
            className="w-full md:w-[48%] md:order-2 relative overflow-hidden"
            style={{ minHeight: "280px" }}
          >
            <img
              src="home.png"
              alt="Forest Vibes pool"
              className="hero-img-zoom absolute inset-0 w-full h-full object-cover"
            />
            <div className="hidden md:block absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#f5f0e8] to-transparent z-[2]" />
            <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f5f0e8] to-transparent z-[2]" />
            <div className="absolute top-0 left-0 right-0 h-[72px] bg-gradient-to-b from-black/20 to-transparent z-[2]" />
          </div>

          {/* TEXT */}
          <div className="w-full md:w-[52%] md:order-1 flex flex-col justify-center px-7 md:px-16 lg:px-[72px] pt-8 md:pt-[130px] pb-10 md:pb-20 relative">
            <div className="flex items-center gap-3 mb-6 anim-fade-up-1" />

            <h1
              className="text-[#191914] leading-[1.06] mb-6 anim-fade-up-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4.2vw, 3.8rem)",
                fontWeight: 400,
              }}
            >
              Your Home Away,
              <br />
              <em className="italic text-[#2d5a3d]">Reimagined</em>
              <br />
              for the Extraordinary
            </h1>

            <p
              className="text-black text-[13.5px] leading-[1.78] max-w-[360px] mb-10 anim-fade-up-3"
              style={{ fontWeight: 300 }}
            >
              Immerse Yourself in Elegance and Comfort at Forrest Vibes. Our
              Exceptional Accommodations, Impeccable Service, and Unrivaled
              Hospitality Await Your Arrival. Your Perfect Getaway Starts Here.
            </p>

            <div className="flex items-center gap-6 anim-fade-up-4">
              <button
                className="btn-primary-hero inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#2d5a3d] text-[#f5f0e8] text-[10px] tracking-[0.18em] uppercase font-[400] border-none cursor-pointer transition-colors duration-200 hover:bg-[#1e3f2b]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Explore Stays
                <svg
                  className="cta-arrow w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="anim-fade-up-5 hidden md:flex absolute bottom-16 left-[72px] items-center gap-3.5 bg-white/70 backdrop-blur-sm border border-[#2d5a3d]/[0.15] px-5 py-3">
              <div className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center flex-shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f5f0e8"
                  strokeWidth="1.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-[500] text-[#191914]">
                  4.98 / 5.0
                </span>
                <span className="text-[11px] font-[300] text-[#8a8176] tracking-[0.04em]">
                  1,200+ Guest Reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOOKING BAR */}
        <div className="relative z-10 mx-4 md:mx-12 lg:mx-[72px] md:-mt-7 pb-14">
          <div
            className={`bg-white border border-[#2d5a3d]/[0.12] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] ${
              bookingError ? "error-shake" : ""
            }`}
            style={{ boxShadow: "0 20px 60px rgba(30,50,30,0.09)" }}
          >
            {/* Arrival Date */}
            <label className="flex items-center gap-3.5 px-7 py-5 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 md:border-r border-[#2d5a3d]/[0.1] relative">
              <svg
                className="w-[18px] h-[18px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Arrival Date
                </span>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={handleArrivalDateChange}
                  min={getMinArrivalDate()}
                  className="text-[13px] font-[300] text-[#2d2d28] bg-transparent border-none outline-none cursor-pointer w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* Departure Date */}
            <label className="flex items-center gap-3.5 px-7 py-5 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 md:border-r border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[18px] h-[18px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Departure Date
                </span>
                <input
                  type="date"
                  value={departureDate}
                  onChange={handleDepartureDateChange}
                  min={getMinDepartureDate()}
                  className="text-[13px] font-[300] text-[#2d2d28] bg-transparent border-none outline-none cursor-pointer w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* Number of People */}
            <label className="flex items-center gap-3.5 px-7 py-5 cursor-pointer hover:bg-[#f9f7f3] focus-within:bg-[#f2efe6] transition-colors border-b md:border-b-0 border-[#2d5a3d]/[0.1]">
              <svg
                className="w-[18px] h-[18px] text-[#2d5a3d] opacity-80 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[9px] font-[500] tracking-[0.2em] uppercase text-[#a09888]">
                  Number of People
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="How many guests?"
                  className="text-[13px] font-[300] text-[#2d2d28] placeholder-[#c5bfb4] bg-transparent border-none outline-none w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>
            </label>

            {/* CTA */}
            <button
              onClick={handleBook}
              className={`booking-btn-sweep flex flex-col items-center justify-center gap-1 px-10 py-3 border-none cursor-pointer transition-colors duration-200 ${
                bookingError ? "bg-[#7a3020]" : "bg-[#2d5a3d]"
              }`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span className="text-[9px] font-[500] tracking-[0.22em] uppercase text-[#f5f0e8]/70 relative z-[1]">
                Reserve Now
              </span>
              <span
                className="text-[18px] italic text-[#f5f0e8] relative z-[1]"
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
            <div className="mt-3 text-center">
              <p className="text-[11px] text-[#7a3020] bg-white/90 inline-block px-4 py-2 rounded-full">
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
            className="modal-content bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#2d5a3d] px-6 py-5 sticky top-0 z-10">
              <h3
                className="text-white text-2xl font-normal italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Complete Your Booking
              </h3>
              <p className="text-white/70 text-xs mt-1 font-light">
                Please review your dates and select a room
              </p>
            </div>

            <div className="p-6">
              <div className="bg-[#f5f0e8] rounded-lg p-4 mb-6">
                <h4 className="text-[11px] font-[500] tracking-[0.2em] uppercase text-[#a09888] mb-3">
                  Your Stay Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-[#a09888] mb-1">Arrival</p>
                    <p className="text-[14px] font-[500] text-[#2d2d28]">
                      {new Date(arrivalDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#a09888] mb-1">Departure</p>
                    <p className="text-[14px] font-[500] text-[#2d2d28]">
                      {new Date(departureDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#a09888] mb-1">Total Nights</p>
                    <p className="text-[14px] font-[500] text-[#2d5a3d]">
                      {calculateNights} nights
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#a09888] mb-1">Guests</p>
                    <p className="text-[14px] font-[500] text-[#2d2d28]">
                      {people} {parseInt(people) === 1 ? 'Guest' : 'Guests'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-[500] tracking-[0.2em] uppercase text-[#a09888] mb-3">
                  Select Room Type
                </label>
                <div className="space-y-3">
                  {roomTypes.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className={`room-card cursor-pointer border-2 rounded-lg p-4 ${
                        selectedRoom === room.id
                          ? "border-[#2d5a3d] bg-[#f5f0e8]"
                          : "border-[#e8e4dc] hover:border-[#2d5a3d]/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-[#1a1a1a] text-base">
                            {room.name}
                          </h4>
                          <p className="text-[11px] text-[#a09888] mt-1">
                            Max {room.maxGuests} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[20px] font-semibold text-[#2d5a3d]">
                            ₹{room.price}
                          </p>
                          <p className="text-[10px] text-[#a09888]">per night</p>
                        </div>
                      </div>
                      {selectedRoom === room.id && calculateNights > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#2d5a3d]/20">
                          <p className="text-[11px] text-[#2d5a3d]">
                            ✓ Selected for {calculateNights} nights — Total: ₹{room.price * calculateNights}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[11px] font-[500] tracking-[0.2em] uppercase text-[#a09888] mb-3">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={3}
                  placeholder="Any special requests or preferences? (e.g., dietary restrictions, room preferences, etc.)"
                  className="w-full px-4 py-3 text-[13px] text-[#2d2d28] border border-[#e8e4dc] rounded-lg focus:outline-none focus:border-[#2d5a3d] transition-colors resize-none"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              {selectedRoom && calculateNights > 0 && (
                <div className="bg-[#f5f0e8] rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#a09888]">Room rate</span>
                      <span className="text-[#2d2d28]">
                        ₹{roomTypes.find(r => r.id === selectedRoom)?.price} × {calculateNights} nights
                      </span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#a09888]">Taxes & fees</span>
                      <span className="text-[#2d2d28]">Included</span>
                    </div>
                    <div className="border-t border-[#d4cfc4] pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-[#2d2d28]">Total Amount</span>
                        <span className="text-[20px] text-[#2d5a3d] font-bold">
                          ₹{getTotalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 border border-[#2d5a3d] text-[#2d5a3d] text-[11px] font-[500] tracking-[0.18em] uppercase hover:bg-[#f5f0e8] transition-colors rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-4 py-3 bg-[#2d5a3d] text-white text-[11px] font-[500] tracking-[0.18em] uppercase hover:bg-[#1e3f2b] transition-colors rounded-lg"
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