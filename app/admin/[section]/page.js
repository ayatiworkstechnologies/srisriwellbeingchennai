import { notFound } from "next/navigation";

import AdminPanelClient from "@/components/admin/AdminPanelClient";
import { adminSectionIds } from "@/components/admin/admin-config";

export function generateStaticParams() {
  return adminSectionIds
    .filter((section) => section !== "dashboard")
    .map((section) => ({ section }));
}

export default async function AdminSectionPage({ params }) {
  const { section } = await params;

  if (!adminSectionIds.includes(section)) {
    notFound();
  }

  return <AdminPanelClient currentSection={section} />;
}
