import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  rateLimiter,
  getClientIp,
  isSuspiciousProbe,
  applySecurityHeaders,
  SECURITY_HEADERS,
} from "./lib/security";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Maximum allowed request payload: 512 KB
const MAX_PAYLOAD_BYTES = 512 * 1024;

// Rate limits per 60-second window
const RATE_LIMIT_STATIC = 300;
const RATE_LIMIT_STANDARD = 120;
const RATE_LIMIT_MUTATION = 30;

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/assets/") ||
    /\.(css|js|jpg|jpeg|png|svg|webp|ico|woff|woff2|ttf|eot)$/i.test(pathname)
  );
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const method = request.method.toUpperCase();

    // 1. HTTP Method Defense: Disallow TRACE and TRACK (anti-XST / cross-site tracing)
    if (method === "TRACE" || method === "TRACK") {
      return applySecurityHeaders(
        new Response("Method Not Allowed", {
          status: 405,
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
      );
    }

    const url = new URL(request.url);

    // 2. Exploit Probe & Scanner Defense: Fast 403 rejection before SSR execution
    if (isSuspiciousProbe(url.pathname)) {
      return new Response("Forbidden: Access Denied", {
        status: 403,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          ...SECURITY_HEADERS,
        },
      });
    }

    // 3. Payload Size Defense: Reject oversized requests (anti-memory exhaustion / Slowloris)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return applySecurityHeaders(
        new Response("Payload Too Large: Maximum allowed size is 512 KB", {
          status: 413,
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
      );
    }

    // 4. Rate Limiting Defense (Anti-DDoS / HTTP Flood Mitigation)
    const clientIp = getClientIp(request);
    const isStatic = isStaticAsset(url.pathname);
    const limit = isStatic
      ? RATE_LIMIT_STATIC
      : method === "POST" || method === "PUT" || method === "DELETE"
        ? RATE_LIMIT_MUTATION
        : RATE_LIMIT_STANDARD;

    const rateResult = rateLimiter.check(clientIp, limit, 60 * 1000);

    if (!rateResult.allowed) {
      return applySecurityHeaders(
        new Response("Too Many Requests: Rate limit exceeded. Please retry shortly.", {
          status: 429,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "Retry-After": String(rateResult.resetInSeconds),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
          },
        }),
      );
    }

    try {
      // 5. Handler Execution
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // 6. Security Headers Injection
      return applySecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      return applySecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
