import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Scene3D = lazy(() => import("./Scene3D"));

function hasWebGL(): boolean {
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

/** Pure-CSS elegant fallback used when WebGL is unavailable. */
function OrbFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden>
      <div className="absolute h-64 w-64 rounded-full border border-brand/20 md:h-80 md:w-80" />
      <div className="absolute h-44 w-44 rounded-full border border-brand/30 md:h-56 md:w-56" />
      <div className="absolute h-24 w-24 rounded-full bg-brand/10 blur-sm" />
      <div className="h-10 w-10 rounded-full bg-brand/70 shadow-[0_0_60px_10px_rgba(45,212,168,0.25)]" />
    </div>
  );
}

/**
 * Matches IntersectionObserver rootMargin so we can gate third-party canvas work.
 * Renders children only while visible — keeps offscreen GPU work at zero.
 */
function useVisible<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

export function AIOrb({ className }: { className?: string }) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const [supported] = useState(hasWebGL);

  return (
    <div ref={ref} className={className}>
      {supported ? (
        visible ? (
          <Suspense fallback={<OrbFallback />}>
            <Scene3D className="h-full w-full" />
          </Suspense>
        ) : (
          <OrbFallback />
        )
      ) : (
        <OrbFallback />
      )}
    </div>
  );
}
