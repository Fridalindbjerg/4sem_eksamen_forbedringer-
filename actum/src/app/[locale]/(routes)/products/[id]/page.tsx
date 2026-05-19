import PriceCalculator from "./components/price_calculator";
import Images from "./components/images";
import ProductGrid from "../../global_components/product_grid";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/lib/products";
import { getRelatedProducts } from "@/lib/products";
import { getMaterials } from "@/lib/materials";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export default async function SingleProductPage({
  params,
}: {
  // params er et Promise fordi Next.js sender side-parametre asynkront i app router
  // id er produktets unikke id fra URL'en – fx /products/123 giver id = "123"
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("singleproduct");
  const locale = (await getLocale()) as "da" | "en";

  // Udpakker id fra params – vi bruger await fordi params er et Promise
  const { id } = await params;

  // Henter produktet fra databasen ud fra id'et i URL'en
  const product = await getProductById(id);

  // Hvis produktet ikke findes eller mangler en kategori, vises Next.js' 404-side
  if (!product) return notFound();
  if (!product.category) return notFound();

  // Henter materialer og relaterede produkter samtidig for at spare tid
  // getMaterials henter alle materialer til prisberegneren
  // getRelatedProducts henter produkter i samme kategori som det aktuelle produkt
  const [materials, relatedProducts] = await Promise.all([
    getMaterials(),
    getRelatedProducts(product.id, product.category),
  ]);

  return (
    <main className="full-bleed grid grid-cols-subgrid">
      <section className="content grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
        <div>
          <p className="font-ocr text-xs text-grey mb-2">
            <Link
              href="/products"
              className="no-underline transition-opacity duration-200 hover:opacity-70"
            >
              {t("breadcrum")}
            </Link>
            {" / "}
            <span>{product.name[locale]}</span>
          </p>

          {/* Sender produktets billeder videre til Images-komponenten
          ?? [] sikrer at vi sender et tomt array hvis produktet ikke har billeder */}
          <Images pics={product.pics ?? []} />
        </div>

        <div className="flex flex-col gap-10">
          <h1>{product.name[locale]}</h1>
          <p>{product.description[locale]}</p>

          {/* Prisberegneren modtager materialerne som props
          ?? [] sikrer at vi sender et tomt array hvis der ikke er nogen materialer */}
          <PriceCalculator materials={materials ?? []} />
        </div>
      </section>

      {/* Viser relaterede produkter i samme kategori under produktinformationen
      ?? [] sikrer at vi sender et tomt array hvis der ikke er nogen relaterede produkter */}
      <ProductGrid
        products={relatedProducts ?? []}
        title={t("relatedproducts")}
      />
    </main>
  );
}
