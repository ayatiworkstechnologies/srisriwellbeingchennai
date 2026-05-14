"use client";

import Image from "next/image";
import { useState } from "react";

import { FlashMessage, PasswordInput } from "./admin-ui";

export default function AdminLogin({
  handleLogin,
  handleForgotPassword,
  credentials,
  setCredentials,
  isSubmitting,
  errorMessage,
  successMessage,
}) {
  const [mode, setMode] = useState("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");

  const submitForgotPassword = async (event) => {
    event.preventDefault();
    setForgotError("");
    setForgotMessage("");
    const result = await handleForgotPassword(forgotEmail);
    if (result?.ok) {
      setForgotMessage(result.message || "Password reset link sent.");
    } else {
      setForgotError(result?.message || "Failed to send password reset link.");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0faf5] border border-[#c3e6d5] shadow-sm">
            <Image
              src="/logo.svg"
              alt="Sri Sri Wellbeing"
              width={32}
              height={32}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-semibold text-[#0f172a]">
            {mode === "login" ? "Welcome back" : "Reset password"}
          </h1>
          <p className="mt-1 text-sm text-[#64748b]">
            {mode === "login"
              ? "Sign in to the Sri Sri Wellbeing portal"
              : "Enter your email to receive a reset link"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage ? <FlashMessage tone="error" message={errorMessage} /> : null}
              {successMessage ? <FlashMessage tone="success" message={successMessage} /> : null}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#374151]" htmlFor="login-email">
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={credentials.email}
                  onChange={(event) =>
                    setCredentials((current) => ({ ...current, email: event.target.value }))
                  }
                  required
                  className="h-10 w-full rounded-lg border border-[#d1d5db] px-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/15"
                  placeholder="admin@srisriwellbeing.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#374151]" htmlFor="login-password">
                  Password
                </label>
                <PasswordInput
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((current) => ({ ...current, password: event.target.value }))
                  }
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#1a6b4a] px-4 text-sm font-semibold text-white transition hover:bg-[#15573c] disabled:opacity-60"
              >
                {isSubmitting ? "Signing in…" : "Sign in"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("forgot");
                  setForgotEmail(credentials.email);
                }}
                className="w-full text-center text-sm text-[#1a6b4a] transition hover:underline"
              >
                Forgot your password?
              </button>
            </form>
          ) : (
            <form onSubmit={submitForgotPassword} className="space-y-4">
              {forgotError ? <FlashMessage tone="error" message={forgotError} /> : null}
              {forgotMessage ? <FlashMessage tone="success" message={forgotMessage} /> : null}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#374151]" htmlFor="reset-email">
                  Email address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(event) => setForgotEmail(event.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-[#d1d5db] px-3 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#1a6b4a] focus:ring-2 focus:ring-[#1a6b4a]/15"
                  placeholder="admin@srisriwellbeing.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#1a6b4a] px-4 text-sm font-semibold text-white transition hover:bg-[#15573c] disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send reset link"}
              </button>

              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full text-center text-sm text-[#64748b] transition hover:text-[#1e293b]"
              >
                ← Back to sign in
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-[#94a3b8]">
          Sri Sri Wellbeing Chennai · Admin Portal
        </p>
      </div>
    </div>
  );
}
