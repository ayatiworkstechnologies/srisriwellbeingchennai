"use client";

import React from "react";
import Link from "next/link";

export default function WellnessButton({
  href,
  label = "Book Consultation",
  className = "",
  icon = "☘",
  ...props
}) {
  const content = (
    <>
      {/* Ripple Rings */}
      <span
        className="wellness-ring inset-0 border-[#c29a2f]/40"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="wellness-ring inset-[-8px] border-[#c29a2f]/30"
        style={{ animationDelay: "0.45s" }}
      />
      <span
        className="wellness-ring inset-[-16px] border-[#c29a2f]/20"
        style={{ animationDelay: "0.9s" }}
      />

      {/* Button Content */}
      <span className="btn-wellness-text">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`btn-wellness group ${className}`}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`btn-wellness group ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
