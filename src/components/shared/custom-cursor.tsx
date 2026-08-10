"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor='pointer']");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) setIsHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      if (!isInteractive(related)) setIsHovering(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: isHovering ? 48 : 8,
          height: isHovering ? 48 : 8,
          backgroundColor: isHovering ? "var(--accent)" : "var(--text-primary)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="rounded-full"
        style={{ opacity: isHovering ? 0.8 : 1 }}
      />
    </motion.div>
  );
}
