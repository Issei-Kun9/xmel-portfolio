"use client";

import { useClientValue } from "@/lib/use-client-value";

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
  // As before, the mailto: href is only added in the browser, not in the
  // server-rendered HTML.
  const hydrated = useClientValue(() => true, false);

  return (
    <a href={hydrated ? `mailto:${email}` : undefined} className={className}>
      {children ?? email}
    </a>
  );
}
