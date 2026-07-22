import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/admin/ComingSoon";

export const Route = createFileRoute("/admin/_layout/messages")({
  component: () => <ComingSoon title="Contact Messages" />,
});
