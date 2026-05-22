"use client";

import { useState } from "react";
import { Link } from "@i18n/navigation";
import ProductImage from "../../global_components/product_image";
import { type Product } from "@/lib/types";

type Props = {
  products: Product[];
  locale: "da" | "en";
};

export default function ProductFilter({ products, locale }: Props) {
  // Holder styr på hvilken kategori der er aktiv – null betyder at alle produkter vises
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Henter alle unikke kategorier fra produkterne på det aktuelle sprog.
  // filter fjerner produkter uden kategori, map henter kategorinavnet og Set fjerner dubletter.
  // Array.from konverterer Set tilbage til et array så vi kan loope over det.
  const categories = Array.from(
    new Set(
      products
        .filter((product) => product.category !== null)
        .map((product) => product.category[locale]),
    ),
  );

  // Filtrerer produkterne baseret på den aktive kategori.
  // Hvis ingen kategori er valgt vises alle produkter – ellers kun dem der matcher den valgte kategori.
  const filtered =
    activeCategory === null
      ? products
      : products.filter(
          (product) => product.category?.[locale] === activeCategory,
        );

  return (
    <div>
      {/* Navigation med filterknapper – én knap per kategori plus en knap til at vise alle */}
      <nav className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center w-full md:gap-6">
        {/* Knap der nulstiller filteret og viser alle produkter.
        Den aktive knap vises i fuld farve – inaktive knapper vises i grå */}
        <button
          onClick={() => setActiveCategory(null)}
          className={`font-sans pb-2 ${activeCategory === null ? "" : "text-(--grey)"}`}
        >
          alle produkter
        </button>
        {/* Looper igennem alle unikke kategorier og laver en filterknap per kategori.
        Klikker man på en knap sættes activeCategory til den valgte kategori */}
        {categories.map((cat, index) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans lowercase pb-2 ${activeCategory === cat ? "" : "text-(--grey)"}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Grid der viser de filtrerede produkter.
      Antallet af kolonner tilpasser sig automatisk skærmstørrelsen baseret på minimum kolonnebredde */}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 pt-8">
        {/* Looper igennem de filtrerede produkter og viser dem som klikbare kort.
        Hvert kort linker til produktets egen side via dets id */}
        {filtered.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            locale={locale}
          >
            <li className="flex flex-col gap-4">
              {/* Viser produktets sorteringskategori i kantede parenteser – fx [ Risografi ] */}
              <div>[ {product.sort_by} ]</div>
              {/* Viser produktets navn på det aktuelle sprog */}
              <p>{product.name[locale]}</p>
              {/* Viser produktbilledet – skifter til andet billede ved hover hvis det findes */}
              <ProductImage product={product} locale={locale} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
