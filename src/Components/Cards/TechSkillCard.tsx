import "@/Components/Cards/techskill-card.css";
import ShinyText from "@/Components/TextAnimations/ShinyText/ShinyText";
const images = import.meta.glob(
  "@/assets/Images/Cards/TechSkills/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as Record<string, { default: string }>;

type TechSkillProps = {
  TechLogo: string;
  TechTitle: string;
  TechType: string;
};
export default function TechSkillCard({
  TechLogo,
  TechTitle,
  TechType,
}: TechSkillProps) {
  return (
    <>
      <section className="tech-card">
        <img
          className="tech-logo"
          src={
            images[`/src/assets/Images/Cards/TechSkills/${TechLogo}.svg`]
              ?.default
          }
        />
        <div className="tech-description">
          <h1 className="tech-name">
            <ShinyText
              text={TechTitle}
              speed={7}
              delay={0}
              color="#ffffffde"
              shineColor="#2d2d2d7b"
            />
          </h1>
          <span className="tech-type">{TechType}</span>
        </div>
      </section>
    </>
  );
}
