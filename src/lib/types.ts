export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // Now holds URLs
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
