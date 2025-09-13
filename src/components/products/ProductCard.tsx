'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find(img => img.id === imageId);
    return image ? image.imageUrl : 'https://placehold.co/900x1200';
  }
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="group relative">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[3/4] w-full overflow-hidden bg-secondary">
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            width={900}
            height={1200}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="fashion product"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-foreground">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-foreground">${product.price}</p>
        </div>
      </Link>
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <Button 
          size="icon" 
          variant="secondary"
          className="h-9 w-9 rounded-full shadow-sm"
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          <Heart className={cn("h-4 w-4", isInWishlist(product.id) ? "fill-primary text-primary" : "text-foreground")} />
        </Button>
        <Button 
          size="icon" 
          variant="secondary"
          className="h-9 w-9 rounded-full shadow-sm"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <ShoppingBag className="h-4 w-4 text-foreground" />
        </Button>
      </div>
    </div>
  );
}
