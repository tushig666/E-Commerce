'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';

import { useCart } from '@/hooks/useCart.tsx';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, isCartMounted } = useCart();

  if (!isCartMounted) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="pb-10 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl">Shopping Cart</h1>
        </div>
        <p className="text-center">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="pb-10 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl">Shopping Cart</h1>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row">
                  <div className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-md sm:h-24 sm:w-24">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between sm:mt-0 sm:justify-normal sm:gap-6">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="w-20 text-right font-medium sm:hidden">${(item.product.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => removeFromCart(item.product.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-headline text-2xl">Order Summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-muted-foreground">Calculated at next step</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border py-24 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="font-headline text-2xl">Your cart is empty</h2>
          <p className="text-muted-foreground">Add items to your cart to see them here.</p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
