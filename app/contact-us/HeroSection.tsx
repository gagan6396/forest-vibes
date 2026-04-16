"use client";

export default function ContactHero() {
  return (
    <section className="relative w-full h-[420px] overflow-hidden">

      {/* Background image */}
      <img
        src="contactUs.jpeg"
        alt="Forrest Vibes Hotel"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif italic text-[12px] text-[#7db896] tracking-widest mb-4">
          Contact Us
        </p>
        <h1 className="font-serif font-light text-white text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] tracking-tight">
          Get in Touch<br />
          with <em className="italic text-[#7db896]">Forrest Vibes</em>
        </h1>
        <div className="w-8 h-px bg-white/30 mt-6" />
      </div>

    </section>
  );
}