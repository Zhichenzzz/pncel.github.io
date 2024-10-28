import { readdir, readFile } from "fs/promises";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { metadataTmpl } from "@/data/metadata";

interface Params {
  params: {
    blogId: string;
  };
}

export async function generateMetadata({ params: { blogId } }: Params) {
  const { title } = require(
    `${process.cwd()}/src/app/blogs/[blogId]/${blogId}.mdx`,
  ).title;
  return {
    ...metadataTmpl,
    title: metadataTmpl.title + " | Blog | " + title,
  };
}

export async function generateStaticParams() {
  const blogDir = `${process.cwd()}/src/app/blogs/[blogId]`;
  const files = await readdir(blogDir);
  const blogIds = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
  // .map((file) => require(`${blogDir}/${file}`).blogId);
  console.log(blogIds);
  return blogIds;
}

export default async function BlogPage({ params: { blogId } }: Params) {
  const mdxSrc = await readFile(
    `${process.cwd()}/src/app/blogs/[blogId]/${blogId}.mdx`,
    "utf-8",
  );
  return (
    <div className="prose 2xl:prose-lg max-w-full">
      <MDXRemote source={mdxSrc} components={useMDXComponents({})} />
    </div>
  );
}
