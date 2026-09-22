import { createFileRoute } from "@tanstack/react-router";
import { OwnerProfilePage } from "./owner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Owner & Leadership Profile | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "Meet the Founder & Managing Director of Confident Textiles Machinery. Over 14 years commanding China-to-India textile machinery sourcing, factory audits, and import logistics.",
      },
      { property: "og:title", content: "Owner & Leadership Profile | Confident Textiles Machinery" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OwnerProfilePage,
});
