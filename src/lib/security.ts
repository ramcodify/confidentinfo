/**
 * Enterprise Security & Anti-DDoS Defense Module
 * Multi-layer protection for Confident Textiles Machinery application:
 * - Rate Limiter (Token/Sliding window against Layer 7 HTTP floods)
 * - Malicious Probe & Vulnerability Scanner Blocker
 * - Hardened HTTP Security Headers (CSP, HSTS, X-Frame-Options, etc.)
 * - Input Sanitization & Anti-XSS Engine
 */

// ============================================================================
// 1. IP & RATE LIMITING DEFENSE (Anti-DDoS / HTTP Flood Mitigation)
// ============================================================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class SlidingWindowRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private readonly maxMapSize = 10000; // Protect against memory exhaustion attacks
  private lastPruneTime = Date.now();

  constructor() {
    // Prune stale records every 2 minutes
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.prune(), 2 * 60 * 1000);
    }
  }

  private prune() {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (now > record.resetAt) {
        this.records.delete(key);
      }
    }
  }

  /**
   * Check and increment request rate for an IP
   * @param key IP address or identifier
   * @param limit Maximum allowed requests within window
   * @param windowMs Time window in milliseconds
   * @returns { allowed: boolean, remaining: number, resetInSeconds: number }
   */
  check(key: string, limit: number, windowMs: number): {
    allowed: boolean;
    remaining: number;
    resetInSeconds: number;
  } {
    const now = Date.now();

    // Prevent uncontrolled map growth
    if (this.records.size > this.maxMapSize && now - this.lastPruneTime > 30000) {
      this.prune();
      this.lastPruneTime = now;
      if (this.records.size > this.maxMapSize) {
        // If still full under attack, flush the oldest 20%
        let removed = 0;
        for (const k of this.records.keys()) {
          this.records.delete(k);
          if (++removed > 2000) break;
        }
      }
    }

    const record = this.records.get(key);

    if (!record || now > record.resetAt) {
      this.records.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      return {
        allowed: true,
        remaining: limit - 1,
        resetInSeconds: Math.ceil(windowMs / 1000),
      };
    }

    record.count++;
    const resetInSeconds = Math.max(1, Math.ceil((record.resetAt - now) / 1000));

    if (record.count > limit) {
      return {
        allowed: false,
        remaining: 0,
        resetInSeconds,
      };
    }

    return {
      allowed: true,
      remaining: Math.max(0, limit - record.count),
      resetInSeconds,
    };
  }
}

export const rateLimiter = new SlidingWindowRateLimiter();

/**
 * Extract client IP with Cloudflare & proxy header priority
 */
export function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}

// ============================================================================
// 2. SCANNER & MALICIOUS PROBE DETECTION
// ============================================================================

const SUSPICIOUS_PATTERNS = [
  // Sensitive configuration / environment files
  /\/\.(env|git|svn|hg|bzr|vscode|idea|docker|aws)/i,
  /\/(wp-admin|wp-login\.php|wp-content|wp-includes|xmlrpc\.php)/i,
  /\/(phpmyadmin|pma|adminer|mysqladmin|dbadmin)/i,
  /\/(eval-stdin|setup\.php|test\.php|phpinfo\.php|info\.php|shell\.php)/i,
  /\/(\.well-known\/.*\.env)/i,
  /\/cgi-bin\//i,
  /\/(backup|dump|sql|database)\.(zip|tar|gz|sql|bak)/i,
  // Path traversal attempts
  /(\.\.\/|\.\.%2f|%2e%2e%2f)/i,
  // Command injection / RCE signatures
  /(\/bin\/sh|\/bin\/bash|\/etc\/passwd|\/etc\/shadow)/i,
];

export function isSuspiciousProbe(pathname: string): boolean {
  const decodedPath = decodeURIComponent(pathname.toLowerCase());
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(decodedPath));
}

// ============================================================================
// 3. ENTERPRISE HTTP SECURITY HEADERS
// ============================================================================

export const SECURITY_HEADERS: Record<string, string> = {
  // Prevent clickjacking by forbidding embedding in frames/iframes
  "X-Frame-Options": "DENY",

  // Prevent MIME-type confusion / sniffing attacks
  "X-Content-Type-Options": "nosniff",

  // Legacy XSS filter activation
  "X-XSS-Protection": "1; mode=block",

  // Control referrer information leakage
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Restrict sensitive browser features / APIs
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",

  // Enforce HTTPS across all domains and subdomains for 1 year
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",

  // Prevent Cross-Origin resource leaks
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Permitted-Cross-Domain-Policies": "none",

  // Comprehensive Content Security Policy (CSP)
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
};

/**
 * Apply security headers to outgoing HTTP responses
 */
export function applySecurityHeaders(response: Response): Response {
  // Static assets with hash or immutability don't need strict CSP, but keep security headers
  const newHeaders = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!newHeaders.has(key)) {
      newHeaders.set(key, value);
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

// ============================================================================
// 4. INPUT SANITIZATION & ANTI-XSS ENGINE
// ============================================================================

/**
 * Strips script tags, executable HTML attributes, javascript: URIs, null bytes,
 * and dangerous control characters from user text input.
 */
export function sanitizeInput(input: unknown, maxLength = 5000): string {
  if (typeof input !== "string") return "";

  let sanitized = input
    // Truncate to maximum acceptable length
    .slice(0, maxLength)
    // Remove null bytes
    .replace(/\0/g, "")
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remove inline event handlers like onclick=, onload=, onerror=
    .replace(/on\w+\s*=\s*(?:["'][^"']*["']|[^\s>]+)/gi, "")
    // Remove javascript: and data: pseudo-protocols in links/attributes
    .replace(/(?:javascript|data|vbscript):/gi, "")
    // Remove HTML tags
    .replace(/<\/?[^>]+(>|$)/g, "")
    // Trim leading/trailing whitespace
    .trim();

  return sanitized;
}

/**
 * Sanitize an entire key-value payload recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result: any = Array.isArray(obj) ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = sanitizeInput(value);
    } else if (value && typeof value === "object") {
      result[key] = sanitizeObject(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
