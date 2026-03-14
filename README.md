# 🥩 ADIL BEEF SHOP — Premium Beef Landing Page

A modern, fully responsive, high-converting landing page for a premium beef business. Built with **React**, **Tailwind CSS v4**, and **Framer Motion** for buttery-smooth animations.

---

## ✨ Features

- **Hero Section** — Full-screen background image, bold headline, dual CTA buttons
- **Product Grid** — 4 animated product cards (Beef with Bones, Boneless, Special Pieces, Ribs) with scroll-triggered float-up animations
- **Why Choose Us** — 6-feature grid with stagger animations
- **Floating WhatsApp Button** — Persistent, pulsing, always-visible order button
- **Responsive Navbar** — Sticky, scroll-aware with mobile hamburger menu
- **Footer** — Social links (WhatsApp, Facebook, Instagram) + quick nav
- **SEO Ready** — Full meta tags, Open Graph, and Twitter Card

---

## 🗂 Project Structure

```
landing page/
├── public/
│   ├── hero_beef.png
│   ├── beef_with_bones.png
│   ├── boneless_beef.png
│   ├── special_cuts.png
│   └── beef_ribs.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Products.jsx
│   │   ├── ProductCard.jsx
│   │   ├── About.jsx
│   │   ├── WhatsAppButton.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation & Running Locally

```bash
# 1. Navigate into the project folder
cd "landing page"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The optimised output will be in the `dist/` folder, ready to deploy to Vercel, Netlify, or any static host.

---

## 🛠 Customisation

All business-specific values are easy to change:

| What to change | Where to change it |
|---|---|
| WhatsApp number | `WHATSAPP_NUMBER` constant in `Navbar.jsx`, `Hero.jsx`, `ProductCard.jsx`, `Footer.jsx`, `WhatsAppButton.jsx` |
| Product names, prices, descriptions | `Products.jsx` → `PRODUCTS` array |
| Facebook / Instagram links | `Footer.jsx` → `SOCIAL` array |
| Brand name | `Navbar.jsx` and `index.html` `<title>` |
| Colour palette | `index.css` → `@theme` block |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI components & state |
| Vite 7 | Dev server & bundler |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Scroll & hover animations |
| react-icons | Icon library |

---

## ⚡ GitHub Setup (Step-by-Step)

Run these commands in your terminal from inside the project folder:

```bash
# Step 1 — Initialize a local Git repository
git init

# Step 2 — Stage all files
git add .

# Step 3 — Make your first commit
git commit -m "feat: initial commit — ADIL BEEF SHOP landing page"

# Step 4 — Create a new EMPTY repo on GitHub (no README, no .gitignore)
#          Then copy the repo URL and run:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Step 5 — Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📄 License

MIT — free to use and customise for your business.
