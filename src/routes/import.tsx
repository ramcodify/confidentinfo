import { createFileRoute } from "@tanstack/react-router";
import { ImportPage } from "../components/trade-pages";
export const Route = createFileRoute("/import")({
  head: () => ({
    meta: [
      { title: "Import Solutions | Meridian Trade Co." },
      {
        name: "description",
        content:
          "Supplier sourcing, verification, inspection, documentation, customs coordination, and delivery.",
      },
      { property: "og:title", content: "Import Solutions | Meridian" },
      { property: "og:description", content: "Bringing global quality to local markets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImportPage,
});
