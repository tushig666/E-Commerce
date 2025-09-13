import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/firebase-service';


// This is now a fallback for when Firestore is not available.
// The main data source is now Firestore.
export const staticProducts: Product[] = [
  {
    id: '1',
    name: 'Silk Trench Coat',
    description: 'A timeless trench coat crafted from pure silk. Features a classic double-breasted front, belted waist, and elegant storm shield. The fluid drape of the silk creates a sophisticated silhouette.',
    price: 850,
    images: ['https://picsum.photos/seed/a1/900/1200', 'https://picsum.photos/seed/a2/900/1200'],
    category: 'Outerwear',
  },
  {
    id: '2',
    name: 'Cashmere Turtleneck',
    description: 'An essential for any luxury wardrobe, this turtleneck sweater is spun from the finest Mongolian cashmere. Incredibly soft and warm, it has a relaxed fit and ribbed trims.',
    price: 420,
    images: ['https://picsum.photos/seed/b1/900/1200', 'https://picsum.photos/seed/b2/900/1200'],
    category: 'Knitwear',
  },
  {
    id: '3',
    name: 'Leather Tote Bag',
    description: 'Expertly crafted in Italy from supple calf leather, this tote bag is designed with a minimalist aesthetic. It features a spacious interior, a secure zip pocket, and two top handles.',
    price: 1250,
    images: ['https://picsum.photos/seed/c1/900/1200', 'https://picsum.photos/seed/c2/900/1200'],
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Wool-blend Trousers',
    description: 'Tailored for a flattering wide-leg silhouette, these trousers are made from a luxurious wool-blend. They sit high on the waist and are finished with sharp pleats.',
    price: 380,
    images: ['https://picsum.photos/seed/d1/900/1200', 'https://picsum.photos/seed/d2/900/1200'],
    category: 'Trousers',
  },
  {
    id: '5',
    name: 'Satin Slip Dress',
    description: 'Cut from lustrous satin, this slip dress has a delicate cowl neckline and adjustable spaghetti straps. It skims the body, falling to a midi length. Perfect for evening events.',
    price: 550,
    images: ['https://picsum.photos/seed/e1/900/1200', 'https://picsum.photos/seed/e2/900/1200'],
    category: 'Dresses',
  },
  {
    id: '6',
    name: 'Velvet Loafers',
    description: 'These elegant loafers are made from plush velvet and topped with a subtle tonal emblem. Lined with smooth leather for comfort, they are set on a slight heel for all-day wear.',
    price: 610,
    images: ['https://picsum.photos/seed/f1/900/1200', 'https://picsum.photos/seed/f2/900/1200'],
    category: 'Shoes',
  },
];

export async function getCollections() {
    const products = await getProducts();
    return [
        {
            name: "New Arrivals",
            products: products.slice(0, 4),
        },
        {
            name: "Curated Classics",
            products: products.slice(2, 6),
        },
    ]
}
