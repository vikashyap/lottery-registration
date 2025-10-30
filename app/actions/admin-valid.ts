import { cookies } from "next/headers";

export async function isAdminValid() {
  const adminId = (await cookies()).get("admin_id")?.value;
  console.log("Admin ID:", adminId);
  return adminId;
}
