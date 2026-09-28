import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * A browser-only value (cookie, URL, media query) read during render:
 * `server` on the server and during hydration, the real value right after.
 * Replaces the "setState in a mount effect" pattern without a mismatch or an
 * extra render pass. `get` must return a primitive (compared with Object.is).
 */
export function useClientValue<T extends string | number | boolean>(get: () => T, server: T): T {
  return useSyncExternalStore(subscribe, get, () => server);
}
