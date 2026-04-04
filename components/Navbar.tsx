"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT US", href: "contact-us" },
  { label: "ROOMS", href: "/rooms" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger enter animation after mount
  useEffect(() => {
    if (mobileOpen) {
      // tiny delay so the element is in DOM before animating
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const linkClass = [
    "font-bold tracking-widest text-[15px] uppercase transition-colors duration-200",
    scrolled ? "text-stone-800 hover:text-[#2d5a3d]" : "text-white hover:text-white/70",
  ].join(" ");

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-link {
          opacity: 0;
          animation: slideDown 0.35s ease forwards;
        }
        .menu-link:nth-child(1) { animation-delay: 0.05s; }
        .menu-link:nth-child(2) { animation-delay: 0.10s; }
        .menu-link:nth-child(3) { animation-delay: 0.15s; }
        .menu-link:nth-child(4) { animation-delay: 0.20s; }
        .menu-btn {
          opacity: 0;
          animation: slideDown 0.35s ease forwards;
          animation-delay: 0.25s;
        }
        .menu-footer {
          opacity: 0;
          animation: slideDown 0.35s ease forwards;
          animation-delay: 0.30s;
        }
      `}</style>

      {/* Navbar */}
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-[80px] transition-all duration-300",
          scrolled ? "bg-[#f5f2eb]/90 text-black backdrop-blur-md shadow-sm" : "bg-transparent",
        ].join(" ")}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <img
            src="/logo-nobg.webp"
            alt="Paradista"
            className="w-30 h-20 object-contain transition-transform duration-300 mt-4 group-hover:scale-105"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={[
                  linkClass,
                  "relative",
                  "after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-current",
                  "after:transition-all after:duration-300 hover:after:w-full",
                ].join(" ")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Book Now — Desktop */}
        <a
          href="/contact-us"
          className="hidden md:block text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] px-7 py-3.5 rounded-sm shadow-lg shadow-[#2d5a3d]/30 hover:bg-[#1e3f2b] hover:-translate-y-px hover:shadow-xl active:translate-y-0 transition-all duration-200"
        >
          INQUIRE NOW
        </a>

        {/* Hamburger — Mobile */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <span style={{
            display: "block", width: 24, height: 2, borderRadius: 9999,
            background: scrolled || mobileOpen ? "#1c1917" : "#fff",
            transition: "transform 0.3s, background 0.3s",
            transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: 24, height: 2, borderRadius: 9999,
            background: scrolled || mobileOpen ? "#1c1917" : "#fff",
            transition: "opacity 0.3s, background 0.3s",
            opacity: mobileOpen ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: 24, height: 2, borderRadius: 9999,
            background: scrolled || mobileOpen ? "#1c1917" : "#fff",
            transition: "transform 0.3s, background 0.3s",
            transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-[#f5f2eb] flex flex-col overflow-hidden"
          style={{
            transition: "opacity 0.25s ease",
            opacity: visible ? 1 : 0,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Clear navbar height */}
          <div className="h-[80px] shrink-0" />

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-10 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="menu-link block text-[15px] font-semibold tracking-[0.2em] uppercase text-stone-700 py-4 border-b border-[#2d5a3d]/10 hover:text-[#2d5a3d] transition-colors duration-200"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="/contact-us"
              onClick={() => setMobileOpen(false)}
              className="menu-btn mt-8 text-center text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] py-4 rounded-sm hover:bg-[#1e3f2b] transition-colors"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              INQUIRE NOW
            </a>
          </div>

          <p className="menu-footer text-center text-[10px] tracking-widest uppercase text-stone-400 pb-10">
            Paradista — A Forest Retreat
          </p>
        </div>
      )}
    </>
  );
}