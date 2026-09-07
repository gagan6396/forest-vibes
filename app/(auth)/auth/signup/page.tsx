"use client";

import { useMemo, useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from ".././Auth.module.css";
import { signupUser, saveSession, getToken, getStoredUser, ApiError } from "@/lib/api";

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
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agree?: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

function getStrength(password: string): { score: number; label: string } {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ["Too weak", "Weak", "Okay", "Good", "Strong"];
  return { score, label: labels[score] };
}

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const strength = useMemo(() => getStrength(form.password), [form.password]);

  // Back button se bfcache se page restore hone par bhi ye check ho -
  // normal useEffect mount sirf fresh load par chalta hai, "pageshow"
  // bfcache restore par bhi fire hota hai.
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
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email address doesn't look right.";
    }
    if (form.phone && !/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      next.phone = "Enter a valid phone number.";
    }
    if (!form.password) {
      next.password = "Create a password.";
    } else if (form.password.length < 8) {
      next.password = "Use at least 8 characters.";
    }
    if (form.confirmPassword !== form.password) {
      next.confirmPassword = "Passwords don't match.";
    }
    if (!form.agree) {
      next.agree = "Please accept the terms to continue.";
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
      const res = await signupUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      if (res.token && res.user) {
        saveSession(res.token, res.user);
      }

      setServerMessage(res.message || "Account created successfully.");
      setForm(initialForm);

      // Signup se hamesha role="user" milta hai (backend guarantee karta hai),
      // aur abhi koi alag user-area page nahi hai, isliye login par bhej rahe hain
      setTimeout(() => {
        router.push("/auth/login");
      }, 1200);
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Couldn't create your account. Try again."
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
            Your home away, <em>reimagined</em>
          </h1>
          <p>
            Create an account to book faster next time, track your stays, and hear about new
            rooms first.
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
            <p className={styles.eyebrow}>CREATE ACCOUNT</p>
            <h2>Join Forrest Vibes</h2>
            <p>
              Already have an account? <Link href="/auth/login">Sign in</Link>
            </p>
          </div>

          {serverMessage && <div className={styles.successBanner}>{serverMessage}</div>}
          {serverError && <div className={styles.errorText}>{serverError}</div>}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Full name</label>
              <div className={styles.inputWrap}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              {errors.name && (
                <p id="name-error" className={styles.errorText}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className={styles.row}>
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
                <label htmlFor="phone">Phone (optional)</label>
                <div className={styles.inputWrap}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                {errors.phone && (
                  <p id="phone-error" className={styles.errorText}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
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
              {form.password && (
                <>
                  <div className={styles.strengthTrack}>
                    <div
                      className={styles.strengthFill}
                      style={{ width: `${(strength.score / 4) * 100}%` }}
                    />
                  </div>
                  <p className={styles.strengthLabel}>{strength.label}</p>
                </>
              )}
              {errors.password && (
                <p id="password-error" className={styles.errorText}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className={styles.inputWrap}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                <button
                  type="button"
                  className={styles.toggleVisibility}
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <EyeIcon off={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-error" className={styles.errorText}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              />
              I agree to the Terms of Stay and Privacy Policy
            </label>
            {errors.agree && <p className={styles.errorText}>{errors.agree}</p>}

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}