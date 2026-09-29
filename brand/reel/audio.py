"""Procedural sound design + score for THE GAP (30s, 48kHz stereo).

Everything is synthesised: no samples. Act I–III sit on a minor drone with a
clock that accelerates; the chime is an unresolved tritone. 10.6s is true
silence. From 12.0 the score is 120 BPM in D major, the chime resolves to a
major third, and every node that lights plays a note of the arpeggio.
Usage: python3 audio.py out/score.wav
"""
import sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)


def t_(d):
    return np.arange(int(d * SR)) / SR


def place(sig, at, gain=1.0, pan=0.0):
    """Add a mono (or (2,n) stereo) signal at time `at` with equal-power pan."""
    i = int(at * SR)
    if sig.ndim == 1:
        a = (pan + 1) * np.pi / 4
        l, r = sig * np.cos(a) * 1.414, sig * np.sin(a) * 1.414
    else:
        l, r = sig
    n = min(len(l), N - i)
    if n <= 0:
        return
    L[i:i + n] += l[:n] * gain
    R[i:i + n] += r[:n] * gain


def filt(x, kind, f, order=2):
    sos = butter(order, f, btype=kind, fs=SR, output="sos")
    return sosfilt(sos, x)


def env(n, a=0.005, d=0.3, curve=1.0):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / d) ** curve
    return e


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


# ── Instruments ────────────────────────────────────────────────────────────
def bell(f, d=2.5, bright=1.0):
    t = t_(d)
    parts = [(1, 1, 1.0), (2.76, 0.5 * bright, 0.55), (5.4, 0.25 * bright, 0.3), (8.93, 0.12 * bright, 0.18), (0.5, 0.2, 1.2)]
    s = sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t / (d * dd * 0.35)) for r, a, dd in parts)
    return s * env(len(t), 0.002, d)


def sub_hit(f0=58, f1=34, d=1.2, click=0.6):
    t = t_(d)
    f = f1 + (f0 - f1) * np.exp(-t * 18)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t / (d * 0.35))
    c = filt(rng.standard_normal(len(t)), "high", 1800) * np.exp(-t * 180) * click
    return np.tanh(1.6 * (s + c))


def noise_burst(d=0.25, lo=300, hi=9000, decay=18):
    t = t_(d)
    n = filt(filt(rng.standard_normal(len(t)), "high", lo), "low", hi)
    return n * np.exp(-t * decay)


def glitch(d=0.12, seed=0):
    r = np.random.default_rng(seed)
    t = t_(d)
    s = np.zeros(len(t))
    k = 0
    while k < len(t):
        seglen = int(r.uniform(0.004, 0.02) * SR)
        f = r.choice([220, 440, 880, 1760, 3520]) * r.uniform(0.9, 1.1)
        seg = np.sign(np.sin(2 * np.pi * f * np.arange(seglen) / SR)) * r.uniform(0.2, 0.7)
        if r.random() < 0.35:
            seg = r.standard_normal(seglen) * 0.5
        s[k:k + seglen] = seg[: len(s) - k]
        k += seglen
    return filt(s, "high", 200) * np.exp(-t * 10)


def buzz(d=0.42):
    """Phone vibrate: a 150Hz motor, amplitude-chopped, with a table rattle."""
    t = t_(d)
    motor = np.sign(np.sin(2 * np.pi * 150 * t)) * 0.5 + np.sin(2 * np.pi * 300 * t) * 0.3
    chop = (np.sin(2 * np.pi * 11 * t) > -0.2).astype(float)
    rattle = filt(rng.standard_normal(len(t)), "band", [900, 2600]) * 0.25
    s = filt(motor + rattle, "low", 3500) * chop
    return s * env(len(t), 0.01, 0.6)


def whoosh(d=0.6, up=True, lo=200, hi=6000):
    t = t_(d)
    n = rng.standard_normal(len(t))
    out = np.zeros(len(t))
    blocks = 24
    for b in range(blocks):
        a, z = b * len(t) // blocks, (b + 1) * len(t) // blocks
        p = b / (blocks - 1)
        fc = lo * (hi / lo) ** (p if up else 1 - p)
        out[a:z] = filt(n, "band", [fc * 0.7, min(fc * 1.4, SR / 2 - 100)])[a:z]
    shape = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2 if not up else (t / d) ** 2.2
    return out * shape


def tick(f=3200, d=0.03):
    t = t_(d)
    return np.sin(2 * np.pi * f * t) * np.exp(-t * 260) + filt(rng.standard_normal(len(t)), "high", 4000) * np.exp(-t * 400) * 0.4


def pluck(f, d=0.9, bright=0.6):
    t = t_(d)
    s = sum((0.6 ** k) * np.sin(2 * np.pi * f * (k + 1) * t) * np.exp(-t * (3 + k * 4 / bright)) for k in range(6))
    return s * env(len(t), 0.002, d)


def pad(freqs, d, a=0.4, rel=0.6, cutoff=1800, detune=0.004):
    t = t_(d)
    s = np.zeros(len(t))
    for f in freqs:
        for dt in (-detune, 0, detune):
            ph = rng.uniform(0, 1)
            saw = 2 * ((f * (1 + dt) * t + ph) % 1) - 1
            s += saw
    s = filt(s / (len(freqs) * 3), "low", cutoff, 2)
    e = np.minimum(1, t / a) * np.minimum(1, (d - t) / rel)
    return s * np.clip(e, 0, 1)


def kick(d=0.45):
    return sub_hit(140, 46, d, click=0.35) * 0.9


def hat(d=0.06):
    t = t_(d)
    return filt(rng.standard_normal(len(t)), "high", 7000) * np.exp(-t * 70)


def reverb(x, d=2.4, wet=0.25, seed=3):
    r = np.random.default_rng(seed)
    t = t_(d)
    irs = []
    for c in range(2):
        ir = r.standard_normal(len(t)) * np.exp(-t * 6.9 / d)
        ir = filt(ir, "low", 6000)
        irs.append(ir / np.sqrt(np.sum(ir ** 2)))
    return np.stack([fftconvolve(x, irs[c])[: len(x)] for c in range(2)]) * wet


# ── ACT I–III: the gap (0–10.6) ────────────────────────────────────────────
place(buzz(), 0.0, 0.55)
place(buzz(0.3), 0.55, 0.35)
# unresolved chime: E5 + A#5 (tritone)
place(bell(midi(76), 2.0) + bell(midi(82), 2.0) * 0.7, 0.1, 0.18, -0.2)

# minor drone that thickens toward the overload
drone_t = t_(10.6 - 0.1)
dr = pad([midi(38), midi(45), midi(50), midi(53)], 10.5, a=1.5, rel=0.05, cutoff=500)
swell = 0.25 + 0.75 * (drone_t / drone_t[-1]) ** 2
cut = filt(dr, "low", 900) * swell
place(cut, 0.1, 0.35)
# sub rumble
rum = filt(rng.standard_normal(len(drone_t)), "low", 70) * swell * 1.4
place(rum, 0.1, 0.4)

# the clock: the counter ticks, accelerating with the overload
tt = 0.3
while tt < 10.4:
    place(tick(2600 if int(tt * 4) % 2 else 3200), tt, 0.12 + 0.1 * tt / 10.4, 0.3)
    tt += 0.5 if tt < 7 else max(0.07, 0.25 - (tt - 7) * 0.05)

# slams: each word lands on a sub hit + transient
slams = [(0.35, 1.0), (2.0, 0.7), (2.6, 0.85), (3.2, 0.7), (3.8, 0.85), (4.4, 0.7), (5.0, 0.6), (5.75, 0.7)]
for at, g in slams:
    place(sub_hit(), at, 0.55 * g)
    place(noise_burst(0.18, 800, 12000, 30), at, 0.12 * g)
for at in (0.35, 2.6, 3.8):
    place(glitch(0.1, int(at * 10)), at, 0.18, 0.4)
# ringing phone (2.0–2.6): two short rings
for k in range(2):
    t = t_(0.24)
    ring = (np.sin(2 * np.pi * 1400 * t) + np.sin(2 * np.pi * 1760 * t)) * (np.sin(2 * np.pi * 20 * t) > 0) * env(len(t), 0.005, 0.5)
    place(ring, 2.02 + k * 0.3, 0.07, -0.3)
# send whoosh for "they messaged", fall for "forgotten"
place(whoosh(0.35, up=True, lo=800, hi=7000), 2.95, 0.1, 0.3)
place(whoosh(0.7, up=False, lo=150, hi=3000), 5.2, 0.22, -0.2)
# the thread snaps: a bright twang that drops in pitch
t = t_(1.2)
tw = np.sin(2 * np.pi * np.cumsum(1200 * np.exp(-t * 3) + 180) / SR) * np.exp(-t * 4)
place(tw * 0.5, 6.25, 0.2, 0.2)
place(noise_burst(0.12, 3000, 16000, 45), 6.25, 0.25, 0.2)
place(sub_hit(70, 30, 1.5), 6.25, 0.35)

# overload: a stutter on every cut, words hit harder, a riser to the implosion
for c in range(12):
    at = 7.0 + c * 0.283
    place(glitch(0.09, 100 + c), at, 0.16, [-0.6, 0.6][c % 2])
    place(noise_burst(0.08, 1500, 12000, 60), at, 0.1, [0.5, -0.5][c % 2])
    if c in (2, 5, 8, 10):
        place(sub_hit(62, 32, 0.9), at, 0.5)
riser = whoosh(3.4, up=True, lo=150, hi=9000)
t = t_(3.4)
riser += np.sin(2 * np.pi * np.cumsum(80 + 900 * (t / 3.4) ** 3) / SR) * (t / 3.4) ** 3 * 0.4
place(riser, 7.0, 0.3)
# implosion: reverse suck into a hard cut at 10.6
t = t_(0.5)
suck = filt(rng.standard_normal(len(t)), "band", [300, 6000]) * (t / 0.5) ** 4
place(suck, 10.1, 0.5)
# hard stop — hold total silence 10.6–11.4 (enforced after mixing)

# the rewind (11.4–12.0): tape spooling back, ticks racing
t = t_(0.6)
spool = filt(rng.standard_normal(len(t)), "band", [600, 3000]) * (0.2 + (t / 0.6)) * np.sin(2 * np.pi * np.cumsum(20 + 180 * t / 0.6) / SR) ** 2
place(spool, 11.4, 0.25)
k = 0.0
while k < 0.6:
    place(tick(4200, 0.015), 11.4 + k, 0.1, 0.0)
    k += max(0.02, 0.12 - k * 0.18)

# ── ACT IV–VI: the system, 120 BPM in D major (12–30) ─────────────────────
BEAT = 0.5
place(sub_hit(90, 38, 2.2, click=0.9), 12.0, 0.7)  # ignition
place(noise_burst(0.35, 2000, 14000, 10), 12.0, 0.18)  # match strike
# resolved chime: D6 + F#6 (major third), echoes the unresolved one
place(bell(midi(86), 2.8) + bell(midi(90), 2.8) * 0.7, 12.02, 0.14, 0.2)

prog = [  # (start, chord midi, length)
    (12.0, [50, 57, 62, 66], 2.0),   # D
    (14.0, [47, 54, 62, 66], 2.0),   # Bm
    (16.0, [43, 55, 59, 62], 2.0),   # G
    (18.0, [45, 57, 61, 64], 2.0),   # A
    (20.0, [50, 57, 62, 66], 2.0),   # D
    (22.0, [47, 54, 59, 62], 1.0),   # Bm
    (23.0, [43, 55, 59, 62], 2.0),   # G
    (25.0, [45, 57, 61, 64], 1.6),   # A (breath)
    (26.6, [50, 57, 62, 66, 69], 3.4),  # D — the mark
]
for at, ch, d in prog:
    place(pad([midi(m) for m in ch], d + 0.5, a=0.25, rel=0.5, cutoff=2400 if at < 26 else 3200), at, 0.16)
    place(pad([midi(ch[0] - 12)], d + 0.3, a=0.02, rel=0.3, cutoff=200), at, 0.25)

# drums: in at 12.5, out for the crane (15.4–16.4) and the breath (25–26.6)
b = 12.5
while b < 28.4:
    quiet = 15.4 <= b < 16.4 or 25.0 <= b < 26.6
    if not quiet:
        place(kick(), b, 0.45)
        place(hat(), b + BEAT / 2, 0.06, 0.35)
        if b >= 18.0:
            place(hat(0.03), b + BEAT / 4, 0.03, -0.35)
            place(hat(0.03), b + 3 * BEAT / 4, 0.03, -0.35)
    b += BEAT

# arpeggio: every node that lights plays the next note
nodes = [12.0, 12.9, 13.6, 14.2, 14.3, 14.6, 14.9, 15.3]
arp = [62, 66, 69, 74, 73, 71, 76, 78]
for i, (at, m) in enumerate(zip(nodes, arp)):
    place(pluck(midi(m), 1.2), at, 0.2, [-0.4, 0.4][i % 2])
    place(bell(midi(m + 12), 1.0, 0.5), at, 0.04, [0.4, -0.4][i % 2])
# system log clicks
for at in nodes:
    place(tick(5200, 0.012), at + 0.02, 0.08, -0.6)
# crane swell + dive
place(whoosh(1.0, up=True, lo=300, hi=5000), 15.4, 0.12)
place(whoosh(1.45, up=True, lo=200, hi=9000), 16.55, 0.22)

# ACT V: the same night, answered
place(bell(midi(86), 1.6) + bell(midi(90), 1.6) * 0.7, 18.0, 0.12, 0.2)
for k in range(5):  # soft typing dots
    place(tick(2400, 0.02), 18.3 + k * 0.17, 0.05, 0.3)
place(whoosh(0.25, up=True, lo=1000, hi=8000), 19.0, 0.08, 0.3)
place(sub_hit(80, 36, 1.6), 19.2, 0.6)  # 42s
place(bell(midi(81), 2.0) + bell(midi(86), 2.0) * 0.6, 19.2, 0.12)
for i, at in enumerate([19.7, 19.87, 20.03]):  # chips
    place(pluck(midi([74, 78, 81][i]), 0.5, 1.0), at, 0.12, [-0.3, 0, 0.3][i])
place(sub_hit(), 19.62, 0.25)
place(tick(1800, 0.04), 21.02, 0.3)  # slot locks
place(sub_hit(70, 36, 1.0), 20.98, 0.45)
place(whoosh(0.42, up=True, lo=200, hi=5000), 21.4, 0.15)
place(tick(1500, 0.05), 21.82, 0.35)  # row locks
place(sub_hit(66, 34, 0.9), 21.82, 0.35)
place(bell(midi(78), 2.2, 0.4), 22.28, 0.07, -0.2)  # morning
for i in range(8):  # board cards move on the beat
    for st in range(3):
        at = 23.25 + i * 0.125 + st * 0.5
        if at < 25.0:
            place(tick(2800 + 300 * st, 0.02), at, 0.05, [-0.5, 0.5][i % 2])
place(sub_hit(), 23.05, 0.35)
place(sub_hit(), 24.0, 0.4)

# ACT VI: the breath, then the mark
t = t_(1.6)
shimmer = sum(np.sin(2 * np.pi * midi(m) * t) * (0.5 + 0.5 * np.sin(2 * np.pi * (3 + i) * t)) for i, m in enumerate([86, 90, 93])) / 3
place(shimmer * (t / 1.6) ** 1.5, 25.0, 0.08)
place(whoosh(1.55, up=True, lo=200, hi=12000), 25.05, 0.2)
place(sub_hit(100, 32, 3.0, click=1.0), 26.6, 0.9)  # the impact
place(noise_burst(2.2, 3000, 16000, 1.6), 26.6, 0.1)
place(bell(midi(74), 3.4) + bell(midi(78), 3.4) * 0.8 + bell(midi(81), 3.4) * 0.6, 26.6, 0.14)
place(sub_hit(70, 34, 1.4), 28.45, 0.45)  # CLOSE THE GAP.
place(bell(midi(86), 1.6) + bell(midi(90), 1.6) * 0.7, 28.9, 0.1, 0.2)  # final resolved chime

# ── Master ────────────────────────────────────────────────────────────────
dry = np.stack([L, R])
wet = reverb((L + R) / 2, 2.6, 0.22)
mix = dry + wet
# true silence at the hard stop, with 5ms edges
a, z = int(10.6 * SR), int(11.4 * SR)
ramp = int(0.005 * SR)
mix[:, a:z] = 0
mix[:, a - ramp:a] *= np.linspace(1, 0, ramp)
mix = filt(mix, "high", 28)
peak = np.max(np.abs(mix))
mix = np.tanh(mix / peak * 1.6) / np.tanh(1.6) * 0.89
wavfile.write(sys.argv[1] if len(sys.argv) > 1 else "out/score.wav", SR, (mix.T * 32767).astype(np.int16))
print("ok", mix.shape)
