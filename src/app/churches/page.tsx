import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Churches",
};

export default function ChurchesPage() {
  redirect("/churches/find");
}
