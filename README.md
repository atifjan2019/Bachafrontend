# Bacha Stylo Fashion Home

Frontend for **Bacha Stylo Fashion Home**, a Pakistani kids' clothing eCommerce store. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand, React Hook Form + Zod, and Axios. Consumes a Laravel REST API and ships with a full mock data layer so the app runs standalone during development.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The app loads with `NEXT_PUBLIC_USE_MOCKS=true` by default, so every page has data immediately.

## Environment variables

| Name | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Laravel REST base URL (no trailing slash) | `http://localhost:8000/api` |
| `NEXT_PUBLIC_USE_MOCKS` | `true` to serve every endpoint from `lib/mocks`, `false` to call the live Laravel API | `true` |
| `NEXT_PUBLIC_SITE_NAME` | Brand name used in metadata | `Bacha Stylo Fashion Home` |

## Toggling mocks vs. live backend

Flip `NEXT_PUBLIC_USE_MOCKS` in `.env.local`:

- `true` - all API functions return data from `lib/mocks/*` (products, categories, orders, auth). Orders you place are saved to `localStorage` so they show up in `/account/orders`.
- `false` - requests go to `NEXT_PUBLIC_API_URL` via the Axios client in `lib/api/client.ts`. The client attaches `Bearer <token>` from the `bsf_token` cookie and clears it on 401.

Endpoints the backend must implement (see `types/index.ts` for shapes):

```
GET  /products?category=&min_price=&max_price=&sort=&page=
GET  /products/:slug
GET  /products/:slug/related?limit=
GET  /products/featured?limit=
GET  /categories
GET  /categories/:slug
POST /auth/login       { email, password }      -> { user, token }
POST /auth/register    { name, email, password } -> { user, token }
PATCH /account/profile { name?, phone?, address? }
GET  /account/orders
GET  /account/orders/:id
POST /checkout         { customer, shipping_address, items, payment_method, notes? }
```

## Scripts

```bash
npm run dev        # Next dev server
npm run build      # Production build
npm run start      # Run built output
npm run lint       # Next lint
npm run typecheck  # tsc --noEmit
```

## Feature scope (Phase 1)

Home, PLP, PDP, Cart drawer + full page, Checkout with COD / JazzCash / Easypaisa, Order success, Email auth (login/register), Account dashboard, Orders list + detail with timeline, Profile edit.

Explicitly **not** included (deferred): wishlist, reviews, AI chatbot, OTP, SMS, card payments, wallet, referrals, loyalty points, returns portal, multi-attribute filtering beyond category + price.

## Brand tokens

Defined in `tailwind.config.ts`:

- `brand.red` `#e81d25` - primary CTA, sale tags
- `brand.black` `#141414` - primary text, footer
- `cream` `#FAF6EF` - page background
- `ivory` `#FFFFFF` - cards
- `border` `#E8E2D5` - warm borders
- `gold` `#B8860B` - heritage accent dividers
- Fonts: `font-display` (Playfair), `font-sans` (Inter), `font-nastaliq` (Noto Nastaliq Urdu)

## Project structure

```
app/
  (shop)/        Home, products, category, cart, checkout
  (auth)/        Login, register
  (account)/     Account dashboard, orders, profile
components/
  common/        SectionHeading, GoldDivider, BrandMark, EmptyState, LoadingSkeleton
  layout/        Header, Footer, AnnouncementBar, MobileNav, MobileMenu
  product/       ProductCard, ProductGrid, ProductGallery, VariantSelector, QuantityStepper
  cart/          CartDrawer, CartLineItem, CartSummary, EmptyCart
  checkout/      PaymentMethodRadio, OrderSummaryCard
  filters/       CategoryFilter, PriceRangeSlider, SortDropdown, MobileFilterSheet
  ui/            Button, Input, Label, Select, Dialog, Accordion, RadioGroup, Slider, Badge, Toast
lib/
  api/           client.ts (Axios), products, categories, auth, orders
  mocks/         products, categories, orders
  store/         cart (Zustand + persist), auth
  validators/    Zod schemas for login, register, checkout, profile
  utils/         cn, formatPKR, slugify, stockStatus, formatDate
types/           Product, Variant, Category, Order, User, CartLine
```

## Cart persistence

`lib/store/cart.ts` uses Zustand's `persist` middleware (`bsf_cart` key in `localStorage`). The cart survives refresh and tab close. Clearing it happens only after a successful checkout.

## Auth

- Tokens: stored in `bsf_token` cookie (7-day expiry, `sameSite=lax`). `apiClient` attaches it automatically.
- User profile: cached in `localStorage` under `bsf_user` for instant hydration on first paint.
- Logout clears both.

## Mobile

Mobile-first throughout. Verified at 360px. A bottom tab bar (`components/layout/MobileNav.tsx`) appears on `<lg` screens; the header's top-level nav collapses into a side sheet.

## Accessibility

- All icon-only buttons carry `aria-label`
- Focus rings use `brand-red` with a 2px offset
- Color contrast targets AA
- Keyboard navigable dialogs, selects, accordions (all Radix primitives)
