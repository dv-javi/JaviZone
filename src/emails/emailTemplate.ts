export type EmailTemplateProps = {
  name: string;
  email: string;
  message: string;
};

export function EmailTemplate({
  name,
  email,
  message,
}: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portfolio Feedback</title>
</head>

<body style="
  margin: 0;
  padding: 24px 12px;
  background-color: #0a0a0a;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace;
">
  <div style="
    margin: 0 auto;
    max-width: 520px;
    padding: 28px 24px;
    background-color: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
  ">

    <p style="
      margin: 0 0 8px;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #737373;
    ">JaviZone</p>

    <h1 style="
      margin: 0 0 16px;
      font-size: 22px;
      font-weight: 600;
      color: #fafafa;
    ">Portfolio feedback</h1>

    <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 20px 0;" />

    <div style="margin-bottom: 16px;">
      <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373;">Name</p>
      <p style="margin: 0; font-size: 14px; color: #e5e5e5;">${name}</p>
    </div>

    <div style="margin-bottom: 16px;">
      <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373;">Email</p>
      <p style="margin: 0; font-size: 14px; color: #e5e5e5;">${email || "Not provided"}</p>
    </div>

    <div style="margin-bottom: 16px;">
      <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #737373;">Message</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d4; white-space: pre-wrap;">
        ${message}
      </p>
    </div>

    <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 20px 0;" />

    <p style="margin: 0; font-size: 11px; color: #525252;">
      Sent from itsjavizone.com
    </p>

  </div>
</body>
</html>
`;
}
