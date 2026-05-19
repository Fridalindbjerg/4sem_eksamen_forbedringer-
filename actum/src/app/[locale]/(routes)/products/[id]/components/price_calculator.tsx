"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import CtaButton from "@/app/[locale]/(routes)/global_components/cta_button";
import { Material } from "@/lib/types";
import { useTranslations } from "next-intl";

type Props = {
  materials: Material[];
};

export default function PriceCalculator({ materials }: Props) {
  const t = useTranslations("singleproduct");

  // State der holder styr på det valgte materiale for hver kategori. Nøglen er kategoriens danske navn for at sikre stabil gruppering uanset sprog
  // Starter med et tomt objekt, da ingen materialer er valgt i starten
  const [selected, setSelected] = useState<Record<string, Material>>({});

  const locale = useLocale() as "da" | "en";

  // Henter alle unikke kategorier – bruger dansk som intern nøgle så grupperingen er stabil uanset sprog
  //løber alle kategorier igennem på dansk og bruger Set til kun at få unikke værdier - altså hvis papir er der to gange, gør Set, så man i det nye array kun får det én gang.
  //vi mapper altså vores materials tabel for at finde material - som er det enkelte element, som da finder hvert category på det enkelte element
  //og så til sidst bruger vi ...new til igen at lave det til array. Nu har vi altså et array med alle unikke kategorier på dansk, som vi kan bruge til at lave en dropdown per kategori.
  const categoryKeys = [
    ...new Set(materials.map((material) => material.category.da)),
  ];

  // Udregner den samlede pris ved at lægge prisen for hvert valgt materiale sammen
  //her tager vi med selected, som er det objekt der indeholder brugerens valgte materialer, og så tager vi Object.values for at få en array af de valgte materialer. Så bruger vi reduce til at lægge prisen for hvert materiale sammen, hvor sum starter ved 0 og for hver material lægger vi material.price_per_unit til sum.
  const totalPrice = Object.values(selected).reduce(
    (sum, material) => sum + material.price_per_unit,
    0,
  );

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
        <div className="flex flex-col gap-4">
          {/* // categoryKeys er arrayet af unikke kategorier vi lavede tidligere –
          fx ["papir", "format"]. Vi looper igennem dem én ad gangen, og
          categoryKey er den aktuelle kategori vi arbejder med.  For hver
          kategori skal vi finde dens navn på det sprog brugeren har valgt. 
          Vi bruger materials.find() til at lede efter det første materiale der
          tilhører den aktuelle kategori, og henter så category[locale] på
          det fundne materiale for at få navnet på det rigtige sprog. // ?.
          sikrer at vi ikke crasher hvis find() ikke finder noget – i stedet
          returnerer den undefined. */}
          {categoryKeys.map((categoryKey) => {
            const categoryLabel = materials.find(
              (material) => material.category.da === categoryKey,
            )?.category[locale];
            return (
              <div key={categoryKey} className="relative min-w-64">
                <select
                  className="w-full border border-black p-2 font-mono text-sm tracking-widest appearance-none bg-white cursor-pointer"
                  onChange={(e) => {
                    // onChange kører hver gang brugeren vælger en ny option i dropdown.
                    // e.target.value er id'et på det materiale brugeren valgte.
                    // Vi bruger materials.find() til at finde det fulde materiale-objekt der matcher id'et,
                    // så vi har adgang til alle materialets data – ikke kun id'et.
                    // Hvis find() finder et materiale, gemmer vi det i selected med setSelected.
                    // ...prev kopierer alle tidligere valg så vi ikke overskriver andre kategoriers valg –
                    // kun den aktuelle kategori bliver opdateret med det nye materiale.
                    const material = materials.find(
                      (material) => material.id === e.target.value,
                    );
                    if (material)
                      setSelected((prev) => ({
                        ...prev,
                        [categoryKey]: material,
                      }));
                  }}
                >
                  {/* Standardvalg viser kategoriens navn på det aktuelle sprog – bruges som placeholder før brugeren vælger */}
                  <option>{categoryLabel}</option>

                  {/* Filtrerer materials-arrayet så vi kun får de materialer der tilhører den aktuelle kategori,
                  og mapper dem derefter til option-elementer med materialets id som value og navn på det aktuelle sprog som label.
                  value={material.id} bruges til at finde det rigtige materiale i onChange ovenfor via e.target.value */}
                  {materials
                    .filter((material) => material.category.da === categoryKey)
                    .map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name[locale]}
                      </option>
                    ))}
                </select>

                {/* Tilpasset pil-ikon der erstatter browserens standard dropdown-pil.
                pointer-events-none sikrer at ikonet ikke blokerer for klik på selve dropdown-elementet */}
                <div className="pointer-events-none absolute right-4 inset-y-0 flex items-center">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Højre kolonne – viser den samlede pris.
        toFixed(2) sikrer at prisen altid vises med to decimaler –  */}
        <div className="flex flex-col gap-2 justify-end">
          <h4>{totalPrice.toFixed(2)} DKK</h4>
          <span className="text-gray-400 text-xs font-ocr">{t("price")}</span>
          <CtaButton label={t("link")} href="/contact" />
        </div>
      </div>
    </div>
  );
}
