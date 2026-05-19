import { getPopularProducts } from "@/lib/products";
import ProductGrid from "../(routes)/global_components/product_grid";

export default async function IndexContent() {
    const popularProducts = await getPopularProducts();

    {/* ProductGrid er placeret i sin egen komponent, da den fetcher data via async funktion. Suspense er derfor lagt på index page, omkring denne komponent. */ }
    return (
        // Hvis popularProducts er null eller undefined, sendes en tom array for at undgå fejl i ProductGrid komponenten. 
        // Betyder, atsiden stadig loader, selv hvis der er problemer med datafetching.
        <ProductGrid
            products={popularProducts ?? []}
            title="Populære produkter"
        />
    );
}