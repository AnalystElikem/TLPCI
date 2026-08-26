import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "News & Events",
};

export default function NewsEventsPage() {
  redirect("/news-events/blog");
}
