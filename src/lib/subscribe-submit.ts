import {
  erpnextCreateResult,
  erpnextList,
  erpnextWriteConfigured,
} from "@/lib/erpnext";

export type SubscribeSubmitInput = {
  email: string;
};

export type SubscribeSubmitResult =
  | { ok: true; stored: boolean; subscriberId?: string; emailGroupMemberId?: string }
  | { ok: false; error: "invalid" | "server" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_SUBSCRIBERS_GROUP = "Website Subscribers";

export function validateSubscribeInput(
  input: SubscribeSubmitInput
): "email" | null {
  if (!input.email.trim() || !EMAIL_RE.test(input.email.trim())) return "email";
  return null;
}

async function findEmailGroupMember(email: string) {
  const rows = await erpnextList<{ name?: string; unsubscribed?: number }>(
    "Email Group Member",
    {
      fields: ["name", "unsubscribed"],
      filters: [
        ["email_group", "=", WEBSITE_SUBSCRIBERS_GROUP],
        ["email", "=", email],
      ],
      limit: 1,
      fresh: true,
    }
  );
  return rows?.[0] ?? null;
}

async function findSubscriber(email: string) {
  const rows = await erpnextList<{ name?: string }>("Subscribers", {
    fields: ["name"],
    filters: [["email", "=", email]],
    limit: 1,
    fresh: true,
  });
  return rows?.[0] ?? null;
}

export async function submitSubscribe(
  input: SubscribeSubmitInput
): Promise<SubscribeSubmitResult> {
  const invalid = validateSubscribeInput(input);
  if (invalid) return { ok: false, error: "invalid" };

  if (!erpnextWriteConfigured()) {
    return { ok: true, stored: false };
  }

  const email = input.email.trim().toLowerCase();

  let emailGroupMemberId: string | undefined;
  const existingMember = await findEmailGroupMember(email);
  if (existingMember?.name) {
    emailGroupMemberId = existingMember.name;
  } else {
    const memberResult = await erpnextCreateResult<{ name: string }>(
      "Email Group Member",
      {
        email_group: WEBSITE_SUBSCRIBERS_GROUP,
        email,
        unsubscribed: 0,
      }
    );
    if (!memberResult.ok || !memberResult.data?.name) {
      const duplicate =
        !memberResult.ok &&
        (memberResult.message?.includes("Duplicate entry") ||
          memberResult.message?.includes("UniqueValidationError"));
      if (duplicate) {
        const retry = await findEmailGroupMember(email);
        emailGroupMemberId = retry?.name;
      }
      if (!emailGroupMemberId) return { ok: false, error: "server" };
    } else {
      emailGroupMemberId = memberResult.data.name;
    }
  }

  let subscriberId: string | undefined;
  const existingSubscriber = await findSubscriber(email);
  if (existingSubscriber?.name) {
    subscriberId = existingSubscriber.name;
  } else {
    const subscriberResult = await erpnextCreateResult<{ name: string }>(
      "Subscribers",
      { email }
    );
    if (!subscriberResult.ok || !subscriberResult.data?.name) {
      return { ok: false, error: "server" };
    }
    subscriberId = subscriberResult.data.name;
  }

  return {
    ok: true,
    stored: true,
    subscriberId,
    emailGroupMemberId,
  };
}
