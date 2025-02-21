import type { MDXComponents } from "mdx/types";
import React, { Children } from "react";
import CopyableCode from "./components/copyableCode";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: ({ children }) => {
      if (
        Children.only(children) &&
        Children.map(
          children,
          (child) => React.isValidElement(child) && child.type === "code",
        )?.every((i) => i)
      ) {
        return <CopyableCode>{children}</CopyableCode>;
      } else {
        return <pre>{children}</pre>;
      }
    },
    h1: ({ id, children }) => {
      return (
        <Link href={`#${id}`} className="link-hover">
          <h1 id={id}>{children}</h1>
        </Link>
      );
    },
    h2: ({ id, children }) => {
      return (
        <Link href={`#${id}`} className="link-hover">
          <h2 id={id}>{children}</h2>
        </Link>
      );
    },
    h3: ({ id, children }) => {
      return (
        <Link href={`#${id}`} className="link-hover">
          <h3 id={id}>{children}</h3>
        </Link>
      );
    },
    h4: ({ id, children }) => {
      return (
        <Link href={`#${id}`} className="link-hover">
          <h4 id={id}>{children}</h4>
        </Link>
      );
    },
    h5: ({ id, children }) => {
      return (
        <Link href={`#${id}`} className="link-hover">
          <h5 id={id}>{children}</h5>
        </Link>
      );
    },
    h6: ({ id, children }) => {
      return (
        <Link href={`#${id}`} className="link-hover">
          <h6 id={id}>{children}</h6>
        </Link>
      );
    },
    ...components,
  };
}
