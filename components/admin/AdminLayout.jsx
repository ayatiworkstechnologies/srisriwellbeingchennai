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
      <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8f6,#eef4f1)] px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-[1.75rem] border border-[#d9e3de] bg-white p-8 text-center shadow-[0_18px_48px_rgba(21,53,46,0.08)]">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#cfe0d9] border-t-[#1f6b5c]" />
            <p className="mt-4 text-sm text-[#556761]">Loading admin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8f6,#eef4f1)] text-[#1d2a26]">
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8f6,#eef4f1)] text-[#1d2a26]">
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
