'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { useAuth } from './useAuth';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export function useWishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    const loadWishlist = async () => {
      if (user) {
        const wishlistRef = doc(db, 'wishlists', user.uid);
        const wishlistSnap = await getDoc(wishlistRef);
        if (wishlistSnap.exists()) {
          setWishlist(wishlistSnap.data().productIds || []);
        } else {
          setWishlist([]);
        }
      } else {
        const localWishlist = localStorage.getItem('maison-wishlist');
        if (localWishlist) {
          setWishlist(JSON.parse(localWishlist));
        }
      }
    };
    loadWishlist();
  }, [user]);

  const updateWishlist = async (newWishlist: string[]) => {
    setWishlist(newWishlist);
    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      await setDoc(wishlistRef, { productIds: newWishlist });
    } else {
      localStorage.setItem('maison-wishlist', JSON.stringify(newWishlist));
    }
  };

  const toggleWishlist = useCallback(async (product: Product) => {
    const isInWishlist = wishlist.includes(product.id);
    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      if (isInWishlist) {
        await updateDoc(wishlistRef, { productIds: arrayRemove(product.id) });
        setWishlist(prev => prev.filter(id => id !== product.id));
        toast({
          title: 'Removed from Wishlist',
          description: `${product.name} has been removed from your wishlist.`,
        });
      } else {
        await updateDoc(wishlistRef, { productIds: arrayUnion(product.id) });
        setWishlist(prev => [...prev, product.id]);
        toast({
          title: 'Added to Wishlist',
          description: `${product.name} has been added to your wishlist.`,
        });
      }
    } else {
      // Non-logged-in user logic
      const newWishlist = isInWishlist
        ? wishlist.filter(id => id !== product.id)
        : [...wishlist, product.id];
      updateWishlist(newWishlist);
      toast({
        title: isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
        description: `${product.name} has been ${isInWishlist ? 'removed from' : 'added to'} your wishlist.`,
      });
    }
  }, [wishlist, user, toast]);

  const isInWishlist = useCallback((productId: string) => {
    return isMounted ? wishlist.includes(productId) : false;
  }, [wishlist, isMounted]);
  
  const wishlistCount = isMounted ? wishlist.length : 0;

  return { wishlist, toggleWishlist, isInWishlist, wishlistCount, isWishlistMounted: isMounted };
}
