"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Dot type definerer id og position for hver prik
type Dot = { id: number; x: number; y: number };

// Antal prikker der genereres
const DOT_COUNT = 68;
// Interval i 400 ms mellem hver tilfældig blink-animation
const INTERVAL = 400;
const INTRO_DELAY = 1.2;
const INTRO_END = (INTRO_DELAY + DOT_COUNT * 0.04 + 0.5) * 1000;

// Genererer tilfældige prikker fordelt i et cirkulært mønster
// Hver anden prik placeres tæt på centrum (tight), resten spredt udad (loose)
function generateDots(): Dot[] {
  return Array.from({ length: DOT_COUNT }, (_, i) => {
    const angle = Math.random() * 2 * Math.PI; // Tilfældig vinkel for at fordele prikkerne jævnt i en cirkel
    const tight = Math.pow(Math.random(), 0.2) * 25; // Tæt på centrum - højere sandsynlighed for at være tæt på (power 0.2)
    const loose = Math.pow(Math.random(), 0.8) * 55; // Spredt ud - højere sandsynlighed for at være længere væk (power 0.8)
    const radius = i % 2 === 0 ? tight : loose; // Skiftevis tight og loose for at skabe variation i mønsteret
    return {
      id: i,
      x: 50 + radius * Math.cos(angle), // Beregner x-position baseret på radius og vinkel, centreret omkring 50%
      y: 50 + radius * Math.sin(angle), // Beregner y-position baseret på radius og vinkel, centreret omkring 50%
    };
  });
}

// Styling for hver prik baseret på dens position
const dotStyle = (x: number, y: number) => ({
  position: "absolute" as const,
  left: `${x}%`, // Placerer prikken horisontalt baseret på x-procent
  top: `${y}%`, // Placerer prikken vertikalt baseret på y-procent
  width: "9%", //bredde på prik
  aspectRatio: "1", // sikrer cirkulær form på prik
  borderRadius: "50%", // gør prikken rund
  backgroundColor: "#191919",
});

// "use client" er nødvendigt da komponenten bruger useState og useEffect
export default function HeroDots() {
  const [dots, setDots] = useState<Dot[]>([]);
  // visible indeholder id'erne på de prikker der aktuelt er synlige
  const [visible, setVisible] = useState<Set<number>>(new Set());
  // ready skifter til true når intro-animationen er færdig
  const [ready, setReady] = useState(false);

  // Genererer prikker én gang ved mounting af komponenten
  useEffect(() => {
    setDots(generateDots());
  }, [generateDots]); // generateDots sættes ind i dependency array for at sikre at det ikke genkøres unødvendigt

  // Starter intro-animationen når prikkerne er genereret
  useEffect(() => {
    if (dots.length === 0) return; // Hvis prikkerne ikke er genereret endnu, gør intet

    // Efter INTRO_END ms, sættes alle prikker til synlige og ready til true for at starte blink-fasen
    const readyTimer = setTimeout(() => {
      setVisible(new Set(dots.map((d) => d.id)));
      setReady(true);
    }, INTRO_END);

    // Rydder timeren hvis komponenten unmountes før INTRO_END for at undgå memory leaks
    return () => clearTimeout(readyTimer);
  }, [dots]);

  // Når ready er true, starter interval der hver INTERVAL ms vælger 2-3 tilfældige synlige prikker at "blinke" (skjule og så vise igen)
  useEffect(() => {
    if (!ready) return;

    // Interval der kører hver INTERVAL millisekund
    const interval = setInterval(() => {
      setVisible((prev) => { // Opretter en kopi af det nuværende sæt af synlige prikker
        const next = new Set(prev);
        // Vælger tilfældigt 2-3 prikker fra de synlige til at "blinke" ved at fjerne dem midlertidigt fra next
        const toHide = [...next].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 2);

        // Fjerner de valgte prikker fra next for at skjule dem
        toHide.forEach((hideId) => {
          next.delete(hideId);
          setTimeout(() => {
            setVisible((p) => new Set(p).add(hideId)); // Efter 900 ms, tilføjes de skjulte prikker tilbage til visible for at vise dem igen
          }, 900);
        });

        // Returnerer det opdaterede sæt af synlige prikker, hvor nogle midlertidigt er skjult for at skabe blink-effekten
        return next;
      });
    }, INTERVAL);

    // Rydder interval når komponenten unmountes for at undgå memory leaks
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="col-[4/full-end] row-[1/4] self-end justify-self-end z-20 relative w-[30vw] max-w-160 aspect-square">
      {dots.map((dot) => (
        // ind og ud animationer
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
