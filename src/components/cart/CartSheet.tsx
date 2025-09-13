'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export function CartSheet() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, isCartMounted } = useCart();

  const getImageUrl = (imageId: string) => {
    const image = PlaceHolderImages.find(img => img.id === imageId);
    return image ? image.imageUrl : 'https://placehold.co/900x1200';
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white">
          <ShoppingBag className="h-5 w-5" />
          {isCartMounted && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {isCartMounted && cart.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 px-6 py-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={getImageUrl(item.product.images[0])}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="px-6 py-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <div className="text-center">
                  <Button variant="link" asChild>
                    <Link href="/cart">
                      View Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h3 className="font-headline text-2xl">Your cart is empty</h3>
            <p className="text-muted-foreground">Add items to your cart to see them here.</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
