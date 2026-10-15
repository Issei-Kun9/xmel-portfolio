import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export const ASSET = "/estate";

const texLoader = new THREE.TextureLoader();
const cache = new Map<string, Promise<THREE.Texture>>();

export function loadTex(url: string, srgb = false): Promise<THREE.Texture> {
  const key = url + (srgb ? "#s" : "");
  let p = cache.get(key);
  if (!p) {
    p = texLoader.loadAsync(url).then((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 8;
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
      return t;
    });
    cache.set(key, p);
  }
  return p;
}

/** A PBR material from a Poly Haven set (diff / nor / arm), tiled so one texture covers `tile` metres. */
export async function pbr(
  name: string,
  { tile = 2, color, roughness = 1, normalScale = 1, envMapIntensity = 1 }: { tile?: number; color?: number; roughness?: number; normalScale?: number; envMapIntensity?: number } = {},
) {
  const base = `${ASSET}/tex/${name}`;
  const [map, normalMap, arm] = await Promise.all([loadTex(`${base}/diff.webp`, true), loadTex(`${base}/nor.webp`), loadTex(`${base}/arm.webp`)]);
  const m = new THREE.MeshStandardMaterial({
    map,
    normalMap,
    aoMap: arm,
    roughnessMap: arm,
    metalnessMap: arm,
    roughness,
    metalness: 1,
    envMapIntensity,
    normalScale: new THREE.Vector2(normalScale, normalScale),
  });
  if (color !== undefined) m.color = new THREE.Color(color);
  m.userData.tile = tile;
  return m;
}

/**
 * Box with UVs in world units / tile, so textures keep their real scale on any size.
 * `rotateUV` turns the pattern 90° on the side faces (vertical boards).
 */
export function box(w: number, h: number, d: number, tile = 2, rotateUV = false) {
  const g = new THREE.BoxGeometry(w, h, d);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const nor = g.attributes.normal as THREE.BufferAttribute;
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const nx = Math.abs(nor.getX(i)), ny = Math.abs(nor.getY(i));
    let u: number, v: number;
    if (ny > 0.5) { u = x; v = z; } else if (nx > 0.5) { u = z; v = y; } else { u = x; v = y; }
    if (rotateUV && ny < 0.5) [u, v] = [v, u];
    uv.setXY(i, u / tile, v / tile);
  }
  g.setAttribute("uv2", uv.clone());
  return g;
}

/** Flat plane (XZ) with world-scaled UVs. */
export function slab(w: number, d: number, tile = 2) {
  const g = new THREE.PlaneGeometry(w, d);
  g.rotateX(-Math.PI / 2);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * w) / tile, (uv.getY(i) * d) / tile);
  return g;
}

let gltf: GLTFLoader | null = null;
export function gltfLoader() {
  if (!gltf) {
    gltf = new GLTFLoader();
    gltf.setMeshoptDecoder(MeshoptDecoder);
  }
  return gltf;
}

const modelCache = new Map<string, Promise<THREE.Group>>();
/** Load an optimized model once; callers clone the result. */
export function loadModel(name: string): Promise<THREE.Group> {
  let p = modelCache.get(name);
  if (!p) {
    p = gltfLoader()
      .loadAsync(`${ASSET}/models/${name}.glb`)
      .then((g) => {
        g.scene.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) {
            m.castShadow = true;
            m.receiveShadow = true;
            const mat = m.material as THREE.MeshStandardMaterial;
            if (mat.alphaTest > 0) {
              mat.side = THREE.DoubleSide;
              // Thin needle cards lose coverage in the smaller mips; a lower cutoff
              // plus alpha-to-coverage (MSAA) keeps distant canopies full and soft-edged.
              mat.alphaTest = 0.22;
              mat.alphaToCoverage = true;
              m.castShadow = true;
            }
          }
        });
        return g.scene;
      });
    modelCache.set(name, p);
  }
  return p;
}

/** First mesh's geometry + material, for instancing. Geometry is baked into world space of the model. */
export async function modelParts(name: string) {
  const root = await loadModel(name);
  root.updateMatrixWorld(true);
  const parts: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      const g = m.geometry.clone();
      // Quantized (normalized int) attributes would clamp to [-1, 1] when the
      // transform is baked in, so expand them to float first.
      for (const [key, attr] of Object.entries(g.attributes)) {
        const a = attr as THREE.BufferAttribute;
        if (a.array instanceof Float32Array) continue;
        const f = new Float32Array(a.count * a.itemSize);
        for (let i = 0; i < a.count; i++) for (let k = 0; k < a.itemSize; k++) f[i * a.itemSize + k] = a.getComponent(i, k);
        g.setAttribute(key, new THREE.BufferAttribute(f, a.itemSize));
      }
      g.applyMatrix4(m.matrixWorld);
      parts.push({ geometry: g, material: m.material as THREE.Material });
    }
  });
  return parts;
}
