import AdminResetPasswordPage from "@/components/admin/AdminResetPasswordPage";
import { Suspense } from "react";

export default function ResetPasswordRoute() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <AdminResetPasswordPage />
    </Suspense>
  );
}
