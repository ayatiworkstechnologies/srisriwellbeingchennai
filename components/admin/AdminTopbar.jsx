"use client";

import Image from "next/image";
import Link from "next/link";

function NavLink({ section, currentSection, count }) {
  const active = currentSection === section.id;

  return (
    <Link
      href={section.href}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active
          ? "bg-[#1f6b5c] !text-white"
          : "text-[#33423d] hover:bg-[#eef4f1]"
      }`}
    >
      <span className={active ? "!text-white" : "text-inherit"}>{section.label}</span>
      {count > 0 ? (
        <span
          className={`inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
            active ? "bg-white/20 !text-white" : "bg-white text-[#1f6b5c]"
          }`}
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}

export default function AdminTopbar({
  adminSections,
  currentSection,
  handleLogout,
  tabCounts,
  userProfile,
}) {
  const roleLabel =
    userProfile?.role === "doctor"
      ? "Doctor Dashboard"
      : userProfile?.role === "therapist"
        ? "Therapist Dashboard"
        : "Admin";

  const subLabel =
    userProfile?.role === "doctor"
      ? "Assigned consultations and booking updates"
      : userProfile?.role === "therapist"
        ? "Assigned therapies and booking updates"
        : "Sri Sri Wellbeing";

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9e3de] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9e3de] bg-[#f7faf8] p-2">
                <Image
                  src="/logo.svg"
                  alt="Sri Sri Wellbeing"
                  width={28}
                  height={28}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d817a]">
                  {roleLabel}
                </p>
                <h1 className="text-lg font-semibold text-[#1d2a26]">{subLabel}</h1>
              </div>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {adminSections.map((section) => (
              <NavLink
                key={section.id}
                section={section}
                currentSection={currentSection}
                count={tabCounts[section.id] ?? 0}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d9e3de] px-4 text-sm font-medium text-[#33423d] hover:bg-[#f7faf8]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
