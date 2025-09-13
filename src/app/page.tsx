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
      <section className="relative h-[60vh] min-h-[400px] w-full bg-secondary md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">Timeless Silhouettes</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">Discover our new collection, where classic design meets modern sensibility.</p>
          <Button asChild size="lg" className="mt-8 bg-white/90 text-black hover:bg-white">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <div id="collections">
        {collections.map((collection) => (
          <section key={collection.name} className="py-16 sm:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-10 text-center">
                <h2 className="font-headline text-3xl md:text-4xl">{collection.name}</h2>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">Hand-picked styles just for you.</p>
              </div>
              <ProductGrid products={collection.products} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
