import { AdminLoginForm } from "@/components/admin-login-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminValid } from "@/app/actions/admin-valid";
import { Suspense } from "react";
import Loading from "./loading";
import { ScanClientPage } from "./scan-client";
import { getPrices } from "../actions";
import { PriceItemType } from "../types";

interface Props {
  prizes: PriceItemType[];
}
async function ScanPage(props: Props) {
  return <ScanClientPage prizes={props.prizes} />;
}

export default async function Serverpage() {
  const { standard: prizes } = await getPrices();
  return (
    <Suspense fallback={<Loading />}>
      <ScanPage prizes={prizes} />
    </Suspense>
  );
}
