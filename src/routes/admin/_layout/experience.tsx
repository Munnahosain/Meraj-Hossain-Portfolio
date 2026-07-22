import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/ComingSoon";

export const Route = createFileRoute("/admin/_layout/experience")({
  component: () => <ComingSoon title="Experience" />,
});
