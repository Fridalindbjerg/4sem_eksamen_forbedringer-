import { Link } from "@i18n/navigation";
import { getAllProducts } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import GlobalH1Section from "../../global_components/global-h1-section";
import ProductImage from "../../global_components/product_image";
import ProductFilter from "./products_filter";

export default async function ProductsPage() {
  // Henter alle produkter fra databasen
  const products = await getAllProducts();

  // Henter oversættelser og det aktuelle sprog
  const t = await getTranslations("products");
  const locale = (await getLocale()) as "da" | "en";

  return (
    <section className="section content">
      <GlobalH1Section title={t("title")} />
      <ProductFilter products={products} locale={locale} />
    </section>
  );
}
