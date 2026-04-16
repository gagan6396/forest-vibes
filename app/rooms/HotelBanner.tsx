"use client";

export default function HotelBanner() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Lato:wght@300;700&display=swap');`}</style>

      <section className="relative w-full h-[500px] overflow-hidden">
        <img
          src="rooms.jpeg"
          alt="Hotel room"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.15))" }} />

        <div className="absolute inset-0 flex flex-col justify-center px-14 max-w-[560px]" style={{paddingTop:"60px"}}>
          <h1
            className="text-[52px] text-white leading-[1.1] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            Where every night<br />
            feels like a<br />
            <em style={{ color: "#4e9e6b" }}>fresh start.</em>
          </h1>
          <p
            className="text-[13px] text-white/60 leading-relaxed max-w-[320px] mb-7"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            Forrest Vibes isn't just a place to sleep — it's where you exhale. Come as a guest, leave as a regular.
          </p>
          <button
            className="w-fit px-7 py-3 bg-[#3b5e45] text-white text-[11px] tracking-[0.16em] uppercase font-bold rounded-md"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Book Now
          </button>
        </div>
      </section>
    </>
  );
}