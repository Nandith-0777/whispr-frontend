import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNav } from "@/components/whispr/BottomNav";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-surface pb-24">
      <div className="mx-auto max-w-lg px-5">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
