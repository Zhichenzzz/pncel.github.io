import { metadataTmpl } from "@/data/metadata";
import DefaultMain from "@/layouts/defaultMain";
import DefaultMDX from "@/layouts/defaultMdx";

export const metadata = {
  ...metadataTmpl,
  title: metadataTmpl.title + " | News",
};

export default async function News() {
  return (
    <DefaultMain>
      <DefaultMDX>
        <p>Under construction...</p>
      </DefaultMDX>
    </DefaultMain>
  );
}
