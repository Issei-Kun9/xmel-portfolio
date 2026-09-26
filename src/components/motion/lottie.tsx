"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "motion/react";

/**
 * Self-hosted dotLottie from /public/lottie. Pauses off-screen (the player's
 * freezeOnOffscreen default) and holds still for reduced-motion visitors.
 */
export default function Lottie({
  name,
  className = "w-16 h-16",
  loop = true,
  speed = 1,
}: {
  name: string;
  className?: string;
  loop?: boolean;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={className} aria-hidden="true">
      <DotLottieReact
        src={`/lottie/${name}.lottie`}
        autoplay={!reduce}
        loop={loop && !reduce}
        speed={speed}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
