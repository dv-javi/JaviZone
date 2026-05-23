import "@/Components/Cards/project-card.css";
const images = import.meta.glob(
  [
    "@/assets/Images/Cards/Projects/Miniatures/*.{png,webp,avif,jpg,jpeg,svg}",
    "@/assets/Images/Cards/Projects/Icons/*.{png,webp,avif,jpg,jpeg,svg}",
  ],
  { eager: true },
) as Record<string, { default: string }>;

type ProjectCardProps = {
  ProjectName: string;
  index: number;
  ProjectTitle: string;
  ProjectDescription: string;
  techStack: string[];
  color1: string;
  color2: string;
  color3: string;
  ProjectLink: string;
};
export default function ProjectCard({
  index = 0,
  ProjectName,
  ProjectTitle,
  ProjectDescription,
  techStack,
  color1,
  color2,
  color3,
  ProjectLink,
}: ProjectCardProps) {
  const aosDuration = 1000 + index * 200;

  return (
    <a className="project-link" href={ProjectLink} target="_blank">
      <section
        data-aos="zoom-in-up"
        data-aos-duration={aosDuration}
        className="projects-card"
        style={
          {
            "--color-start": color1,
            "--color-mid": color2,
            "--color-end": color3,
          } as React.CSSProperties
        }
      >
        <div className="project-aside-card">
          <h1 className="project-title">{ProjectTitle}</h1>
          <span className="project-description">{ProjectDescription}</span>
          <img
            className="project-icon"
            src={
              images[
                `/src/assets/Images/Cards/Projects/Icons/${ProjectName}Icon.svg`
              ]?.default
            }
          />
          <ul className="tech-stack">
            {techStack.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <img
          className="project-image"
          src={
            images[
              `/src/assets/Images/Cards/Projects/Miniatures/${ProjectName}.svg`
            ]?.default
          }
        />
      </section>
    </a>
  );
}
