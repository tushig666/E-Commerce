import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '../ui/button';

const footerLinks = [
  { title: "Shop", links: [{ href: "/products", label: "All" }, { href: "#", label: "New Arrivals" }, { href: "#", label: "Collections" }] },
  { title: "About", links: [{ href: "#", label: "Our Story" }, { href: "#", label: "Sustainability" }, { href: "#", label: "Contact" }] },
  { title: "Help", links: [{ href: "#", label: "FAQ" }, { href: "#", label: "Shipping" }, { href: "#", label: "Returns" }] },
];

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Gmail", href: "mailto:support@maisoneclat.com" },
];

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-start md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">Modern luxury for the discerning individual.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-headline text-lg">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Maison Éclat. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="sm" asChild>
                <Link href={link.href}>
                  {link.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
