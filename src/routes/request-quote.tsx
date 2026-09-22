import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/request-quote")({
  beforeLoad: () => {
    throw redirect({ to: "/contact" });
  },
  component: () => null,
});
