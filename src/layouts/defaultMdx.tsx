import React from "react";

export default function DefaultMDX({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={`prose 2xl:prose-lg max-w-full ${className}`}>
      {children}
    </div>
  );
}
