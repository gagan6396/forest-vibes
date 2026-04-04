"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT US", href: "/contact-us" },
  { label: "ROOMS", href: "/rooms" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  const toggle = () => setMobileOpen((v) => !v);
  const close = () => setMobileOpen(false);

  return (
    <>
      <style>{`
        /* iOS Safari requires cursor:pointer for onClick to fire on non-button elements */
        .nav-tap { cursor: pointer; -webkit-tap-highlight-color: transparent; }

        .mobile-menu {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 40;
          background: #f5f2eb;
          display: flex;
          flex-direction: column;
          padding: 32px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          /* hardware-accelerate so iOS doesn't composite-lag */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .hamburger-bar {
          display: block;
          width: 24px;
          height: 2px;
          border-radius: 9999px;
          transition: transform 0.3s, opacity 0.3s, background-color 0.3s;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          transition: "background 0.3s",
          background: scrolled || mobileOpen ? "#f5f2eb" : "transparent",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.08)" : "none",
        }}
      >
        {/* Logo */}
        <a href="/" className="nav-tap" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo-nobg.webp"
            alt="Paradista"
            style={{ width: 112, height: 64, objectFit: "contain", marginTop: 12 }}
          />
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            display: "none",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: 36,
          }}
          className="md:!flex items-center"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  fontSize: 13,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: scrolled ? "#292524" : "#fff",
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Inquire Now — Desktop */}
        <button
          className="nav-tap hidden md:block"
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#2d5a3d",
            padding: "14px 28px",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1e3f2b")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2d5a3d")}
        >
          INQUIRE NOW
        </button>

        {/* ── Hamburger button — the real fix is using onTouchEnd + onClick together ── */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="nav-tap md:hidden"
          onClick={toggle}
          onTouchEnd={(e) => {
            e.preventDefault(); // prevent ghost click on iOS
            toggle();
          }}
          style={{
            background: "none",
            border: "none",
            padding: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            cursor: "pointer",
            minWidth: 44,
            minHeight: 44,
          }}
        >
          {/* Bar 1 */}
          <span
            className="hamburger-bar"
            style={{
              background: scrolled || mobileOpen ? "#292524" : "#fff",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          {/* Bar 2 */}
          <span
            className="hamburger-bar"
            style={{
              background: scrolled || mobileOpen ? "#292524" : "#fff",
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? "scaleX(0)" : "none",
            }}
          />
          {/* Bar 3 */}
          <span
            className="hamburger-bar"
            style={{
              background: scrolled || mobileOpen ? "#292524" : "#fff",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* ── Mobile Menu — only in DOM when open ── */}
      {mobileOpen && (
        <div className="mobile-menu md:hidden">

          <nav style={{ display: "flex", flexDirection: "column" }}>
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-tap"
                onClick={close}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "#44403c",
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(45,90,61,0.1)",
                  display: "block",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#book"
            className="nav-tap"
            onClick={close}
            style={{
              marginTop: 40,
              display: "block",
              textAlign: "center",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#fff",
              background: "#2d5a3d",
              padding: "16px 0",
              borderRadius: 2,
            }}
          >
            INQUIRE NOW
          </a>
        </div>
      )}
    </>
  );
}