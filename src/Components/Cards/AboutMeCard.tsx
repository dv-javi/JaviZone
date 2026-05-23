import type React from "react";
import "@/Components/Cards/aboutme-card.css";
import ShinyText from "@/Components/TextAnimations/ShinyText/ShinyText";

const images = import.meta.glob(
  "@/assets/Images/Cards/AboutMe/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as Record<string, { default: string }>;

type ContentCardProps = {
  cardTitle: string;
  cardDescription: React.ReactNode;
  logoSvg: React.ReactNode;
  imagesArray: string[]; //imagesArray: [ icon, img1, img2, img3 ]
  linksArray: string[]; //linksArray: [ link1, link2, link3 ]
  titlesArray: string[]; //titlesArray: [ title1, title2, title3 ]
  userCall: React.ReactNode;
  logoLink: string;
};

export default function AboutMeCard({
  cardTitle,
  cardDescription,
  imagesArray,
  linksArray,
  titlesArray,
  userCall,
  logoSvg,
  logoLink,
}: ContentCardProps) {
  const imageSrcs = imagesArray.map((name) => {
    const path = `/src/assets/Images/Cards/AboutMe/${name}.svg`;
    return images[path]?.default || "";
  });

  return (
    <>
      <section className="card-info">
        <h3 className="card-title">{cardTitle}</h3>
        <p className="card-description">{cardDescription}</p>
        <img className="icon-card" src={imageSrcs[0]} />

        <section className="cards">
          <div className="mini-card mc1">
            <a href={linksArray[0]} target="_blank">
              <img className="card-image" src={imageSrcs[1]} />
            </a>
          </div>
          <div className="title-image">
            <ShinyText text={titlesArray[0]} disabled={false} speed={3} />
          </div>

          <div className="mini-card mc2">
            <a href={linksArray[1]} target="_blank">
              <img className="card-image" src={imageSrcs[2]} />
            </a>
          </div>
          <div className="title-image">
            <ShinyText text={titlesArray[1]} disabled={false} speed={3} />
          </div>

          <div className="mini-card mc3">
            <a href={linksArray[2]} target="_blank">
              <img className="card-image" src={imageSrcs[3]} />
            </a>
          </div>
          <div className="title-image">
            <ShinyText text={titlesArray[2]} disabled={false} speed={3} />
          </div>

          <div className="logo-section">
            <p>
              {userCall}
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
                  fill-rule="evenodd"
                  d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                  clip-rule="evenodd"
                />
              </svg>
            </p>
            <a href={logoLink} target="_blank">
              <svg className="logo">{logoSvg}</svg>
            </a>
          </div>
        </section>
      </section>
    </>
  );
}
