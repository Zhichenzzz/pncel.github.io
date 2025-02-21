// import Avatar from "@/components/avatar";
import { getAllMembers } from "@/data/member";
import { metadataTmpl } from "@/data/metadata";
import DefaultMain from "@/layouts/defaultMain";
import DefaultMDX from "@/layouts/defaultMdx";

export const metadata = {
  ...metadataTmpl,
  title: metadataTmpl.title + " | Projects",
};

export default async function Projects() {
  const members = await getAllMembers();
  return (
    <DefaultMain>
      <DefaultMDX>
        <p>Under construction...</p>
        {/*
        <div>
          {members.map((member) => (
            <div className="w-24 h-24">
              <Avatar
                person={member.person!}
                memberId={member.memberId}
                key={member.memberId}
              />
            </div>
          ))}
        </div>
         */}
      </DefaultMDX>
    </DefaultMain>
  );
}
