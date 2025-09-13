'use client';

import { useEffect, useState } from 'react';
import { getProducts } from "@/lib/firebase-service";
import { ProductsDataTable } from "./_components/ProductsDataTable";
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="mt-6 rounded-lg border shadow-sm">
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    )
  }

  return (
    <div>
      <ProductsDataTable initialProducts={products} />
    </div>
  );
}
