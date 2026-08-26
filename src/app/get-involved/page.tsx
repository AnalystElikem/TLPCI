import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Get Involved",
};

export default function GetInvolvedPage() {
  redirect("/get-involved/plan-your-visit#plan-visit");
}
