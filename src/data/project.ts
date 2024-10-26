import { readFile } from "fs/promises";
import prisma from "./prisma";

export async function getAllProjectIds() {
  const projectIds = await prisma.project.findMany({
    select: {
      projectId: true,
    },
  });
  return projectIds;
}

export async function getProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      projectId: projectId,
    },
  });

  if (!project) {
    throw new Error(
      `Database data or source code error: no project found for projectId ${projectId}`
    );
  }

  return project;
}

export async function getProjectMdxSrc(projectId: string) {
  // get mdx if there is one
  const mdxSrc = await readFile(
    process.cwd() + `/src/app/projects/[projectId]/${projectId}.mdx`,
    "utf-8"
  ).catch((e) => {
    if (e.code == "ENOENT") {
      return null; // if no file, just return null
    } else {
      throw e;
    }
  });

  return mdxSrc;
}
