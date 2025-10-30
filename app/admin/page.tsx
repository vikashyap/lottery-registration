import { AdminLoginForm } from "@/components/admin-login-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminValid } from "@/app/actions/admin-valid";
import { Suspense } from "react";
import Loading from "./loading";

async function AdminLoginPage() {
  if (await isAdminValid()) {
    redirect("/admin/dashboard");
  }
  return <AdminLoginForm />;
}

export default async function Serverpage() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminLoginPage />
    </Suspense>
  );
}
