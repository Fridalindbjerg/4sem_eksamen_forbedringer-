"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import { Case } from "@/lib/types";

// Props for CaseItem komponenten — modtager et caseItem af typen Case
type Props = {
  caseItem: Case;
};

export default function CaseItem({ caseItem }: Props) {
  const ref = useRef(null);

  // useLocale returnerer den aktive locale ('da' eller 'en') fra next-intl
  // Bruges i client components — server components bruger getLocale() fra next-intl/server
  const locale = useLocale() as "da" | "en";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // clipPath animerer billedet fra midten og udad — afslører det mens man scroller
  // const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"],
  );

  // description fader ind når billedet er næsten afsløret
  const opacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.6, 1], [20, 0]);

  return (
    <article className="col-[content-start/content-end] md:col-[2/7] grid grid-cols-subgrid">
      <motion.div
        id={`case-${caseItem.order}`}
        ref={ref}
        style={{ clipPath }}
        className="col-span-full md:col-[1/4]"
      >
        {caseItem.image_url && (
          <Image
            src={caseItem.image_url.trim()}
            // Henter den lokaliserede titel fra jsonb-objektet baseret på aktiv locale
            alt={caseItem.title[locale]}
            width={800}
            height={900}
            className="w-full h-auto  object-cover"
          />
        )}
      </motion.div>
      <div className="col-[content-start/content-end] md:col-[4/6]   self-center md:pl-6">
        {/* Henter den lokaliserede titel fra jsonb-objektet baseret på aktiv locale */}
        <p className="pt-6 pb-4 ">{caseItem.title[locale]}</p>
        {/* Henter den lokaliserede beskrivelse fra jsonb-objektet baseret på aktiv locale */}
        <motion.p className="pb-6" style={{ opacity, y }}>
          {caseItem.description[locale]}
        </motion.p>
      </div>
    </article>
  );
}
