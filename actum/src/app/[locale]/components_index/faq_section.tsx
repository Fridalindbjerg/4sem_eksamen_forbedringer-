"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import CTAButtonDiscrete from "@/app/[locale]/(routes)/global_components/cta_button_discrete";
import { Faq } from "@/lib/faq";

// Props til FAQ-sektionen, modtager en liste af FAQs
type Props = {
  faqs: Faq[];
};

// "use client" er nødvendigt da komponenten bruger useState til at styre åben/lukket tilstand
// Modtager faqs som props fra FaqSectionWrapper der fetcher data på serversiden
export default function FaqSection({ faqs }: Props) {
  // open gemmer id'et på den åbne FAQ — null betyder ingen er åben
  const [open, setOpen] = useState<number | null>(null);
  const locale = useLocale() as "da" | "en";
  const t = useTranslations("faq_section");

  return (
    <section className="content">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16">
        <h2 className="font-ocr">{t("h2")}</h2>

        <div className="flex flex-col">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border-t border-foreground last:border-b"
            >
              {/* Klik på spørgsmål åbner eller lukker det — samme id lukker igen */}
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center py-4 text-left font-ocr tracking-widest cursor-pointer"
              >
                {faq.question[locale]}
                <span>{open === faq.id ? "−" : "+"}</span>
              </button>

              {/* AnimatePresence sikrer at exit-animationen kører når svaret lukkes */}
              <AnimatePresence>
                {open === faq.id && (
                  // Animerer højde fra 0 til auto så svaret folder ud blødtud
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
      </div>
      <div className="flex justify-end pt-8">
        <CTAButtonDiscrete href="/faq" label={t("link_faq")} />
      </div>
    </section>
  );
}
