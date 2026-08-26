import { erpnextCreateResult, erpnextList, erpnextWriteConfigured } from "@/lib/erpnext";

export type PrayerRequestSubmitInput = {
  name?: string;
  email?: string;
  type: string;
  request: string;
  isPrivate: boolean;
  contactMe: boolean;
};

export type PrayerRequestSubmitResult =
  | { ok: true; stored: boolean; prayerRequestId?: string }
  | { ok: false; error: "invalid" | "server" };

const WEBSITE_GUEST_NAME = "Website Guest";
const PRAYER_STATUS = "Requested";
const RECIPIENT_TYPE = "Person";

export type PrayerRequestTypeOption = {
  value: string;
  label: string;
  description?: string;
};

const FALLBACK_PRAYER_TYPES: PrayerRequestTypeOption[] = [
  { value: "Health", label: "Health", description: "Health or healing" },
  { value: "Salvation", label: "Salvation", description: "Salvation of a person" },
  { value: "Praise", label: "Praise", description: "Praise and thanksgiving" },
  { value: "Unspoken", label: "Unspoken", description: "Private or unspoken request" },
];

export async function getPrayerRequestTypes(): Promise<PrayerRequestTypeOption[]> {
  const rows = await erpnextList<{
    name?: string;
    type?: string;
    description?: string;
  }>("Prayer Request Type", {
    fields: ["name", "type", "description"],
    orderBy: "type asc",
    fresh: true,
  });

  if (!rows?.length) return FALLBACK_PRAYER_TYPES;

  return rows
    .map((row) => ({
      value: row.name ?? row.type ?? "",
      label: row.type ?? row.name ?? "",
      description: row.description ?? "",
    }))
    .filter((row) => row.value);
}

async function resolveWebsiteGuestPersonId(): Promise<string | null> {
  const rows = await erpnextList<{ name?: string }>("Person", {
    fields: ["name"],
    filters: [["full_name", "=", WEBSITE_GUEST_NAME]],
    limit: 1,
  });
  return rows?.[0]?.name ?? null;
}

function defaultEndDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} 23:59:59`;
}

function prayerTitle(type: string, name?: string): string {
  const label =
    type === "Health"
      ? "Healing prayer"
      : type === "Praise"
        ? "Praise & thanksgiving"
        : type === "Salvation"
          ? "Salvation prayer"
          : "Prayer request";
  const trimmed = name?.trim();
  return trimmed ? `${label} — ${trimmed}` : label;
}

function buildRequestText(input: PrayerRequestSubmitInput): string {
  const lines = [input.request.trim()];
  if (input.name?.trim()) lines.push(`Requestor name: ${input.name.trim()}`);
  if (input.email?.trim()) lines.push(`Email: ${input.email.trim()}`);
  if (input.contactMe) {
    lines.push("Please contact me about this request.");
  }
  lines.push("Submitted via TLPCI website.");
  return lines.join("\n\n");
}

export function validatePrayerRequestInput(
  input: PrayerRequestSubmitInput
): "type" | "request" | "email" | null {
  if (!input.type.trim()) return "type";
  if (!input.request.trim() || input.request.trim().length < 5) return "request";
  if (input.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    return "email";
  }
  return null;
}

export async function submitPrayerRequest(
  input: PrayerRequestSubmitInput
): Promise<PrayerRequestSubmitResult> {
  const invalid = validatePrayerRequestInput(input);
  if (invalid) return { ok: false, error: "invalid" };

  if (!erpnextWriteConfigured()) {
    return { ok: true, stored: false };
  }

  const websiteGuestId = await resolveWebsiteGuestPersonId();
  if (!websiteGuestId) return { ok: false, error: "server" };

  const type = input.type.trim();

  const result = await erpnextCreateResult<{ name: string }>("Prayer Request", {
    title: prayerTitle(type, input.name),
    status: PRAYER_STATUS,
    type,
    end_date: defaultEndDate(),
    is_private: input.isPrivate ? 1 : 0,
    urgent: input.contactMe ? 1 : 0,
    recipient_type: RECIPIENT_TYPE,
    recipient: websiteGuestId,
    recipient_name: input.name?.trim() ?? "",
    requestor: websiteGuestId,
    request: buildRequestText(input),
  });

  if (!result.ok || !result.data?.name) {
    return { ok: false, error: "server" };
  }

  return {
    ok: true,
    stored: true,
    prayerRequestId: result.data.name,
  };
}
