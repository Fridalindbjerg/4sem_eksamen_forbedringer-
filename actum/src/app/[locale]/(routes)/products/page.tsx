import { Suspense } from "react";
import ProductsContent from "./components/products_content";
import ProductsContentSkeleton from "../global_components/skeleton";

export default async function ProductsPage() {
  return (
    <main className="full-bleed grid grid-cols-subgrid">
      <Suspense fallback={<ProductsContentSkeleton />}>
        <ProductsContent />
      </Suspense>
    </main>
  );
}
