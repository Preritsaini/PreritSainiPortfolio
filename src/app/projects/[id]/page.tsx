import { PROJECTS } from "../../../data/portfolioData";
import { ProjectDetailView } from "./ProjectDetailView";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Prerit Saini",
    };
  }

  return {
    title: `${project.title} — Case Study | Prerit Saini`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
