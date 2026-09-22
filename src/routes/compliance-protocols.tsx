import { createFileRoute } from "@tanstack/react-router";
import { TradeCompliancePage } from "../components/compliance-page";

export const Route = createFileRoute("/compliance-protocols")({
  head: () => ({
    meta: [
      { title: "Compliance & Pre-Shipment Audit Protocols | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "5-stage factory inspection protocol: 8-hour continuous run trials, component authenticity verification, Indian 415V/50Hz grid calibration, and EPCG 0% duty documentation.",
      },
      { property: "og:title", content: "Compliance & Pre-Shipment Audit Protocols | Confident Machinery" },
      {
        property: "og:description",
        content:
          "Pre-shipment verification and EPCG compliance standards for China to India textile equipment sourcing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <TradeCompliancePage initialTab="compliance" />,
});
