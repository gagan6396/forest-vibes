"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "How can I make a reservation at your hotel?",
    a: "Visit our website and head to the Book Now or Reservations page. Enter your desired dates, choose your room type, and complete your booking securely online in under two minutes.",
  },
  {
    q: "Can I request specific amenities or room preferences?",
    a: "Absolutely. During the booking process, or by calling our concierge team directly, you may specify preferences such as high floor, ocean view, hypoallergenic bedding, or extra pillows — we'll do our best to accommodate you.",
  },
  {
    q: "Is there a restaurant or bar on-site?",
    a: "Yes. Our rooftop restaurant serves farm-to-table cuisine from 7 AM to 11 PM, and our lobby bar is open until 1 AM nightly, offering craft cocktails and a curated wine list.",
  },
  {
    q: "Are face masks required in public areas of the hotel?",
    a: "Face masks are currently optional throughout all public areas of the hotel. We continue to follow local health guidance and will update this policy as needed.",
  },
  {
    q: "How can I contact the front desk during my stay?",
    a: "Dial 0 from any in-room phone for 24/7 front desk assistance. You may also reach us via the hotel app, WhatsApp, or by visiting the lobby desk in person.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Reservations cancelled more than 48 hours before check-in receive a full refund. Cancellations within 48 hours are subject to a one-night charge. Non-refundable rates are marked clearly at booking.",
  },
];

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`group border-b border-stone-200 transition-colors duration-300 ${
        isOpen ? "bg-[#f5f0e8]" : "bg-transparent hover:bg-stone-50"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-5 px-8 py-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className="shrink-0 font-serif text-xl tracking-widest text-black pt-1 select-none transition-colors duration-300"
         
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          className="flex-1 font-medium text-black text-base md:text-lg leading-snug transition-colors duration-300"
          
        >
          {faq.q}
        </span>

        {/* Icon */}
        <span
          className={`shrink-0 mt-1 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-500 ${
            isOpen
              ? "bg-[#3b5e45] border-[#3b5e45] rotate-45"
              : "bg-transparent border-stone-400 group-hover:border-black rotate-0"
          }`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            className="transition-colors duration-300"
          >
            <line
              x1="5.5"
              y1="0"
              x2="5.5"
              y2="11"
              stroke={isOpen ? "#fff" : "#000000"}
              strokeWidth="1.4"
            />
            <line
              x1="0"
              y1="5.5"
              x2="11"
              y2="5.5"
              stroke={isOpen ? "#fff" : "#000000"}
              strokeWidth="1.4"
            />
          </svg>
        </span>
      </button>

      {/* Answer */}
      <div
        style={{ height, overflow: "hidden", transition: "height 0.45s cubic-bezier(0.4,0,0.2,1)" }}
      >
        <div ref={bodyRef} className="px-8 pb-7 pl-[4.5rem]">
          <p
            className="text-black text-sm md:text-base leading-relaxed max-w-2xl"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HotelFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital@1&family=Lato:wght@300;400&display=swap');
        .faq-label {
          letter-spacing: 0.22em;
        }
      `}</style>

      <section className="min-h-screen bg-[#f0ece0] flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-5xl mx-auto">

          {/* Header */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 mb-14 items-end">
            <div>
              <p
                className="faq-label text-[10px] uppercase text-black tracking-widest mb-4 font-light"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Frequently Asked
              </p>
              <h2
                className="text-5xl md:text-6xl text-black leading-[1.05]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
              >
                Questions
                <br />
                <em>for Us?</em>
              </h2>
            </div>

            <div className="md:pb-2">
              <p
                className="text-black text-xl leading-relaxed max-w-sm"
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
              >
                Have something on your mind? We've answered the most common questions below.
                If you need anything else, our concierge team is always a message away.
              </p>

              {/* Decorative line */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-10 bg-black" />
                <div className="h-px flex-1 bg-stone-300" />
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-sm bg-white">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>

          {/* Footer note */}
          <p
            className="text-center text-black text-xs mt-10 tracking-wide"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            Still have questions?{" "}
            <a href="#contact" className="text-black underline underline-offset-2 hover:opacity-70 transition-opacity">
              Contact our team
            </a>
          </p>
        </div>
      </section>
    </>
  );
}