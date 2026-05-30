import emailjs from "@emailjs/browser";

const SERVICE_ID = "Portfolio_Dm";
const TEMPLATE_ID = "portfolio_template";
const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "7VuSwVcSerDi5fylS";

export function sendFeedbackForm(form: HTMLFormElement) {
  return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, {
    publicKey: PUBLIC_KEY,
  });
}
