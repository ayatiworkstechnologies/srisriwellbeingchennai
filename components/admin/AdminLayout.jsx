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
      <div className="min-h-screen bg-[#f6f7f8] px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-lg border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#e5e7eb] border-t-[#2563eb]" />
            <p className="mt-4 text-sm text-[#667085]">Loading admin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] text-[#101828]">
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-[#101828]">
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
      <main className="mx-auto max-w-[1500px] px-4 py-7 md:px-6 xl:px-8">{children}</main>
    </div>
  );
}
