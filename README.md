# Personal Portfolio Website

A modern, high-performance portfolio web application faithfully implementing the **Figma Community Design (node-id: 10-521)** with modern typography, micro-interactions, responsive layouts, and seamless dual-mode support (Figma Showcase Mode and Arjun's Live Portfolio Data Mode).

---

## 🎨 Design & Features

- **Pixel-Accurate Fidelity to Figma:**
  - **Hero Section:** Greeting badge, headline with vivid royal purple highlight (`#5e3bee`), description copy, "Get In Touch" CTA, and rounded portrait frame with floating sparkle micro-animations.
  - **Expertise / Skills:** 4-card grid featuring Strategy & Direction, Branding & Logo, UI & UX Design, and Full-Stack Development with custom icons, hover elevation, and purple bottom indicator bars.
  - **About Me:** 2-column layout with the artistic purple paint-splash portrait and editorial biography copy.
  - **Portfolio:** 3-column project showcase cards with hover zoom, high-res previews, and pink "Visit My Dribbble" button.
  - **Customer Testimonials:** Emerald teal outlined cards (`#006b60`) with 5-star ratings, quotes, and client profile avatars.
  - **Contact Form:** Two-column input layout with custom dropdown, textarea, terms checkbox, and interactive submission toast notifications.
  - **Footer:** Brand logo, navigation links, social icons (Facebook, Instagram, X/Twitter, LinkedIn), and copyright.
- **Dual Display Modes:**
  - **Figma View:** Original 1:1 Figma Community showcase layout and data.
  - **Arjun View:** Dynamic switch to Arjun's live portfolio data from `portfolio-data.json` (Real projects: Neural-Sync AI RAG Engine, Volt-Mind EV Battery Predictor, Prescripto Healthcare, GitHub link, real bio and skills).
- **Interactive Enhancements:**
  - Sticky glassmorphic header with scroll spy and active link indicators.
  - Interactive project detail modal/lightbox.
  - Smooth scrolling navigation.
  - Floating back-to-top button.
  - Fully responsive mobile drawer navigation.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

```bash
# Clone the repository and install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
Portfolio/
├── index.html                 # Semantic HTML5 structure & SEO tags
├── package.json               # Vite configuration and scripts
├── portfolio-data.json        # Arjun's portfolio datasets
├── public/
│   └── assets/
│       ├── figma/             # Cropped high-res Figma design assets
│       │   ├── hero-illustration.png
│       │   ├── about-person-full.png
│       │   ├── portfolio-ahuse.png
│       │   ├── portfolio-dashboard.png
│       │   ├── portfolio-easyrent.png
│       │   ├── avatar-dianne.png
│       │   ├── avatar-kristin.png
│       │   └── avatar-kathryn.png
│       ├── portrait.png       # Arjun's personal portrait
│       ├── project1.png       # Neural-Sync AI Engine screenshot
│       └── project3.png       # Volt-Mind Battery Predictor screenshot
├── src/
│   ├── style.css              # Custom Vanilla CSS design system
│   └── main.js                # Core interactive JavaScript & mode toggles
└── README.md
```

---

## 🛠️ Customization

To edit personal details, add new projects, or update skills, simply modify `portfolio-data.json`.
The portfolio dynamically reads and renders this data in **Arjun View**.
