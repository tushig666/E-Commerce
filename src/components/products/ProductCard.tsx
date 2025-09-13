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
    <div className="group relative text-center">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            width={900}
            height={1200}
            className="h-full w-full object-cover object-center transition-opacity duration-500 group-hover:opacity-75"
            data-ai-hint="fashion product"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 group-hover:bg-black/20 group-hover:opacity-100">
             <Button 
              variant="secondary"
              className="rounded-none uppercase tracking-widest"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <p className="mt-1 text-lg font-medium text-foreground">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}
