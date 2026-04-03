"use client";

export default function WelcomeSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Jost:wght@400;500;600&display=swap');
      `}</style>

      <section className="w-full bg-[#f0ece0] py-20 px-6 md:px-16 lg:px-24">

        {/* Image */}
        <div className="w-full max-w-8xl mx-auto rounded-sm overflow-hidden shadow-md mb-14">
          <img
            src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=85"
            alt="Paradista resort poolside"
            className="w-full h-[420px] md:h-[500px] object-cover"
          />
        </div>

        {/* Text content */}
        <div className="max-w-8xl mx-auto text-center">
          <h2
            className="text-[#1a1a1a] leading-[1.15] mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 500,
            }}
          >
            From Our Warm Welcome to Our Attentive Service,
            <br className="hidden md:block" />
            {" "}We Aim to Exceed Your Expectations and Make Your
            <br className="hidden md:block" />
            {" "}Stay Unforgettable.
          </h2>

          <a
            href="#about"
            className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-white bg-[#2d5a3d] px-8 py-4 rounded-sm hover:bg-[#1e3f2b] transition-colors duration-200"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            About Us
          </a>
        </div>

      </section>

      {/* ── Rooms Banner Section ── */}
      <section className="relative w-full h-[620px] overflow-hidden">

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1600&q=85"
          alt="Paradista accommodations"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* White card — left aligned, vertically centered */}
        <div className="relative z-10 h-full flex items-center px-10 md:px-20">
          <div className="bg-white/95 rounded-sm p-10 md:p-14 max-w-md shadow-2xl">

            {/* Eyebrow */}
            <p
              className="text-stone-500 text-sm italic tracking-wide mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Our Rooms
            </p>

            {/* Heading */}
            <h2
              className="text-[#1a1a1a] leading-[1.12] mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
              }}
            >
              Explore Our
              <br />Distinctive
              <br />Accommodations at
              <br />Paradista
            </h2>

            {/* Body */}
            <p
              className="text-stone-500 text-[14px] leading-relaxed mb-8"
              style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
            >
              Each space is meticulously crafted to offer a unique blend of
              luxury, functionality, and aesthetic appeal
            </p>

            {/* CTA */}
            <a
              href="#rooms"
              className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-white bg-[#2d5a3d] px-8 py-4 rounded-sm hover:bg-[#1e3f2b] transition-colors duration-200"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Book Now
            </a>

          </div>
        </div>

      </section>
    </>
  );
}