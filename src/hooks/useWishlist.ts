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
      if (user && db) {
        const wishlistRef = doc(db, 'wishlists', user.uid);
        const wishlistSnap = await getDoc(wishlistRef);
        if (wishlistSnap.exists()) {
          setWishlist(wishlistSnap.data().productIds || []);
        } else {
          setWishlist([]);
        }
      } else if (!user) {
        const localWishlist = localStorage.getItem('maison-wishlist');
        if (localWishlist) {
            try {
                setWishlist(JSON.parse(localWishlist));
            } catch (error) {
                console.error("Failed to parse wishlist from localStorage", error);
                setWishlist([]);
            }
        }
      }
    };
    loadWishlist();
  }, [user]);

  const updateWishlist = async (newWishlist: string[]) => {
    setWishlist(newWishlist);
    if (user && db) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      await setDoc(wishlistRef, { productIds: newWishlist });
    } else if (!user) {
      localStorage.setItem('maison-wishlist', JSON.stringify(newWishlist));
    }
  };

  const toggleWishlist = useCallback(async (product: Product) => {
    const isInWishlist = wishlist.includes(product.id);
    if (user && db) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      try {
        if (isInWishlist) {
          await updateDoc(wishlistRef, { productIds: arrayRemove(product.id) });
          setWishlist(prev => prev.filter(id => id !== product.id));
          toast({
            title: 'Removed from Wishlist',
            description: `${product.name} has been removed from your wishlist.`,
          });
        } else {
          // Ensure the document exists before trying to update it with arrayUnion
          const wishlistSnap = await getDoc(wishlistRef);
          if (wishlistSnap.exists()) {
            await updateDoc(wishlistRef, { productIds: arrayUnion(product.id) });
          } else {
            await setDoc(wishlistRef, { productIds: [product.id] });
          }
          setWishlist(prev => [...prev, product.id]);
          toast({
            title: 'Added to Wishlist',
            description: `${product.name} has been added to your wishlist.`,
          });
        }
      } catch (error) {
          console.error("Error toggling wishlist in Firestore: ", error);
          toast({
              variant: 'destructive',
              title: 'Error updating wishlist',
              description: 'Could not update your wishlist. Please try again.'
          })
      }
    } else if (!user) {
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
