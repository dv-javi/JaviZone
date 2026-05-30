import type { ProjectCardProps } from "@/types/projectCard";
import { assetPaths, getAsset, type ImageModuleMap } from "@/utils/assets";
import "./project-card.css";

const images = {
  ...import.meta.glob(
    "@/assets/Images/CardsImages/Projects/Miniatures/*.{png,webp,avif,jpg,jpeg,svg}",
    { eager: true },
  ),
  ...import.meta.glob(
    "@/assets/Images/CardsImages/Projects/Icons/*.{png,webp,avif,jpg,jpeg,svg}",
    { eager: true },
  ),
} as ImageModuleMap;

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const aosDuration = 1000 + index * 200;
  const [colorStart, colorMid, colorEnd] = project.colors;

  return (
    <a
      className="project-link"
      href={project.link}
      target="_blank"
      rel="noreferrer"
    >
      <section
        data-aos="zoom-in-up"
        data-aos-duration={aosDuration}
        className="projects-card"
        style={
          {
            "--color-start": colorStart,
            "--color-mid": colorMid,
            "--color-end": colorEnd,
          } as React.CSSProperties
        }
      >
        <div className="project-aside-card">
          <h1 className="project-title">{project.title}</h1>
          <span className="project-description">{project.description}</span>
          <img
            className="project-icon"
            alt=""
            src={getAsset(images, assetPaths.projectIcon(project.id))}
          />
          <ul className="tech-stack">
            {project.techStack.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <img
          className="project-image"
          alt=""
          src={getAsset(images, assetPaths.projectMiniature(project.id))}
        />
      </section>
    </a>
  );
}
