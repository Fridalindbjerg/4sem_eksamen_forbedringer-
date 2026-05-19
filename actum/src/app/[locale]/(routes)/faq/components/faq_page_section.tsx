"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Faq } from "@/lib/faq";

type Props = {
  faqs: Faq[];
};

export default function FaqPageSection({ faqs }: Props) {
  // Holder styr på hvilken faq der er åben – gemmer faq'ens id, eller null hvis ingen er åben
  const [open, setOpen] = useState<number | null>(null);

  // Henter det aktuelle sprog så spørgsmål og svar vises på det rigtige sprog
  const locale = useLocale() as "da" | "en";

  return (
    <section className="col-[content-start/content-end] md:col-[3/content-end] md:row-start-2 md:pl-2 pb-2 md:pb-0">
      <div className="flex flex-col">
        {/* Looper igennem alle faq'er og viser dem som en liste */}
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border-t border-foreground last:border-b"
          >
            {/* Klikker man på knappen åbnes faq'en – klikker man igen lukkes den */}
            <button
              //en ternary operator - hvis den akutelt åbne faq er den samme som den man klikker på, så sæt open til null - altså luk faq'en, ellers sæt open til id'et på den - altså åben den
              onClick={() => setOpen(open === faq.id ? null : faq.id)}
              className="w-full flex justify-between items-center py-4 text-left font-ocr tracking-widest cursor-pointer"
            >
              {faq.question[locale]}
              {/* Viser + når lukket og − når åben baseret på open state ved at tjekke om faq.id matcher open */}
              <span>{open === faq.id ? "−" : "+"}</span>
            </button>

            {/* AnimatePresence gør det muligt at animere elementet når det fjernes fra DOM'en */}
            <AnimatePresence>
              {open === faq.id && (
                //tjekker om faq'en er åben – hvis ja, vis svaret og animer det ind og ud med framer-motion
                // Animerer højden fra 0 til auto når svaret åbnes og lukkes
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-base pb-4">{faq.answer[locale]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
