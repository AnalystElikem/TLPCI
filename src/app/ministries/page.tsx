import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ministries",
};

export default function MinistriesPage() {
  redirect("/ministries/children");
}
