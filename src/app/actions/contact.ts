"use server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  error?: string;
  field?: keyof ContactFormData;
}

const LIMITS = {
  name:    { min: 2,  max: 100  },
  subject: { min: 0,  max: 200  },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function extractField(formData: FormData, key: string): string {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().replace(/\s+/g, " ");
}

function validate(data: ContactFormData): ContactFormResult | null {
  if (!data.name)
    return { success: false, error: "Name is required.", field: "name" };

  if (data.name.length < LIMITS.name.min)
    return { success: false, error: `Name must be at least ${LIMITS.name.min} characters.`, field: "name" };

  if (data.name.length > LIMITS.name.max)
    return { success: false, error: `Name must be under ${LIMITS.name.max} characters.`, field: "name" };

  if (!data.email)
    return { success: false, error: "Email is required.", field: "email" };

  if (!EMAIL_RE.test(data.email))
    return { success: false, error: "Please enter a valid email address.", field: "email" };

  if (data.subject.length > LIMITS.subject.max)
    return { success: false, error: `Subject must be under ${LIMITS.subject.max} characters.`, field: "subject" };

  if (!data.message)
    return { success: false, error: "Message is required.", field: "message" };

  if (data.message.length < LIMITS.message.min)
    return { success: false, error: `Message must be at least ${LIMITS.message.min} characters.`, field: "message" };

  if (data.message.length > LIMITS.message.max)
    return { success: false, error: `Message must be under ${LIMITS.message.max} characters.`, field: "message" };

  return null;
}

async function sendViaWeb3Forms(
  data: ContactFormData,
  accessKey: string
): Promise<ContactFormResult> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key:  accessKey,
      name:        data.name,
      email:       data.email,
      subject:     data.subject || `Portfolio contact from ${data.name}`,
      message:     data.message,
      from_name:   `${data.name} via Portfolio`,
    }),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || !json.success) {
    const message = typeof json.message === "string" ? json.message : "Submission rejected.";
    console.error("[contact] Web3Forms error:", { status: res.status, json });
    return { success: false, error: message };
  }

  return { success: true };
}

export async function submitContactForm(
  formData: FormData
): Promise<ContactFormResult> {
  const data: ContactFormData = {
    name:    extractField(formData, "name"),
    email:   extractField(formData, "email"),
    subject: extractField(formData, "subject"),
    message: extractField(formData, "message"),
  };

  const validationError = validate(data);
  if (validationError) return validationError;

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn("[contact] WEB3FORMS_ACCESS_KEY not set - skipping submission.");
    console.info("[contact] Form data:", data);
    return { success: true };
  }

  try {
    return await sendViaWeb3Forms(data, accessKey);
  } catch (err) {
    console.error("[contact] Network error:", err);
    return { success: false, error: "Network error - please try again." };
  }
}