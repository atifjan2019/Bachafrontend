import { apiClient } from "./client";
import type { CheckoutPayload, Order, OrderStatus } from "@/types";

const SHIPPING_FREE_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

function newOrderId() {
  return "BSF-" + Math.floor(100000 + Math.random() * 900000).toString();
}

const STATUS_MAP: Record<string, OrderStatus> = {
  "pending": "placed",
  "placed": "placed",
  "confirmed": "confirmed",
  "processing": "confirmed",
  "shipped": "shipped",
  "delivered": "delivered",
  "cancelled": "cancelled",
  "canceled": "cancelled",
};

function normalizeStatus(raw: string): OrderStatus {
  return STATUS_MAP[raw.toLowerCase()] ?? "placed";
}
export async function placeOrder(payload: CheckoutPayload): Promise<Order> {
  // Transform frontend checkout payload into backend's flat format
  const subtotal = payload.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const shipping_fee = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FEE;
  const total_amount = subtotal + shipping_fee;

  const backendPayload = {
    customer_name: payload.customer.name,
    customer_email: payload.customer.email || "",
    customer_phone: payload.customer.phone,
    shipping_address: payload.shipping_address.full_address,
    city: payload.shipping_address.city,
    country: "Pakistan",
    items: payload.items.map((i) => ({
      name: i.name,
      price: i.unit_price,
      quantity: i.quantity,
      size: i.size,
    })),
    subtotal,
    shipping_fee,
    total_amount,
    payment_method: payload.payment_method === "cod" ? "Cash on Delivery" : payload.payment_method,
  };

  const res = await apiClient.post("/orders", backendPayload);
  const data = res.data.data ?? res.data;

  // Map backend response to frontend Order type
  return {
    id: String(data.id ?? newOrderId()),
    placed_at: new Date().toISOString(),
    status: "placed",
    customer: payload.customer,
    shipping_address: payload.shipping_address,
    items: payload.items.map((i) => ({
      product_id: i.product_id,
      name: i.name,
      slug: "",
      image: "",
      size: i.size,
      color: "",
      quantity: i.quantity,
      unit_price: i.unit_price,
      line_total: i.unit_price * i.quantity,
    })),
    subtotal,
    shipping_fee,
    total: total_amount,
    payment_method: payload.payment_method,
    notes: payload.notes,
  };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const res = await apiClient.get<{ data: Order[] }>("/account/orders");
    const data = res.data.data ?? res.data;
    if (data && Array.isArray(data)) {
      return data.map((d: any) => ({
        id: String(d.id),
        placed_at: d.created_at,
        status: normalizeStatus(d.status),
        customer: { name: d.customer_name, email: d.customer_email, phone: d.customer_phone },
        shipping_address: { full_address: d.shipping_address, city: d.city, province: "", postal_code: "" },
        items: (d.items || []).map((item: any) => ({
          product_id: item.product_id || 0,
          name: item.name,
          slug: item.slug || "",
          image: item.image || "",
          size: item.size || "",
          color: item.color || "",
          quantity: item.quantity,
          unit_price: item.unit_price ?? item.price ?? 0,
          line_total: item.line_total ?? (item.unit_price ?? item.price ?? 0) * item.quantity,
        })),
        subtotal: d.subtotal || 0,
        shipping_fee: d.shipping_fee || 0,
        total: d.total_amount || 0,
        payment_method: d.payment_method,
        notes: d.notes,
      }));
    }
  } catch (e) {
    // API request failed (likely unauthenticated)
  }

  // Fall back to locally stored guest orders
  const raw = typeof window !== "undefined" ? localStorage.getItem("bsf_orders") : null;
  const stored: Order[] = raw ? JSON.parse(raw) : [];
  return stored;
}

export async function getOrder(id: string): Promise<Order | null> {
  try {
    const res = await apiClient.get<{ data: any }>(`/account/orders/${id}`);
    const d = res.data.data ?? res.data;
    if (d) {
      return {
        id: String(d.id),
        placed_at: d.created_at,
        status: normalizeStatus(d.status),
        customer: { name: d.customer_name, email: d.customer_email, phone: d.customer_phone },
        shipping_address: { full_address: d.shipping_address, city: d.city, province: "", postal_code: "" },
        items: (d.items || []).map((item: any) => ({
          product_id: item.product_id || 0,
          name: item.name,
          slug: item.slug || "",
          image: item.image || "",
          size: item.size || "",
          color: item.color || "",
          quantity: item.quantity,
          unit_price: item.unit_price ?? item.price ?? 0,
          line_total: item.line_total ?? (item.unit_price ?? item.price ?? 0) * item.quantity,
        })),
        subtotal: d.subtotal || 0,
        shipping_fee: d.shipping_fee || 0,
        total: d.total_amount || 0,
        payment_method: d.payment_method,
        notes: d.notes,
      };
    }
  } catch (e) {
    // Unauthenticated or not found in API
  }

  // Fall back to locally stored guest orders
  const list = await getOrders();
  return list.find((o) => String(o.id) === String(id)) ?? null;
}
