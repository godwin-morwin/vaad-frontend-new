/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";
import { useAuthContext } from "@/app/contexts/auth-context";
import { useToast } from "@/app/contexts/toast-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: "login" | "signup";
  dismissible?: boolean;
  onBack?: () => void;
  showAlternativeActions?: boolean;
  showGoogleSignIn?: boolean;
  successRedirectTo?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = "login",
  dismissible = true,
  onBack,
  showAlternativeActions = true,
  showGoogleSignIn = true,
  successRedirectTo = "/",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { login } = useAuthContext();
  const { showToast } = useToast();

  // Sync mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setShowPassword(false);
      setSubmitError(null);
    }
  }, [isOpen, initialMode]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await login({ email, password, redirectTo: successRedirectTo });
      onSuccess?.();
      showToast({
        type: "success",
        message: "Login successful! Welcome back.",
        duration: 3000,
      });
    } catch (error: unknown) {
      const errorData = error as {
        message?: unknown;
        data?: { message?: unknown } | null;
      } | null;
      const message =
        (error instanceof Error && error.message) ||
        (typeof errorData?.message === "string" && errorData.message) ||
        (typeof errorData?.data?.message === "string" &&
          errorData.data.message) ||
        "Unable to log in. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={dismissible ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[920px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close button */}
            {dismissible && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}

            {/* ========== LEFT PANEL ========== */}
            <div className="relative hidden md:flex md:w-[45%] bg-[#1a1f2e] overflow-hidden">
              {/* Background image / abstract */}
              <div className="absolute inset-0">
                <Image
                  src="/images/auth-side.png"
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col justify-between p-8 w-full">
                {/* Logo */}
                <div>
                  <Image
                    src="/vaad-white-full.svg"
                    alt="VAAD"
                    width={100}
                    height={32}
                    className="brightness-110"
                  />
                </div>

                {/* Testimonial */}
                <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-white">
                  <p className="text-[14px] leading-relaxed text-white/90 mb-4">
                    “Bookings that used to take a week of calls now close in a
                    day. Every inquiry, artwork file and campaign confirmation
                    lives in one dashboard, so nothing slips between calls,
                    chats and email threads.”
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                      TB
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Tunde Balogun</p>
                      <p className="text-xs text-white/60">
                        Operations Lead, Google.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== RIGHT PANEL (Form) ========== */}
            <div className="w-full md:w-[55%] p-8 sm:p-10 flex flex-col justify-center overflow-y-auto">
              <div className="max-w-sm mx-auto w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                  {mode === "login" ? "Welcome back" : "Create an account"}
                </h2>
                <p className="text-sm text-gray-500 mb-8 text-center">
                  Helping brands reach audiences in powerful locations.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === "signup" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0177AB]/25 focus:border-[#0177AB] transition"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0177AB]/25 focus:border-[#0177AB] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0177AB]/25 focus:border-[#0177AB] transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {showAlternativeActions && mode === "login" && (
                    <div className="flex justify-start">
                      <button
                        type="button"
                        className="text-sm text-gray-500 hover:text-[#0177AB] transition"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  {submitError && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
                    >
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#0177AB] hover:bg-[#016693] text-white font-semibold text-sm transition shadow-lg shadow-[#0177AB]/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <LoaderCircle size={18} className="animate-spin" />
                        Logging in...
                      </span>
                    ) : mode === "login" ? (
                      "Login"
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </form>

                {showGoogleSignIn && (
                  <>
                    <div className="flex items-center gap-4 my-6">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-sm text-gray-400">Or</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-700"
                    >
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </span>
                      <ArrowRight size={16} className="text-gray-400" />
                    </button>
                  </>
                )}

                {showAlternativeActions && (
                  <p className="mt-8 text-center text-sm text-gray-500">
                    {mode === "login" ? (
                      <>
                        Don’t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("signup")}
                          className="text-[#0177AB] font-semibold hover:underline"
                        >
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-[#0177AB] font-semibold hover:underline"
                        >
                          Login
                        </button>
                      </>
                    )}
                  </p>
                )}

                {onBack && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#0177AB]"
                  >
                    <ArrowLeft size={16} />
                    Go back
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
