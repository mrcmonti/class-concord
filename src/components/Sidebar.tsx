import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Package,
  Receipt,
  Users,
  GraduationCap,
  BookOpen,
  Sparkles,
  Beaker,
  Settings,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  active?: boolean;
  href?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  collapsible?: boolean;
}

const navGroups: NavGroup[] = [
  {
    title: "",
    items: [{ label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "GESTÃO",
    collapsible: true,
    items: [
      { label: "Filiais", icon: Building2 },
      { label: "Planos", icon: CreditCard },
      { label: "Produtos", icon: Package },
      { label: "Contas a Receber", icon: Receipt },
    ],
  },
  {
    title: "ACADÊMICO",
    collapsible: true,
    items: [
      { label: "Alunos", icon: Users, active: true },
      { label: "Professores", icon: GraduationCap },
      { label: "Turmas", icon: BookOpen },
      { label: "Modalidades", icon: Sparkles },
      { label: "Experimentais", icon: Beaker },
    ],
  },
  {
    title: "CONFIGURAÇÕES",
    collapsible: true,
    items: [{ label: "Geral", icon: Settings }],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          MS
        </div>
        {!collapsed && (
          <span className="font-semibold text-foreground truncate">
            Maíra Silva
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.title || "main"}>
            {group.title && !collapsed && (
              <div className="flex items-center justify-between px-3 mb-1">
                <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">
                  {group.title}
                </span>
                {group.collapsible && (
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 px-4 py-3 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform",
            collapsed && "rotate-180"
          )}
        />
        {!collapsed && <span>Recolher menu</span>}
      </button>
    </aside>
  );
}
