export type ImageModuleMap = Record<string, { default: string }>;

export function getAsset(
  images: ImageModuleMap,
  pathFromAssetsRoot: string,
): string {
  const key = pathFromAssetsRoot.startsWith("/src/")
    ? pathFromAssetsRoot
    : `/src/assets/${pathFromAssetsRoot}`;
  return images[key]?.default ?? "";
}

const ABOUT_ME_BASE = "Images/CardsImages/AboutMe";
const PROJECTS_ICONS_BASE = "Images/CardsImages/Projects/Icons";
const PROJECTS_MINIATURES_BASE = "Images/CardsImages/Projects/Miniatures";

export const assetPaths = {
  aboutMeImage: (name: string, ext: "avif" | "svg") =>
    `${ABOUT_ME_BASE}/${name}.${ext}`,
  projectIcon: (id: string) => `${PROJECTS_ICONS_BASE}/${id}Icon.avif`,
  projectMiniature: (id: string) => `${PROJECTS_MINIATURES_BASE}/${id}.avif`,
  profileImage: "Images/image-profile.avif",
  lanyard: "Images/lanyard.avif",
  developerMac: "Images/developer-mac.svg",
  navLogo: "Images/Nav/Javi-logo.svg",
  navOutlook: "Images/Nav/outlook.svg",
} as const;

export function getAboutMeImage(images: ImageModuleMap, name: string): string {
  const avif = getAsset(images, assetPaths.aboutMeImage(name, "avif"));
  if (avif) return avif;
  return getAsset(images, assetPaths.aboutMeImage(name, "svg"));
}
