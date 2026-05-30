import { useRef, useState } from "react";
import type { RefObject } from "react";
import type Lenis from "lenis";
import { sendFeedbackForm } from "@/services/emailService";
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

  useScrollLock(showModal, lenisRef);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setIsSubmitted(true);

    sendFeedbackForm(form.current)
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
        onClick={() => setShowModal(true)}
      >
        Feedback
      </button>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
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
                alt=""
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
                  alt=""
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
