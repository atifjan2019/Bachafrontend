/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve catalogue images straight from the media CDN (media.bachastylo.com, Cloudflare)
    // instead of through Vercel's image optimizer. The optimizer is metered: once the plan's
    // quota is used up it answers 402 for every image it has not already cached, so newly
    // added products showed the fallback panel instead of their photo. The uploads are
    // already compressed WebP (median ~57 KB, max ~184 KB), so nothing is lost by skipping it.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
      { protocol: "https", hostname: "admin.bachastylo.com" },
      { protocol: "https", hostname: "media.bachastylo.com" },
    ],
    // Serve modern formats and cache optimized images longer (source URLs are
    // stable / content-addressed, so re-optimization is wasteful).
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  // Import only the icons actually used from lucide-react's barrel.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // Categories no longer have their own pages — every category link funnels
  // into the shop page with the category filter pre-selected. This keeps old
  // bookmarks, indexed URLs and admin-configured /category/* links working.
  async redirects() {
    return [
      {
        source: "/category/:slug",
        destination: "/products?category=:slug",
        permanent: true,
      },
      {
        source: "/category",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
