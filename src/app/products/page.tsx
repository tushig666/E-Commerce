import { ProductGrid } from '@/components/products/ProductGrid';
import { products } from '@/lib/products';

export default function ProductsPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="pb-10 text-center">
            <h1 className="font-headline text-4xl tracking-tight sm:text-5xl">All Products</h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                Explore our full range of meticulously crafted pieces, designed for the modern wardrobe.
            </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
