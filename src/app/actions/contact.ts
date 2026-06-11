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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.warn("WEB3FORMS_ACCESS_KEY is not defined. Falling back to mock success.");
      return { success: true };
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          subject: data.subject || `Portfolio Contact from ${data.name}`,
          message: data.message,
          from_name: `${data.name} via Portfolio`,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        console.error("Web3Forms submission failed:", result);
        return { success: false, error: result.message || "Failed to send message." };
      }

      return { success: true };
    } catch (e) {
      console.error("Web3Forms request error:", e);
      return { success: false, error: "Network error. Please try again." };
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
