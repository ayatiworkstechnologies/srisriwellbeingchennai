"use client";

import {
  Boxes,
  CalendarCheck,
  Inbox,
  LogOut,
  MessageSquareQuote,
  RefreshCw,
  Settings,
  Sparkles,
  UsersRound,
  Wifi,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sectionIcons = {
  inquiries: Inbox,
  dashboard: CalendarCheck,
  bookings: CalendarCheck,
  services: Sparkles,
  testimonials: MessageSquareQuote,
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
      className={`relative inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-[#1a6b4a] text-white shadow-sm"
          : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#1e293b]"
      }`}
      title={section.label}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">{section.shortLabel || section.label}</span>
      {count > 0 ? (
        <span
          className={`inline-flex min-w-[18px] items-center justify-center rounded-full px-1 py-0.5 text-[10px] font-bold leading-none ${
            active ? "bg-white/25 text-white" : "bg-[#e2f5ec] text-[#1a6b4a]"
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
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleLabel =
    userProfile?.role === "doctor"
      ? "Doctor"
      : userProfile?.role === "therapist"
        ? "Therapist"
        : "Admin";

  const profileName = userProfile?.full_name || "Admin user";
  const lastLoadedLabel = lastLoadedAt
    ? new Date(lastLoadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  const initials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white shadow-sm">
      {/* Main topbar */}
      <div className="mx-auto max-w-[1500px] px-4 md:px-6 xl:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo + Brand */}
          <Link href="/admin" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0faf5] border border-[#c3e6d5]">
              <Image
                src="/logo.svg"
                alt="Sri Sri Wellbeing"
                width={20}
                height={20}
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold leading-none text-[#1a6b4a]">Sri Sri Wellbeing</p>
              <p className="mt-0.5 text-[11px] leading-none text-[#94a3b8]">Admin Portal</p>
            </div>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Sync status */}
            {lastLoadedLabel && (
              <div className="hidden items-center gap-1.5 rounded-md bg-[#f8fafc] px-2.5 py-1.5 text-[11px] text-[#64748b] lg:flex border border-[#e2e8f0]">
                <Wifi className="h-3 w-3 text-[#22c55e]" />
                <span>Synced {lastLoadedLabel}</span>
              </div>
            )}

            {/* Refresh button */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#1e293b] disabled:opacity-50"
              title="Refresh data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} aria-hidden="true" />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 transition hover:bg-[#f8fafc]"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1a6b4a] text-[10px] font-bold text-white">
                  {initials}
                </div>
                <span className="hidden text-xs font-medium text-[#1e293b] sm:block">{profileName}</span>
                <span className="hidden rounded bg-[#f0faf5] px-1.5 py-0.5 text-[10px] font-semibold text-[#1a6b4a] sm:block">{roleLabel}</span>
                <ChevronDown className="h-3 w-3 text-[#94a3b8]" />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 top-full z-20 mt-1.5 w-48 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-lg">
                    <div className="border-b border-[#f1f5f9] px-4 py-3">
                      <p className="text-xs font-semibold text-[#1e293b]">{profileName}</p>
                      <p className="text-[11px] text-[#64748b]">{roleLabel} • Sri Sri Wellbeing</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setShowUserMenu(false); handleLogout(); }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#ef4444] transition hover:bg-[#fef2f2]"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-t border-[#f1f5f9] bg-[#fafafa]">
        <div className="mx-auto max-w-[1500px] px-4 md:px-6 xl:px-8">
          <nav className="-mx-1 flex items-center gap-0.5 overflow-x-auto py-1.5" aria-label="Admin sections">
            {adminSections.map((section) => (
              <NavLink
                key={section.id}
                section={section}
                currentSection={currentSection}
                count={tabCounts[section.id] ?? 0}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
