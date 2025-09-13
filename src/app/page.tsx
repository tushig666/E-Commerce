import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { collections } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero');

  return (
    <div>
      <section className="relative h-screen w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint="editorial fashion"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center text-white">
          <p className="text-lg uppercase tracking-widest text-white/90">Modern Luxury</p>
          <h1 className="font-headline text-7xl uppercase md:text-8xl lg:text-9xl">Maison Éclat</h1>
          <Button asChild size="lg" variant="outline" className="mt-8 rounded-full border-2 border-white bg-transparent px-10 py-6 text-base uppercase tracking-widest text-white backdrop-blur-sm hover:bg-white hover:text-black">
            <Link href="/products">Explore the Collection</Link>
          </Button>
        </div>
      </section>

      <div id="collections">
        {collections.map((collection) => (
          <section key={collection.name} className="py-24 sm:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-16 text-center">
                <h2 className="font-headline text-5xl md:text-6xl">{collection.name}</h2>
              </div>
              <ProductGrid products={collection.products} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
