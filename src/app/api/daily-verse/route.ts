import { NextResponse } from "next/server";
import { getDailyVerse } from "@/lib/daily";

// Returns the verse of the day. Cached for an hour; always reflects the
// current day with no manual updating. Keeps the full verse list server-side.
export const revalidate = 3600;

export function GET() {
  return NextResponse.json(getDailyVerse());
}
