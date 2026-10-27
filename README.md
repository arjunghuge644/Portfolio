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
  - **Arjun View (Default):** Dynamic showcase of Arjun's portfolio data from `portfolio-data.json` (6 verified projects: CareerPulse, AI Workforce, WiFi CSI Lab, MathTube AI, Prescripto, and Hikers Junction with live status badges).
  - **Figma View:** Original 1:1 Figma Community showcase layout and template data (Ahuse, App Dashboard, Easy Rent).
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
├── portfolio-data.json        # Arjun's verified portfolio datasets
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
│       ├── careerpulse-preview.jpg
│       ├── ai-workforce-preview.jpg
│       ├── wificsi-preview.jpg
│       ├── mathtube-preview.jpg
│       ├── prescripto-preview.png
│       └── hikers-junction-preview.jpg
├── src/
│   ├── style.css              # Custom Vanilla CSS design system & status pills
│   └── main.js                # Core interactive JavaScript & mode toggles
└── README.md
```

---

## 🛠️ Customization

To edit personal details, add new projects, or update skills, simply modify `portfolio-data.json`.
The portfolio dynamically reads and renders this data in **Arjun View**.

---

## 📬 Contact Form & Hosted Provider Setup

The portfolio's contact form is engineered for static deployment without requiring a custom server or database. It supports zero-backend hosted form handlers (such as **Formspree** or **Web3Forms**) and includes an automatic visitor-facing direct email fallback.

### ⚠️ Security Notice: Client-Side Environment Variables
> **Important:** All variables prefixed with `VITE_` are embedded directly into public JavaScript bundles during `npm run build`.
> **NEVER store private API keys, backend secrets, database passwords, or sensitive tokens in `VITE_*` variables.**
> The variables below are public form endpoints/slugs specifically intended by providers for static frontend forms.

### Provider Options

#### Option A: Formspree (Recommended)
1. Sign up for a free account at [formspree.io](https://formspree.io/).
2. Create a new form targeted at your verified inbox: `arjunghuge644@gmail.com`.
3. Copy your unique Form ID (for example, `f/xpznvqwe`).
4. Create a `.env` or `.env.local` file in the project root:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
5. Restart the dev server (`npm run dev`) or run `npm run build`. Submissions will now be processed directly through Formspree with built-in spam filtering and email forwarding.

#### Option B: Web3Forms (Access Key Alternative)
1. Go to [web3forms.com](https://web3forms.com/) and enter `arjunghuge644@gmail.com` to receive a free public access key.
2. In your `.env` or `.env.local` file:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
   VITE_WEB3FORMS_ACCESS_KEY=your-public-access-key
   ```

### Submission Behavior Modes

- **Configured Mode:** When `VITE_CONTACT_FORM_ENDPOINT` is present, the form sends an asynchronous JSON payload to the provider with an interactive loading state (`Sending...` + spinner), double-submit locking, and an `AbortController` 15-second timeout. Success feedback is displayed **only** after the provider returns an HTTP 200 confirmation. If delivery fails, entered message data is preserved and a retry link is offered.
- **Unconfigured Mode (Default):** When no provider endpoint is set, the site displays **no technical error or developer warnings** to visitors. Instead, it provides a polished direct email fallback that pre-fills the message and launches the visitor's default email client addressed directly to `arjunghuge644@gmail.com`.

