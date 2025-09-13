export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Now holds URLs
  category: string;
  createdAt?: string; // Should be a serializable format like ISO string for client
};

export type CartItem = {
  product: Product;
  quantity: number;
};
