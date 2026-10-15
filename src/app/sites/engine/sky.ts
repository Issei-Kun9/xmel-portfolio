import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import { ASSET, loadTex } from "./materials";

/** Sun direction in each HDRI's own frame (brightest pixel), measured offline. */
const SUN_TEX = {
  qwantani_sunset_puresky: new THREE.Vector3(0.87, 0.156, 0.468),
  qwantani_dusk_2_puresky: new THREE.Vector3(0.816, 0.252, 0.52),
};
/** Where we want the sun in the world: low in the west-north-west, raking across the lake facade. */
const SUN_AZ = Math.atan2(-0.42, -0.9);

const az = (v: THREE.Vector3) => Math.atan2(v.z, v.x);
/** Y-rotation that carries a texture-space direction to the desired world azimuth (three's convention). */
const rotFor = (v: THREE.Vector3) => az(v) - SUN_AZ;

export async function buildSky(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const names = ["qwantani_sunset_puresky", "qwantani_dusk_2_puresky"] as const;
  const [bgA, bgB] = await Promise.all(names.map((n) => loadTex(`${ASSET}/sky/${n}_bg.webp`, true)));
  for (const t of [bgA, bgB]) { t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping; t.anisotropy = 4; }

  const hdr = new HDRLoader();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envs = await Promise.all(
    names.map(async (n) => {
      const t = await hdr.loadAsync(`${ASSET}/sky/${n}_1k.hdr`);
      t.mapping = THREE.EquirectangularReflectionMapping;
      const rt = pmrem.fromEquirectangular(t);
      t.dispose();
      return rt.texture;
    }),
  );
  pmrem.dispose();

  const rotA = rotFor(SUN_TEX[names[0]]);
  const rotB = rotFor(SUN_TEX[names[1]]);

  const uniforms = {
    uA: { value: bgA },
    uB: { value: bgB },
    uRotA: { value: rotA },
    uRotB: { value: rotB },
    uMix: { value: 0 },
    uNight: { value: 0 },
    uExposure: { value: 1 },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = (modelMatrix * vec4(position, 0.0)).xyz;
        vec4 p = projectionMatrix * viewMatrix * vec4((modelMatrix * vec4(position, 1.0)).xyz, 1.0);
        gl_Position = p.xyww;
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uA, uB; uniform float uRotA, uRotB, uMix, uNight, uExposure;
      varying vec3 vDir;
      vec3 sampleEq(sampler2D t, vec3 d, float r) {
        float c = cos(r), s = sin(r);
        // world -> texture: inverse Y rotation (matches three's envMapRotation)
        vec3 q = vec3(c * d.x - s * d.z, d.y, s * d.x + c * d.z);
        float u = atan(q.z, q.x) / 6.2831853 + 0.5;
        float v = asin(clamp(q.y, -1.0, 1.0)) / 3.1415927 + 0.5;
        return texture2D(t, vec2(u, v)).rgb;
      }
      void main() {
        vec3 d = normalize(vDir);
        vec3 a = sampleEq(uA, d, uRotA);
        vec3 b = sampleEq(uB, d, uRotB);
        vec3 c = mix(a, b, uMix);
        // Night: deep blue, a little lighter toward the horizon.
        vec3 night = mix(vec3(0.010, 0.016, 0.034), vec3(0.035, 0.045, 0.075), pow(1.0 - max(d.y, 0.0), 6.0));
        c = mix(c * uExposure, night, uNight);
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2500, 48, 24), mat);
  dome.renderOrder = -10;
  dome.frustumCulled = false;
  dome.name = "sky";
  scene.add(dome);

  scene.environment = envs[0];
  scene.environmentRotation.set(0, rotA, 0);

  /** World-space sun direction for a given HDRI. */
  const sunWorld = (i: 0 | 1) => SUN_TEX[names[i]].clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), i === 0 ? rotA : rotB).normalize();

  let current = 0;
  return {
    dome,
    uniforms,
    sunWorld,
    /** t: 0 golden hour → 0.5 dusk → 1 night */
    setTime(t: number) {
      const mixAB = THREE.MathUtils.smoothstep(t, 0.35, 0.62);
      uniforms.uMix.value = mixAB;
      uniforms.uNight.value = THREE.MathUtils.smoothstep(t, 0.7, 0.95);
      uniforms.uExposure.value = 1 - 0.35 * THREE.MathUtils.smoothstep(t, 0.55, 0.8);
      const want = mixAB > 0.5 ? 1 : 0;
      if (want !== current) {
        current = want;
        scene.environment = envs[want];
        scene.environmentRotation.set(0, want ? rotB : rotA, 0);
      }
      scene.environmentIntensity = THREE.MathUtils.lerp(1, 0.08, THREE.MathUtils.smoothstep(t, 0.5, 0.95));
    },
  };
}
