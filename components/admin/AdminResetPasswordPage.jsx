"use client";

import Link from "next/link";
import { useState } from "react";

import { resetAdminPassword } from "@/lib/api";
import { FlashMessage, PasswordInput } from "@/components/admin/admin-ui";

export default function AdminResetPasswordPage({ token = "" }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage("Reset token is missing.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await resetAdminPassword({ token, password });
      setSuccessMessage(data.detail || "Password reset successfully.");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f8f7] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#d9e3de] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#1d2a26]">Reset Password</h1>
        <p className="mt-2 text-sm text-[#667872]">Set a new password for your admin account.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMessage ? <FlashMessage tone="error" message={errorMessage} /> : null}
          {successMessage ? <FlashMessage tone="success" message={successMessage} /> : null}

          <label className="grid gap-2">
            <span className="text-sm font-medium text-[#33423d]">New Password</span>
            <PasswordInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="new-password"
              placeholder="Enter new password"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-[#33423d]">Confirm Password</span>
            <PasswordInput
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              autoComplete="new-password"
              placeholder="Confirm new password"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#1f6b5c] px-4 text-sm font-semibold text-white hover:bg-[#175245] disabled:opacity-70"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <Link href="/admin" className="mt-5 inline-flex text-sm font-medium text-[#1f6b5c]">
          Back to admin login
        </Link>
      </div>
    </div>
  );
}
