/**
 * Re-mounts on every navigation, so each route fades and lifts in. Plain CSS
 * (see .page-in) rather than a JS animation: the server-rendered page must
 * never wait on hydration to become visible.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
