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
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-6xl uppercase tracking-widest md:text-8xl lg:text-9xl">Éclat</h1>
          <p className="mt-4 max-w-xl text-lg uppercase tracking-wider text-white/90">Fall/Winter Collection</p>
          <Button asChild size="lg" className="mt-8 rounded-none border-2 border-white bg-transparent uppercase tracking-widest text-white hover:bg-white hover:text-black">
            <Link href="/products">Explore</Link>
          </Button>
        </div>
      </section>

      <div id="collections">
        {collections.map((collection) => (
          <section key={collection.name} className="py-16 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-12 text-center">
                <h2 className="font-headline text-5xl uppercase tracking-widest md:text-6xl">{collection.name}</h2>
              </div>
              <ProductGrid products={collection.products} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
