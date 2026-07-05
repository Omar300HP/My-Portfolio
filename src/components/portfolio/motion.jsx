import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./hooks";

// Scroll-triggered entrance: fades + rises into view once, with a 1.6s safety
// fallback so nothing can stay hidden if the observer never fires.
export function Reveal({
  as: Tag = "div",
  className = "",
  style = {},
  delay = 0,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    const safety = setTimeout(() => setShown(true), 1600);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [reduced]);

  const motionStyle = reduced
    ? {}
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(26px)",
        transition:
          "opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)",
        transitionDelay: `${delay}ms`,
      };

  return (
    <Tag ref={ref} className={className} style={{ ...motionStyle, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// Eased count-up that runs the first time the number scrolls into view.
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1300,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  // Rest state shows the real figure (matches the source design); the count-up
  // from 0 only kicks in once the number scrolls into view.
  const [display, setDisplay] = useState(`${prefix}${value}${suffix}`);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setDisplay(`${prefix}${value}${suffix}`);
      return;
    }
    let raf;
    let started = false;
    const run = () => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(`${prefix}${Math.round(value * eased)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix, suffix, duration, reduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
