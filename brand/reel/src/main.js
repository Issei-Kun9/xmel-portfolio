import * as THREE from "three";
import { createEngine, loadFonts } from "./core.js";
import { buildDirector } from "./director.js";

const params = new URLSearchParams(location.search);
const W = Number(params.get("w") || 1080);
const H = Number(params.get("h") || 1920);

window.XMEL = {
  ready: (async () => {
    await loadFonts();
    const engine = createEngine({ width: W, height: H, fps: 30 });
    engine.director = await buildDirector(engine, { variant: params.get("v") || "us" });
    window.XMEL.engine = engine;
    return true;
  })(),
  frame: (n, s) => window.XMEL.engine.frame(n, s),
};
