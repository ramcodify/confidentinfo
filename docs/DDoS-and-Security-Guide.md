# Enterprise DDoS & Web Attack Defense Runbook

Confident Textiles Machinery operates on a **Defense-in-Depth (Multi-Layer)** security architecture designed to prevent and mitigate Distributed Denial of Service (DDoS) attacks, exploit probe scanning, Cross-Site Scripting (XSS), Clickjacking, Form Bot flooding, and brute-force intrusion.

---

## 1. Architecture Overview

```
                      Internet Traffic / Attackers
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 1: Cloudflare Edge Network (Volumetric DDoS Shield)       │
│ • Anycast global network absorbs Gbps/Tbps Layer 3/4 floods     │
│ • Edge SSL/TLS encryption termination (Full Strict)             │
│ • Cloudflare "Under Attack Mode" & Managed Challenges (Turnstile)│
│ • Bot Fight Mode (automated botnet dropping)                    │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Proxied clean traffic
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 2: Application Server Gateway (src/server.ts)             │
│ • In-memory sliding-window IP Rate Limiter (Anti-Flood)         │
│ • Scanner Probe Dropper (Instant 403 on .env, wp-login, etc.)   │
│ • Payload Size Limiter (Blocks oversized requests > 512 KB)     │
│ • Method Restrictions (Blocks dangerous TRACE / TRACK methods)  │
│ • Hardened Security Headers (CSP, HSTS, X-Frame-Options, etc.)  │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ Sanitized requests
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│ LAYER 3: Application & Client Defense (src/lib & UI)            │
│ • Form Honeypot Trap (catches automated script submissions)     │
│ • Sub-1.5s Bot Timing Analysis (blocks headless form fillers)   │
│ • Recursive Input Sanitization (strips XSS, scripts, HTML)      │
│ • Salted SHA-256 Admin Authentication (no exposed credentials)  │
│ • Brute-Force Lockout (locks after 5 failed attempts for 5m)    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. In-Code Protections (Active in Codebase)

### A. Server Gateway Defense (`src/server.ts` & `src/lib/security.ts`)
1. **Sliding-Window IP Rate Limiter**:
   - Standard navigation / GET requests: **120 requests / 60 seconds** per IP.
   - Form mutations / POST requests: **30 requests / 60 seconds** per IP.
   - Static assets: **300 requests / 60 seconds** per IP.
   - If exceeded, returns `429 Too Many Requests` with a `Retry-After: 60` header and standard `X-RateLimit-*` diagnostic headers.
   - Self-pruning memory cache capped at 10,000 IPs to prevent memory exhaustion attacks on the rate limiter itself.

2. **Scanner & Exploit Probe Blocker**:
   - Inspects URL paths for malicious scanner signatures (`.env`, `.git`, `wp-admin`, `wp-login.php`, `xmlrpc.php`, `phpmyadmin`, `eval-stdin`, `/etc/passwd`, path traversal `../`, etc.).
   - Instantly returns `403 Forbidden` without executing React SSR or router rendering, neutralizing automated vulnerability scanners with sub-millisecond CPU overhead.

3. **Payload Size Guard (Anti-Slowloris / Memory Exhaustion)**:
   - Incoming payloads exceeding **512 KB** are rejected with `413 Payload Too Large`.

4. **HTTP Security Headers (OWASP Hardened)**:
   - `Content-Security-Policy (CSP)`: Strict directive preventing unauthorized external scripts and framing.
   - `X-Frame-Options: DENY`: Prevents Clickjacking attacks.
   - `X-Content-Type-Options: nosniff`: Prevents MIME-type confusion/sniffing attacks.
   - `Strict-Transport-Security (HSTS)`: Enforces HTTPS for 1 year (`max-age=31536000; includeSubDomains; preload`).
   - `Referrer-Policy: strict-origin-when-cross-origin`: Minimizes referrer leakage.
   - `Permissions-Policy`: Disables unauthorized access to camera, microphone, geolocation, and payment hardware.
   - `Cross-Origin-Opener-Policy: same-origin` & `Cross-Origin-Resource-Policy: same-origin`.

### B. Form & Bot Mitigation (`src/routes/contact.tsx`, `products.$slug.tsx`)
1. **Honeypot Trap**: Invisible field (`_trap` / `_prod_trap`) that legitimate users cannot see or fill, but automated spam scripts automatically populate, causing silent rejection.
2. **Sub-1.5s Timing Check**: Calculates elapsed milliseconds between form mount and submit. Submissions under 1.5 seconds are flagged as automated bots and blocked.
3. **Double-Click / Submission Cooldown**: Submit buttons enter a disabled pending state (`Transmitting...`) during submission to prevent rapid spam clicking.
4. **Input Sanitization**: All form fields pass through `sanitizeInput()` which strips `<script>` tags, event handlers (`onload`, `onerror`), `javascript:` URIs, and dangerous characters before state or database writes.

### C. Admin Portal Hardening (`src/lib/auth.ts`)
1. **No Plaintext Passwords**: Passwords are no longer stored in plaintext in the client bundle. They are compared against salted cryptographic SHA-256 hashes.
2. **Brute-Force Lockout**: After 5 failed login attempts in a session, the admin login triggers a 5-minute lockout timer.

---

## 3. Cloudflare Edge Hardening (Recommended Cloudflare Setup)

Because this project compiles with Nitro's `cloudflare-module` preset, routing your domain through Cloudflare provides the Layer 3/4 volumetric DDoS shield:

### Step 1: Ensure Cloudflare Proxy is Active
In your Cloudflare Dashboard -> **DNS**:
- Ensure all `A` and `CNAME` records have the **Proxy status: Proxied (Orange Cloud)** enabled.
- Proxied DNS routes all incoming traffic through Cloudflare's Anycast network, hiding your origin IP address.

### Step 2: Enable Bot Fight Mode
In Cloudflare Dashboard -> **Security** -> **Bots**:
- Toggle **Bot Fight Mode** to **ON**.
- This automatically detects and challenges or drops malicious bot traffic (like scrapers and DDoS botnets) before it reaches your worker.

### Step 3: Enable "Under Attack Mode" During Active Attacks
If you ever detect an active massive flood:
- Go to Cloudflare Dashboard -> **Overview** (or **Security** -> **Settings**).
- Change **Security Level** from **Medium** to **"I'm Under Attack! (High)"**.
- Cloudflare will present an automated JavaScript challenge (Cloudflare Turnstile) to all incoming visitors, preventing non-browser bot floods from hitting the server.

### Step 4: Configure WAF Rate Limiting Rule
In Cloudflare Dashboard -> **Security** -> **WAF** -> **Rate limiting rules**:
- Create Rule: `Block Excessive Requests`
- When incoming requests from same IP exceed **100 requests in 10 seconds** -> **Action: Block (or Managed Challenge)** for 1 hour.

### Step 5: Enforce Full (Strict) SSL/TLS
In Cloudflare Dashboard -> **SSL/TLS**:
- Set encryption mode to **Full (Strict)**.
- Under **Edge Certificates**, toggle **Always Use HTTPS** and **Minimum TLS Version: TLS 1.2**.
