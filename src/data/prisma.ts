import {
  PrismaClient,
  Person as _Person,
  Member as _Member,
  Tag as _Tag,
  Venue as _Venue,
  PubResource as _PubResource,
  Publication as _Publication,
  Team as _Team,
  Group as _Group,
  Project as _Project,
  Prisma,
} from "@prisma/client";

import { MemberRole, TagType, VenueType, LinkIcon, PubType } from "./enums";

import type {
  Member,
  Person,
  Tag,
  Venue,
  PubResource,
  Publication,
  Team,
  Group,
  Project,
} from "./types";

const prisma = new PrismaClient();
export default prisma;

type _TagExt = _Tag & { pubs?: _PubExt[] };
type _PersonExt = _Person & {
  member?: _MemberExt | null;
  pubs?: _PubExt[];
  teams?: _TeamExt[];
};
type _MemberExt = _Member & {
  person?: _PersonExt;
  selectedPubs?: _PubExt[];
  projects?: _ProjectExt[];
};
type _VenueExt = _Venue & { pubs?: _PubExt[] };
type _PubRscExt = _PubResource & { pub?: _PubExt };
type _PubExt = _Publication & {
  tags?: _TagExt[];
  authors?: _PersonExt[];
  venue?: _VenueExt;
  resources?: _PubRscExt[];
  selectedBy?: _MemberExt[];
};
type _TeamExt = _Team & {
  members?: _PersonExt[];
  group?: _GroupExt;
  projects?: _ProjectExt[];
};
type _GroupExt = _Group & {
  teams?: _TeamExt[];
};
type _ProjectExt = _Project & {
  members?: _MemberExt[];
  teams?: _TeamExt[];
};

function reorder<_T, T, KT>(
  array: _T[],
  match: (item: _T, key: KT) => boolean,
  validate: (item: _T) => T,
  keys: string | null,
): T[] | undefined {
  let reordered: T[] | undefined = undefined;
  let order: KT[];
  if (keys) {
    try {
      order = JSON.parse(keys);
    } catch (e) {
      throw new Error("keys parse error");
    }

    if (order.length != array.length) {
      throw new Error("len(keys) != len(items)");
    } else if (new Set(order).size != order.length) {
      throw new Error("keys duplicate");
    }
  } else {
    throw new Error("keys undef");
  }

  reordered = order.map((key) => {
    const items = array.filter((item) => match(item, key));
    if (items.length === 0) {
      throw new Error(`no item for key ${key}`);
    } else if (items.length > 1) {
      throw new Error(`multi items for key ${key}`);
    }
    return validate(items[0]);
  });
  return reordered;
}

export function validateTag(tag: _TagExt): Tag {
  // check "type" value (Runtime)
  const TagTypeValues = Object.keys(TagType).filter((k) => isNaN(Number(k)));
  if (tag.type && !TagTypeValues.includes(tag.type)) {
    throw new Error(
      `Database data error: invalid type (${tag.type}) for tag ${tag.id}`,
    );
  }

  return {
    ...tag,
    type: TagType[(tag.type || "other") as keyof typeof TagType],
    pubs: tag.pubs?.map(validatePublication),
  };
}

export function validatePerson(person: _PersonExt): Person {
  return {
    ...person,
    member: person.member && validateMember(person.member),
    pubs: person.pubs?.map(validatePublication),
    teams: person.teams?.map(validateTeam),
  };
}

export function validateMember(member: _MemberExt): Member {
  // check "role" value
  const MemberRoleValues = Object.keys(MemberRole).filter((k) =>
    isNaN(Number(k)),
  );
  if (member.role && !MemberRoleValues.includes(member.role)) {
    throw new Error(
      `Database data error: invalid role (${member.role}) for member (id:${member.memberId})`,
    );
  }

  return {
    ...member,
    role: MemberRole[(member.role || "other") as keyof typeof MemberRole],
    person: member.person && validatePerson(member.person),
    selectedPubs: member.selectedPubs?.map(validatePublication),
    projects: member.projects?.map(validateProject),
  };
}

export function validateVenue(venue: _VenueExt): Venue {
  // check "type" value
  const VenueTypeValues = Object.keys(VenueType).filter((k) =>
    isNaN(Number(k)),
  );
  if (venue.type && !VenueTypeValues.includes(venue.type)) {
    throw new Error(
      `Database data error: invalid type (${venue.type}) for venue ${venue.id}`,
    );
  }

  return {
    ...venue,
    type: VenueType[(venue.type || "default") as keyof typeof VenueType],
    pubs: venue.pubs?.map(validatePublication),
  };
}

export function validatePubResource(rsc: _PubRscExt): PubResource {
  // check "icon" value
  const LinkIconValues = Object.keys(LinkIcon).filter((k) => isNaN(Number(k)));
  if (rsc.icon && !LinkIconValues.includes(rsc.icon)) {
    throw new Error(
      `Database data error: invalid icon (${rsc.icon}) for resource (id:${rsc.id})`,
    );
  }

  return {
    ...rsc,
    icon: LinkIcon[(rsc.icon || "default") as keyof typeof LinkIcon],
    pub: rsc.pub && validatePublication(rsc.pub),
  };
}

export function validatePublication(pub: _PubExt): Publication {
  // check "type" value
  const PubTypeValues = Object.keys(PubType).filter((k) => isNaN(Number(k)));
  if (pub.type && !PubTypeValues.includes(pub.type)) {
    throw new Error(
      `Database data error: invalid type (${pub.type}) for publication "${pub.id}"`,
    );
  }

  // correct author order
  let authors: Person[] | undefined = undefined;
  if (pub.authors) {
    try {
      authors = reorder(
        pub.authors,
        (item: _PersonExt, key: number) => {
          return item.id === key;
        },
        validatePerson,
        pub.authorOrder,
      );
    } catch (e) {
      throw new Error(
        `Database data error: reordering authors for publication ${pub.id}, ecode = ${(e as Error).message}`,
      );
    }
  }

  return {
    ...pub,
    type: PubType[(pub.type || "unpublished") as keyof typeof PubType],
    tags: pub.tags?.map(validateTag),
    authors: authors,
    venue: pub.venue && validateVenue(pub.venue),
    resources: pub.resources?.map(validatePubResource),
    selectedBy: pub.selectedBy?.map(validateMember),
  };
}

export function validateTeam(team: _TeamExt): Team {
  // correct member order
  let members: Person[] | undefined = undefined;
  if (team.members) {
    try {
      members = reorder(
        team.members,
        (item: _PersonExt, key: number) => {
          return item.id === key;
        },
        validatePerson,
        team.memberOrder,
      );
    } catch (e) {
      throw new Error(
        `Database data error: reordering members for team ${team.id}, ecode = ${(e as Error).message}`,
      );
    }
  }

  return {
    ...team,
    members: members,
    group: team.group ? validateGroup(team.group) : undefined,
    projects: team.projects?.map(validateProject),
  };
}

export function validateGroup(group: _GroupExt): Group {
  return {
    ...group,
    teams: group.teams?.map(validateTeam),
  };
}

export function validateProject(project: _ProjectExt): Project {
  // correct member order
  let members: Member[] | undefined = undefined;
  if (project.members) {
    try {
      members = reorder(
        project.members,
        (item: _MemberExt, key: string) => {
          return item.memberId === key;
        },
        validateMember,
        project.memberOrder,
      );
    } catch (e) {
      throw new Error(
        `Database data error: reordering members for project ${project.projectId}, ecode = ${(e as Error).message}`,
      );
    }
  }

  // correct team order
  let teams: Team[] | undefined = undefined;
  if (project.teams) {
    try {
      teams = reorder(
        project.teams,
        (item: _TeamExt, key: number) => {
          return item.id === key;
        },
        validateTeam,
        project.teamOrder,
      );
    } catch (e) {
      throw new Error(
        `Database data error: reordering teams for project ${project.projectId}, ecode = ${(e as Error).message}`,
      );
    }
  }

  return {
    ...project,
    members: members,
    teams: teams,
  };
}

export const queryPubExt = Prisma.validator(
  prisma,
  "publication",
  "findMany",
)({
  include: {
    tags: true,
    venue: true,
    authors: {
      include: {
        member: true,
      },
    },
    resources: true,
  },
  orderBy: {
    time: "desc",
  },
});
