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
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-sm">
        <div className="border-b border-[#eaecf0] bg-[#f9fafb] px-8 py-7">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white p-2">
              <Image
                src="/logo.svg"
                alt="Sri Sri Wellbeing"
                width={30}
                height={30}
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#667085]">
                Sri Sri Wellbeing
              </p>
              <h2 className="mt-1 text-xl font-semibold text-[#101828]">
                {mode === "login" ? "Admin Login" : "Forgot Password"}
              </h2>
              <p className="text-sm text-[#667085]">
                {mode === "login" ? "Sign in to continue" : "We will send a reset link to your email"}
              </p>
            </div>
          </div>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4 px-8 py-7">
            {errorMessage ? <FlashMessage tone="error" message={errorMessage} /> : null}
            {successMessage ? <FlashMessage tone="success" message={successMessage} /> : null}

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#344054]">Email</span>
              <input
                type="email"
                value={credentials.email}
                onChange={(event) =>
                  setCredentials((current) => ({ ...current, email: event.target.value }))
                }
                required
                className="h-11 rounded-md border border-[#d0d5dd] px-4 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15"
                placeholder="admin@srisriwellbeingchennai.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#344054]">Password</span>
              <PasswordInput
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((current) => ({ ...current, password: event.target.value }))
                }
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#2563eb] px-4 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setForgotEmail(credentials.email);
              }}
              className="w-full text-sm font-semibold text-[#2563eb]"
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={submitForgotPassword} className="space-y-4 px-8 py-7">
            {forgotError ? <FlashMessage tone="error" message={forgotError} /> : null}
            {forgotMessage ? <FlashMessage tone="success" message={forgotMessage} /> : null}

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#344054]">Email</span>
              <input
                type="email"
                value={forgotEmail}
                onChange={(event) => setForgotEmail(event.target.value)}
                required
                className="h-11 rounded-md border border-[#d0d5dd] px-4 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15"
                placeholder="admin@srisriwellbeingchennai.com"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#2563eb] px-4 text-sm font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={() => setMode("login")}
              className="w-full text-sm font-semibold text-[#2563eb]"
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
