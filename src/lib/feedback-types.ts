export const FEEDBACK_TYPES = ["General", "Volunteer", "Membership"] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export function isFeedbackType(value: string): value is FeedbackType {
  return FEEDBACK_TYPES.includes(value as FeedbackType);
}
