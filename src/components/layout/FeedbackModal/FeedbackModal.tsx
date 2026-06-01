import { useRef, useState } from "react";
import type { RefObject } from "react";
import type Lenis from "lenis";
import {
  buildFeedbackPayload,
  sendFeedbackForm,
  validateOptionalEmail,
} from "@/services/emailService";
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

export default function FeedbackModal({ lenisRef }: FeedbackModalProps) {
  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useScrollLock(showModal, lenisRef);

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

    setIsSending(true);
    setIsSubmitted(true);

    sendFeedbackForm(buildFeedbackPayload(form.current))
      .then(() => setIsSending(false))
      .catch((error) => {
        console.error("Feedback send failed:", error);
        setIsSending(false);
        setIsSubmitted(false);
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
                <span className="icons-container">
                  Name
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m8 9 3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                    />
                  </svg>
                </span>
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
                <span className="icons-container">
                  Email (Optional)
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
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
                onInput={(e) => {
                  syncEmailValidation(e.currentTarget);
                }}
                onBlur={(e) => {
                  syncEmailValidation(e.currentTarget);
                }}
              />
              {emailError && (
                <p className="field-error" id="email-error" role="alert">
                  {emailError}
                </p>
              )}

              <label className="input-data" htmlFor="msg-input">
                <span className="icons-container">
                  Message
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                    />
                  </svg>
                </span>
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
              <button className="submit-button" type="submit">
                {isSending ? "Sending..." : "Submit"}
              </button>
            </>
          ) : (
            <div className="form-submitted-container">
              <div className="form-submit-btn sent">
                <img
                  className="sent-picture"
                  alt="Illustration of a developer at a Mac after sending feedback"
                  src={getAsset(images, assetPaths.developerMac)}
                />
              </div>
              <p className="thank-you-message">
                ¡Appreciate it, I'll factor that in.!
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
