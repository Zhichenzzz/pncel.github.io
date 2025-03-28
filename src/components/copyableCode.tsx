"use client";
import React, { Children, Ref, useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const nodeToString = (node?: React.ReactNode): string => {
  if (
    typeof node === "undefined" ||
    node === null ||
    typeof node === "boolean"
  ) {
    return "";
  }

  if (JSON.stringify(node) === "{}") {
    return "";
  }

  return (node as number | string).toString();
};

const childrenToString = (
  children: React.ReactNode | React.ReactNode[],
): string => {
  if (!(children instanceof Array) && !React.isValidElement(children)) {
    return nodeToString(children);
  }

  let text = "";
  Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.children) {
      text = text + childrenToString(child.props.children);
    } else if (!React.isValidElement(child)) {
      text = text + nodeToString(child);
    }
  });

  return text;
};

export default function CopyableCode({
  children,
  className,
  forwardRef,
  addlOnBlur,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  forwardRef?: Ref<HTMLDivElement>;
  addlOnBlur?: (evt: React.FocusEvent<HTMLDivElement, Element>) => void;
}>) {
  const [showCopyBtn, setShowCopyBtn] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div
      tabIndex={-1}
      className={className}
      ref={forwardRef}
      style={{ position: "relative" }}
      onMouseEnter={() => setShowCopyBtn(true)}
      onMouseLeave={() => setShowCopyBtn(false)}
      onFocus={() => setShowCopyBtn(true)}
      onBlur={(evt) => {
        if (!evt.currentTarget.contains(evt.relatedTarget)) {
          setShowCopyBtn(false);
          addlOnBlur && addlOnBlur(evt);
        }
      }}
    >
      <button
        className="btn btn-sm absolute"
        style={{
          position: "absolute",
          top: "0.5em",
          right: "0.5em",
          display: showCopyBtn || copied ? "block" : "none",
        }}
        onClick={() => {
          if (!copied) {
            navigator.clipboard.writeText(childrenToString(children));
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }
        }}
      >
        {copied ? (
          <>
            <FontAwesomeIcon icon={faClipboardCheck}></FontAwesomeIcon> &nbsp;
            copied!
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faClipboard}></FontAwesomeIcon> &nbsp; copy
          </>
        )}
      </button>
      <pre className="h-full" style={{ overflowX: "auto" }}>
        {children}
      </pre>
    </div>
  );
}
