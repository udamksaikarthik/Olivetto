# Olivetto — Restaurant Website

A clean, mobile-responsive marketing site for **Olivetto**, an Italian restaurant in South Shields (NE34 6QY). Built with plain HTML5, CSS3 and vanilla JavaScript — no build tools, no frameworks.

Live preview target: a single-page site that loads fast, looks like a real restaurant brand (not a template), and converts visitors into bookings.

---

## Project structure

```
olivetto-website/
├── index.html          ← all page sections (semantic HTML)
├── css/
│   └── styles.css      ← single stylesheet, design tokens via CSS variables
├── js/
│   └── script.js       ← nav, scroll-reveal, card toggle, reviews carousel
├── images/             ← (empty — hero/story images are loaded from Unsplash CDN)
└── README.md
```

No build step. Open `index.html` in a browser, or push the folder anywhere static.

---

## Sections

1. **Sticky nav** with phone CTA + mobile burger menu
2. **Hero** — headline, dual CTA (Book a Table / Order delivery), social proof badges (4.3★, Travellers' Choice 2025, ranking)
3. **Story** — short brand narrative + image + key stats
4. **Menu cards** — 6 categories (Pizza, Pasta, Steaks, Sunday Roast, Risottos & Burgers, Vegan/Veggie/GF) with hover + click colour change
5. **Why us** — numbered list of 4 reasons to choose Olivetto
6. **Reviews** — carousel of 5 real Tripadvisor quotes (paraphrased & credited)
7. **Visit** — opening hours, contact, embedded Google Map
8. **Footer** — brand, address, contact, links

---

## Tech notes

- **Fonts**: Cormorant Garamond (display, italic-friendly) + Manrope (body). Both via Google Fonts. Consistent baseline alignment, no jumping letters.
- **Colour palette** (locked in CSS variables — easy to rebrand later):
  - Cream `#f7f1e6` · Ink `#1f2a24` · Terracotta `#c1573a` · Olive `#6b7a4b` · Gold `#c89b3c`
- **Animations**: IntersectionObserver-based scroll reveal, CSS transitions only — no animation libraries. Honours `prefers-reduced-motion`.
- **Responsive breakpoints**: 960px (tablet) and 600px (mobile).
- **Accessibility**: semantic landmarks, ARIA on nav/menu/carousel, keyboard support on cards, visible focus states.
- **Performance**: no frameworks, ~1 KB JS, fonts preconnected, images lazy where applicable.

---

## Live data used (verified Apr 2026)

| Item | Value |
|---|---|
| Address | 252B Sunderland Road, South Shields NE34 6QY |
| Phone | 0191 691 5531 |
| Email | Olivetreenook@gmail.com |
| Facebook | facebook.com/profile.php?id=100093670509996 |
| Just Eat | just-eat.co.uk/restaurants-olivetto-south-shields/menu |
| Tripadvisor | 4.3 ★ · 96 reviews · Travellers' Choice 2025 · #25 of 227 in South Shields |
| Hours | Mon closed · Tue–Thu 12:00–21:00 · Fri–Sat 12:00–22:00 · Sun 12:00–18:00 |

If any of this changes, edit `index.html` (search for the value, replace).

---

## Things to customise before showing the client

1. **Hero image / story image** — currently loaded from Unsplash. Replace the `background-image` URL in the `.story__img` div with one of the restaurant's own photos (their Facebook page has good ones). Save into `/images/` and reference as `images/your-file.jpg`.
2. **Menu items** — current cards are categories. If the client wants real dish names + prices, swap card content.
3. **Booking system** — the "Book a Table" button currently uses `tel:` (taps to call). If they have OpenTable / ResDiary, swap the `href`.
4. **OG / favicon** — add a `<meta property="og:image">` and a `favicon.ico` once they share assets.

---

## Free hosting + custom domain options (UK-relevant)

You own this repo, so the play is: push to GitHub, deploy free, point a cheap domain at it.

### Recommended: GitHub Pages + Cloudflare DNS
**Hosting cost: £0/year. Domain: ~£8–12/year.**

1. **Create a GitHub repo** `olivetto-website` and push the project.
2. **Settings → Pages** → Source: `main` branch, root folder. GitHub gives you `karthik-username.github.io/olivetto-website`.
3. **Buy the domain** somewhere cheap:
   - `.co.uk` — Namecheap (~£6/yr) or 123 Reg (~£8/yr first year)
   - `.com` — Cloudflare Registrar (at-cost, ~£8/yr, no markup)
   - Suggested: `olivetto-southshields.co.uk` or `olivettosouthshields.com`
4. **Point DNS to GitHub Pages**:
   - Add 4 A-records to `185.199.108.153 / .109.153 / .110.153 / .111.153`
   - Add CNAME `www` → `karthik-username.github.io`
5. **In GitHub Pages → Custom domain** enter the domain, tick "Enforce HTTPS" (auto SSL via Let's Encrypt — free).

**Pros:** Free forever, Git-based deploys (push = live), HTTPS included.
**Cons:** Static only (fine for this site).

### Alternative 1: Netlify
- Drag-and-drop the folder on netlify.com, get `random-name.netlify.app` instantly.
- Free custom domain support, auto HTTPS.
- Connect GitHub for auto-deploy on every push.
- Free tier: 100 GB bandwidth/month — way more than this site will ever need.

### Alternative 2: Cloudflare Pages
- Same as Netlify but on Cloudflare's network (faster in UK).
- Connect repo, build command empty, output dir `/`.
- Unlimited bandwidth on the free tier.

### Alternative 3: Vercel
- Same workflow, slightly more focused on Next.js but works fine for static.
- Free tier easily covers this site.

### My pick for your sales pitch
**GitHub repo + Cloudflare Pages + a `.co.uk` domain via Cloudflare or Namecheap.**
- Total cost to client: ~£8–12/year (just the domain).
- Total cost to you: £0 hosting.
- You keep the deploy keys; if they don't pay for an ongoing maintenance/hosting fee, you can take it down or hand over.

---

## Selling the package — quick framing

When you pitch this to Olivetto, lead with what they're missing today:

- They have **no website** — every "olivetto south shields" Google search currently only shows Tripadvisor / Facebook / Just Eat. A direct site captures bookings without the middleman fee.
- They're a **Travellers' Choice 2025** winner — that badge should be on a homepage they own, not buried in a Tripadvisor profile.
- A `.co.uk` domain + Google Business Profile linking to it improves their local SEO significantly.

Suggest a one-off build fee + small annual maintenance retainer (e.g. £350 one-off + £100/yr for hosting setup, domain, content updates, and a Google Business Profile claim).

---

## Local development

```bash
# any of these will do:
python3 -m http.server 8000
# or
npx serve .
# or just open index.html in your browser
```

---

Built by **Karthik Digital Services**.
