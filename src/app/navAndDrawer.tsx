"use client";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavAndDrawer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  interface NavDataSubType {
    title: string;
    target: string;
  }

  interface NavDataType {
    title: string;
    target: string | null;
    sub: NavDataSubType[];
  }

  const navData: NavDataType[] = [
    { title: "News", target: "/news", sub: [] },
    { title: "Blogs", target: "/blogs", sub: [] },
    {
      title: "Projects",
      target: null,
      sub: [{ title: "All Projects", target: "/projects" }],
    },
    { title: "Publications", target: "/pubs", sub: [] },
    { title: "Team", target: "/team", sub: [] },
  ];

  const pathname = usePathname();
  const [isSideBarOpen, setIsSetBarOpen] = useState(false);
  const [activeNavSub, setActiveNavSub] = useState<string | null>(null);

  useEffect(() => {
    setIsSetBarOpen(false);
    setActiveNavSub(null);
  }, [pathname]);

  return (
    <body className="drawer">
      <input
        id="navDrawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isSideBarOpen}
        onChange={() => {}}
      />
      <div className="drawer-content bg-base-100 text-base-content flex flex-col min-h-screen">
        <div className="bg-base-300 w-full">
          <nav className="navbar justify-between mx-auto max-w-screen-2xl">
            <div className="flex grow flex-row justify-start gap-1">
              <div className="flex-none">
                <Link className="btn btn-ghost text-xl" href="/">
                  PᴺCEL
                </Link>
              </div>
              {navData.length > 0 && (
                <button
                  className="flex-none lg:hidden tooltip tooltip-bottom btn btn-square btn-ghost"
                  data-tip="Open sidebar"
                  onClick={() => setIsSetBarOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              )}
              {navData.length > 0 && (
                <div className="flex-auto hidden lg:flex">
                  <ul className="menu menu-horizontal px-1">
                    {navData.map((item) => {
                      return (
                        <li key={item.title}>
                          {item.sub.length > 0 ? (
                            <details
                              className="z-20"
                              open={activeNavSub === item.title}
                            >
                              <summary
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (activeNavSub === item.title) {
                                    setActiveNavSub(null);
                                  } else {
                                    setActiveNavSub(item.title);
                                  }
                                }}
                              >
                                {item.title}
                              </summary>
                              <ul className="bg-base-300 rounded-t-none">
                                {item.sub.map((i) => (
                                  <li key={i.title}>
                                    <Link
                                      href={i.target}
                                      className="text-nowrap"
                                    >
                                      {i.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : item.target === null ? (
                            item.title
                          ) : (
                            <Link href={item.target}>{item.title}</Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex pr-2 gap-1">
              <div className="form-control hidden lg:flex">
                <input
                  disabled
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-64"
                />
              </div>
              <button className="btn btn-ghost btn-disabled lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <ThemeToggle></ThemeToggle>
            </div>
          </nav>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <div
          className="drawer-overlay"
          onClick={() => setIsSetBarOpen(false)}
        ></div>
        <ul className="menu p-4 w-64 min-h-full bg-base-300">
          {navData.map((item) => (
            <li key={item.title}>
              {item.target ? (
                <>
                  <Link href={item.target}>{item.title}</Link>
                  {item.sub.length > 0 && (
                    <ul>
                      {item.sub.map((i) => (
                        <li key={i.title}>
                          <Link href={i.target}>{i.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : item.sub.length > 0 ? (
                <details open>
                  <summary>{item.title}</summary>
                  <ul>
                    {item.sub.map((i) => (
                      <li key={i.title}>
                        <Link href={i.target}>{i.title}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <h2 className="menu-title">{item.title}</h2>
              )}
            </li>
          ))}
        </ul>
      </div>
    </body>
  );
}
