# Arjun Ghuge — Personal Portfolio Website

A modern, high-performance personal portfolio web application for **Arjun Ghuge** (Software Engineer & AI Solutions Developer), built with Vite, semantic HTML5, Vanilla CSS, and modern JavaScript. Designed for static deployment on Vercel, Netlify, or GitHub Pages.

---

## 🎨 Features & Architecture

- **Clean, Modern Visual Identity:**
  - **Hero Section:** Greeting badge, headline with vivid royal purple highlight (`#5e3bee`), description copy, "Get In Touch" & "Explore Work" CTAs, and rounded portrait frame with floating sparkle micro-animations.
  - **Expertise / Skills:** 4-card grid featuring Backend Systems, AI & Machine Learning, Databases & Cloud, and Frontend & Web with hover elevation and accent indicator bars.
  - **About Me:** 2-column layout with portrait, education timeline (P.E.S. Modern College of Engineering), and editorial biography copy.
  - **Portfolio Showcase:** 6 authentic engineering projects (CareerPulse, AI Workforce Management, Wi-Fi CSI Sensing Lab, MathTube AI, Prescripto, and Hikers Junction) with status tags, live repository links, and interactive lightbox preview modal.
  - **Beyond the Code:** 4-card section featuring:
    - *Building in Public:* Live featured platforms (deployed.site, CareerPulse, Prescripto) and direct GitHub profile button.
    - *My Developer Toolkit:* 4-row continuous infinite auto-scrolling marquee with local SVG technology logo tiles and keyboard/touch carousel navigation.
    - *Beyond Programming:* Research paper co-authorship and NSS Design Co-Head leadership.
    - *Engineering Philosophy:* First-principles problem solving, reliability through testing, and continuous learning.
  - **Contact Form:** Two-column input layout with custom dropdown, textarea, terms checkbox, inline validation, honeypot spam prevention, and hosted provider support (Formspree / Web3Forms) with mailto fallback.
  - **Header & Footer:** Sticky glassmorphic header with scroll spy, direct "Contact Me" primary CTA button, mobile navigation drawer, and verified social links (GitHub, LinkedIn).

- **Static & Production-Ready:**
  - Zero heavy framework runtime (Vanilla JS + Vite).
  - High Lighthouse performance and accessible ARIA attributes.
  - 100% automated test coverage with Vitest.

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

### Production Build & Preview

```bash
npm run build
npm run preview
```

### Run Tests

```bash
npm test
```

---

## 📂 Project Structure

```
Portfolio/
├── index.html                 # Semantic HTML5 structure & SEO tags
├── package.json               # Vite configuration, scripts, and devDependencies
├── portfolio-data.json        # Arjun's verified portfolio datasets
├── public/
│   ├── assets/
│   │   ├── tech/              # Local SVG technology logos (Python, Docker, React, etc.)
│   │   ├── careerpulse-preview.jpg
│   │   ├── ai-workforce-preview.jpg
│   │   ├── wificsi-preview.jpg
│   │   ├── mathtube-preview.jpg
│   │   ├── prescripto-preview.png
│   │   └── hikers-junction-preview.jpg
│   └── favicon.svg
├── src/
│   ├── style.css              # Custom Vanilla CSS design system & layout styles
│   └── main.js                # Core interactive JavaScript, form handler & marquee logic
├── tests/
│   └── interactions.test.js   # Automated test suite (Vitest + JSDOM)
└── README.md
```

---

## 🛠️ Content Customization

To edit personal details, add new projects, or update skills, modify `portfolio-data.json`.
The portfolio dynamically reads and renders this authentic data at runtime.

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

