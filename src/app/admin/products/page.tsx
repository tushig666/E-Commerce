import { getProducts } from "@/lib/firebase-service";
import { ProductsDataTable } from "./_components/ProductsDataTable";

export default async function AdminProductsPage() {
  const initialProducts = await getProducts();
  return (
    <ProductsDataTable initialProducts={initialProducts} />
  );
}
