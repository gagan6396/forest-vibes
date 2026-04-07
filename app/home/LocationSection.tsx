"use client";

export default function LocationSection() {
  const cards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
      stat: "270 km",
      label: "By Road",
      sub: "5.5 hrs from Delhi",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      stat: "45 mins",
      label: "Railway",
      sub: "From Mussoorie",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      ),
      stat: "75 mins",
      label: "Airport",
      sub: "From Jolly Grant",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .location-section {
          background-color: #f0ece0;
          background-image:
            radial-gradient(ellipse 70% 60% at 0% 50%, rgba(45,90,61,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 70% 60% at 100% 50%, rgba(45,90,61,0.07) 0%, transparent 65%);
          padding: 96px 64px;
        }

        @media (max-width: 768px) {
          .location-section { padding: 72px 24px; }
          .location-grid { grid-template-columns: 1fr !important; }
        }

        .location-card {
          background: #fff;
          border: 1px solid rgba(45,90,61,0.08);
          border-radius: 4px;
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          transition: box-shadow 0.25s, transform 0.25s;
        }

        .location-card:hover {
          box-shadow: 0 12px 40px rgba(45,90,61,0.10);
          transform: translateY(-3px);
        }

        .icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: rgba(45,90,61,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }

        .card-divider {
          width: 32px;
          height: 1px;
          background: rgba(45,90,61,0.25);
          margin: 16px 0;
        }
      `}</style>

      <section className="location-section">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-8 h-px bg-[#2d5a3d] opacity-40" />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "#2d5a3d" }}>
              Getting Here
            </span>
            <span className="block w-8 h-px bg-[#2d5a3d] opacity-40" />
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 600,
            color: "#1a1a1a",
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            Perfectly <em style={{ fontStyle: "italic", color: "#2d5a3d" }}>Located</em>
          </h2>

          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "#6b6357",
            lineHeight: 1.8,
            maxWidth: 440,
            margin: "0 auto",
          }}>
            Deep in the forest, yet closer than you think. Forest Vibes sits at the
            heart of the hills — reachable by road, rail, or air.
          </p>
        </div>

        {/* Cards */}
        <div
          className="location-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          {cards.map((card) => (
            <div key={card.label} className="location-card">
              <div className="icon-wrap">{card.icon}</div>

              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.9rem, 3vw, 2.4rem)",
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1,
              }}>
                {card.stat}
              </div>

              <div className="card-divider" />

              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#2d5a3d",
                marginBottom: 6,
              }}>
                {card.label}
              </div>

              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: "#000000",
                lineHeight: 1.6,
              }}>
                {card.sub}
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}