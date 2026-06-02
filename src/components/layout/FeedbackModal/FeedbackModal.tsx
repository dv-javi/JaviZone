import { useRef, useState } from "react";
import type { RefObject } from "react";
import type Lenis from "lenis";
import { assetPaths, getAsset, type ImageModuleMap } from "@/utils/assets";
import { useScrollLock } from "@/hooks/useScrollLock";
import "./feedback-modal.css";

const images = import.meta.glob(
  "@/assets/Images/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as ImageModuleMap;

type FeedbackModalProps = {
  lenisRef?: RefObject<Lenis | null>;
};

type FeedbackPayload = {
  name: string;
  email: string;
  message: string;
};

const GENERIC_ERROR_MESSAGE =
  "An error has occurred. Please try again.";
const RATE_LIMIT_ERROR_MESSAGE =
  "Too many requests. Please wait a minute before trying again.";

export default function FeedbackModal({ lenisRef }: FeedbackModalProps) {
  const form = useRef<HTMLFormElement | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useScrollLock(showModal, lenisRef);

  // ✅ optional email validation
  const validateOptionalEmail = (email: string) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const syncEmailValidation = (input: HTMLInputElement) => {
    if (!validateOptionalEmail(input.value)) {
      const message = "Please enter a valid email address.";
      input.setCustomValidity(message);
      setEmailError(message);
      return false;
    }

    input.setCustomValidity("");
    setEmailError(null);
    return true;
  };

  // ✅ build payload
  const buildFeedbackPayload = (form: HTMLFormElement): FeedbackPayload => {
    const formData = new FormData(form);

    return {
      name: String(formData.get("user_name") || ""),
      email: String(formData.get("user_email") || ""),
      message: String(formData.get("message") || ""),
    };
  };

  const sendFeedbackForm = async (payload: FeedbackPayload) => {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 429) {
      throw new Error(RATE_LIMIT_ERROR_MESSAGE);
    }

    if (!res.ok) {
      throw new Error(GENERIC_ERROR_MESSAGE);
    }

    return res.json() as Promise<{ success: true }>;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const emailInput = form.current.elements.namedItem(
      "user_email",
    ) as HTMLInputElement | null;

    if (emailInput && !syncEmailValidation(emailInput)) {
      emailInput.reportValidity();
      emailInput.focus();
      return;
    }

    if (!form.current.reportValidity()) return;

    setSubmitError(null);
    setIsSending(true);

    sendFeedbackForm(buildFeedbackPayload(form.current))
      .then(() => {
        setIsSending(false);
        setIsSubmitted(true);
      })
      .catch((error: unknown) => {
        console.error("Feedback send failed:", error);
        setIsSending(false);
        const message =
          error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE;
        setSubmitError(
          message === RATE_LIMIT_ERROR_MESSAGE
            ? RATE_LIMIT_ERROR_MESSAGE
            : GENERIC_ERROR_MESSAGE,
        );
      });
  };

  return (
    <section>
      <button
        className="feedback-tag"
        id="feedback-tag"
        type="button"
        onClick={() => {
          setEmailError(null);
          setSubmitError(null);
          setShowModal(true);
        }}
      >
        Feedback
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => {
            setEmailError(null);
            setSubmitError(null);
            setShowModal(false);
          }}
          aria-hidden
        />
      )}

      <div
        className={`form-container ${showModal ? "visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <form className="form" ref={form} onSubmit={sendEmail}>
          {!isSubmitted ? (
            <>
              <img
                className="tiny-picture"
                alt="Portrait of Javier Prado inviting feedback"
                src={getAsset(images, assetPaths.profileImage)}
              />

              <div className="image-title">Any insights?</div>

              <label className="input-data" htmlFor="name-input">
                Name
              </label>

              <input
                className="input"
                type="text"
                name="user_name"
                id="name-input"
                placeholder="Enter your name"
                autoComplete="name"
                minLength={2}
                maxLength={60}
                pattern="^[A-Za-zÀ-ÿ\s]+$"
                required
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^A-Za-zÀ-ÿ\s]/g,
                    "",
                  );
                }}
              />

              <label className="input-data" htmlFor="email-input">
                Email (Optional)
              </label>

              <input
                className={`input${emailError ? " input--invalid" : ""}`}
                type="email"
                name="user_email"
                id="email-input"
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? "email-error" : undefined}
                onInput={(e) => syncEmailValidation(e.currentTarget)}
                onBlur={(e) => syncEmailValidation(e.currentTarget)}
              />

              {emailError && (
                <p className="field-error" id="email-error" role="alert">
                  {emailError}
                </p>
              )}

              <label className="input-data" htmlFor="msg-input">
                Message
              </label>

              <textarea
                className="input"
                id="msg-input"
                name="message"
                placeholder="Write your feedback..."
                minLength={10}
                maxLength={500}
                rows={4}
                required
              />

              {submitError && (
                <p className="submit-error" role="alert">
                  {submitError}
                </p>
              )}

              <button
                className="submit-button"
                type="submit"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Submit"}
              </button>
            </>
          ) : (
            <div className="form-submitted-container">
              <p className="thank-you-message">
                ¡Appreciate it, I'll factor that in!
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
