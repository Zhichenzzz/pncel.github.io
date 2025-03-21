import {
  Tag as _Tag,
  Person as _Person,
  Member as _Member,
  Venue as _Venue,
  PubResource as _PubResource,
  Publication as _Publication,
  Team as _Team,
  Group as _Group,
  Project as _Project,
} from "@prisma/client";

import {
  TagType,
  MemberRole,
  VenueType,
  LinkIcon,
  PubType,
  NewsType,
} from "./enums";

export type Tag = Omit<_Tag, "type"> & {
  type: TagType;
  pubs?: Publication[];
};

export type Person = _Person & {
  member?: Member | null;
  pubs?: Publication[];
  teams?: Team[];
};

export type Member = Omit<_Member, "role"> & {
  role: MemberRole;
  person?: Person | null;
  selectedPubs?: Publication[];
  projects?: Project[];
};

export type Venue = Omit<_Venue, "type"> & {
  type: VenueType;
  pubs?: Publication[];
};

export type PubResource = Omit<_PubResource, "icon"> & {
  icon: LinkIcon;
  pub?: Publication | null;
};

export type Publication = Omit<_Publication, "type"> & {
  type: PubType;
  tags?: Tag[];
  authors?: Person[];
  venue?: Venue | null;
  resources?: PubResource[];
  selectedBy?: Member[];
};

export type Team = _Team & {
  members?: Person[];
  group?: Group;
  projects?: Project[];
};

export type Group = _Group & {
  teams?: Team[];
};

export type Project = _Project & {
  members?: Member[];
  teams?: Team[];
};
