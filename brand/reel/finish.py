"""Mux picture + score and cut the deliverables.

python3 finish.py us   → out/deliver/XMEL_TheGap_30s_9x16_us.mp4, _15s_, _6s_
"""
import subprocess
import sys
import os
import imageio_ffmpeg

FF = imageio_ffmpeg.get_ffmpeg_exe()
v = sys.argv[1] if len(sys.argv) > 1 else "us"
src, wav = f"out/reel_{v}_silent.mp4", "out/score.wav"
os.makedirs("out/deliver", exist_ok=True)
base = f"out/deliver/XMEL_TheGap"
ENC = ["-c:v", "libx264", "-preset", "slow", "-crf", "18", "-maxrate", "20M", "-bufsize", "40M", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "256k", "-movflags", "+faststart"]


def run(args):
    subprocess.run([FF, "-y", "-loglevel", "error", *args], check=True)


# 30s master, capped at 20 Mbps so platforms don't re-crush it on upload.
run(["-i", src, "-i", wav, "-map", "0:v", "-map", "1:a", "-t", "30", *ENC, f"{base}_30s_9x16_{v}.mp4"])


def cut(segs, out):
    """Concatenate [a, b) segments of picture and sound; 40ms audio crossfades hide the joins."""
    f, labels = [], []
    for i, (a, b) in enumerate(segs):
        f.append(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{i}]")
        fade = f"afade=t=in:d=0.02,afade=t=out:st={b - a - 0.04}:d=0.04" if i else f"afade=t=out:st={b - a - 0.04}:d=0.04"
        if i == len(segs) - 1:
            fade = "afade=t=in:d=0.02"
        f.append(f"[1:a]atrim={a}:{b},asetpts=PTS-STARTPTS,{fade}[a{i}]")
        labels.append(f"[v{i}][a{i}]")
    f.append(f"{''.join(labels)}concat=n={len(segs)}:v=1:a=1[v][a]")
    run(["-i", src, "-i", wav, "-filter_complex", ";".join(f), "-map", "[v]", "-map", "[a]", *ENC, out])


# 15s: the gap in 5.6s, the hard stop, the answer, the mark.
cut([(0.0, 5.6), (10.4, 12.0), (18.0, 21.4), (26.6, 30.0)], f"{base}_15s_9x16_{v}.mp4")
# 6s bumper: every time → the mark → close the gap.
cut([(24.0, 30.0)], f"{base}_6s_9x16_{v}.mp4")
print("ok")
