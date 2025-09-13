'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart.tsx';
import { useWishlist } from '@/hooks/useWishlist';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useBrowsingHistory } from '@/hooks/useBrowsingHistory';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addProductToHistory } = useBrowsingHistory();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  
  useEffect(() => {
    addProductToHistory(product);
  }, [product, addProductToHistory]);

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find(img => img.id === imageId);
    return image ? image.imageUrl : `https://placehold.co/900x1200?text=${product.name}`;
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex flex-row gap-2 overflow-x-auto md:flex-col md:gap-4">
          {product.images.map((imgId, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(imgId)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity",
                selectedImage === imgId ? "opacity-100 ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={getImageUrl(imgId)}
                alt={`${product.name} image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
        <div className="aspect-[3/4] flex-1">
          <Image
            src={getImageUrl(selectedImage)}
            alt={product.name}
            width={900}
            height={1200}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="py-4">
        <h1 className="font-headline text-3xl lg:text-4xl">{product.name}</h1>
        <p className="mt-2 text-2xl">${product.price.toFixed(2)}</p>

        <Separator className="my-6" />

        <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>
        
        <div className="mt-8 flex items-center gap-4">
          <Button size="lg" className="flex-1" onClick={() => addToCart(product)}>
            <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Button size="lg" variant="outline" className="px-4" onClick={() => toggleWishlist(product)}>
            <Heart className={cn("h-5 w-5", isInWishlist(product.id) ? "fill-primary text-primary" : "")} />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
