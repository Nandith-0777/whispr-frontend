import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/me")({
  head: () => ({
    meta: [
      { title: "Profile — Whispr" },
      { name: "description", content: "Edit your Whispr profile, username and appearance." },
      { property: "og:title", content: "Profile — Whispr" },
      { property: "og:description", content: "Edit your Whispr profile, username and appearance." },
    ],
  }),
  component: MeScreen,
});

const settings = ["Edit profile", "Appearance", "Notifications"];

function MeScreen() {
  return (
    <div className="pt-8">
      <div className="rise text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-background text-[26px] font-semibold tracking-tight shadow-[var(--shadow-soft)]">
          N
        </div>
        <h1 className="mt-4 text-[24px] font-semibold tracking-tight">Nandith</h1>
        <p className="text-[15px] text-muted-foreground">@nandith</p>
      </div>

      <div className="rise card-soft mt-7 divide-y divide-border overflow-hidden">
        {settings.map((s) => (
          <button key={s} className="flex w-full items-center px-5 py-4 text-left transition-colors hover:bg-surface">
            <span className="flex-1 text-[16px] tracking-tight">{s}</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="rise mt-4 text-center">
        <Link
          to="/u/$username"
          params={{ username: "nandith" }}
          className="text-[15px] text-primary"
        >
          View my public profile
        </Link>
      </div>
    </div>
  );
}
