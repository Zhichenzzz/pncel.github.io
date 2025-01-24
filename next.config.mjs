import createMDX from "@next/mdx";
import rehypeSlug from 'rehype-slug';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [],
      rehypePlugins: [rehypeSlug],
    },
});
export default withMDX(nextConfig);
