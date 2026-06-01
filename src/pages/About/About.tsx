import { useState } from "react";
import { assetPaths, getAsset, type ImageModuleMap } from "@/utils/assets";
import { bioSections } from "@/data/bioSections";
import "./about.css";
const images = import.meta.glob(
  "@/assets/Images/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as ImageModuleMap;

const coreValues = [
  {
    index: "01",
    title: "Keep Building.",
    description:
      "Turning ideas into reality through continuous creation, iteration, and improvement.",
  },
  {
    index: "02",
    title: "Stay Curious.",
    description:
      "Always exploring new technologies, perspectives, and ways to grow.",
  },
  {
    index: "03",
    title: "Pursue Excellence.",
    description:
      "Focused on quality, craftsmanship, and delivering exceptional experiences.",
  },
] as const;

const contactLinks = [
  {
    label: "Email",
    display: "devjavi@outlook.com",
    hint: "Typically responds within 24 hours.",
    href: "mailto:dev-jp@outlook.com",
    external: false,
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/javierprado",
    hint: "Let's connect and grow our network.",
    href: "https://www.linkedin.com/in/javierprado",
    external: true,
  },
  {
    label: "GitHub",
    display: "github.com/Dv-Javi",
    hint: "Explore my projects, experiments, and open-source work.",
    href: "https://github.com/Dv-Javi",
    external: true,
  },
] as const;

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16v12H4V6zm0 0l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6.5 8.5h3v11h-3v-11zm1.5-4.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10 8.5h2.9v1.5h.04c.4-.75 1.38-1.55 2.84-1.55 3.04 0 3.6 2 3.6 4.6v6.45h-3.1v-5.72c0-1.36-.03-3.1-1.89-3.1-1.94 0-2.24 1.52-2.24 3.08v5.74H10V8.5z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.12-1.48-1.12-1.48-.92-.64.07-.63.07-.63 1.02.07 1.55 1.06 1.55 1.06.9 1.56 2.36 1.11 2.94.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.74 0 0 .84-.27 2.75 1.05A9.2 9.2 0 0112 6.84c.85 0 1.7.11 2.5.34 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.03 10.03 0 0022 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

const contactIcons = {
  Email: EmailIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GithubIcon,
} as const;

const EMAIL_ADDRESS = "devjavi@outlook.com";

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 15H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailContactRow({
  label,
  display,
  hint,
  href,
}: {
  label: string;
  display: string;
  hint: string;
  href: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL_ADDRESS;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="contact-row contact-row--email">
      <a
        className="contact-row-link"
        href={href}
        aria-label={`${label}: ${display}. ${hint}`}
      >
        <span className="contact-icon">
          <EmailIcon />
        </span>
        <span className="contact-details">
          <span className="contact-label">{label}</span>
          <span className="contact-value">{display}</span>
          <span className="contact-hint">{hint}</span>
        </span>
      </a>
      <button
        type="button"
        className={`contact-copy-btn${copied ? " contact-copy-btn--copied" : ""}`}
        onClick={handleCopy}
        aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="contact-copy-label">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

export default function About() {
  return (
    <>
      <title>Javier Prado</title>
      <div className="general-background" />
      <header className="header-grid">
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          className="bio-container"
        >
          <div className="bio-header">
            <span className="bio-label">Bio</span>
            <span className="bio-divider" />
          </div>

          {bioSections.map(({ subtitle, index, text }) => (
            <div
              className="bio-section"
              key={subtitle}
              data-aos="fade-up"
              data-aos-duration={800 + parseInt(index) * 300}
            >
              <div className="bio-section-header">
                <span className="bio-index">{index}</span>
                <p className="sub-titles">{subtitle}</p>
              </div>
              <p className="bio-texts">{text}</p>
            </div>
          ))}

          <p className="signature">Javier Prado</p>
        </div>

        <img
          data-aos="fade-up"
          data-aos-duration="1200"
          className="lanyard"
          alt="Javier Prado wearing a conference lanyard with name badge"
          src={getAsset(images, assetPaths.lanyard)}
        />
      </header>

      <section className="main-about">
        <div className="my-core-values">
          <header className="about-section-header">
            <h1 className="core-values-title">My Core Values</h1>
            <p className="about-section-eyebrow">Personal philosophy</p>
          </header>
          <ul className="core-values-list">
            {coreValues.map(({ index, title, description }) => (
              <li className="core-value-item" key={title}>
                <span className="core-value-index">{index}</span>
                <div className="core-value-body">
                  <p className="core-value-title">{title}</p>
                  <p className="core-value-text">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="info-container">
          <header className="about-section-header">
            <h1 className="info-title">Contact Info</h1>
          </header>
          <p className="contact-intro">
            Interested in collaborating, discussing a project, or simply
            connecting? I&apos;d be happy to hear from you.
          </p>
          <div className="contact-list">
            {contactLinks.map(({ label, display, hint, href }) => {
              if (label === "Email") {
                return (
                  <EmailContactRow
                    key={label}
                    label={label}
                    display={display}
                    hint={hint}
                    href={href}
                  />
                );
              }

              const Icon = contactIcons[label];
              return (
                <a
                  key={label}
                  className="contact-row"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label}: ${display}. ${hint} (opens in new tab)`}
                >
                  <span className="contact-icon">
                    <Icon />
                  </span>
                  <span className="contact-details">
                    <span className="contact-label">{label}</span>
                    <span className="contact-value">{display}</span>
                    <span className="contact-hint">{hint}</span>
                  </span>
                  <span className="contact-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
