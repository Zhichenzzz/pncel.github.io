import React from "react";

export default function DefaultMain({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={
        "flex-grow flex-shrink-0 basis-auto mx-auto py-4 max-lg:px-4 " +
        "w-full max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl " +
        className
      }
    >
      {children}
    </div>
  );
}
