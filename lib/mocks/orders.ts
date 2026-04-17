import type { Order } from "@/types";

export const mockOrders: Order[] = [
  {
    id: "BSF-100234",
    placed_at: "2026-04-10T10:30:00Z",
    status: "shipped",
    customer: { name: "Ayesha Khan", phone: "03331234567", email: "ayesha@example.com" },
    shipping_address: {
      full_address: "House 14, Street 8, DHA Phase 5",
      city: "Karachi",
      province: "Sindh",
      postal_code: "75500",
    },
    items: [
      {
        product_id: 101,
        name: "Emerald Embroidered Kurta Shalwar",
        slug: "emerald-embroidered-kurta-shalwar",
        image:
          "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&auto=format&fit=crop&q=70",
        size: "4-5Y",
        color: "Emerald Green",
        quantity: 1,
        unit_price: 3990,
        line_total: 3990,
      },
    ],
    subtotal: 3990,
    shipping_fee: 250,
    total: 4240,
    payment_method: "cod",
  },
  {
    id: "BSF-100189",
    placed_at: "2026-03-25T14:12:00Z",
    status: "delivered",
    customer: { name: "Ayesha Khan", phone: "03331234567" },
    shipping_address: {
      full_address: "House 14, Street 8, DHA Phase 5",
      city: "Karachi",
      province: "Sindh",
      postal_code: "75500",
    },
    items: [
      {
        product_id: 104,
        name: "Royal Blue Sherwani Set",
        slug: "royal-blue-sherwani-set",
        image:
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&auto=format&fit=crop&q=70",
        size: "6-7Y",
        color: "Royal Blue",
        quantity: 1,
        unit_price: 8490,
        line_total: 8490,
      },
      {
        product_id: 111,
        name: "Everyday White Cotton Kurta",
        slug: "cotton-white-daily-kurta",
        image:
          "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=400&auto=format&fit=crop&q=70",
        size: "6-7Y",
        color: "White",
        quantity: 2,
        unit_price: 1690,
        line_total: 3380,
      },
    ],
    subtotal: 11870,
    shipping_fee: 0,
    total: 11870,
    payment_method: "jazzcash",
  },
];
