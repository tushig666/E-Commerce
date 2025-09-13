'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find(img => img.id === imageId);
    return image ? image.imageUrl : 'https://placehold.co/900x1200';
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="group relative text-left">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            width={900}
            height={1200}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="fashion product"
          />
           <div className="absolute inset-x-0 bottom-0 p-4">
             <Button 
              variant="secondary"
              className="w-full rounded-md uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-bold tracking-wide text-foreground">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}
