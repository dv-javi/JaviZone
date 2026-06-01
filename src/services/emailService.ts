/** Matches server-side validation in `api/_lib/send-email.ts`. */
export const OPTIONAL_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FeedbackPayload = {
  name: string;
  /** Empty string when not provided. */
  email: string;
  subject: string;
  message: string;
};

export function validateOptionalEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed === "" || OPTIONAL_EMAIL_PATTERN.test(trimmed);
}

type SendEmailResponse = {
  success?: boolean;
  id?: string;
  error?: string;
};

export function buildFeedbackPayload(form: HTMLFormElement): FeedbackPayload {
  const formData = new FormData(form);

  return {
    name: String(formData.get("user_name") ?? "").trim(),
    email: String(formData.get("user_email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "Portfolio Feedback").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

export async function sendFeedbackForm(payload: FeedbackPayload): Promise<void> {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: SendEmailResponse = {};

  try {
    data = (await response.json()) as SendEmailResponse;
  } catch {
    // Non-JSON response
  }

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to send feedback. Please try again.");
  }
}
