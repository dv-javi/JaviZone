import type { CSSProperties } from "react";

export type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio Feedback</title>
      </head>
      <body style={body}>
        <div style={container}>
          <p style={eyebrow}>JaviZone</p>
          <h1 style={title}>Portfolio feedback</h1>
          <hr style={divider} />

          <div style={section}>
            <p style={label}>Name</p>
            <p style={value}>{name}</p>
          </div>

          <div style={section}>
            <p style={label}>Email</p>
            <p style={value}>{email || "Not provided"}</p>
          </div>

          <div style={section}>
            <p style={label}>Message</p>
            <p style={messageText}>{message}</p>
          </div>

          <hr style={divider} />
          <p style={footer}>Sent from the feedback form on itsjavizone.com</p>
        </div>
      </body>
    </html>
  );
}

const body: CSSProperties = {
  margin: 0,
  padding: "24px 12px",
  backgroundColor: "#0a0a0a",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const container: CSSProperties = {
  margin: "0 auto",
  maxWidth: "520px",
  padding: "28px 24px",
  backgroundColor: "#141414",
  border: "1px solid #2a2a2a",
  borderRadius: "8px",
};

const eyebrow: CSSProperties = {
  margin: "0 0 8px",
  fontSize: "11px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#737373",
};

const title: CSSProperties = {
  margin: "0 0 16px",
  fontSize: "22px",
  fontWeight: 600,
  color: "#fafafa",
  letterSpacing: "-0.02em",
};

const divider: CSSProperties = {
  border: "none",
  borderTop: "1px solid #2a2a2a",
  margin: "20px 0",
};

const section: CSSProperties = {
  marginBottom: "16px",
};

const label: CSSProperties = {
  margin: "0 0 6px",
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#737373",
};

const value: CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.5,
  color: "#e5e5e5",
};

const messageText: CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.6,
  color: "#d4d4d4",
  whiteSpace: "pre-wrap",
};

const footer: CSSProperties = {
  margin: 0,
  fontSize: "11px",
  color: "#525252",
};

export default EmailTemplate;
