import ShinyText from "@/components/ui/TextAnimations/ShinyText/ShinyText";
import type { AboutMeCardProps } from "@/types/aboutMeCard";
import { getAboutMeImage, type ImageModuleMap } from "@/utils/assets";
import "./about-me-card.css";

const images = import.meta.glob(
  "@/assets/Images/CardsImages/AboutMe/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as ImageModuleMap;

type MediaSlotProps = {
  href?: string;
  imageSrc: string;
  title: string;
  className: string;
};

function MediaSlot({ href, imageSrc, title, className }: MediaSlotProps) {
  const image = <img className="card-image" alt="" src={imageSrc} />;
  return (
    <>
      <div className={className}>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      <div className="title-image">
        <ShinyText text={title} disabled={false} speed={3} />
      </div>
    </>
  );
}

export default function AboutMeCard({
  title,
  description,
  imageNames,
  links,
  mediaTitles,
  callToAction,
  logo,
  logoHref,
}: AboutMeCardProps) {
  const imageSrcs = imageNames.map((name) => getAboutMeImage(images, name));

  return (
    <section className="card-info">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <img className="icon-card" alt="" src={imageSrcs[0]} />

      <section className="cards">
        <MediaSlot
          className="mini-card mc1"
          href={links[0] || undefined}
          imageSrc={imageSrcs[1]}
          title={mediaTitles[0]}
        />
        <MediaSlot
          className="mini-card mc2"
          href={links[1] || undefined}
          imageSrc={imageSrcs[2]}
          title={mediaTitles[1]}
        />
        <MediaSlot
          className="mini-card mc3"
          href={links[2] || undefined}
          imageSrc={imageSrcs[3]}
          title={mediaTitles[2]}
        />

        <div className="logo-section">
          <p>
            {callToAction}
            <br />
            <svg
              className="arrow w-[48px] h-[48px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                clipRule="evenodd"
              />
            </svg>
          </p>
          <a href={logoHref} target="_blank" rel="noreferrer">
            <svg className="logo">{logo}</svg>
          </a>
        </div>
      </section>
    </section>
  );
}
