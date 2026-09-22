import { createFileRoute } from "@tanstack/react-router";
import { TradeCompliancePage } from "../components/compliance-page";

export const Route = createFileRoute("/incoterms-2020")({
  head: () => ({
    meta: [
      { title: "Incoterms 2020 Operational Matrix | Confident Textiles Machinery" },
      {
        name: "description",
        content:
          "ICC Incoterms 2020 commercial comparison for textile machinery: FOB Shanghai/Ningbo, CIF Nhava Sheva/Mundra/Chennai, and DAP turnkey mill gate delivery.",
      },
      { property: "og:title", content: "Incoterms 2020 Operational Matrix | Confident Textiles Machinery" },
      {
        property: "og:description",
        content:
          "Comparative risk and cost allocation matrix for importing Chinese machinery into Indian textile mills.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <TradeCompliancePage initialTab="incoterms" />,
});
