import { Product } from "@/lib/types";
import { getLocale } from "next-intl/server";
import { Link } from "@i18n/navigation";
import ProductImage from "./product_image";

export default async function ProductGrid({
  products,
  title,
}: {
  // Modtager en liste af produkter og en titel som props
  products: Product[];
  title: string;
}) {
  // Henter det aktuelle sprog så produktnavne vises på det rigtige sprog
  const locale = (await getLocale()) as "da" | "en";

  // Hvis der ingen produkter er, vises ingenting
  if (products.length === 0) return null;

  return (
    <section className="section content">
      <h2>{title}</h2>

      {/* Horisontal scrollbar der snapper til hvert produkt */}
      <ul
        className="flex overflow-x-auto gap-8 pt-8"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Looper igennem alle produkter og viser dem som et klikbart kort.
        li er direkte barn af ul – Link er inde i li for at overholde HTML-standarden,
        da ul kun må have li som direkte børn */}
        {products.map((product) => (
          <li
            key={product.id}
            // shrink-0 sikrer at produkterne ikke krymper når der er mange i rækken
            className="flex flex-col gap-4 shrink-0 w-70"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link
              href={`/products/${product.id}`}
              className="flex flex-col gap-4"
            >
              <div>[ {product.sort_by} ]</div>
              <p>{product.name[locale]}</p>
              <ProductImage product={product} locale={locale} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
