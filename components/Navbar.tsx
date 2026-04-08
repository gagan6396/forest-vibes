"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT US", href: "/contact-us" },
  { label: "ROOMS", href: "/rooms" },
];



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  // "light" = white text on dark bg | "dark" = dark text on light bg
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Section theme detection via IntersectionObserver ── */
  useEffect(() => {
    const navbarHeight = 80;

    const observe = () => {
      // Watch every section / div that has data-navbar-theme attribute
      const sections = document.querySelectorAll("[data-navbar-theme]");

      if (sections.length === 0) {
        // No attributes found — default to light text (assumes dark hero)
        setTheme("light");
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionTheme = (entry.target as HTMLElement).dataset
                .navbarTheme as "light" | "dark";
              setTheme(sectionTheme ?? "light");
            }
          });
        },
        {
          // Fire when the section's top edge crosses the navbar bottom
          rootMargin: `-${navbarHeight}px 0px -${window.innerHeight - navbarHeight - 2}px 0px`,
          threshold: 0,
        }
      );

      sections.forEach((s) => observer.observe(s));
      return () => observer.disconnect();
    };

    const cleanup = observe();
    return cleanup;
  }, []);

  /* ── Mobile menu animations ── */
  useEffect(() => {
    if (mobileOpen) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── Derived values ── */
  // When scrolled the navbar has a solid bg → always dark text
  const effectiveTheme = scrolled ? "dark" : theme;
  const isLight = effectiveTheme === "light"; // white text mode

  const linkClass = [
    "font-bold tracking-widest text-[15px] uppercase transition-colors duration-200 relative nav-link",
    isLight ? "text-white hover:text-white/70" : "text-stone-800 hover:text-[#2d5a3d]",
  ].join(" ");

  // Strong shadow on dark hero, none when scrolled (solid navbar handles contrast)
  const linkShadow = scrolled
    ? "none"
    : isLight
    ? "0 1px 6px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.5)"
    : "none";

  const hamburgerColor = mobileOpen || scrolled
    ? "#1c1917"
    : isLight
    ? "#ffffff"
    : "#1c1917";

  return (
    <>
      <style>{`
        /* Gradient scrim — sits behind navbar content, only on dark-hero unscrolled state */
        .navbar-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.45) 0%,
            rgba(0, 0, 0, 0.0) 100%
          );
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .navbar-scrim.hidden-scrim {
          opacity: 0;
        }

        /* Underline hover */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          height: 1px;
          width: 0;
          background: currentColor;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* Mobile menu animations */
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

      {/* ── Navbar ── */}
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 h-[80px] transition-all duration-300",
          scrolled ? "bg-[#f5f2eb]/90 backdrop-blur-md shadow-sm" : "bg-transparent",
        ].join(" ")}
      >
        {/* Gradient scrim — hidden when scrolled or on light backgrounds */}
        <div
          className={[
            "navbar-scrim",
            scrolled || !isLight ? "hidden-scrim" : "",
          ].join(" ")}
        />

        {/* Logo */}
        <a href="/" className="relative flex items-center gap-2.5 group z-10">
          <img
            src="/logo-nobg.webp"
            alt="Forrest Vibes"
            className="w-30 h-20 object-contain transition-transform duration-300 mt-4 group-hover:scale-105"
          />
        </a>

        {/* Desktop Links */}
        <ul className="relative z-10 hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={linkClass}
                style={{ textShadow: linkShadow }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Inquire Now — Desktop */}
        <a href="/contact-us" className="relative z-10 hidden md:block text-[11px] font-semibold tracking-widest uppercase text-white bg-[#2d5a3d] px-7 py-3.5 rounded-sm shadow-lg shadow-[#2d5a3d]/30 hover:bg-[#1e3f2b] hover:-translate-y-px hover:shadow-xl active:translate-y-0 transition-all duration-200 cursor-pointer">
          INQUIRE NOW
        </a>

        {/* Hamburger — Mobile */}
        <button
          className="relative z-10 md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 p-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {[
            mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            undefined,
            mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
          ].map((transform, i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2,
                borderRadius: 9999,
                background: hamburgerColor,
                transition: "transform 0.3s, opacity 0.3s, background 0.3s",
                transform: transform ?? "none",
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── Fullscreen Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-[#f5f2eb] flex flex-col overflow-hidden"
          style={{
            transition: "opacity 0.25s ease",
            opacity: visible ? 1 : 0,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="h-[80px] shrink-0" />

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
            Forrest Vibes — A Forest Retreat
          </p>
        </div>
      )}
    </>
  );
}