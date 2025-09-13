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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Cashmere Turtleneck',
    description: 'An essential for any luxury wardrobe, this turtleneck sweater is spun from the finest Mongolian cashmere. Incredibly soft and warm, it has a relaxed fit and ribbed trims.',
    price: 420,
    images: ['https://picsum.photos/seed/b1/900/1200', 'https://picsum.photos/seed/b2/900/1200'],
    category: 'Knitwear',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Leather Tote Bag',
    description: 'Expertly crafted in Italy from supple calf leather, this tote bag is designed with a minimalist aesthetic. It features a spacious interior, a secure zip pocket, and two top handles.',
    price: 1250,
    images: ['https://picsum.photos/seed/c1/900/1200', 'https://picsum.photos/seed/c2/900/1200'],
    category: 'Accessories',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Wool-blend Trousers',
    description: 'Tailored for a flattering wide-leg silhouette, these trousers are made from a luxurious wool-blend. They sit high on the waist and are finished with sharp pleats.',
    price: 380,
    images: ['https://picsum.photos/seed/d1/900/1200', 'https://picsum.photos/seed/d2/900/1200'],
    category: 'Trousers',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Satin Slip Dress',
    description: 'Cut from lustrous satin, this slip dress has a delicate cowl neckline and adjustable spaghetti straps. It skims the body, falling to a midi length. Perfect for evening events.',
    price: 550,
    images: ['https://picsum.photos/seed/e1/900/1200', 'https://picsum.photos/seed/e2/900/1200'],
    category: 'Dresses',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Velvet Loafers',
    description: 'These elegant loafers are made from plush velvet and topped with a subtle tonal emblem. Lined with smooth leather for comfort, they are set on a slight heel for all-day wear.',
    price: 610,
    images: ['https://picsum.photos/seed/f1/900/1200', 'https://picsum.photos/seed/f2/900/1200'],
    category: 'Shoes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Linen-Blend Blazer',
    description: 'A relaxed-fit single-breasted blazer made from a high-quality linen and cotton blend. Perfect for smart-casual occasions, it features notched lapels and front flap pockets.',
    price: 590,
    images: ['https://picsum.photos/seed/g1/900/1200', 'https://picsum.photos/seed/g2/900/1200'],
    category: 'Outerwear',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'A-Line Denim Skirt',
    description: 'A classic A-line skirt crafted from premium raw denim. It features a high-waist fit, front button closure, and practical side pockets. A versatile piece for year-round styling.',
    price: 290,
    images: ['https://picsum.photos/seed/h1/900/1200', 'https://picsum.photos/seed/h2/900/1200'],
    category: 'Skirts',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Classic Leather Belt',
    description: 'A minimalist leather belt with a polished gold-tone buckle. Crafted from smooth, genuine leather, it is the perfect finishing touch for both trousers and dresses.',
    price: 180,
    images: ['https://picsum.photos/seed/i1/900/1200', 'https://picsum.photos/seed/i2/900/1200'],
    category: 'Accessories',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Acetate Cat-Eye Sunglasses',
    description: 'Sculptural cat-eye sunglasses made from premium acetate. Offering 100% UV protection, they feature dark-tinted lenses and are detailed with a subtle logo at the temple.',
    price: 350,
    images: ['https://picsum.photos/seed/j1/900/1200', 'https://picsum.photos/seed/j2/900/1200'],
    category: 'Accessories',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
