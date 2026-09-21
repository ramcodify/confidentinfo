import { createFileRoute } from "@tanstack/react-router";
import { ExportPage } from "../components/trade-pages";
export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { title: "Export Solutions | Meridian Trade Co." },
      {
        name: "description",
        content:
          "Market research, buyer connections, export preparation, documentation, freight, and global delivery.",
      },
      { property: "og:title", content: "Export Solutions | Meridian" },
      { property: "og:description", content: "Taking local excellence to the world." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExportPage,
});
