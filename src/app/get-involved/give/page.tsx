import { redirect } from "next/navigation";

// The Give page is hidden for now (online giving not yet set up). Any visit to
// this route is sent to the Get Involved page. To re-enable giving later,
// restore the previous page content and re-add the nav/footer/sitemap links.
export default function GivePage() {
  redirect("/get-involved");
}
