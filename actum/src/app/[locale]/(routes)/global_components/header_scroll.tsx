"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

// destrukturerer children fra props, så det er nemmere at bruge i komponenten
// children er det indhold, der bliver pakket ind i HeaderScroll-komponenten, når den bruges, og her definere vi typen som React.ReactNode, som er en type der kan repræsentere alt renderbart indhold i React (tekst, elementer, komponenter osv.)
export default function HeaderScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  // Henter den aktuelle scroll-position på siden
  // useScroll hook'et fra framer-motion giver os adgang til scroll-positionen, og her destrukturerer vi scrollY, som repræsenterer den vertikale scroll-position som hele tiden ændre sig
  const { scrollY } = useScroll();

  // Holder styr på om headeren skal være skjult eller synlig
  const [hidden, setHidden] = useState(false);

  // Kører hver gang scroll-positionen ændrer sig
  useMotionValueEvent(scrollY, "change", (current) => {
    // Henter den forrige scroll-position – bruger 0 som fallback hvis den ikke findes
    const previous = scrollY.getPrevious() ?? 0;

    // måler to ting: at brugeren scroller ned (at current er større end previous) og at de har scrollet mere end 150 pixels ned (current større end 150px)
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      // Hvis brugeren scroller op igen, vis headeren
      // vores else, som er også er vores fallback, sørger for at headeren bliver synlig igen når brugeren scroller op, eller hvis de er i toppen af siden (current mindre end 150px)
      setHidden(false);
    }
  });

  return (
    // Animerer headeren op og ud af syne når hidden er true
    <motion.header
      className="full-bleed grid grid-cols-subgrid py-6 sticky top-0 z-50 bg-(--background)"
      animate={{
        y: hidden ? -60 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Renderer det indhold, der er pakket ind i HeaderScroll-komponenten */}
      {children}
    </motion.header>
  );
}
