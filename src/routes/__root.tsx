import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Navbar, Footer } from "../components/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161210] px-6 text-[#FAF7F2]">
      <div className="max-w-md w-full text-center rounded-2xl border border-[#C5A059]/30 bg-[#1E1916] p-10 shadow-2xl">
        <span className="inline-flex items-center rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 px-3 py-1 text-xs font-mono font-bold text-[#C5A059] tracking-widest uppercase">
          ERROR 404
        </span>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#FAF7F2]">Page Not Found</h1>
        <p className="mt-4 text-sm text-[#FAF7F2]/60 leading-relaxed font-mono">
          The requested page does not exist within our trade records.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-[#C5A059] px-7 py-3 text-xs font-bold font-mono uppercase tracking-widest text-[#161210] shadow-md hover:bg-[#FAF7F2] transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#161210] px-6 text-[#FAF7F2]">
      <div className="max-w-md w-full text-center rounded-2xl border border-rose-500/30 bg-[#1E1916] p-10 shadow-2xl">
        <span className="inline-flex items-center rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-mono font-bold text-rose-400 tracking-widest uppercase">
          SYSTEM NOTICE
        </span>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-[#FAF7F2]">
          Transmission Interrupted
        </h1>
        <p className="mt-4 text-sm text-[#FAF7F2]/60 leading-relaxed font-mono">
          A processing error occurred. Please retry the connection.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-[#C5A059] px-5 py-2.5 text-xs font-bold font-mono tracking-wide text-[#161210] transition hover:bg-[#FAF7F2] shadow-sm cursor-pointer"
          >
            Retry Connection
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-[#C5A059]/30 bg-transparent px-5 py-2.5 text-xs font-bold font-mono tracking-wide text-[#FAF7F2] transition hover:bg-[#C5A059]/15 shadow-sm"
          >
            Return Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Confident Textiles Machinery — China to India" },
      {
        name: "description",
        content:
          "Confident Textiles Machinery — sourcing, verifying and importing reliable textile machinery from trusted Chinese manufacturers to textile industries across India.",
      },
      { name: "author", content: "Confident Textiles Machinery" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { httpEquiv: "X-Frame-Options", content: "SAMEORIGIN" },
      { httpEquiv: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden selection:bg-[#C5A059] selection:text-[#161210]">
        {/* Site Preloader */}
        <div id="site-preloader" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L30 16L16 30L2 16L16 2Z" stroke="#C5A059" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7"/>
            <path d="M21 11.5C19.5 9.5 16.5 9 14 10.5C11.5 12 10.5 15 11 18C11.5 21 14 23 17 22.5C19.5 22 21 20 21 20" stroke="#FAF7F2" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="16" cy="16" r="2" fill="#C5A059"/>
          </svg>
          <div className="preloader-ring"></div>
          <span className="preloader-wordmark">Confident Textiles Machinery</span>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=false;function rm(){if(d)return;d=true;var e=document.getElementById("site-preloader");if(e){e.classList.add("loaded");setTimeout(function(){if(e&&e.parentNode)e.parentNode.removeChild(e);},500);}}setTimeout(rm,2000);})();`,
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // 2-second preloader duration on initial site load
  useEffect(() => {
    const el = document.getElementById("site-preloader");
    if (!el) return;
    const timer = setTimeout(() => {
      el.classList.add("loaded");
      setTimeout(() => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-[#F4EFE6] text-[#161210]">
        <Navbar />
        <main className="flex-1">
          <div key={pathname} className="animate-page-fade">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
