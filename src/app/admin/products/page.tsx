import { getProducts } from "@/lib/firebase-service";
import { ProductsDataTable } from "./_components/ProductsDataTable";

export default async function AdminProductsPage() {
  // Fetch initial products on the server
  const initialProducts = await getProducts();

  // ProductsDataTable is a Client Component that will handle all state and interactions
  return (
    <ProductsDataTable initialProducts={initialProducts} />
  );
}
