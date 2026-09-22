import { createFileRoute } from "@tanstack/react-router";
import { TradeCompliancePage } from "../components/compliance-page";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Trade Terms, Compliance & Incoterms 2020 | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "Comprehensive trade terms, 5-stage pre-shipment inspection protocols, ocean carriage guarantees, and Incoterms 2020 matrix for China–India textile machinery imports.",
      },
      { property: "og:title", content: "Trade Terms & Compliance | Confident Textiles Machinery" },
      {
        property: "og:description",
        content:
          "The complete engineering, maritime logistics, and regulatory compliance dossier for Indian textile mills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <TradeCompliancePage initialTab="carriage" />,
});
