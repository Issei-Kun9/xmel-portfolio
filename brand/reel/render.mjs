// Drives the page frame by frame and pipes JPEGs into ffmpeg (H.264).
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { spawn, execFileSync } from "child_process";
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, "").split("=")));
const W = +(args.w || 1080), H = +(args.h || 1920), fps = 30;
const from = +(args.from || 0), to = +(args.to || 30), out = args.out || "out/test.mp4";
const stills = args.stills ? args.stills.split(",").map(Number) : null;
const FF = execFileSync("python3", ["-c", "import imageio_ffmpeg as f; print(f.get_ffmpeg_exe())"]).toString().trim();
const blur = (t) => { // motion-blur samples per section (fast sections get more)
  if (args.blur) return +args.blur;
  if (t < 2.1 || (t > 6.9 && t < 10.7) || (t > 12 && t < 18.2) || (t > 22.9 && t < 25.1)) return 6;
  return 4;
};
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--disable-gpu-sandbox"] });
const p = await b.newPage({ viewport: { width: 400, height: 400 } });
p.on("console", (m) => (m.type() === "error" || m.type() === "warning") && console.log("[page]", m.text()));
p.on("pageerror", (e) => console.log("[pageerror]", e.message));
await p.goto(`http://localhost:4700/?w=${W}&h=${H}&v=${args.v || "us"}`);
await p.evaluate(() => window.XMEL.ready);
if (stills) {
  const fs = await import("fs");
  for (const t of stills) {
    const n = Math.round(t * fps);
    const d = await p.evaluate(([n, s]) => window.XMEL.frame(n, s), [n, +(args.blur || 1)]);
    fs.writeFileSync(`${args.dir || "out/stills"}/f_${t.toFixed(2)}.jpg`, Buffer.from(d.split(",")[1], "base64"));
    console.log("still", t);
  }
  await b.close(); process.exit(0);
}
const ff = spawn(FF, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-c:v", "mjpeg", "-i", "-", "-vf", "vignette=PI/5,noise=alls=6:allf=t+u", "-c:v", "libx264", "-preset", "slow", "-crf", "15", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
const t0 = Date.now();
for (let n = Math.round(from * fps); n < Math.round(to * fps); n++) {
  const d = await p.evaluate(([n, s]) => window.XMEL.frame(n, s), [n, blur(n / fps)]);
  if (!ff.stdin.write(Buffer.from(d.split(",")[1], "base64"))) await new Promise((r) => ff.stdin.once("drain", r));
  if (n % 30 === 0) console.log(`frame ${n} ${(n / fps).toFixed(1)}s  ${((Date.now() - t0) / 1000).toFixed(0)}s elapsed`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await b.close();
console.log("done", out, ((Date.now() - t0) / 1000).toFixed(0) + "s");
