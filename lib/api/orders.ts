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
  const res = await apiClient.post<{ data: Order }>("/checkout", payload);
  return res.data.data;
}

export async function getOrders(): Promise<Order[]> {
  if (USE_MOCKS) {
    await delay(120);
    const raw = typeof window !== "undefined" ? localStorage.getItem("bsf_orders") : null;
    const stored: Order[] = raw ? JSON.parse(raw) : [];
    return [...stored, ...mockOrders];
  }
  const res = await apiClient.get<{ data: Order[] }>("/account/orders");
  return res.data.data;
}

export async function getOrder(id: string): Promise<Order | null> {
  if (USE_MOCKS) {
    await delay(80);
    const list = await getOrders();
    return list.find((o) => o.id === id) ?? null;
  }
  const res = await apiClient.get<{ data: Order }>(`/account/orders/${id}`);
  return res.data.data;
}
