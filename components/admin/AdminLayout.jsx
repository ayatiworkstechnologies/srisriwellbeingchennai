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
}) {
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#f5f7f6] px-4 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">
          <div className="w-full rounded-2xl border border-[#d9e3de] bg-white p-8 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#cfe0d9] border-t-[#1f6b5c]" />
            <p className="mt-4 text-sm text-[#556761]">Loading admin...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f5f7f6] text-[#1d2a26]">
        <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f6] text-[#1d2a26]">
      <AdminTopbar
        adminSections={adminSections}
        currentSection={currentSection}
        handleLogout={handleLogout}
        tabCounts={tabCounts}
        userProfile={userProfile}
      />
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
