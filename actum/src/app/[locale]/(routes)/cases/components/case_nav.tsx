"use client";

import { useEffect, useState } from "react";
import { Case } from "@/lib/types";

// Komponenten modtager en liste af cases fra CasesPage
type Props = {
  cases: Case[];
};

export default function CasesNav({ cases }: Props) {
  // activeId holder orden-nummeret på den case der er synlig i viewport
  // Starter som null fordi ingen case er aktiv når siden loader
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    // Looper gennem alle cases og opretter en IntersectionObserver pr. case
    // IntersectionObserver er et browser-API der overvåger om et element er synligt i viewport
    const observers = cases.map((caseItem) => {
      // Vi finder det HTML-element der matcher case-elementets id
      // id'erne er sat i CaseItem som id={`case-${caseItem.order}`}
      const el = document.getElementById(`case-${caseItem.order}`);

      // Hvis elementet ikke findes i DOM'en, stopper vi og returnerer null
      if (!el) return null;

      // Vi opretter en ny observer der overvåger elementet
      // [entry] er en destrukturering — vi får altid kun ét element tilbage fra vores observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          // isIntersecting er true når elementet er synligt i viewport
          // Når det sker, opdaterer vi activeId til denne cases order-nummer
          if (entry.isIntersecting) setActiveId(caseItem.order);
        },
        // threshold: 0.5 betyder at elementet skal være 50% synligt før det tæller som aktivt
        { threshold: 0.5 },
      );
      // Vi starter overvågningen af elementet
      observer.observe(el);
      // Vi returnerer observeren så vi kan stoppe den igen i cleanup
      return observer;
    });

    // Cleanup-funktion — kører når komponenten fjernes fra siden eller når cases ændrer sig
    // Vi disconnecter alle observers så de ikke kører unødigt i baggrunden
    return () => observers.forEach((o) => o?.disconnect());
  }, [cases]);

  return (
    <section className="col-[content-start/content-end] md:col-start-1 md:col-end-2 md:row-start-1 md:sticky md:top-30 md:self-start">
      {" "}
      <nav className="hidden md:block">
        <ul className="grid gap-3">
          {cases.map((caseItem) => (
            <li key={caseItem.id}>
              <a
                href={`#case-${caseItem.order}`}
                className={
                  activeId === caseItem.order ? "opacity-100" : "opacity-40"
                }
              >
                <span className="grid grid-cols-[auto_1fr] gap-2">
                  <span>{String(caseItem.order).padStart(2, "0")}</span>
                  <span>{caseItem.title}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
