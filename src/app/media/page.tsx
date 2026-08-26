import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Media",
};

export default function MediaPage() {
  redirect("/media/sermons");
}
