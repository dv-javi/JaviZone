import type { ReactNode } from "react";

export type AboutMeCardProps = {
  title: string;
  description: ReactNode;
  imageNames: [string, string, string, string];
  links: [string, string, string];
  mediaTitles: [string, string, string];
  callToAction: ReactNode;
  logo: ReactNode;
  logoHref: string;
};
