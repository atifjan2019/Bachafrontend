import type { BlogPost } from "@/lib/api/blogs";

/**
 * Placeholder Journal articles for Bacha Stylo. These are temporary demo
 * stories shown when the backend has no published posts yet (and in mock
 * mode); replace them with real content from the admin when ready.
 */

const unsplash = (seed: string, w = 1600) =>
  `https://images.unsplash.com/${seed}?w=${w}&auto=format&fit=crop&q=70`;

export const mockBlogPosts: BlogPost[] = [
  {
    id: 9001,
    slug: "why-traditional-pakistani-fashion-never-goes-out-of-style",
    title: "Why Traditional Pakistani Fashion Never Goes Out of Style",
    category: "Heritage",
    excerpt:
      "From hand-finished waistcoats to Chitrali pakol caps and Swati shawls, traditional Pakistani fashion endures because it is built on craft, culture, and timeless silhouettes.",
    image: unsplash("photo-1503944583220-79d8926ad5e2"),
    content: `
      <p>Trends come and go, but traditional Pakistani fashion has a way of staying relevant decade after decade. At <strong>Bacha Stylo</strong>, we believe that&rsquo;s no accident &mdash; heritage clothing is designed around craft, comfort, and cultural meaning rather than a single season&rsquo;s hype.</p>

      <h2>Rooted in craft and culture</h2>
      <p>Every traditional piece carries a story. A hand-finished waistcoat, a Chitrali pakol cap, or a finely woven Swati shawl reflects generations of regional craftsmanship. When something is made with that level of intention, it doesn&rsquo;t feel dated &mdash; it feels enduring.</p>

      <h2>Pieces that outlive trends</h2>
      <p>The reason these garments last is simple: their silhouettes are timeless and endlessly wearable. A few staples earn a permanent place in any wardrobe:</p>
      <ul>
        <li><strong>Premium waistcoats</strong> &mdash; instant polish over a kurta or shirt.</li>
        <li><strong>Chitrali pakol caps</strong> &mdash; rooted in northern heritage, effortlessly distinctive.</li>
        <li><strong>Swati shawls</strong> &mdash; warmth and elegance in equal measure.</li>
        <li><strong>Tailored kurta sets</strong> &mdash; the everyday foundation of South Asian style.</li>
      </ul>

      <h2>Styling tradition for today</h2>
      <p>Modern styling keeps these classics fresh. Pair a structured waistcoat with slim trousers for a wedding, drape a shawl over a monochrome outfit for understated luxury, or let a pakol add character to an everyday look. Tradition becomes contemporary the moment you make it your own.</p>

      <p>That&rsquo;s the philosophy behind every Bacha Stylo edit &mdash; pieces designed with elegance, simplicity, and authenticity, made to be worn for years, not just one season.</p>
    `,
    meta_title: "Why Traditional Pakistani Fashion Never Goes Out of Style | Bacha Stylo",
    meta_description:
      "Traditional Pakistani fashion endures because of craft, culture, and timeless silhouettes. Explore why heritage pieces stay stylish, with Bacha Stylo.",
    meta_keywords:
      "traditional pakistani fashion, waistcoat, chitrali pakol, swati shawl, heritage clothing, bacha stylo",
    og_image: null,
    canonical_url: null,
    status: true,
    created_at: "2026-06-18T09:00:00Z",
    updated_at: "2026-06-18T09:00:00Z",
  },
  {
    id: 9002,
    slug: "how-to-choose-the-perfect-waistcoat-for-every-occasion",
    title: "How to Choose the Perfect Waistcoat for Every Occasion",
    category: "Style Guide",
    excerpt:
      "Fit, fabric, colour, and occasion — a simple guide to picking the right waistcoat, whether it's for a wedding, Eid, a formal event, or a smart-casual day out.",
    image: unsplash("photo-1593032465175-481ac7f401a0"),
    content: `
      <p>A great waistcoat does a lot with a little &mdash; it sharpens an outfit in seconds. But the &ldquo;right&rdquo; waistcoat depends on fit, fabric, and the occasion. Here&rsquo;s how to choose with confidence at <strong>Bacha Stylo</strong>.</p>

      <h2>1. Start with the fit</h2>
      <p>Fit is everything. A waistcoat should sit close to the body without pulling at the buttons, and end just past the waistband. Our waistcoats use a figure-size system grouped by fit so it&rsquo;s easy to find the right one:</p>
      <ul>
        <li><strong>Kids (Gen Alpha)</strong> &mdash; sizes 14&ndash;26</li>
        <li><strong>Boys / Teens</strong> &mdash; sizes 28&ndash;32</li>
        <li><strong>Gen Z</strong> &mdash; sizes 34&ndash;42</li>
        <li><strong>Plus Size</strong> &mdash; sizes 44&ndash;50</li>
      </ul>

      <h2>2. Match the occasion</h2>
      <p>Let the event guide the formality:</p>
      <ul>
        <li><strong>Weddings &amp; shaadi:</strong> rich tones and subtle texture &mdash; think tweed or a deep navy.</li>
        <li><strong>Eid &amp; festive:</strong> classic black or maroon over a crisp kurta.</li>
        <li><strong>Formal &amp; office:</strong> charcoal or grey for understated polish.</li>
        <li><strong>Smart-casual:</strong> lighter shades layered over a shirt, sleeves rolled.</li>
      </ul>

      <h2>3. Consider fabric and colour</h2>
      <p>Wool-blends hold their structure and suit cooler weather; lighter weaves work for daytime events. For colour, neutrals (black, charcoal, navy) are the most versatile, while a textured weave adds depth without shouting.</p>

      <h2>4. Care for it well</h2>
      <p>Keep a waistcoat looking sharp by hanging it on a structured hanger, spot-cleaning when needed, and steaming rather than over-ironing. Treated well, a good waistcoat lasts for years.</p>

      <p>Ready to find yours? Explore the <a href="/products?category=waistcoat">Bacha Stylo waistcoat collection</a> and pick the perfect fit for every occasion.</p>
    `,
    meta_title: "How to Choose the Perfect Waistcoat for Every Occasion | Bacha Stylo",
    meta_description:
      "A simple guide to choosing the right waistcoat by fit, fabric, colour, and occasion — for weddings, Eid, formal events, and smart-casual looks.",
    meta_keywords:
      "waistcoat guide, how to choose a waistcoat, wedding waistcoat, eid waistcoat, mens fashion pakistan, bacha stylo",
    og_image: null,
    canonical_url: null,
    status: true,
    created_at: "2026-06-12T09:00:00Z",
    updated_at: "2026-06-12T09:00:00Z",
  },
  {
    id: 9003,
    slug: "kids-fashion-trends-in-pakistan-for-2026",
    title: "Kids Fashion Trends in Pakistan for 2026",
    category: "Trends",
    excerpt:
      "Comfort-first fabrics, mini-me waistcoats, festive brights, and inclusive sizing — the kids' fashion trends shaping wardrobes across Pakistan in 2026.",
    image: unsplash("photo-1519699047748-de8e457a634e"),
    content: `
      <p>Kids&rsquo; fashion in Pakistan is having a moment &mdash; playful, practical, and more thoughtfully made than ever. Here are the trends we&rsquo;re seeing shape young wardrobes through 2026 at <strong>Bacha Stylo</strong>.</p>

      <h2>1. Comfort-first fabrics</h2>
      <p>Parents are prioritising breathable, easy-care fabrics that move with active kids. Soft cotton blends and gentle linings lead the way &mdash; smart for our climate and kind on delicate skin.</p>

      <h2>2. Mini-me traditional wear</h2>
      <p>Matching family looks are everywhere. Kids&rsquo; <strong>waistcoats</strong> and kurta sets that echo grown-up styles make festive occasions feel coordinated and special &mdash; now available in dedicated Kids and Teen figure sizes.</p>

      <h2>3. Festive brights and rich tones</h2>
      <p>For Eid and weddings, expect bold maroons, bottle greens, and warm jewel tones, often with subtle detailing rather than heavy embellishment &mdash; celebratory but still comfortable to wear all day.</p>

      <h2>4. Inclusive, well-sized ranges</h2>
      <p>Better size systems mean a cleaner fit for every age and build. Our figure-size bands &mdash; <strong>Kids (Gen Alpha) 14&ndash;26</strong> and <strong>Boys / Teens 28&ndash;32</strong> &mdash; take the guesswork out of shopping for growing kids.</p>

      <h2>5. Considered, longer-lasting pieces</h2>
      <p>Families are choosing fewer, better pieces that survive hand-me-downs &mdash; a quieter, more sustainable approach to dressing little ones.</p>

      <p>Dressing the youngest members of the family? Browse Bacha Stylo for festive-ready kids&rsquo; styles built for comfort, fit, and fun.</p>
    `,
    meta_title: "Kids Fashion Trends in Pakistan for 2026 | Bacha Stylo",
    meta_description:
      "From comfort-first fabrics to mini-me waistcoats and inclusive sizing — the kids' fashion trends shaping wardrobes across Pakistan in 2026.",
    meta_keywords:
      "kids fashion pakistan, kids fashion trends 2026, kids waistcoat, eid kids wear, children clothing pakistan, bacha stylo",
    og_image: null,
    canonical_url: null,
    status: true,
    created_at: "2026-06-05T09:00:00Z",
    updated_at: "2026-06-05T09:00:00Z",
  },
];
