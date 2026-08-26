import { getEvent, isEventPast, type EventItem } from "@/lib/content-source";
import { erpnextCreateResult, erpnextWriteConfigured } from "@/lib/erpnext";

export type EventSignUpInput = {
  functionId: string;
  name: string;
  phone: string;
  email?: string;
  isMember: boolean;
  notes?: string;
};

export type EventSignUpResult =
  | { ok: true; stored: boolean; signUpId?: string }
  | { ok: false; error: "invalid" | "event" | "duplicate" | "rate" | "server" };

export function parseFullName(name: string): {
  firstName: string;
  lastName: string;
  fullName: string;
} {
  const trimmed = name.trim().replace(/\s+/g, " ");
  const parts = trimmed.split(" ");
  const firstName = parts[0] ?? trimmed;
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName, fullName: trimmed };
}

export async function validateSignUpEvent(
  functionId: string
): Promise<EventItem | null> {
  const event = await getEvent(functionId);
  if (!event || !event.allowSignUps || isEventPast(event)) return null;
  return event;
}

export async function submitEventSignUp(
  input: EventSignUpInput
): Promise<EventSignUpResult> {
  const event = await validateSignUpEvent(input.functionId);
  if (!event) return { ok: false, error: "event" };

  if (!erpnextWriteConfigured()) {
    return { ok: true, stored: false };
  }

  const { firstName, lastName, fullName } = parseFullName(input.name);

  const personPayload: Record<string, unknown> = {
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    phones: [
      {
        phone_number: input.phone,
        phone_type: "Mobile",
        is_primary: 1,
      },
    ],
  };

  if (input.email) {
    personPayload.emails = [
      {
        email_address: input.email,
        email_type: "Home",
        is_primary: 1,
      },
    ];
  }

  const personResult = await erpnextCreateResult<{ name: string }>(
    "Person",
    personPayload
  );
  if (!personResult.ok || !personResult.data?.name) {
    return { ok: false, error: "server" };
  }

  const signUpResult = await erpnextCreateResult<{ name: string }>(
    "Function Sign-Up",
    {
      function: input.functionId,
      person: personResult.data.name,
      attending: 1,
      custom_is_member: input.isMember ? 1 : 0,
      custom_phone_number: input.phone,
      custom_email: input.email ?? "",
      notes: input.notes ?? "",
    }
  );

  if (!signUpResult.ok) {
    const msg = signUpResult.message ?? "";
    if (msg.includes("already signed up")) {
      return { ok: false, error: "duplicate" };
    }
    return { ok: false, error: "server" };
  }

  return {
    ok: true,
    stored: true,
    signUpId: signUpResult.data.name,
  };
}
