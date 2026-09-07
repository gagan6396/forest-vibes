import { NextRequest, NextResponse } from "next/server";

const TOKEN_COOKIE = "forest_vibe_token";
const ROLE_COOKIE = "forest_vibe_role";

// Jo routes bina login ke access nahi hone chahiye
const PROTECTED_PREFIXES = ["/admin"];

// Jo routes sirf role="admin" ke liye hain
const ADMIN_ONLY_PREFIXES = ["/admin"];

// Auth pages - agar already login hai to yahan se bounce karna hai
const AUTH_PREFIXES = ["/auth/login", "/auth/signup"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  const role = req.cookies.get(ROLE_COOKIE)?.value;

  const isAuthPage = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Auth pages aur protected pages dono ko browser cache (bfcache) me store
  // nahi hone dena - warna back button dabane par bina server request ke
  // hi purana page dikh jaata hai aur middleware run hi nahi hota.
  const noStoreHeaders = { "Cache-Control": "no-store, must-revalidate" };

  // Already logged in ho aur login/signup page par ja rahe ho -> apni jagah bhejo
  if (isAuthPage && token) {
    const destination = role === "admin" ? "/admin" : "/";
    return NextResponse.redirect(new URL(destination, req.url), {
      headers: noStoreHeaders,
    });
  }

  if (!isProtected) {
    if (isAuthPage) {
      const res = NextResponse.next();
      res.headers.set("Cache-Control", "no-store, must-revalidate");
      return res;
    }
    return NextResponse.next();
  }

  // Login nahi hai -> seedha login page par bhejo, wapas aane ke liye
  // original URL bhi query me bhej rahe hain
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl, { headers: noStoreHeaders });
  }

  // Admin-only route par non-admin user ko login par bhej do
  const isAdminOnly = ADMIN_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isAdminOnly && role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url), {
      headers: noStoreHeaders,
    });
  }

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login", "/auth/signup"],
};