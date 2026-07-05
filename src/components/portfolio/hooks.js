import { useEffect, useRef, useState } from "react";

// Reflects the OS "prefers-reduced-motion" setting; drives all motion opt-outs.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

// Subtle pointer-driven 3D tilt for cards. Returns a ref to attach to the card.
export function useTilt(disabled = false) {
  const ref = useRef(null);
  useEffect(() => {
    const card = ref.current;
    if (!card || disabled) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${(-py * 4).toFixed(
        2
      )}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px)`;
    };
    const onLeave = () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled]);
  return ref;
}

// Typewriter effect for the 3D viewer terminal overlay.
export function useTypingText(full, { enabled = true, speed = 34 } = {}) {
  const [text, setText] = useState(enabled ? "" : full);
  useEffect(() => {
    if (!enabled) {
      setText(full);
      return;
    }
    let i = 0;
    let timer;
    const type = () => {
      setText(full.slice(0, i));
      i += 1;
      if (i <= full.length) timer = setTimeout(type, speed);
    };
    type();
    return () => clearTimeout(timer);
  }, [full, enabled, speed]);
  return text;
}
