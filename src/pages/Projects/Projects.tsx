import ProjectCard from "@/components/ui/Cards/ProjectCard/ProjectCard";
import { projects } from "@/data/projects";
import "./projects.css";

export default function Projects() {
  return (
    <>
      <title>Javier Prado</title>
      <div className="body-projects">
        <div className="project-efect" />
        <main className="projects-container">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </main>
      </div>
    </>
  );
}
