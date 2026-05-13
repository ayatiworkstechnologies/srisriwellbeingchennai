"use client";

import {
  Boxes,
  CalendarCheck,
  Inbox,
  LogOut,
  RefreshCw,
  Settings,
  Sparkles,
  UsersRound,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sectionIcons = {
  inquiries: Inbox,
  dashboard: CalendarCheck,
  bookings: CalendarCheck,
  services: Sparkles,
  categories: Boxes,
  "nadi-camps": CalendarCheck,
  team: UsersRound,
  settings: Settings,
};

function NavLink({ section, currentSection, count }) {
  const active = currentSection === section.id;
  const Icon = sectionIcons[section.id] || Sparkles;

  return (
    <Link
      href={section.href}
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
        active
          ? "bg-[#1f6b5c] !text-white"
          : "text-[#33423d] hover:bg-[#eef4f1]"
      }`}
      title={section.label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className={active ? "!text-white" : "text-inherit"}>{section.shortLabel || section.label}</span>
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
  apiBaseUrl,
  isLoading,
  lastLoadedAt,
  onRefresh,
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
  const profileName = userProfile?.full_name || "Admin user";
  const lastLoadedLabel = lastLoadedAt
    ? new Date(lastLoadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Not loaded";

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9e3de] bg-[rgba(255,255,255,0.92)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1500px] px-4 py-4 md:px-6 xl:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d9e3de] bg-[linear-gradient(180deg,#ffffff,#f2f7f4)] p-2 shadow-[0_10px_24px_rgba(21,53,46,0.06)]">
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
                <p className="mt-0.5 text-sm text-[#70827c]">{profileName}</p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#60746e]">
              <div className="inline-flex h-10 max-w-full items-center gap-2 rounded-xl border border-[#d9e3de] bg-[#f7faf8] px-3">
                <Wifi className="h-4 w-4 text-[#1f6b5c]" aria-hidden="true" />
                <span className="truncate">{apiBaseUrl || "/api/backend"}</span>
              </div>
              <div className="inline-flex h-10 items-center rounded-xl border border-[#d9e3de] bg-white px-3">
                Last sync: {lastLoadedLabel}
              </div>
              <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#d9e3de] bg-white px-3 text-sm font-medium text-[#33423d] hover:bg-[#f7faf8] disabled:opacity-60"
                title="Refresh admin data"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} aria-hidden="true" />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#d9e3de] px-3 text-sm font-medium text-[#33423d] hover:bg-[#f7faf8]"
                title={`Logout ${profileName}`}
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>

          <nav className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0" aria-label="Admin sections">
            <div className="flex min-w-max items-center gap-2 rounded-[1.25rem] border border-[#dbe7e1] bg-white/90 p-2 shadow-[0_10px_28px_rgba(21,53,46,0.04)]">
              {adminSections.map((section) => (
                <NavLink
                  key={section.id}
                  section={section}
                  currentSection={currentSection}
                  count={tabCounts[section.id] ?? 0}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
