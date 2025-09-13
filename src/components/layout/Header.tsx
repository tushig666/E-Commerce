'use client';

import Link from 'next/link';
import { Heart, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { CartSheet } from '@/components/cart/CartSheet';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/#collections', label: 'Collections' },
];

export function Header() {
  const { wishlistCount, isWishlistMounted } = useWishlist();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full bg-black text-white shadow-lg">
      <div className={cn(
        "container mx-auto flex items-center justify-between px-4 md:px-6 transition-all duration-300 h-20"
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
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <User className="h-5 w-5" />
                <span className="sr-only">User Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {user ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                   <DropdownMenuItem asChild>
                    <Link href="/signin">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" asChild className="relative hidden md:flex text-white">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              {isWishlistMounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-medium text-black">
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
            <Separator />
            {user ? (
              <Button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} variant="ghost" className="justify-start p-0 font-headline text-3xl uppercase tracking-widest">Log Out</Button>
            ) : (
              <>
                <Link href="/signin" className="font-headline text-3xl uppercase tracking-widest text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link href="/signup" className="font-headline text-3xl uppercase tracking-widest text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
              </>
            )}
        </nav>
      </div>
    </header>
  );
}
