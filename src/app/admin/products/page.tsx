import { getProducts } from "@/lib/firebase-service";
import { ProductsDataTable } from "./_components/ProductsDataTable";

// This page remains a Server Component to fetch initial data.
export default async function AdminProductsPage() {
  const initialProducts = await getProducts();
  return (
    // The ProductsDataTable is a Client Component that handles all interactivity.
    <ProductsDataTable initialProducts={initialProducts} />
  );
}
