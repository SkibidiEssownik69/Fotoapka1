# Atelio — Interior Design SaaS Website

A conversion-optimized, Apple-style marketing site for **Atelio**, a fictional
studio platform for interior designers. Built with plain HTML, CSS, and
JavaScript — no frameworks, no build step, no external fonts or CDNs.

## Preview

Open `index.html` directly in a browser, or serve it locally:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

The site is a single static page, so it can be deployed as-is to GitHub Pages,
Netlify, Vercel, or any static host.

## Structure

| File         | Purpose                                                  |
| ------------ | -------------------------------------------------------- |
| `index.html` | All page sections and inline SVG product mockups          |
| `styles.css` | Design system (tokens at the top), layout, responsiveness |
| `script.js`  | Nav, mobile menu, scroll reveals, counters, pricing toggle, FAQ |

## Design notes

- **Typography:** native system stack (SF Pro on Apple devices) — large,
  tightly-tracked headlines, no display fonts.
- **Palette:** warm off-whites and charcoal with a single deep pine-green
  accent (`--accent: #2e5e4e`). No purple, no orange. All tokens live in
  `:root` in `styles.css` for easy retheming.
- **Signature moment:** the hero contains an interactive CSS-illustrated room
  that recolors when you pick a material palette — a 3-second demo of what the
  product does. Architect-style dimension lines and annotations replace the
  usual floating-notification clichés.
- **Conversion structure:** hero with risk-reversal microcopy → social proof →
  product workspace → benefit-led feature showcases → statement section with
  stats → how-it-works → editorial testimonials → pricing (annual default,
  dark featured plan, guarantee) → objection-handling FAQ → final CTA.
- **Accessibility:** semantic landmarks, skip link, ARIA on the menu/accordion/
  toggle, visible focus states, `prefers-reduced-motion` support.
