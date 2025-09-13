'use client';

import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { CartSheet } from '@/components/cart/CartSheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/#collections', label: 'Collections' },
];

export function Header() {
  const { wishlistCount, isWishlistMounted } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full bg-black text-white transition-shadow duration-300",
      hasScrolled && "shadow-lg"
    )}>
      <div className={cn(
        "container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300",
        hasScrolled ? "h-20" : "h-24"
      )}>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 justify-start md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </div>

        <div className="flex flex-1 justify-center">
          <Link href="/">
            <Logo className="text-white" />
            <span className="sr-only">Maison Éclat Home</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" asChild className="relative hidden md:flex text-white">
            <Link href="/wishlist">
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

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 h-screen w-screen bg-background p-6 transition-transform duration-300 md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6"/>
                <span className="sr-only">Close menu</span>
            </Button>
        </div>
        <nav className="mt-12 flex flex-col gap-8">
            {navLinks.map(link => (
                <Link 
                    key={link.href} 
                    href={link.href} 
                    className="font-headline text-3xl uppercase tracking-widest text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    {link.label}
                </Link>
            ))}
             <Link 
                href="/wishlist" 
                className="font-headline text-3xl uppercase tracking-widest text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
            >
                Wishlist
            </Link>
        </nav>
      </div>
    </header>
  );
}
