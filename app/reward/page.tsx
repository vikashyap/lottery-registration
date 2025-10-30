import { Suspense, use } from "react";
import { RewardPageContent } from "./client-page";
import { isAdminValid } from "../actions/admin-valid";
import { getUserByEmail, getUsers } from "../actions";

async function RewardPage() {
  const isAdmin = await isAdminValid();
  const users = await getUsers();

  console.log("users", { users, isAdmin });

  return <RewardPageContent users={users} isAdmin={isAdmin!} />;
}

export default function ServerpageReward() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen relative overflow-hidden bg-black flex items-center justify-center">
          <div className="text-white text-xl">Laden...</div>
        </main>
      }
    >
      <RewardPage />
    </Suspense>
  );
}
