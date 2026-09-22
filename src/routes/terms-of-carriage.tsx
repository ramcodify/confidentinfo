import { createFileRoute } from "@tanstack/react-router";
import { TradeCompliancePage } from "../components/compliance-page";

export const Route = createFileRoute("/terms-of-carriage")({
  head: () => ({
    meta: [
      { title: "Terms of Carriage & Maritime Logistics | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "Tier-1 liner ocean freight booking, VCI anti-corrosion packaging, 14-21 free demurrage days, and All-Risk Institute Cargo insurance for China to India textile machinery transit.",
      },
      { property: "og:title", content: "Terms of Carriage | Confident Textiles Machinery" },
      {
        property: "og:description",
        content:
          "Bilateral maritime freight and container packing standards for Indian textile mill machinery imports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <TradeCompliancePage initialTab="carriage" />,
});
