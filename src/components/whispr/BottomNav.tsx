import { Link } from "@tanstack/react-router";
import { Home, Inbox, MessageCircle, User } from "lucide-react";

const items = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/inbox", label: "Inbox", icon: Inbox, exact: false },
  { to: "/app/chats", label: "Chats", icon: MessageCircle, exact: false },
  { to: "/app/me", label: "Me", icon: User, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav className="glass-bar fixed inset-x-0 bottom-0 z-40 border-t border-border">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, label, icon: Icon, exact }) => (
          <Link
            key={to}
            to={to}
            activeOptions={{ exact }}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-muted-foreground transition-colors"
            activeProps={{ className: "text-primary" }}
          >
            <Icon className="size-[22px]" strokeWidth={1.8} />
            <span className="text-[11px] tracking-tight">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
