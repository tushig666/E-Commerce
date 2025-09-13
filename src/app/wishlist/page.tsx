'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useWishlist } from '@/hooks/useWishlist';
import { getProducts } from '@/lib/firebase-service';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function WishlistPage() {
  const { wishlist, isWishlistMounted } = useWishlist();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      const products = await getProducts();
      setAllProducts(products);
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const wishlistedProducts = isWishlistMounted
    ? allProducts.filter(p => wishlist.includes(p.id))
    : [];

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="pb-10 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Wishlist</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Your curated collection of favorite pieces.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="group relative">
              <Skeleton className="aspect-[3/4] w-full" />
              <div className="mt-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : isWishlistMounted && wishlistedProducts.length > 0 ? (
        <ProductGrid products={wishlistedProducts} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border py-24 text-center">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="font-headline text-2xl">Your wishlist is empty</h2>
          <p className="text-muted-foreground">Add items you love to your wishlist to see them here.</p>
          <Button asChild>
            <Link href="/products">Discover Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
