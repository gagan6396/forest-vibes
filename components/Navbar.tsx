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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = [
    "font-bold tracking-widest text-[15px] uppercase transition-colors duration-200",
    scrolled ? "text-stone-800 hover:text-[#2d5a3d]" : "text-white hover:text-white/70",
  ].join(" ");

  return (
    <>
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
        <button className="hidden md:block text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] px-7 py-3.5 rounded-sm shadow-lg shadow-[#2d5a3d]/30 hover:bg-[#1e3f2b] hover:-translate-y-px hover:shadow-xl active:translate-y-0 transition-all duration-200">
          INQUIRE NOW
        </button>

        {/* Hamburger — Mobile */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={[
              "block w-6 h-0.5 rounded transition-all duration-300",
              scrolled ? "bg-stone-800" : "bg-white",
              mobileOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-6 h-0.5 rounded transition-all duration-300",
              scrolled ? "bg-stone-800" : "bg-white",
              mobileOpen ? "opacity-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-6 h-0.5 rounded transition-all duration-300",
              scrolled ? "bg-stone-800" : "bg-white",
              mobileOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={[
          "fixed top-[80px] left-0 right-0 z-40 md:hidden",
          "bg-[#f5f2eb] backdrop-blur-lg border-t border-[#2d5a3d]/10",
          "px-8 pt-6 pb-8 flex flex-col gap-1",
          "transition-all duration-300",
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-[12px] font-medium tracking-widest uppercase text-stone-800 py-3.5 border-b border-[#2d5a3d]/10 hover:text-[#2d5a3d] transition-colors"
          >
            {link.label}
          </a>
        ))}

        <a
          href="#book"
          onClick={() => setMobileOpen(false)}
          className="mt-5 text-center text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] py-4 rounded-sm shadow-lg hover:bg-[#1e3f2b] transition-colors"
        >
          INQUIRE NOW
        </a>
      </div>
    </>
  );
}