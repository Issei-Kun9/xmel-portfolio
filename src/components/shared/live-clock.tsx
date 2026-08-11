"use client";

import { useEffect, useRef } from "react";

export default function LiveClock() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const now = new Date();
      ref.current.textContent = `${new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)} IST`;
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span ref={ref} />;
}
