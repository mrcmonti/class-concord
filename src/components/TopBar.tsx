import { Bell, Building2, ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3 text-sm">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Filial</span>
        <button className="flex items-center gap-1 font-medium text-foreground">
          Filial Teste
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos, turmas..."
            className="w-64 pl-9 h-9 bg-background"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-right text-sm">
            <div className="font-medium text-foreground">Mauricio Monti</div>
            <div className="text-xs text-muted-foreground">Master</div>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            M
          </div>
        </div>
      </div>
    </header>
  );
}
