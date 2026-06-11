"use server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormResult {
  success: boolean;
  error?: string;
}

function sanitize(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  try {
    const data: ContactFormData = {
      name: sanitize(formData.get("name") as string),
      email: sanitize(formData.get("email") as string),
      subject: sanitize((formData.get("subject") as string) ?? ""),
      message: sanitize(formData.get("message") as string),
    };

    if (!data.name || !data.email || !data.message) {
      return { success: false, error: "Name, email, and message are required." };
    }

    if (data.name.length < 2) {
      return { success: false, error: "Name must be at least 2 characters." };
    }

    if (!isValidEmail(data.email)) {
      return { success: false, error: "Invalid email address." };
    }

    if (data.message.length < 10) {
      return { success: false, error: "Message must be at least 10 characters." };
    }

    if (data.message.length > 1000) {
      return { success: false, error: "Message must be under 1000 characters." };
    }

    console.log("Contact form submission:", data);

    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
