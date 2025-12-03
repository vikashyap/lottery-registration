import AdminRegistrationList from "@/components/admin-registration-list";
import { redirect } from "next/navigation";
import { isAdminValid } from "@/app/actions/admin-valid";
import { Suspense } from "react";
import Loading from "./loading";
import { getPrices, getUsers } from "@/app/actions";

async function AdminRegisteredPage() {
  const isValid = await isAdminValid();
  if (!isValid) {
    redirect("/admin");
  }

  const users = await getUsers();
  console.log("users", users);
  const { standard, birthday } = await getPrices();
  return <AdminRegistrationList users={users} prices={standard} birthdayPrizes={birthday} />;
}

export default async function Serverpage() {
  return (
    <Suspense fallback={<Loading />}>
      <AdminRegisteredPage />
    </Suspense>
  );
}
