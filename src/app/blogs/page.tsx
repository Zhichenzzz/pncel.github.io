import { readdir, readFile } from "fs/promises";
import { metadataTmpl } from "@/data/metadata";
import DefaultMDX from "@/layouts/defaultMdx";

export const metadata = {
  ...metadataTmpl,
  title: metadataTmpl.title + " | Blogs",
};

async function getAllBlogs() {
  const files = await readdir(`${process.cwd()}/src/app/blogs/[blogId]`);
  const blogs = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      file: file,
      exports: require(`@/app/blogs/[blogId]/${file}`),
    }))
    .toSorted(
      (a, b) =>
        Date.parse(b.exports["creation_time"]) -
        Date.parse(a.exports["creation_time"]),
    );
  return blogs;
}

export default async function Blogs() {
  const blogs = await getAllBlogs();
  return (
    <div>
      <DefaultMDX>
        {blogs.map(({ exports }) => (
          <p key={exports["title"]}>
            {exports["title"]}, {exports["creation_time"]}
          </p>
        ))}
      </DefaultMDX>
    </div>
  );
}
