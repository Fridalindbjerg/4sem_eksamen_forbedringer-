"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Dot = { id: number; x: number; y: number };

const DOT_COUNT = 68;
const INTERVAL = 400;
const INTRO_DELAY = 1.2;
const INTRO_END = (INTRO_DELAY + DOT_COUNT * 0.04 + 0.5) * 1000;

function generateDots(): Dot[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => {
    const angle = Math.random() * 2 * Math.PI;
    const tight = Math.pow(Math.random(), 0.2) * 25;
    const loose = Math.pow(Math.random(), 0.8) * 55;
    const radius = i % 2 === 0 ? tight : loose;
    return {
      id: i,
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
    };
  });
}

const dotStyle = (x: number, y: number) => ({
  position: "absolute" as const,
  left: `${x}%`,
  top: `${y}%`,
  width: "9%",
  aspectRatio: "1",
  borderRadius: "50%",
  backgroundColor: "#191919",
});

export default function HeroDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDots(generateDots());
  }, []);

  useEffect(() => {
    if (dots.length === 0) return;

    const readyTimer = setTimeout(() => {
      setVisible(new Set(dots.map((d) => d.id)));
      setReady(true);
    }, INTRO_END);

    return () => clearTimeout(readyTimer);
  }, [dots]);

  useEffect(() => {
    if (!ready) return;

    const interval = setInterval(() => {
      setVisible((prev) => {
        const next = new Set(prev);
        const toHide = [...next].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 2);

        toHide.forEach((hideId) => {
          next.delete(hideId);
          setTimeout(() => {
            setVisible((p) => new Set(p).add(hideId));
          }, 900);
        });

        return next;
      });
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="col-[4/full-end] row-[1/4] self-end justify-self-end z-20 relative w-[30vw] max-w-160 aspect-square">
      {dots.map((dot) => (
        <AnimatePresence key={dot.id}>
          {ready ? (
            visible.has(dot.id) && <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} style={dotStyle(dot.x, dot.y)} />
          ) : (
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut", delay: INTRO_DELAY + dot.id * 0.04 }} style={dotStyle(dot.x, dot.y)} />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
