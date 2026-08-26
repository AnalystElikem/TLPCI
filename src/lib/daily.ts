import { dailyVerses } from "@/data/verses";
import { devotions } from "@/data/devotions";

/**
 * Daily content selection — fully automatic, zero human maintenance.
 *
 * The verse and devotion of the day are chosen deterministically from the
 * day of the year, so the content advances by itself every day and simply
 * cycles when it reaches the end of the list. There is nothing for anyone to
 * "post" each day: if the site is up, today's verse and devotion are always
 * present. Even if a list has fewer than 365 entries it never breaks — it just
 * repeats sooner. Growing the lists only adds variety; it is never required.
 *
 * These helpers run on the server, so the full verse/devotion lists stay out
 * of the browser bundle.
 */

export function dayOfYear(date: Date = new Date()): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const today = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return Math.floor((today - start) / 86_400_000);
}

export function getDailyVerse(date: Date = new Date()) {
  return dailyVerses[dayOfYear(date) % dailyVerses.length];
}

export function getDailyDevotion(date: Date = new Date()) {
  return devotions[dayOfYear(date) % devotions.length];
}
