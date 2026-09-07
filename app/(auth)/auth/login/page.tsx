"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from ".././Auth.module.css";
import { loginUser, saveSession, getToken, getStoredUser, ApiError } from "@/lib/api";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="leaf">
    <path
      d="M4 20C4 11 10 4 20 4C20 14 13 20 4 20Z"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path d="M4 20C8 15 12 11 18 6" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const ForestSilhouette = () => (
  <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g fill="#0f2117">
      <path d="M60 500 L110 380 L130 420 L160 340 L195 500Z" />
      <path d="M190 500 L245 320 L270 380 L300 300 L345 500Z" />
      <path d="M330 500 L380 400 L400 440 L430 360 L470 500Z" />
    </g>
    <g fill="#193c2c" opacity="0.8">
      <path d="M20 500 L70 410 L95 450 L120 390 L160 500Z" />
      <path d="M250 500 L300 400 L320 440 L350 380 L390 500Z" />
    </g>
  </svg>
);

const EyeIcon = ({ off }: { off?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 12C2 12 5.5 5.5 12 5.5C18.5 5.5 22 12 22 12C22 12 18.5 18.5 12 18.5C5.5 18.5 2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    {off && <line x1="3" y1="21" x2="21" y2="3" stroke="currentColor" strokeWidth="1.5" />}
  </svg>
);

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Back button se bfcache se page restore hone par bhi ye check ho -
  // "pageshow" bfcache restore par bhi fire hota hai, normal mount effect nahi.
  useEffect(() => {
    const redirectIfLoggedIn = () => {
      const token = getToken();
      if (!token) return;
      const user = getStoredUser();
      router.replace(user?.role === "admin" ? "/admin" : "/");
    };

    redirectIfLoggedIn();

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) redirectIfLoggedIn();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [router]);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email address doesn't look right.";
    }
    if (!form.password) {
      next.password = "Enter your password.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerMessage(null);
    setServerError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await loginUser({ email: form.email, password: form.password });

      if (res.token && res.user) {
        saveSession(res.token, res.user);
      }

      setServerMessage("Signed in. Redirecting you...");

      // Agar middleware se redirect hokar aaye the (?redirect=/admin) to
      // wahi wapas bhejo, warna role ke hisaab se
      const redirectTo = searchParams.get("redirect");
      const destination = redirectTo || (res.user?.role === "admin" ? "/admin" : "/");
      setTimeout(() => {
        router.push(destination);
      }, 800);
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Couldn't sign you in. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <section className={styles.showcase}>
        <div className={styles.showcaseTrees}>
          <ForestSilhouette />
        </div>
        <div className={styles.brandMark}>
          <LeafIcon />
          <span className={styles.brandName}>
            Forrest Vibes
            <span className={styles.brandNameSub}>DEHRADUN RETREAT</span>
          </span>
        </div>
        <div className={styles.showcaseCopy}>
          <h1>
            Welcome back to <em>your home away</em>
          </h1>
          <p>
            Sign in to manage your bookings, check arrival details, and pick up right where you
            left off.
          </p>
        </div>
        <div className={styles.showcaseFooter}>
          <span>Private villas</span>
          <span>Forest views</span>
          <span>24×7 concierge</span>
        </div>
      </section>

      <section className={styles.formSide}>
        <div className={styles.formShell}>
          <div className={styles.mobileBrand}>
            <LeafIcon />
            <span className={styles.brandName}>
              Forrest Vibes
              <span className={styles.brandNameSub}>DEHRADUN RETREAT</span>
            </span>
          </div>

          <div className={styles.formHeader}>
            <p className={styles.eyebrow}>GUEST SIGN IN</p>
            <h2>Sign in to your account</h2>
            <p>
              New to Forrest Vibes? <Link href="/auth/signup">Create an account</Link>
            </p>
          </div>

          {serverMessage && <div className={styles.successBanner}>{serverMessage}</div>}
          {serverError && <div className={styles.errorText}>{serverError}</div>}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="email">Email address</label>
              <div className={styles.inputWrap}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p id="email-error" className={styles.errorText}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  className={styles.toggleVisibility}
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className={styles.errorText}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className={styles.rowBetween}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                Keep me signed in
              </label>
              <button type="button" className={styles.linkBtn}>
                Forgot password?
              </button>
            </div>

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <p className={styles.formFooterNote}>
            By signing in you agree to Forrest Vibes' <a href="/terms">Terms of Stay</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </div>
  );
}