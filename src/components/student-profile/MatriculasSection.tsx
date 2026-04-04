import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RegistroTipo = "matricula" | "experimental";
type RegistroStatus = "ativa" | "pausada" | "cancelada" | "pendente_matricula" | "agendada" | "realizada" | "convertida";

interface Registro {
  id: string;
  tipo: RegistroTipo;
  modalidade: string;
  status: RegistroStatus;
  plano: string | null;
  turma: string | null;
  professor: string;
  data: string;
}

const statusStyles: Record<RegistroStatus, { label: string; className: string }> = {
  ativa: { label: "Ativa", className: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20" },
  pausada: { label: "Pausada", className: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20" },
  cancelada: { label: "Cancelada", className: "bg-destructive/10 text-destructive border-destructive/20" },
  pendente_matricula: { label: "Pendente de matrícula", className: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))] border-[hsl(var(--info))]/20" },
  agendada: { label: "Agendada", className: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))] border-[hsl(var(--info))]/20" },
  realizada: { label: "Realizada", className: "bg-secondary text-secondary-foreground border-border" },
  convertida: { label: "Convertida", className: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20" },
};

const tipoStyles: Record<RegistroTipo, string> = {
  experimental: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))] border-[hsl(var(--info))]/30",
  matricula: "bg-primary/10 text-primary border-primary/30",
};

const mockRegistros: Registro[] = [
  { id: "1", tipo: "experimental", modalidade: "Ginástica", status: "pendente_matricula", plano: null, turma: null, professor: "João Silva", data: "06/04/2026, 11:00" },
  { id: "2", tipo: "matricula", modalidade: "Ginástica", status: "ativa", plano: "Plano Mensal Básico", turma: "AT-1", professor: "João Silva", data: "03/04/2026 → Atual" },
  { id: "3", tipo: "matricula", modalidade: "Musculação", status: "ativa", plano: "Plano Trimestral", turma: "MT-2", professor: "Carlos Mendes", data: "15/01/2026 → Atual" },
];

type FilterTab = "todos" | "matriculas" | "experimentais";

export function MatriculasSection() {
  const [filter, setFilter] = useState<FilterTab>("todos");
  const [search, setSearch] = useState("");

  const filtered = mockRegistros.filter((r) => {
    const matchFilter = filter === "todos" || (filter === "matriculas" ? r.tipo === "matricula" : r.tipo === "experimental");
    const matchSearch = r.modalidade.toLowerCase().includes(search.toLowerCase()) ||
      r.professor.toLowerCase().includes(search.toLowerCase()) ||
      (r.turma?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchFilter && matchSearch;
  });

  const counts = {
    todos: mockRegistros.length,
    matriculas: mockRegistros.filter((r) => r.tipo === "matricula").length,
    experimentais: mockRegistros.filter((r) => r.tipo === "experimental").length,
  };

  const tabs: { label: string; value: FilterTab; count: number }[] = [
    { label: "Todos", value: "todos", count: counts.todos },
    { label: "Matrículas", value: "matriculas", count: counts.matriculas },
    { label: "Experimentais", value: "experimentais", count: counts.experimentais },
  ];

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-5 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Matrículas & Experimentais</h2>
          <p className="text-sm text-muted-foreground">{mockRegistros.length} registros vinculados ao aluno</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>

      <div className="px-5 pb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setFilter(t.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5",
                filter === t.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                filter === t.value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Filtrar por modalidade, professor, turma..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-xs bg-background"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modalidade</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plano</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Turma</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Professor</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</th>
              <th className="px-5 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-5 py-3">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium", tipoStyles[r.tipo])}>
                    {r.tipo === "matricula" ? "Matrícula" : "Experimental"}
                  </span>
                </td>
                <td className="px-5 py-3 font-medium text-foreground">{r.modalidade}</td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium", statusStyles[r.status].className)}>
                    {statusStyles[r.status].label}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{r.plano || "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.turma || "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.professor}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.data}</td>
                <td className="px-5 py-3">
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-sm text-muted-foreground">
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
