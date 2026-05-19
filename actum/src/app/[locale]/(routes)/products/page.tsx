import { Suspense } from "react";
import ProductsContent from "./components/products_content";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const locale = (await getLocale()) as "da" | "en";

  return (
    <main className="full-bleed grid grid-cols-subgrid">
      <Suspense fallback={<p>Loading products...</p>}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
