"use client";

import { useState } from "react";

interface MailtoLinkProps {
  email: string;
  className?: string;
  children?: React.ReactNode;
}

export default function MailtoLink({
  email,
  className,
  children,
}: MailtoLinkProps) {
  const [href, setHref] = useState<string>("");

  return (
    <a
      href={href || undefined}
      onClick={(e) => {
        if (!href) {
          e.preventDefault();
          setHref(`mailto:${email}`);
        }
      }}
      className={className}
    >
      {children ?? email}
    </a>
  );
}
