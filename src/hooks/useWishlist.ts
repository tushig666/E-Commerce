'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    const storedWishlist = localStorage.getItem('maison-wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('maison-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.includes(product.id);
      if (isInWishlist) {
        toast({
          title: 'Removed from Wishlist',
          description: `${product.name} has been removed from your wishlist.`,
        });
        return prevWishlist.filter(id => id !== product.id);
      } else {
        toast({
          title: 'Added to Wishlist',
          description: `${product.name} has been added to your wishlist.`,
        });
        return [...prevWishlist, product.id];
      }
    });
  }, [toast]);

  const isInWishlist = useCallback((productId: string) => {
    return isMounted ? wishlist.includes(productId) : false;
  }, [wishlist, isMounted]);
  
  const wishlistCount = isMounted ? wishlist.length : 0;

  return { wishlist: isMounted ? wishlist : [], toggleWishlist, isInWishlist, wishlistCount, isWishlistMounted: isMounted };
}
