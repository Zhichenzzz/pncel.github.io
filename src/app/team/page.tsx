import DefaultMDX from "@/layouts/defaultMdx";
import DefaultMain from "@/layouts/defaultMain";
import MemberCard from "./memberCard";
import { metadataTmpl } from "@/data/metadata";
import { getAllMembers } from "@/data/member";

export const metadata = {
  ...metadataTmpl,
  title: metadataTmpl.title + " | Team",
};

export default async function Team() {
  const allMembers = await getAllMembers();

  const groups = allMembers.reduce((g: Map<string, typeof allMembers>, m) => {
    const members = g.get(m.role) || [];
    members.push(m);
    g.set(m.role, members);
    return g;
  }, new Map<string, typeof allMembers>());

  return (
    <div>
      <DefaultMDX>
        <h1>Team</h1>
      </DefaultMDX>
      <DefaultMain>
        {Array.from(groups.entries()).map(
          ([role, members]) =>
            members.length > 0 && (
              <div key={role}>
                <div className="divider">{role}</div>
                <div className="columns-1 lg:columns-2 2xl:columns-3 gap-x-4 py-4">
                  {members.map((m) => (
                    <MemberCard member={m} key={m.memberId}></MemberCard>
                  ))}
                </div>
              </div>
            )
        )}
      </DefaultMain>
    </div>
  );
}
