"use client";

import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({
  children,
  adminSections,
  currentSection,
  handleLogout,
  tabCounts,
  isInitializing,
  token,
  userProfile,
  apiBaseUrl,
  isLoading,
  lastLoadedAt,
  onRefresh,
}) {
  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e2e8f0] border-t-[#1a6b4a]" />
          <p className="text-sm text-[#64748b]">Loading…</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      <AdminTopbar
        adminSections={adminSections}
        currentSection={currentSection}
        handleLogout={handleLogout}
        tabCounts={tabCounts}
        userProfile={userProfile}
        apiBaseUrl={apiBaseUrl}
        isLoading={isLoading}
        lastLoadedAt={lastLoadedAt}
        onRefresh={onRefresh}
      />
      <main className="mx-auto max-w-[1500px] px-4 py-6 md:px-6 xl:px-8">{children}</main>
    </div>
  );
}
