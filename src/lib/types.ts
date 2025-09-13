export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // URLs of the images
  category: string;
  createdAt: string; // ISO 8601 string format
  updatedAt?: string; // ISO 8601 string format
};

export type CartItem = {
  product: Product;
  quantity: number;
};
