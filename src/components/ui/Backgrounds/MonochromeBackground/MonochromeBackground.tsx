import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./MonochromeBackground.css";

/** Snow/dust particles — white only, varied size, speed, opacity */
const SNOW_PARTICLES = [
  { left: "4%", top: "8%", size: 2, opacity: 0.55, duration: "16s", delay: "0s", drift: "18px" },
  { left: "11%", top: "22%", size: 1, opacity: 0.35, duration: "22s", delay: "2s", drift: "-12px" },
  { left: "18%", top: "5%", size: 3, opacity: 0.7, duration: "14s", delay: "4.5s", drift: "24px" },
  { left: "25%", top: "35%", size: 1, opacity: 0.4, duration: "20s", delay: "1s", drift: "-20px" },
  { left: "32%", top: "12%", size: 2, opacity: 0.5, duration: "18s", delay: "6s", drift: "14px" },
  { left: "39%", top: "48%", size: 1, opacity: 0.3, duration: "24s", delay: "3s", drift: "-16px" },
  { left: "46%", top: "18%", size: 2, opacity: 0.65, duration: "15s", delay: "8s", drift: "22px" },
  { left: "53%", top: "62%", size: 1, opacity: 0.45, duration: "21s", delay: "0.5s", drift: "-10px" },
  { left: "60%", top: "8%", size: 3, opacity: 0.6, duration: "17s", delay: "5s", drift: "28px" },
  { left: "67%", top: "28%", size: 1, opacity: 0.38, duration: "23s", delay: "7s", drift: "-24px" },
  { left: "74%", top: "42%", size: 2, opacity: 0.52, duration: "19s", delay: "2.5s", drift: "12px" },
  { left: "81%", top: "15%", size: 1, opacity: 0.42, duration: "25s", delay: "9s", drift: "-18px" },
  { left: "88%", top: "55%", size: 2, opacity: 0.58, duration: "16s", delay: "4s", drift: "20px" },
  { left: "95%", top: "32%", size: 1, opacity: 0.32, duration: "22s", delay: "11s", drift: "-14px" },
  { left: "8%", top: "72%", size: 2, opacity: 0.48, duration: "18s", delay: "6.5s", drift: "16px" },
  { left: "22%", top: "58%", size: 1, opacity: 0.36, duration: "20s", delay: "10s", drift: "-22px" },
  { left: "36%", top: "78%", size: 3, opacity: 0.62, duration: "15s", delay: "1.5s", drift: "26px" },
  { left: "50%", top: "68%", size: 1, opacity: 0.44, duration: "24s", delay: "12s", drift: "-8px" },
  { left: "64%", top: "82%", size: 2, opacity: 0.5, duration: "17s", delay: "3.5s", drift: "18px" },
  { left: "78%", top: "65%", size: 1, opacity: 0.34, duration: "21s", delay: "8.5s", drift: "-26px" },
  { left: "92%", top: "88%", size: 2, opacity: 0.56, duration: "19s", delay: "5.5s", drift: "10px" },
  { left: "15%", top: "92%", size: 1, opacity: 0.4, duration: "23s", delay: "13s", drift: "-16px" },
  { left: "42%", top: "2%", size: 2, opacity: 0.54, duration: "14s", delay: "7.5s", drift: "22px" },
  { left: "58%", top: "38%", size: 1, opacity: 0.37, duration: "26s", delay: "2.2s", drift: "-12px" },
  { left: "72%", top: "95%", size: 2, opacity: 0.46, duration: "18s", delay: "9.5s", drift: "14px" },
] as const;

export default function MonochromeBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 20;
      targetY = (event.clientY / window.innerHeight - 0.5) * 20;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const el = rootRef.current;
      if (el) {
        el.style.setProperty("--mx", `${currentX.toFixed(2)}px`);
        el.style.setProperty("--my", `${currentY.toFixed(2)}px`);
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={`mono-bg${reducedMotion ? " mono-bg--reduced" : ""}`}
      aria-hidden="true"
      style={{ "--mx": "0px", "--my": "0px" } as CSSProperties}
    >
      <div className="mono-bg__base" />

      <div
        className="mono-bg__layer mono-bg__layer--deep"
        style={
          reducedMotion
            ? undefined
            : ({
                transform:
                  "translate3d(calc(var(--mx) * 0.3), calc(var(--my) * 0.3), 0)",
              } as CSSProperties)
        }
      >
        <div className="mono-bg__gradient" />
      </div>

      <div
        className="mono-bg__layer mono-bg__layer--mid"
        style={
          reducedMotion
            ? undefined
            : ({
                transform:
                  "translate3d(calc(var(--mx) * 0.55), calc(var(--my) * 0.55), 0)",
              } as CSSProperties)
        }
      >
        <div className="mono-bg__orb-track">
          <span className="mono-bg__orb-glow" aria-hidden="true" />
          <span className="mono-bg__orb-core" aria-hidden="true" />
        </div>
      </div>

      <div
        className="mono-bg__layer mono-bg__layer--front"
        style={
          reducedMotion
            ? undefined
            : ({
                transform: "translate3d(var(--mx), var(--my), 0)",
              } as CSSProperties)
        }
      >
        <div className="mono-bg__snow">
          {SNOW_PARTICLES.map((p, index) => (
            <span
              key={index}
              className="mono-bg__snowflake"
              style={
                {
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  "--snow-opacity": String(p.opacity),
                  "--snow-drift": p.drift,
                  animationDuration: p.duration,
                  animationDelay: p.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="mono-bg__grain" />
      <div className="mono-bg__edge-fade" />
    </div>
  );
}
