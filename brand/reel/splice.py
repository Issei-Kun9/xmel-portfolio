"""Splice re-rendered shots into a silent master: splice.py master out (startframe:file)..."""
import subprocess, sys, imageio_ffmpeg
FF = imageio_ffmpeg.get_ffmpeg_exe()
master, out, patches = sys.argv[1], sys.argv[2], sorted((int(a), f) for a, f in (p.split(":") for p in sys.argv[3:]))
def nframes(f):
    r = subprocess.run([FF, "-i", f, "-map", "0:v", "-f", "null", "-"], capture_output=True, text=True).stderr
    return int(r.split("frame=")[-1].split()[0])
inputs, parts, cur = ["-i", master], [f"[0:v]split={len(patches) + 1}" + "".join(f"[s{k}]" for k in range(len(patches) + 1))], 0
for k, (start, f) in enumerate(patches):
    inputs += ["-i", f]
    n = nframes(f)
    parts.append(f"[s{k}]trim=start_frame={cur}:end_frame={start},setpts=PTS-STARTPTS[m{k}]")
    parts.append(f"[{k + 1}:v]setpts=PTS-STARTPTS[p{k}]")
    cur = start + n
parts.append(f"[s{len(patches)}]trim=start_frame={cur},setpts=PTS-STARTPTS[tail]")
labels = "".join(f"[m{k}][p{k}]" for k in range(len(patches))) + "[tail]"
parts.append(f"{labels}concat=n={2 * len(patches) + 1}:v=1[v]")
subprocess.run([FF, "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(parts), "-map", "[v]", "-r", "30", "-fps_mode", "cfr", "-c:v", "libx264", "-preset", "slow", "-crf", "10", "-pix_fmt", "yuv420p", out], check=True)
print("ok", out, nframes(out), "frames")
