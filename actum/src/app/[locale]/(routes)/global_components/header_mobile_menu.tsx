"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LanguageSwitch from "./language_switch";
import NavLink from "./nav_link";

type Props = {
  links: { href: string; label: string }[];
  locale: string;
};

export default function MobileMenu({ links, locale }: Props) {
  // Holder styr på om menuen er åben eller lukket
  //default er closed (false)
  const [open, setOpen] = useState(false);

  return (
    // Vises kun på mobil – skjules på lg og større skærme
    <div className="col-[3/content-end] flex justify-end items-center lg:hidden">
      {/* Knap der åbner menuen - ændre setOpen til true */}
      <button
        onClick={() => setOpen(true)}
        className="font-ocr text-sm tracking-wide"
      >
        menu
      </button>

      {/* AnimatePresence gør det muligt at animere menuen ud når den lukkes, da den sørger for at beholde elementet i DOM'en indtil det er færdigt med at blive animeret */}
      <AnimatePresence>
        {open && (
          // Menuen glider ind fra højre og fylder hele skærmen
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-screen bg-(--background) z-40 flex flex-col justify-between px-(--page-margin) py-6"
          >
            <div className="flex justify-between items-start">
              <Link
                href="/"
                className="font-ocr text-2xl tracking-[0.04em] leading-none"
              >
                actum
              </Link>
              <button
                // Knap der lukker menuen - ændre setOpen til false
                onClick={() => setOpen(false)}
                className="font-ocr text-2xl tracking-widest"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-4 font-bold text-base leading-7 tracking-wide">
              {/* Looper af navigationslinks – lukker menuen når der klikkes på et link */}
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  locale={locale}
                  onClick={() => setOpen(false)}
                />
              ))}
            </ul>

            {/* Sprogskifter placeret nederst i menuen */}
            <LanguageSwitch className="flex gap-1 font-bold text-base" />
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
