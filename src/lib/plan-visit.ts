import { erpnextCreateResult, erpnextList, erpnextWriteConfigured } from "@/lib/erpnext";
import { parseFullName } from "@/lib/event-signup";

export type PlanVisitInput = {
  name: string;
  phone: string;
  branch: string;
  visitDate: string;
  details?: string;
};

export type PlanVisitResult =
  | { ok: true; stored: boolean; visitationLogId?: string }
  | { ok: false; error: "invalid" | "server" };

const WEBSITE_GUEST_NAME = "Website Guest";
const VISIT_TYPE_FIRST_TIME_GUEST = "First Time Guest";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

async function resolveWebsiteGuestPersonId(): Promise<string | null> {
  const rows = await erpnextList<{ name?: string }>("Person", {
    fields: ["name", "full_name"],
    filters: [["full_name", "=", WEBSITE_GUEST_NAME]],
    limit: 1,
  });
  return rows?.[0]?.name ?? null;
}

function buildNotes(input: PlanVisitInput, fullName: string): string {
  const lines = [
    input.details?.trim(),
    `Submitted via TLPCI website — Plan Your Visit`,
    `Visitor name on form: ${fullName}`,
  ].filter(Boolean);
  return lines.join("\n\n");
}

export async function submitPlanVisit(
  input: PlanVisitInput
): Promise<PlanVisitResult> {
  const { fullName } = parseFullName(input.name);

  if (
    !fullName ||
    fullName.length < 2 ||
    !input.phone.trim() ||
    !input.branch.trim() ||
    !DATE_RE.test(input.visitDate)
  ) {
    return { ok: false, error: "invalid" };
  }

  if (!erpnextWriteConfigured()) {
    return { ok: true, stored: false };
  }

  const websiteGuestId = await resolveWebsiteGuestPersonId();
  if (!websiteGuestId) {
    return { ok: false, error: "server" };
  }

  const logResult = await erpnextCreateResult<{ name: string }>("Visitation Log", {
    status: "Planned",
    person: websiteGuestId,
    visit_date: input.visitDate,
    visit_type: VISIT_TYPE_FIRST_TIME_GUEST,
    follow_up_needed: 0,
    custom_visitor_name: fullName,
    custom_phone_number: input.phone.trim(),
    custom_branch: input.branch.trim(),
    notes: buildNotes(input, fullName),
  });

  if (!logResult.ok || !logResult.data?.name) {
    return { ok: false, error: "server" };
  }

  return {
    ok: true,
    stored: true,
    visitationLogId: logResult.data.name,
  };
}
