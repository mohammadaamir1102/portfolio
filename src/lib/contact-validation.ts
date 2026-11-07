export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactErrors = Partial<Record<ContactField | "form", string>>;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: ContactErrors };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Shared, dependency-free validation. Safe to import in client components.
 */
export function validateContact(input: unknown): ContactValidation {
  const errors: ContactErrors = {};
  const record =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};

  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const subject =
    typeof record.subject === "string" ? record.subject.trim() : "";
  const message =
    typeof record.message === "string" ? record.message.trim() : "";
  const website =
    typeof record.website === "string" ? record.website.trim() : "";

  if (name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  } else if (name.length > 80) {
    errors.name = "Name must be 80 characters or fewer.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 160) {
    errors.email = "Email must be 160 characters or fewer.";
  }

  if (subject.length < 3) {
    errors.subject = "Please add a subject (at least 3 characters).";
  } else if (subject.length > 120) {
    errors.subject = "Subject must be 120 characters or fewer.";
  }

  if (message.length < 20) {
    errors.message = "Please add a little more detail (at least 20 characters).";
  } else if (message.length > 3000) {
    errors.message = "Message must be 3000 characters or fewer.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { name, email, subject, message, website },
  };
}
