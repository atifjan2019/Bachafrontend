import { apiClient } from "./client";
import { getSettings } from "./settings";
import type { CheckoutPayload, Order, OrderStatus } from "@/types";

const newOrderId = () => "BSF-" + Math.floor(100000 + Math.random() * 900000).toString();

const STATUS_MAP: Record<string, OrderStatus> = {
  "pending": "pending",
  "paid": "paid",
  "processing": "processing",
  "shipped": "shipped",
  "delivered": "delivered",
  "cancelled": "cancelled",
  "canceled": "cancelled",
};

function normalizeStatus(raw: string): OrderStatus {
  return STATUS_MAP[raw.toLowerCase()] ?? "pending";
}

function mapBackendOrder(d: any): Order {
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
      quantity: Number(item.quantity),
      unit_price: Number(item.unit_price ?? item.price ?? 0),
      line_total: Number(item.line_total ?? (item.unit_price ?? item.price ?? 0) * item.quantity),
    })),
    subtotal: Number(d.subtotal) || 0,
    shipping_fee: Number(d.shipping_fee) || 0,
    total: Number(d.total_amount) || 0,
    payment_method: d.payment_method,
    notes: d.notes,
  };
}

export async function placeOrder(payload: CheckoutPayload): Promise<Order> {
  const settings = await getSettings();
  const baseFee = Number(settings.shipping_fee ?? 250);
  const threshold = Number(settings.free_shipping_threshold ?? 5000);

  const subtotal = payload.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const shipping_fee = subtotal >= threshold ? 0 : baseFee;
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

  const finalSubtotal = Number(data.subtotal ?? subtotal);
  const finalShipping = Number(data.shipping_fee ?? shipping_fee);
  const finalTotal = Number(data.total_amount ?? total_amount);

  // Map backend response to frontend Order type
  return {
    id: String(data.id ?? newOrderId()),
    placed_at: new Date().toISOString(),
    status: "pending",
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
    subtotal: finalSubtotal,
    shipping_fee: finalShipping,
    total: finalTotal,
    payment_method: payload.payment_method,
    notes: payload.notes,
  };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const res = await apiClient.get<{ data: Order[] }>("/account/orders");
    const data = res.data.data ?? res.data;
    if (data && Array.isArray(data)) {
      return data.map((d: any) => mapBackendOrder(d));
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
    // Try authenticated route first
    const res = await apiClient.get<{ data: any }>(`/account/orders/${id}`);
    const d = res.data.data ?? res.data;
    if (d) return mapBackendOrder(d);
  } catch (e) {
    try {
      // Fallback to public route (useful for guest success page)
      const res = await apiClient.get<{ data: any }>(`/orders/${id}`);
      const d = res.data.data ?? res.data;
      if (d) return mapBackendOrder(d);
    } catch (ee) {
      // Both API routes failed
    }
  }

  // Fall back to locally stored guest orders
  const list = await getOrders();
  return list.find((o) => String(o.id) === String(id)) ?? null;
}
