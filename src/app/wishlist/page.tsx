'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

import { useWishlist } from '@/hooks/useWishlist';
import { products } from '@/lib/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { wishlist, isWishlistMounted } = useWishlist();

  const wishlistedProducts = isWishlistMounted ? products.filter(p => wishlist.includes(p.id)) : [];

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="pb-10 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Wishlist</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Your curated collection of favorite pieces.
        </p>
      </div>

      {isWishlistMounted && wishlistedProducts.length > 0 ? (
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
