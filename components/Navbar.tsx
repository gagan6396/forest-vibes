"use client";

import { useState, useEffect, useRef } from "react";

const roomOptions = ["Deluxe Suite", "Ocean View Room", "Family Bungalow", "Presidential Villa"];

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "CONTACT US", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null); // Changed from HTMLDivElement to HTMLLIElement

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoomsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = [
    "font-bold tracking-widest text-[15px] uppercase transition-colors duration-200",
    scrolled ? " hover:text-[#2d5a3d]" : "text-black hover:text-black/70",
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

          {/* Rooms Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              className={`${linkClass} flex items-center gap-1.5`}
              onMouseEnter={() => setRoomsOpen(true)}
              onMouseLeave={() => setRoomsOpen(false)}
              onClick={() => setRoomsOpen(!roomsOpen)}
            >
              ROOMS
              <svg
                className={`w-2.5 h-2.5 transition-transform duration-200 ${roomsOpen ? "rotate-180" : ""}`}
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <polyline points="2,3.5 5,6.5 8,3.5" />
              </svg>
            </button>

            {/* Dropdown Panel */}
            <div
              className={[
                "absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-52",
                "bg-[#f5f2eb] border border-[#2d5a3d]/10 rounded-sm shadow-xl overflow-hidden",
                "transition-all duration-200",
                roomsOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none",
              ].join(" ")}
              onMouseEnter={() => setRoomsOpen(true)}
              onMouseLeave={() => setRoomsOpen(false)}
            >
              {roomOptions.map((room, i) => (
                <a
                  key={room}
                  href="#rooms"
                  className={[
                    "block px-5 py-3 text-[11px] font-medium tracking-widest uppercase",
                    "text-stone-700 hover:bg-[#2d5a3d] hover:text-white transition-colors duration-150",
                    i !== roomOptions.length - 1 ? "border-b border-[#2d5a3d]/10" : "",
                  ].join(" ")}
                >
                  {room}
                </a>
              ))}
            </div>
          </li>
        </ul>

        {/* Book Now — Desktop */}
        <button className="hidden md:block text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] px-7 py-3.5 rounded-sm shadow-lg shadow-[#2d5a3d]/30 hover:bg-[#1e3f2b] hover:-translate-y-px hover:shadow-xl active:translate-y-0 transition-all duration-200">
          BOOK NOW
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

        {/* Mobile Rooms Toggle */}
        <button
          onClick={() => setMobileRoomsOpen(!mobileRoomsOpen)}
          className="flex justify-between items-center text-[12px] font-medium tracking-widest uppercase text-stone-800 py-3.5 border-b border-[#2d5a3d]/10 hover:text-[#2d5a3d] transition-colors"
        >
          ROOMS
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${mobileRoomsOpen ? "rotate-180" : ""}`}
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <polyline points="2,3.5 5,6.5 8,3.5" />
          </svg>
        </button>

        {mobileRoomsOpen && (
          <div className="pl-4">
            {roomOptions.map((room) => (
              <a
                key={room}
                href="#rooms"
                onClick={() => setMobileOpen(false)}
                className="block text-[11px] font-medium tracking-widest uppercase text-stone-500 py-2.5 border-b border-[#2d5a3d]/10 hover:text-[#2d5a3d] transition-colors"
              >
                {room}
              </a>
            ))}
          </div>
        )}

        <a
          href="#book"
          onClick={() => setMobileOpen(false)}
          className="mt-5 text-center text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] py-4 rounded-sm shadow-lg hover:bg-[#1e3f2b] transition-colors"
        >
          BOOK NOW
        </a>
      </div>
    </>
  );
}