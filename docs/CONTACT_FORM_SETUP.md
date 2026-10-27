# Contact Form Configuration & Submission Setup Guide

## Overview

To protect privacy, ensure lead integrity, and prevent silent message loss, the portfolio contact form enforces **strict submission verification**:

1. **Client-Side Validation:** All fields (`firstName`, `lastName`, `email`, `topic`, `message`, and `terms`) are validated before transmission.
2. **Strict Success Confirmation:** The UI will **NEVER** claim or display a "message sent successfully" toast unless the configured submission service explicitly returns an HTTP `200 OK` confirmation.
3. **Honest Fallback State:** When no remote submission endpoint is configured (default static state), the form presents an **honest user-facing state**, informing the sender and launching their default email client with a pre-filled message addressed directly to `arjunghuge644@gmail.com`.

---

## Zero-Backend Setup Options (Recommended)

You do **not** need to deploy or maintain a server or database for contact messages. Any of the following serverless form handlers can be plugged in directly:

### Option 1: Web3Forms (Recommended — Free & No Backend)
1. Visit [web3forms.com](https://web3forms.com/) and enter your email `arjunghuge644@gmail.com` to receive an Access Key.
2. Create or open `.env` or `.env.local` in the project root:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
   ```
3. Set your access key or configure the endpoint URL with your key.

### Option 2: Formspree (Standard)
1. Create a free account at [formspree.io](https://formspree.io/).
2. Create a new form targeted at your email address (`arjunghuge644@gmail.com`).
3. Copy your unique form ID (e.g. `f/xpznwkqy`).
4. In your `.env` or `.env.local` file:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
5. Run `npm run build` or restart `npm run dev`.

### Option 3: FormSubmit.co (Zero Sign-up)
1. Use the free FormSubmit endpoint:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://formsubmit.co/ajax/arjunghuge644@gmail.com
   ```
2. Submit your first test message through the form to confirm email activation.

---

## How the Application Consumes the Endpoint

The application checks for an endpoint in the following order of precedence:

1. **Global Runtime Window Variable:** `window.PORTFOLIO_CONTACT_ENDPOINT`
2. **Vite Environment Variable:** `import.meta.env.VITE_CONTACT_FORM_ENDPOINT`

### Payload Format Transmitted:
When an endpoint is configured, `src/main.js` dispatches an asynchronous `POST` request with a JSON body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1 555 123 4567",
  "topic": "Backend & APIs",
  "message": "Hello Arjun, I would like to discuss...",
  "submittedAt": "2026-10-27T05:45:00.000Z"
}
```

### Verification Behavior:
- **HTTP 200 OK Response:** Form resets, and a green confirmation toast is shown: `Thank you, John! Your message has been sent successfully.`
- **HTTP 4xx / 5xx or Network Failure:** The user's input is **not** cleared; an error toast is displayed, and an inline recovery notice offers an immediate `mailto:arjunghuge644@gmail.com` link.
- **No Endpoint Configured:** Informs the user immediately: *"No remote submission API configured. Launching email client to send directly to Arjun."* and packages the message into a direct email link.
