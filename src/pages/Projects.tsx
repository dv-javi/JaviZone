import "@/CssPages/projects.css";
import ProjectCard from "@/Components/Cards/ProjectCard";

export default function projects() {
  return (
    <>
      <title>Javier Prado</title>
      <div className="body-projects">
        <div className="project-efect"></div>
        <main className="projects-container">
          <ProjectCard
            ProjectName="NailsStudio"
            index={1}
            ProjectTitle="Nails Studio"
            ProjectDescription="A Nails Technician website to show designs and services."
            ProjectLink="https://nailstudio-grace.netlify.app"
            techStack={["Website", "React", "Vite"]}
            color1="#8d1b34ff"
            color2="#130A0D"
            color3="#130A0D"
          />
          <ProjectCard
            ProjectName="LinkYourPet"
            index={2}
            ProjectTitle="Link Your Pet"
            ProjectDescription="A pet social media to find pet lovers in your area."
            ProjectLink="https://dv-javi.github.io/link-your-pet/"
            techStack={["Website", "React", "Vite"]}
            color1="#B30E06"
            color2="#110607"
            color3="#110607"
          />
        </main>
      </div>
    </>
  );
}
