import { apiClient, USE_MOCKS, delay } from "./client";
import { mockOrders } from "@/lib/mocks/orders";
import type { CheckoutPayload, Order } from "@/types";

const SHIPPING_FREE_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

function newOrderId() {
  return "BSF-" + Math.floor(100000 + Math.random() * 900000).toString();
}

export async function placeOrder(payload: CheckoutPayload): Promise<Order> {
  if (USE_MOCKS) {
    await delay(500);
    const subtotal = payload.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
    const shipping_fee = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FEE;
    const order: Order = {
      id: newOrderId(),
      placed_at: new Date().toISOString(),
      status: "placed",
      customer: payload.customer,
      shipping_address: payload.shipping_address,
      items: payload.items.map((i) => ({
        product_id: i.product_id,
        name: `Product #${i.product_id}`,
        slug: "",
        image: "",
        size: "",
        color: "",
        quantity: i.quantity,
        unit_price: i.unit_price,
        line_total: i.unit_price * i.quantity,
      })),
      subtotal,
      shipping_fee,
      total: subtotal + shipping_fee,
      payment_method: payload.payment_method,
      notes: payload.notes,
    };
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("bsf_orders");
      const existing: Order[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem("bsf_orders", JSON.stringify([order, ...existing]));
    }
    return order;
  }

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
      name: `Product #${i.product_id}`,
      price: i.unit_price,
      quantity: i.quantity,
      size: "",
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
      name: `Product #${i.product_id}`,
      slug: "",
      image: "",
      size: "",
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
  if (USE_MOCKS) {
    await delay(120);
    const raw = typeof window !== "undefined" ? localStorage.getItem("bsf_orders") : null;
    const stored: Order[] = raw ? JSON.parse(raw) : [];
    return [...stored, ...mockOrders];
  }
  // Backend doesn't have a customer-facing order list API
  // Fall back to locally stored orders
  const raw = typeof window !== "undefined" ? localStorage.getItem("bsf_orders") : null;
  const stored: Order[] = raw ? JSON.parse(raw) : [];
  return stored;
}

export async function getOrder(id: string): Promise<Order | null> {
  if (USE_MOCKS) {
    await delay(80);
    const list = await getOrders();
    return list.find((o) => o.id === id) ?? null;
  }
  // Fall back to locally stored orders
  const list = await getOrders();
  return list.find((o) => o.id === id) ?? null;
}
