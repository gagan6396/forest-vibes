"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./AdminSidebar.module.css";
import { clearSession, getStoredUser, AuthUser } from "@/lib/api";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: IconDashboard },
  { label: "Blog", href: "/admin/blog", icon: IconBlog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setCurrentUser(getStoredUser());
  }, []);

  function handleLogout() {
    clearSession();
    router.push("/auth/login");
  }

  const userInitials = (currentUser?.name || "")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <div className={styles.mobileBar}>
        <button className={styles.hamburger} aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          <IconMenu />
        </button>
        <span className={styles.mobileBrand}>Forrest Vibes</span>
        <button className={styles.mobileLogout} aria-label="Logout" onClick={handleLogout}>
          <IconLogout />
        </button>
      </div>

      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}

      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>FV</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Forrest Vibes</span>
            <span className={styles.brandSub}>Admin Panel</span>
          </div>
        </div>

        <div className={styles.navScroll}>
          <p className={styles.sectionLabel}>Menu</p>
          <nav className={styles.nav}>
            {menuItems.map(({ label, href, icon: Icon }) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <Icon />
                  <span className={styles.navLabel}>{label}</span>
                </Link>
              );
            })}
          </nav>

          <p className={styles.sectionLabel}>Website</p>
          <nav className={styles.nav}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navItem}
            >
              <IconExternal />
              <span className={styles.navLabel}>View Live Site</span>
            </a>
          </nav>
        </div>

        <div className={styles.userBlock}>
          <div className={styles.userRow}>
            <span className={styles.userAvatar}>{userInitials || "?"}</span>
            <div className={styles.userText}>
              <span className={styles.userName}>{currentUser?.name || "..."}</span>
              <span className={styles.userEmail}>{currentUser?.email || ""}</span>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <IconLogout />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------- inline icons ---------------- */

function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconBlog() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 4h16v16H4z" strokeLinejoin="round" />
      <path d="M8 9h8M8 13h8M8 17h4" strokeLinecap="round" />
    </svg>
  );
}
function IconExternal() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}