# Portfolio Studio — Multi-Platform Portfolio & CMS Monorepo

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?logo=next.js)
![Electron](https://img.shields.io/badge/Electron-29-47848F?logo=electron)
![Express](https://img.shields.io/badge/Express.js-4.19-000000?logo=express)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

An enterprise-grade, multi-platform digital portfolio and Content Management System (CMS) built as a unified monorepo. It features a high-performance **Next.js 14** public website, a **Vite + React 18** web admin dashboard, a secure **Electron 29** native desktop application, and a **Node.js/Express** backend with dual-layer database fallback (MongoDB Atlas & JSON) and TOTP Multi-Factor Authentication (MFA).

---

## 🏗 System Architecture Diagram

```
                              +------------------------------------------+
                              |         Portfolio Monorepo Ecosystem      |
                              +------------------------------------------+
                                                   |
         +-----------------------------------------+-----------------------------------------+
         v                                         v                                         v
+------------------+                     +--------------------+                    +--------------------+
|  Public Web App  |                     | Admin Web (Vercel) |                    |  Admin Desktop App |
| (Next.js 14 App) |                     | (React 18 SPA)     |                    | (Electron 29 Shell)|
+------------------+                     +--------------------+                    +--------------------+
         |                                         |                                         |
         +-----------------------------------------+-----------------------------------------+
                                                   |
                                                   v Rewrites / IPC
                              +------------------------------------------+
                              |      Backend API Server (Express.js)     |
                              | - Cookie Sessions & TOTP 2FA             |
                              | - RBAC (SUPER_ADMIN, ADMIN, EDITOR)      |
                              +------------------------------------------+
                                                   |
                   +-------------------------------+-------------------------------+
                   v                                                               v
        [ Data Persistence ]                                             [ Media Storage ]
  - Primary: MongoDB Atlas Cluster                                  - Primary: Cloudinary CDN
  - Local Fallback: backend/data/db.json                            - Local Fallback: backend/uploads/
```

---

## 📂 Workspaces Overview

| Workspace | Technology Stack | Description | Deployment Target |
| :--- | :--- | :--- | :--- |
| **`frontend/`** | Next.js 14 (App Router), React 18, TypeScript, Framer Motion | Public editorial portfolio site with ISR (Incremental Static Revalidation), visitor tracking, and HUD audio effects. | Vercel |
| **`admin/`** | React 18, Vite, Lucide Icons, Framer Motion | Web Admin CMS SPA for managing Profile, Skills, Projects, Articles, Messages Inbox, Media Library, SEO, and Security Audit Logs. | Vercel (`admin.arjunghuge.me`) |
| **`desktop/`** | Electron 29, `electron-builder` | Native desktop container wrapping `admin/` SPA with Context Isolation, native OS file dialogs, JSON database backups, and OS notifications. | Linux (`AppImage`, `.deb`), Windows (`.exe`) |
| **`backend/`** | Node.js (ESM), Express.js, Mongoose, TOTP `otplib` | REST API handling auth sessions, MFA TOTP verification, RBAC permissions, and dual storage engines. | Render / Cloud Server |

---

## ✨ Key Features & Highlights

### 🛡️ Security & MFA Authentication
* **2-Step TOTP MFA**: Initial password validation followed by secondary 6-digit Authenticator TOTP token verification (`otplib`, `qrcode`).
* **Server Sessions**: Secure HTTP-only, `sameSite` cookie management via `express-session`.
* **RBAC Enforcement**: Fine-grained role permissions (`SUPER_ADMIN`, `ADMIN`, `EDITOR`).
* **Brute-Force Shield**: IP rate limiting on login (`10 attempts / 15 mins`) and contact forms (`5 submissions / hour`).

### 💾 Dual Persistence & Fallback Architecture
* **Database Engine**: Connects to **MongoDB Atlas** via Mongoose. If `MONGO_URI` is omitted, automatically falls back to an atomic local JSON file store (`backend/data/db.json`).
* **Media Engine**: Uploads directly to **Cloudinary CDN**. If Cloudinary credentials are not set, falls back to serving static files from `backend/uploads/`.

### 🖥️ Native Desktop Shell (Electron)
* **Sandboxed Runtime**: Built with `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`.
* **Native IPC Bridge**: Exposes `window.desktopAPI` for native file open/save dialogs, OS toast notifications, and JSON database backup import/export.

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher

### 2. Installation
Clone the repository and install dependencies at the monorepo root:
```bash
git clone https://github.com/arjunghuge644/Portfolio.git
cd Portfolio
npm install
```

### 3. Environment Variables Setup
Copy `.env.example` to `backend/.env`:
```bash
cp .env.example backend/.env
```
*(Optionally populate `MONGO_URI` and Cloudinary keys in `backend/.env`. If left blank, the server will operate seamlessly using local file storage).*

---

## 🛠️ Development & Execution Commands

Run commands from the monorepo root directory:

```bash
# Run all web services concurrently (Backend: 5000, Admin Vite: 5173, Next.js Web: 3000)
npm run dev:all

# Run backend API server in dev mode
npm run dev:backend

# Run React Admin SPA in dev mode
npm run dev:admin

# Run Next.js Public Web in dev mode
npm run dev:web

# Launch Electron Desktop Container connected to local dev server
npm run dev:electron
```

---

## 📦 Build & Packaging

```bash
# Build production assets for both Admin SPA and Next.js Frontend
npm run build:all

# Package Electron app into local directory
npm run pack:electron

# Build production installers for Electron Desktop (Linux AppImage/deb, Windows)
npm run dist:electron

# Seed MongoDB Atlas with initial database records
npm run seed:atlas
```

---

## 📄 License & Author

* **Author**: [Arjun Ghuge](https://github.com/arjunghuge644)

