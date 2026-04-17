export type Category = {
  id: number;
  slug: string;
  name: string;
  image: string;
  product_count: number;
};

export type Variant = {
  id: number;
  size: string;
  color: string;
  color_hex: string;
  stock: number;
  sku: string;
};

export type ProductImage = {
  id: number;
  url: string;
  alt: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  category: { id: number; slug: string; name: string };
  images: ProductImage[];
  variants: Variant[];
  in_stock: boolean;
  low_stock_threshold: number;
  created_at?: string;
};

export type ProductListResponse = {
  data: Product[];
  meta: { current_page: number; last_page: number; total: number };
};

export type ProductListParams = {
  category?: string;
  min_price?: number;
  max_price?: number;
  sort?: "newest" | "price_asc" | "price_desc";
  page?: number;
  per_page?: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type CartLine = {
  id: string;
  product_id: number;
  variant_id: number;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  color_hex: string;
  unit_price: number;
  quantity: number;
  max_stock: number;
};

export type OrderStatus = "placed" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type OrderItem = {
  product_id: number;
  name: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type ShippingAddress = {
  full_address: string;
  city: string;
  province: string;
  postal_code: string;
};

export type Customer = {
  name: string;
  phone: string;
  email?: string;
};

export type PaymentMethod = "cod" | "jazzcash" | "easypaisa";

export type Order = {
  id: string;
  placed_at: string;
  status: OrderStatus;
  customer: Customer;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: PaymentMethod;
  notes?: string;
};

export type CheckoutPayload = {
  customer: Customer;
  shipping_address: ShippingAddress;
  items: { product_id: number; variant_id: number; quantity: number; unit_price: number }[];
  payment_method: PaymentMethod;
  notes?: string;
};
