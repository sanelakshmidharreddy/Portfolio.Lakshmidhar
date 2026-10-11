import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------- WebGL feature detection ---------- */

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

type PerfTier = "high" | "low";

function perfTier(): PerfTier {
  const mobile = window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768;
  return mobile ? "low" : "high";
}

/* ---------- Scene pieces ---------- */

const BRAND = new THREE.Color("#2dd4a8");
const BRAND_SOFT = new THREE.Color("#7ff0d0");

function CoreNodes({ count }: { count: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const lineObjRef = useRef<THREE.LineSegments | null>(null);

  const { positions, edges, nodes } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.35, 2); // subdivided sphere
    const posAttr = geo.getAttribute("position");
    // deduplicate vertices
    const seen = new Set<string>();
    const verts: THREE.Vector3[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
      const key = v.toArray().map((n) => n.toFixed(2)).join("|");
      if (!seen.has(key)) {
        seen.add(key);
        verts.push(v);
      }
    }
    const selected = verts.slice(0, count);

    // edges between nearby vertices (plexus)
    const linePts: number[] = [];
    const maxDist = 0.62;
    for (let i = 0; i < selected.length; i++) {
      for (let j = i + 1; j < selected.length; j++) {
        if (selected[i].distanceTo(selected[j]) < maxDist) {
          linePts.push(selected[i].x, selected[i].y, selected[i].z);
          linePts.push(selected[j].x, selected[j].y, selected[j].z);
        }
      }
    }
    return {
      positions: selected,
      edges: new Float32Array(linePts),
      nodes: selected.map((v, i) => ({ v, phase: i * 1.7 })),
    };
  }, [count]);

  const lineObj = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(edges, 3));
    const m = new THREE.LineBasicMaterial({
      color: BRAND,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.LineSegments(g, m);
  }, [edges]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.16) * 0.12;
    }
    if (lineObjRef.current) {
      const mat = lineObjRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.14 + Math.sin(t * 0.8) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={lineObj} ref={lineObjRef} />
      {nodes.map(({ v, phase }, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.022 + (i % 5) * 0.008, 8, 8]} />
          <meshBasicMaterial color={BRAND_SOFT} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** Inner glowing core — calm pulse, hover lifts intensity. */
function InnerCore({ hovered }: { hovered: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 0.9) * 0.03 + (hovered ? 0.06 : 0);
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.55, 1]} />
      <meshBasicMaterial color={BRAND} transparent opacity={hovered ? 0.35 : 0.22} />
      <mesh scale={0.98}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={BRAND_SOFT} wireframe transparent opacity={hovered ? 0.7 : 0.45} />
      </mesh>
    </mesh>
  );
}

/** Glass outer shell + two thin orbital rings. */
function Shell() {
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (shell.current) shell.current.rotation.y = -t * 0.05;
    if (ringA.current) {
      ringA.current.rotation.z = t * 0.18;
      ringA.current.rotation.x = Math.cos(t * 0.1) * 0.3 + 0.4;
    }
    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.12;
      ringB.current.rotation.x = Math.sin(t * 0.12) * 0.3 - 0.5;
    }
  });
  return (
    <>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshBasicMaterial color={BRAND} wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[2.5, 0.005, 8, 96]} />
        <meshBasicMaterial color={BRAND_SOFT} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.9, 0.004, 8, 96]} />
        <meshBasicMaterial color={BRAND} transparent opacity={0.3} />
      </mesh>
    </>
  );
}

/** Small orbiting satellites on different planes. */
function Satellites({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);
  const sats = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        r: 2.5 + (i % 3) * 0.45,
        speed: 0.25 + (i % 4) * 0.08,
        tilt: (i / count) * Math.PI,
        phase: i * 2.4,
        size: 0.03 + (i % 3) * 0.012,
      })),
    [count]
  );
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    group.current?.children.forEach((child, i) => {
      const s = sats[i];
      child.position.set(
        Math.cos(t * s.speed + s.phase) * s.r,
        Math.sin(t * s.speed * 0.6 + s.phase) * s.r * 0.25,
        Math.sin(t * s.speed + s.phase) * s.r
      );
      child.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), s.tilt * 0.4);
    });
  });
  return (
    <group ref={group}>
      {sats.map((s, i) => (
        <mesh key={i}>
          <octahedronGeometry args={[s.size, 0]} />
          <meshBasicMaterial color={BRAND_SOFT} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

/** Camera parallax driven by normalized pointer, very subtle. */
function CameraRig({ reduced }: { reduced: boolean }) {
  useFrame(({ camera, pointer }) => {
    if (reduced) return;
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.35 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------- Public component ---------- */

export default function Scene3D({ className }: { className?: string }) {
  const [supported] = useState(hasWebGL);
  const [tier] = useState<PerfTier>(perfTier);
  const [reduced, setReduced] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  if (!supported) return null; // hero renders its own elegant 2D fallback

  const nodeCount = tier === "high" ? 90 : 42;
  const satCount = tier === "high" ? 10 : 5;
  const dpr: [number, number] = tier === "high" ? [1, 1.75] : [1, 1.25];

  return (
    <div
      className={className}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[3, 3, 4]} intensity={reduced ? 0 : 18} color="#7ff0d0" />
          <CameraRig reduced={reduced} />
          <group scale={reduced ? 0.9 : 1}>
            <CoreNodes count={nodeCount} />
            <InnerCore hovered={hovered && !reduced} />
            <Shell />
            <Satellites count={satCount} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
