import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';

const footerLinks = [
  { title: "Shop", links: [{ href: "/products", label: "All" }, { href: "/#collections", label: "Collections" }] },
  { title: "About", links: [{ href: "/our-story", label: "Our Story" }, { href: "/contact", label: "Contact" }] },
  { title: "Help", links: [{ href: "/faq", label: "FAQ" }, { href: "/shipping", label: "Shipping" }, { href: "/returns", label: "Returns" }] },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm uppercase tracking-wider md:col-span-3 md:grid-cols-3">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-bold">{section.title}</h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-black/10 pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Maison Éclat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
