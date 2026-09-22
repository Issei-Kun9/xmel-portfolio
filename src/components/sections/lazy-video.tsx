"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying video that doesn't download until it's about to scroll into
 * view. A plain `autoPlay` video fetches immediately on page load, even far
 * below the fold, which slowed the homepage on mobile.
 */
export default function LazyVideo({
  src,
  poster,
  label,
  width,
  height,
}: {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        video.src = src;
        if (!reduceMotion) void video.play().catch(() => {});
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      width={width}
      height={height}
      controls={false}
      className="w-full h-auto"
      aria-label={label}
    />
  );
}
