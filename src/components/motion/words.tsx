import type { CSSProperties } from "react";

/** Wraps each word so it can rise in on its own beat (see `.word` in globals.css). */
export default function Words({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="word" style={{ "--w": start + i } as CSSProperties}>
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}
