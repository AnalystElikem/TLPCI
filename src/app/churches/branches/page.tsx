import { redirect } from "next/navigation";

// The standalone Branches page has been replaced by the searchable directory
// on Find a Church. Redirect any lingering links there.
export default function BranchesPage() {
  redirect("/churches/find");
}
