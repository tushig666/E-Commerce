import { products } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './ProductDetailsClient';

export async function generateStaticParams() {
  return products.map(product => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-20">
      <ProductDetailsClient product={product} />
    </div>
  );
}
