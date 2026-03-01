# Aurelia Luxury Crochet — Next.js App

A premium handmade crochet brand website built with Next.js 14, TailwindCSS, and full dark/light mode support.

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy the example env file and set your WhatsApp number:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_PHONE_NUMBER=919999999999
```
Replace with your actual WhatsApp number (include country code, no `+`).

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

---

## Folder Structure

```
/src
  /app
    layout.js         # Root layout with theme init script
    page.js           # Main homepage
  /components
    Navbar.js         # Sticky navbar with mobile menu
    HeroSection.js    # Full-screen hero
    StorySection.js   # Art of Crochet story section
    ProductGrid.js    # Signature + Seasonal product grids
    ProductCard.js    # Individual product card with WhatsApp CTA
    ThemeToggle.js    # Dark/light toggle button
    YarnThread.js     # Scroll-linked SVG yarn thread
    ScrollAnimations.js  # Intersection Observer initializer
    Footer.js         # Brand footer
  /lib
    whatsapp.js       # generateWhatsAppLink utility
  /styles
    globals.css       # Tailwind + CSS variables + reveal animations
```

## Features

- **Light & Dark Mode** — Persists via localStorage, no flash on load
- **WhatsApp Integration** — "Stitch One For Me" opens WhatsApp with product message
- **Scroll Animations** — Sections fade-up into view on scroll
- **Yarn Thread** — SVG thread animates with scroll progress (desktop)
- **Mobile-first responsive** — Works beautifully on all screen sizes
- **Luxury typography** — Cormorant Garamond (display) + Jost (body)
