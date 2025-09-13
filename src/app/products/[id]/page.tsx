import { getProduct, getProducts } from '@/lib/firebase-service';
import { notFound } from 'next/navigation';
import ProductDetailsClient from './ProductDetailsClient';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(product => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-20">
      <ProductDetailsClient product={product} />
    </div>
  );
}
