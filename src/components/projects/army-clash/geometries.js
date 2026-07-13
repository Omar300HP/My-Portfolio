import * as THREE from "three";

// Stylized unit silhouettes, ported 1:1 from the design prototype: each Unit
// Type is a handful of primitives merged into ONE BufferGeometry so an entire
// army of that type renders as a single InstancedMesh draw call.

function mat4(x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  return new THREE.Matrix4()
    .makeRotationFromEuler(new THREE.Euler(rx, ry, rz))
    .setPosition(x, y, z);
}

function merge(parts) {
  const pos = [];
  const nor = [];
  for (const [geometry, matrix] of parts) {
    const g = geometry.toNonIndexed();
    g.applyMatrix4(matrix);
    pos.push(...g.attributes.position.array);
    nor.push(...g.attributes.normal.array);
    g.dispose();
    geometry.dispose();
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  return out;
}

// Keyed by domain type id order: swordsman, spearman, archer, cavalry.
export function buildUnitGeometries() {
  return {
    swordsman: merge([
      [new THREE.CapsuleGeometry(0.42, 0.75, 3, 8), mat4(0, 0.95, 0)],
      [new THREE.BoxGeometry(0.12, 0.72, 0.5), mat4(0.42, 0.9, 0.1)],
      [new THREE.BoxGeometry(0.07, 0.85, 0.16), mat4(-0.35, 1.25, 0.15, 0.5, 0, 0)],
    ]),
    spearman: merge([
      [new THREE.CapsuleGeometry(0.38, 0.7, 3, 8), mat4(0, 0.9, 0)],
      [new THREE.CylinderGeometry(0.04, 0.04, 2.7, 5), mat4(0.3, 1.45, 0.15, 0.28, 0, 0)],
      [new THREE.ConeGeometry(0.09, 0.3, 5), mat4(0.3, 2.75, 0.52, 0.28, 0, 0)],
    ]),
    archer: merge([
      [new THREE.CapsuleGeometry(0.33, 0.6, 3, 8), mat4(0, 0.8, 0)],
      [
        new THREE.TorusGeometry(0.5, 0.035, 5, 10, Math.PI),
        mat4(0.3, 0.95, 0.2, 0, Math.PI / 2, Math.PI / 2),
      ],
    ]),
    cavalry: merge([
      [new THREE.BoxGeometry(0.55, 0.62, 1.75), mat4(0, 0.85, 0)],
      [new THREE.BoxGeometry(0.3, 0.5, 0.42), mat4(0, 1.35, 0.85, 0.4, 0, 0)],
      [new THREE.CapsuleGeometry(0.3, 0.5, 3, 8), mat4(0, 1.65, -0.15)],
      [new THREE.CylinderGeometry(0.05, 0.05, 0.75, 4), mat4(0, 0.35, 0.62)],
      [new THREE.CylinderGeometry(0.05, 0.05, 0.75, 4), mat4(0, 0.35, -0.62)],
    ]),
  };
}
