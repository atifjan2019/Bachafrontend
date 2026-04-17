import type { Product, Variant } from "@/types";

const SIZES_KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"];

const img = (seed: string, w = 1000) =>
  `https://images.unsplash.com/${seed}?w=${w}&auto=format&fit=crop&q=70`;

const eid = { id: 1, slug: "eid-collection", name: "Eid Collection" };
const shaadi = { id: 2, slug: "shaadi-wear", name: "Shaadi Wear" };
const mehndi = { id: 3, slug: "mehndi-nights", name: "Mehndi Nights" };
const everyday = { id: 4, slug: "everyday-kurtas", name: "Everyday Kurtas" };

function variants(start: number, colors: { c: string; hex: string }[], stocks: number[] = [8, 5, 3, 2, 0]): Variant[] {
  const out: Variant[] = [];
  let id = start;
  for (const color of colors) {
    SIZES_KIDS.forEach((size, i) => {
      out.push({
        id: id++,
        size,
        color: color.c,
        color_hex: color.hex,
        stock: stocks[i % stocks.length],
        sku: `BSF-${start}-${color.c.slice(0, 3).toUpperCase()}-${size}`,
      });
    });
  }
  return out;
}

export const mockProducts: Product[] = [
  {
    id: 101,
    slug: "emerald-embroidered-kurta-shalwar",
    name: "Emerald Embroidered Kurta Shalwar",
    description:
      "A rich emerald green kurta with hand-inspired zari detail on the neckline. Paired with a matching shalwar. Cut in breathable cotton-silk, perfect for Eid namaz and family get-togethers.",
    price: 4990,
    sale_price: 3990,
    category: eid,
    images: [
      { id: 1, url: img("photo-1503944583220-79d8926ad5e2"), alt: "Emerald kurta front" },
      { id: 2, url: img("photo-1519741497674-611481863552"), alt: "Emerald kurta detail" },
      { id: 3, url: img("photo-1517420704952-d9f39e95b43e"), alt: "Emerald kurta lifestyle" },
    ],
    variants: variants(1001, [
      { c: "Emerald Green", hex: "#0B6E4F" },
      { c: "Ivory", hex: "#F4EBDD" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-04-01",
  },
  {
    id: 102,
    slug: "crimson-chand-frock",
    name: "Crimson Chand Frock",
    description:
      "A festive crimson frock with a crescent moon motif on the yoke. Soft inner lining, scalloped hemline. Made for the littlest Eid star of the family.",
    price: 5490,
    sale_price: null,
    category: eid,
    images: [
      { id: 1, url: img("photo-1519699047748-de8e457a634e"), alt: "Crimson frock" },
      { id: 2, url: img("photo-1516483638261-f4dbaf036963"), alt: "Crimson frock detail" },
    ],
    variants: variants(1101, [
      { c: "Crimson", hex: "#9B1B30" },
      { c: "Blush", hex: "#E5B5B1" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-04-03",
  },
  {
    id: 103,
    slug: "ivory-mirror-work-kurta",
    name: "Ivory Mirror Work Kurta",
    description:
      "Ivory cotton kurta with tiny mirror clusters hand-stitched along the placket. A heritage favourite that photographs beautifully in evening light.",
    price: 4200,
    sale_price: null,
    category: eid,
    images: [{ id: 1, url: img("photo-1515488042361-ee00e0ddd4e4"), alt: "Ivory mirror kurta" }],
    variants: variants(1201, [
      { c: "Ivory", hex: "#F4EBDD" },
      { c: "Mint", hex: "#B7D8C7" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-03-29",
  },
  {
    id: 104,
    slug: "royal-blue-sherwani-set",
    name: "Royal Blue Sherwani Set",
    description:
      "A regal sherwani with gold dori buttons, paired with a soft white shalwar. For ring ceremonies and baraat nights where your little prince takes centre stage.",
    price: 9990,
    sale_price: 8490,
    category: shaadi,
    images: [
      { id: 1, url: img("photo-1519699047748-de8e457a634e"), alt: "Royal blue sherwani" },
      { id: 2, url: img("photo-1515488042361-ee00e0ddd4e4"), alt: "Sherwani detail" },
    ],
    variants: variants(1301, [
      { c: "Royal Blue", hex: "#1F3A93" },
      { c: "Midnight", hex: "#0E1B3A" },
    ]),
    in_stock: true,
    low_stock_threshold: 2,
    created_at: "2026-03-18",
  },
  {
    id: 105,
    slug: "gold-dori-waistcoat-kurta",
    name: "Gold Dori Waistcoat Kurta",
    description:
      "White kurta-shalwar layered with a gold dori waistcoat. A refined three-piece for nikkah and valima functions.",
    price: 7490,
    sale_price: null,
    category: shaadi,
    images: [{ id: 1, url: img("photo-1517420704952-d9f39e95b43e"), alt: "Gold dori waistcoat" }],
    variants: variants(1401, [
      { c: "Ivory Gold", hex: "#E9D9A8" },
      { c: "Black Gold", hex: "#1A1A1A" },
    ]),
    in_stock: true,
    low_stock_threshold: 2,
    created_at: "2026-03-10",
  },
  {
    id: 106,
    slug: "peach-anarkali-frock",
    name: "Peach Anarkali Frock",
    description:
      "A flowing anarkali in soft peach with delicate thread work along the chest. Twirl-approved for every shaadi photo.",
    price: 6990,
    sale_price: 5990,
    category: shaadi,
    images: [{ id: 1, url: img("photo-1519741497674-611481863552"), alt: "Peach anarkali" }],
    variants: variants(1501, [
      { c: "Peach", hex: "#F5B48A" },
      { c: "Champagne", hex: "#E6D4A8" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-03-22",
  },
  {
    id: 107,
    slug: "mustard-mehndi-kurta",
    name: "Mustard Mehndi Kurta",
    description:
      "Sunny mustard kurta with gota detail along the hemline. Pair with white pajama for dholki nights.",
    price: 4490,
    sale_price: null,
    category: mehndi,
    images: [{ id: 1, url: img("photo-1516483638261-f4dbaf036963"), alt: "Mustard mehndi kurta" }],
    variants: variants(1601, [
      { c: "Mustard", hex: "#D4A017" },
      { c: "Henna Green", hex: "#556B2F" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-03-28",
  },
  {
    id: 108,
    slug: "fuchsia-mirror-lehenga",
    name: "Fuchsia Mirror Lehenga",
    description:
      "A twirly fuchsia lehenga with mirror work choli and dupatta. Built for dhol beats and dance numbers.",
    price: 8490,
    sale_price: 7490,
    category: mehndi,
    images: [{ id: 1, url: img("photo-1503944583220-79d8926ad5e2"), alt: "Fuchsia lehenga" }],
    variants: variants(1701, [
      { c: "Fuchsia", hex: "#C2185B" },
      { c: "Orange", hex: "#E55B13" },
    ]),
    in_stock: true,
    low_stock_threshold: 2,
    created_at: "2026-03-25",
  },
  {
    id: 109,
    slug: "henna-green-kurta-pajama",
    name: "Henna Green Kurta Pajama",
    description:
      "Henna green kurta with tonal embroidery on the cuffs. A soft, photo-ready choice for mehndi afternoons.",
    price: 5290,
    sale_price: null,
    category: mehndi,
    images: [{ id: 1, url: img("photo-1515488042361-ee00e0ddd4e4"), alt: "Henna green kurta" }],
    variants: variants(1801, [{ c: "Henna Green", hex: "#556B2F" }]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-03-15",
  },
  {
    id: 110,
    slug: "marigold-gota-frock",
    name: "Marigold Gota Frock",
    description:
      "A joyful marigold frock with layers of gota trim. Lightweight enough for dancing all night.",
    price: 5990,
    sale_price: null,
    category: mehndi,
    images: [{ id: 1, url: img("photo-1516483638261-f4dbaf036963"), alt: "Marigold frock" }],
    variants: variants(1901, [
      { c: "Marigold", hex: "#E09F3E" },
      { c: "Rust", hex: "#B7410E" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-03-12",
  },
  {
    id: 111,
    slug: "cotton-white-daily-kurta",
    name: "Everyday White Cotton Kurta",
    description:
      "An everyday staple. Pure cotton, generous cut, reinforced stitching. Survives school, playground, dinner at nani's.",
    price: 1990,
    sale_price: 1690,
    category: everyday,
    images: [{ id: 1, url: img("photo-1517420704952-d9f39e95b43e"), alt: "White daily kurta" }],
    variants: variants(2001, [
      { c: "White", hex: "#FFFFFF" },
      { c: "Sky", hex: "#A7C7E7" },
    ]),
    in_stock: true,
    low_stock_threshold: 4,
    created_at: "2026-03-01",
  },
  {
    id: 112,
    slug: "striped-lawn-kurta",
    name: "Striped Lawn Summer Kurta",
    description:
      "Breathable lawn with subtle vertical stripes. A gentle everyday pick for gharmi ke din.",
    price: 2290,
    sale_price: null,
    category: everyday,
    images: [{ id: 1, url: img("photo-1519741497674-611481863552"), alt: "Striped lawn kurta" }],
    variants: variants(2101, [
      { c: "Sage", hex: "#9CAF88" },
      { c: "Sand", hex: "#C2B280" },
    ]),
    in_stock: true,
    low_stock_threshold: 4,
    created_at: "2026-02-26",
  },
  {
    id: 113,
    slug: "navy-daily-shalwar-kameez",
    name: "Navy Daily Shalwar Kameez",
    description:
      "A sturdy navy two-piece for school events and weekend outings. Double-stitched and wash-friendly.",
    price: 2490,
    sale_price: null,
    category: everyday,
    images: [{ id: 1, url: img("photo-1515488042361-ee00e0ddd4e4"), alt: "Navy shalwar kameez" }],
    variants: variants(2201, [{ c: "Navy", hex: "#1B2A49" }]),
    in_stock: true,
    low_stock_threshold: 4,
    created_at: "2026-02-20",
  },
  {
    id: 114,
    slug: "teal-festive-kurta",
    name: "Teal Festive Kurta",
    description:
      "Teal kurta with self-tonal buttiyan. Understated enough for family dinners, festive enough for Eid milni.",
    price: 4690,
    sale_price: null,
    category: eid,
    images: [{ id: 1, url: img("photo-1519699047748-de8e457a634e"), alt: "Teal kurta" }],
    variants: variants(2301, [{ c: "Teal", hex: "#0F7B8A" }]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-04-05",
  },
  {
    id: 115,
    slug: "white-zari-sherwani-kids",
    name: "White Zari Sherwani",
    description:
      "Classic white sherwani with zari buttons and stand collar. Timeless, heirloom-ready tailoring.",
    price: 10990,
    sale_price: 9490,
    category: shaadi,
    images: [{ id: 1, url: img("photo-1503944583220-79d8926ad5e2"), alt: "White zari sherwani" }],
    variants: variants(2401, [{ c: "White", hex: "#FFFFFF" }]),
    in_stock: true,
    low_stock_threshold: 2,
    created_at: "2026-03-06",
  },
  {
    id: 116,
    slug: "maroon-heritage-sherwani",
    name: "Maroon Heritage Sherwani",
    description:
      "Deep maroon sherwani with antique gold piping. For the boy who loves his family traditions.",
    price: 11490,
    sale_price: null,
    category: shaadi,
    images: [{ id: 1, url: img("photo-1516483638261-f4dbaf036963"), alt: "Maroon sherwani" }],
    variants: variants(2501, [{ c: "Maroon", hex: "#6A0F1A" }]),
    in_stock: true,
    low_stock_threshold: 2,
    created_at: "2026-03-02",
  },
  {
    id: 117,
    slug: "pista-green-eid-kurta",
    name: "Pista Green Eid Kurta",
    description:
      "A soothing pista green kurta with fine chikan detail. Matches beautifully with ivory shalwar.",
    price: 4390,
    sale_price: null,
    category: eid,
    images: [{ id: 1, url: img("photo-1515488042361-ee00e0ddd4e4"), alt: "Pista green kurta" }],
    variants: variants(2601, [
      { c: "Pista", hex: "#A9BA9D" },
      { c: "Ivory", hex: "#F4EBDD" },
    ]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-04-08",
  },
  {
    id: 118,
    slug: "rose-pink-mehndi-frock",
    name: "Rose Pink Mehndi Frock",
    description:
      "A dreamy rose pink frock with tiny gota stars scattered across the hem. Made for mehndi night photos.",
    price: 6290,
    sale_price: 5290,
    category: mehndi,
    images: [{ id: 1, url: img("photo-1519741497674-611481863552"), alt: "Rose pink frock" }],
    variants: variants(2701, [{ c: "Rose Pink", hex: "#D78BA8" }]),
    in_stock: true,
    low_stock_threshold: 3,
    created_at: "2026-03-20",
  },
];
