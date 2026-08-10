"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    setHref(`mailto:${email}`);
  }, [email]);

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
