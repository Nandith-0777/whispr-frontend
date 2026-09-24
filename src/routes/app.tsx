import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { BottomNav } from "@/components/whispr/BottomNav";
import { getCurrentUser } from "@/lib/api";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("whispr_session_token");

    if (!token) {
      navigate({ to: "/" });
      return;
    }

    getCurrentUser(token)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("whispr_session_token");
        navigate({ to: "/" });
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-sm text-muted-foreground">
          Loading Whispr...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      <div className="mx-auto max-w-lg px-5">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}