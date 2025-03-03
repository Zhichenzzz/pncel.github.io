import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import { metadataTmpl } from "@/data/metadata";
import { getAllMemberIds, getMember, getMemberMdxSrc } from "@/data/member";
import { getPubsByPerson } from "@/data/pub";
import { composeFullName, composeHeadshotPlaceholder } from "@/data/person";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faGlobe,
  faQuoteLeft,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faXTwitter,
  faFacebook,
  faInstagram,
  faGoogleScholar,
  faOrcid,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import PubList, { PubListFootnote } from "@/components/pubList";
import DefaultMDX from "@/layouts/defaultMdx";
import DefaultMain from "@/layouts/defaultMain";
import Link from "next/link";
config.autoAddCss = false;

interface Params {
  params: {
    memberId: string;
  };
}

export async function generateStaticParams() {
  const memberIds = await getAllMemberIds();
  return memberIds;
}

export async function generateMetadata({ params: { memberId } }: Params) {
  const member = await getMember(memberId);
  const fullname = composeFullName(member.person!);
  return {
    ...metadataTmpl,
    title: metadataTmpl.title + " | Team | " + (fullname || memberId),
  };
}

export default async function MemberPage({ params: { memberId } }: Params) {
  const member = await getMember(memberId);
  const mdxSrc = await getMemberMdxSrc(memberId);
  const pubs = await getPubsByPerson(member.person!.id, memberId);

  const {
    position,
    email,
    office,
    gscholar,
    orcid,
    github,
    linkedin,
    twitter,
    facebook,
    instagram,
    youtube,
  } = member;
  const { firstname, lastname, externalLink, avatar } = member.person!;
  const fullname = composeFullName(member.person!);
  const placeholder = composeHeadshotPlaceholder(member.person!);

  return (
    <DefaultMain className="flex flex-col lg:flex-row gap-2 lg:gap-6">
      {/* let's have a sticky sidebar for avatar and contact info */}
      {/* sidebar becomes a normal section on top of page on small screens */}
      <div
        className={
          /* as the element in the parent flex container */
          "self-start flex-none " +
          /* flex container */
          "flex justify-start items-center content-center py-4 " +
          "flex-row lg:flex-col gap-4 lg:gap-2 " +
          /* put on top for small screens; sticky for large screens */
          "w-full lg:w-[200px] " +
          "lg:sticky lg:top-0 lg:overflow-y-auto "
        }
      >
        <div
          className={
            "flex-none self-start lg:self-center w-36 h-36 lg:w-48 lg:h-48 " +
            "rounded-2xl ring ring-neutral overflow-clip"
          }
        >
          {avatar ? (
            <div className="avatar w-full h-full">
              <Image
                className="m-0"
                width={512}
                height={512}
                src={avatar}
                alt={fullname}
                objectFit="cover"
              ></Image>
            </div>
          ) : (
            <div className="avatar placeholder bg-base-300 w-full h-full">
              <span className="text-3xl text-base-content m-auto">
                {placeholder}{" "}
              </span>
            </div>
          )}
        </div>
        <div className="max-lg:flex-grow">
          <p className="text-lg font-bold lg:text-center text-left">
            {fullname}
          </p>
          {position && <p className="lg:text-center text-left">{position}</p>}
          {office && (
            <p className="lg:text-center text-left">
              <FontAwesomeIcon icon={faLocationDot} />
              &nbsp;
              {office}
            </p>
          )}
          {email && (
            <p className="lg:text-center text-left">
              <a href={"mailto:" + email}>
                <FontAwesomeIcon icon={faEnvelope} />
                &nbsp;
                {email.replaceAll("@", " (at) ")}
              </a>
            </p>
          )}
          {(externalLink ||
            gscholar ||
            orcid ||
            github ||
            linkedin ||
            twitter ||
            facebook ||
            instagram ||
            youtube) && (
            <div
              className={
                "flex flex-row w-full flex-wrap gap-x-2 gap-y-0 " +
                "justify-start lg:justify-center items-center content-center text-lg"
              }
            >
              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  className="tooltip"
                  data-tip="Personal Website"
                >
                  <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>
                </a>
              )}
              {gscholar && (
                <a
                  href={gscholar}
                  target="_blank"
                  className="tooltip"
                  data-tip="Google Scholar"
                >
                  <FontAwesomeIcon icon={faGoogleScholar}></FontAwesomeIcon>
                </a>
              )}
              {orcid && (
                <a
                  href={orcid}
                  target="_blank"
                  className="tooltip"
                  data-tip="ORCiD"
                >
                  <FontAwesomeIcon icon={faOrcid}></FontAwesomeIcon>
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  className="tooltip"
                  data-tip="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  className="tooltip"
                  data-tip="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  className="tooltip"
                  data-tip="X (Twitter)"
                >
                  <FontAwesomeIcon icon={faXTwitter}></FontAwesomeIcon>
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  className="tooltip"
                  data-tip="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  className="tooltip"
                  data-tip="Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  className="tooltip"
                  data-tip="Youtube"
                >
                  <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                </a>
              )}
            </div>
          )}
        </div>
        <div className="divider max-lg:hidden"></div>
        <ul className="menu w-full max-lg:hidden">
          <li>
            <Link href="#personal-statement">
              <FontAwesomeIcon icon={faQuoteLeft} /> Personal Statement
            </Link>
          </li>
          {pubs.length > 0 && (
            <li>
              <Link href="#selected-publications">
                <FontAwesomeIcon icon={faBook} /> Selected Publications
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="flex-grow min-w-0 lg:max-w-screen-sm xl:max-w-screen-md 2xl:max-w-screen-lg lg:py-4">
        <DefaultMDX>
          <h2 id="personal-statement">
            <FontAwesomeIcon icon={faQuoteLeft} /> Personal Statement
          </h2>
          <div className="pl-4">
            <MDXRemote
              source={mdxSrc || "This person is busy changing the world..."}
              components={useMDXComponents({})}
            />
          </div>
        </DefaultMDX>
        {pubs.length > 0 && (
          <>
            <div className="divider"></div>
            <DefaultMDX className="py-4">
              <h2 id="selected-publications">
                <FontAwesomeIcon icon={faBook} /> Selected Publications
              </h2>
            </DefaultMDX>
            <div className="pl-4">
              <PubList pubs={pubs} highlightedPersonId={member.person!.id} />
              <PubListFootnote />
            </div>
          </>
        )}
      </div>
    </DefaultMain>
  );
}
