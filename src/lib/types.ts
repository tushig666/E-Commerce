export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
