import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Preloader } from "../components/Preloader";
import Lenis from "lenis";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-xs tracking-widest text-[var(--brand-red)] mb-4">
          ERROR / 404
        </div>
        <h1 className="font-display text-7xl uppercase tracking-tight">Signal lost</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This frame doesn't exist in our archive.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Return to studio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl uppercase">Cut. Something broke.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Reload the frame or head back to the studio.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Retry
          </button>
          <a
            href="/"
            className="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Home
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
      { title: "Meraj Hossain â€” Graphics & Motion Designer" },
      {
        name: "description",
        content:
          "Portfolio of Meraj Hossain â€” graphics designer, video editor and motion graphics artist based in Dhaka, Bangladesh.",
      },
      { name: "author", content: "Meraj Hossain" },
      { property: "og:title", content: "Meraj Hossain â€” Graphics & Motion Designer" },
      { property: "og:description", content: "Branding, motion graphics and video editing." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Meraj Hossain" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
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
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if we're on an admin route â€” skip preloader & smooth scroll there
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Skip preloader & lenis for admin pages
    if (isAdminRoute) {
      document.body.style.overflow = "";
      return;
    }

    if (!isLoaded) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [isLoaded, isAdminRoute]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Full site grunge texture & grain overlay */}
      <div className="grunge-overlay" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {!isAdminRoute && !isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <div className="page-fade"><Outlet /></div>
    </QueryClientProvider>
  );
}

