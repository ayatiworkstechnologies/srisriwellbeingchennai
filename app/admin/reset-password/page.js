import AdminResetPasswordPage from "@/components/admin/AdminResetPasswordPage";

export default async function ResetPasswordRoute({ searchParams }) {
  const params = await searchParams;
  return <AdminResetPasswordPage token={params?.token || ""} />;
}
