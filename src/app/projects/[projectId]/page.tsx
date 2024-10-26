import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { metadataTmpl } from "@/data/metadata";
import { getAllProjectIds, getProject, getProjectMdxSrc } from "@/data/project";
import DefaultMain from "@/layouts/defaultMain";

interface Params {
  params: {
    projectId: string;
  };
}

export async function generateStaticParams() {
  const memberIds = await getAllProjectIds();
  return memberIds;
}

export async function generateMetadata({ params: { projectId } }: Params) {
  const project = await getProject(projectId);
  return {
    ...metadataTmpl,
    title: metadataTmpl.title + " | Project | " + project.codename,
  };
}

export default async function ProjectPage({ params: { projectId } }: Params) {
  const project = await getProject(projectId);
  const mdxSrc = await getProjectMdxSrc(projectId);
  return (
    <DefaultMain>
      <div className="prose 2xl:prose-lg max-w-full">
        <h1>{project.title}</h1>
        <MDXRemote
          source={
            mdxSrc ||
            "Brainstorming for the best way to present this project..."
          }
          components={useMDXComponents({})}
        />
      </div>
    </DefaultMain>
  );
}
