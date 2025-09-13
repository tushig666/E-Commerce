import { getProducts } from "@/lib/firebase-service";
import { ProductsDataTable } from "./_components/ProductsDataTable";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <ProductsDataTable initialProducts={products} />
    </div>
  );
}
