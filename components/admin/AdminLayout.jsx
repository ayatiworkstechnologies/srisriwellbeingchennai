"use client";

import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ 
  children, 
  adminSections, 
  currentSection, 
  handleLogout, 
  tabCounts,
  isInitializing,
  token
}) {
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#efe4d2_0%,#f6f0e7_48%,#fbf8f3_100%)] flex flex-col justify-center items-center p-4">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_30px_90px_rgba(32,18,10,0.08)] backdrop-blur-xl">
        <svg className="animate-spin h-8 w-8 text-[#c29a2f] mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-[#a9852d]">Loading Admin</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return children; // The login screen is rendered inside children when !token
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eadcca_0%,#f4eee5_44%,#fbf8f3_100%)] text-[#1f1a17]">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[320px] bg-[radial-gradient(circle_at_top,rgba(194,154,47,0.18),transparent_58%)]" />
      <div className="pointer-events-none fixed right-[-120px] top-[180px] h-[280px] w-[280px] rounded-full bg-[#c29a2f]/10 blur-3xl" />
      <AdminTopbar 
        adminSections={adminSections}
        currentSection={currentSection}
        handleLogout={handleLogout}
        tabCounts={tabCounts}
      />
      <main className="relative mx-auto max-w-7xl px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  );
}
