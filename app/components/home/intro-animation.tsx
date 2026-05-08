"use client";

import { useState, useEffect, useRef } from "react";

type Phase = "init" | "text-in" | "covering" | "revealing" | "done";

export function IntroAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("init");
  const [revealR, setRevealR] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  /* ── Timeline ─────────────────────────────────────── */
  useEffect(() => {
    // Next frame → start text animation
    const raf = requestAnimationFrame(() => setPhase("text-in"));

    const t1 = setTimeout(() => setPhase("covering"),  1800); // texto visible → cubrir
    const t2 = setTimeout(() => setPhase("revealing"), 2700); // revelar página
    const t3 = setTimeout(() => {
      setPhase("done");
      onDoneRef.current();
    }, 4100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  /* ── Animación de máscara (fase revealing) ─────────── */
  useEffect(() => {
    if (phase !== "revealing") return;

    let start: number | null = null;
    const duration = 1250;

    const animate = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      // easeInOutQuart — aceleración suave y cierre dramático
      const eased =
        t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      setRevealR(eased * 180);
      if (t < 1) requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [phase]);

  /* ── Bloquear scroll durante el intro ─────────────── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (phase === "done") return null;

  const textVisible  = phase === "text-in" || phase === "covering";
  const coverVisible = phase === "covering" || phase === "revealing";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
      style={
        phase === "revealing"
          ? {
              WebkitMaskImage: `radial-gradient(circle at 50% 50%, transparent ${revealR}vmax, black ${revealR + 1}vmax)`,
              maskImage: `radial-gradient(circle at 50% 50%, transparent ${revealR}vmax, black ${revealR + 1}vmax)`,
            }
          : undefined
      }
    >
      {/* ── Capa de blur / oscurecimiento ─────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(4, 4, 4, 0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          opacity: coverVisible ? 1 : 0,
          transition: "opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* ── Texto central ─────────────────────────────── */}
      <div className="relative z-10 text-center select-none px-6">
        {/* Sub-label */}
        <p
          className="font-bold uppercase text-[#b11212]"
          style={{
            fontSize: "clamp(0.55rem, 1.4vw, 0.72rem)",
            letterSpacing: "0.55em",
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          Asociación de Frontón
        </p>

        {/* Nombre principal */}
        <h1
          className="font-black text-white uppercase mt-3"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            letterSpacing: "0.07em",
            lineHeight: 1,
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(28px)",
            transition:
              "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.05s",
          }}
        >
          AMPFS-UDC
        </h1>

        {/* Línea decorativa */}
        <div
          className="mt-5 mx-auto"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #b11212, transparent)",
            width: textVisible ? "min(420px, 90vw)" : "0px",
            transition:
              "width 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        />
      </div>

      {/* ── Puntos decorativos (dot-grid sutil) ────────── */}
      <div
        className="absolute inset-0 dot-grid opacity-20 pointer-events-none"
        style={{
          opacity: coverVisible ? 0 : 0.2,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
}
