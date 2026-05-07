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
      <div className="w-full max-w-md rounded-2xl border border-[#d9e3de] bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#d9e3de] bg-[#f7faf8] p-2">
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
            <h2 className="text-xl font-semibold text-[#1d2a26]">
              {mode === "login" ? "Admin Login" : "Forgot Password"}
            </h2>
            <p className="text-sm text-[#667872]">
              {mode === "login" ? "Sign in to continue" : "We will send a reset link to your email"}
            </p>
          </div>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage ? <FlashMessage tone="error" message={errorMessage} /> : null}
            {successMessage ? <FlashMessage tone="success" message={successMessage} /> : null}

            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#33423d]">Email</span>
              <input
                type="email"
                value={credentials.email}
                onChange={(event) =>
                  setCredentials((current) => ({ ...current, email: event.target.value }))
                }
                required
                className="h-11 rounded-lg border border-[#d6e0db] px-4 text-sm outline-none focus:border-[#1f6b5c]"
                placeholder="admin@srisriwellbeingchennai.com"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#33423d]">Password</span>
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
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#1f6b5c] px-4 text-sm font-semibold text-white hover:bg-[#175245] disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setForgotEmail(credentials.email);
              }}
              className="w-full text-sm font-medium text-[#1f6b5c]"
            >
              Forgot password?
            </button>
          </form>
        ) : (
          <form onSubmit={submitForgotPassword} className="space-y-4">
            {forgotError ? <FlashMessage tone="error" message={forgotError} /> : null}
            {forgotMessage ? <FlashMessage tone="success" message={forgotMessage} /> : null}

            <label className="grid gap-2">
              <span className="text-sm font-medium text-[#33423d]">Email</span>
              <input
                type="email"
                value={forgotEmail}
                onChange={(event) => setForgotEmail(event.target.value)}
                required
                className="h-11 rounded-lg border border-[#d6e0db] px-4 text-sm outline-none focus:border-[#1f6b5c]"
                placeholder="admin@srisriwellbeingchennai.com"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#1f6b5c] px-4 text-sm font-semibold text-white hover:bg-[#175245] disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={() => setMode("login")}
              className="w-full text-sm font-medium text-[#1f6b5c]"
            >
              Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
