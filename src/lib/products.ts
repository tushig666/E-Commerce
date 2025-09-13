import type { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Trench Coat',
    description: 'A timeless trench coat crafted from pure silk. Features a classic double-breasted front, belted waist, and elegant storm shield. The fluid drape of the silk creates a sophisticated silhouette.',
    price: 850,
    images: ['1', '2'],
    category: 'Outerwear',
  },
  {
    id: '2',
    name: 'Cashmere Turtleneck',
    description: 'An essential for any luxury wardrobe, this turtleneck sweater is spun from the finest Mongolian cashmere. Incredibly soft and warm, it has a relaxed fit and ribbed trims.',
    price: 420,
    images: ['3', '4'],
    category: 'Knitwear',
  },
  {
    id: '3',
    name: 'Leather Tote Bag',
    description: 'Expertly crafted in Italy from supple calf leather, this tote bag is designed with a minimalist aesthetic. It features a spacious interior, a secure zip pocket, and two top handles.',
    price: 1250,
    images: ['5', '6'],
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Wool-blend Trousers',
    description: 'Tailored for a flattering wide-leg silhouette, these trousers are made from a luxurious wool-blend. They sit high on the waist and are finished with sharp pleats.',
    price: 380,
    images: ['7', '8'],
    category: 'Trousers',
  },
  {
    id: '5',
    name: 'Satin Slip Dress',
    description: 'Cut from lustrous satin, this slip dress has a delicate cowl neckline and adjustable spaghetti straps. It skims the body, falling to a midi length. Perfect for evening events.',
    price: 550,
    images: ['9', '10'],
    category: 'Dresses',
  },
  {
    id: '6',
    name: 'Velvet Loafers',
    description: 'These elegant loafers are made from plush velvet and topped with a subtle tonal emblem. Lined with smooth leather for comfort, they are set on a slight heel for all-day wear.',
    price: 610,
    images: ['11', '12'],
    category: 'Shoes',
  },
];

export const collections = [
  {
    name: "New Arrivals",
    products: products.slice(0, 4),
  },
  {
    name: "Curated Classics",
    products: products.slice(2, 6),
  },
]
