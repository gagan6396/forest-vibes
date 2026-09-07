const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: AuthUser;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(data.message || "Something went wrong", res.status);
  }

  return data as T;
}

// =================================
// Token storage (localStorage + cookie)
// =================================
// localStorage client-side fetch calls ke liye (Authorization header),
// aur cookie isliye taaki server-side middleware (route protection) bhi
// login-status check kar sake - middleware localStorage nahi padh sakta.
const TOKEN_KEY = "forest_vibe_token";
const USER_KEY = "forest_vibe_user";
const ROLE_COOKIE = "forest_vibe_role";

export function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // 7 din ki cookie - middleware ke liye
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  document.cookie = `${ROLE_COOKIE}=${user.role}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  document.cookie = `${ROLE_COOKIE}=; path=/; max-age=0`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

// =================================
// Auth API calls
// =================================
export function signupUser(payload: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}) {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMe() {
  const token = getToken();
  return request<{ success: boolean; user: AuthUser }>("/auth/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export { ApiError };