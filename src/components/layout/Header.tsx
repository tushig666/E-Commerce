'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { CartSheet } from '@/components/cart/CartSheet';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/#collections', label: 'Collections' },
];

export function Header() {
  const { wishlistCount, isWishlistMounted } = useWishlist();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-1 justify-start md:justify-center">
          <Link href="/">
            <Logo />
            <span className="sr-only">Maison Éclat Home</span>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {isWishlistMounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
               <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
