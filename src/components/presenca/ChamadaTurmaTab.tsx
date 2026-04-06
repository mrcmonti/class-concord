import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Save,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { mockAulas, mockTurmas, type AulaAgendada, type PresencaRegistro } from "./mockData";

type StatusPresenca = PresencaRegistro["status"];

const statusConfig: Record<StatusPresenca, { label: string; icon: typeof CheckCircle2; className: string; bgClass: string }> = {
  presente: { label: "Presente", icon: CheckCircle2, className: "text-[hsl(var(--success))]", bgClass: "bg-[hsl(var(--success))]/10 border-[hsl(var(--success))]/30 text-[hsl(var(--success))]" },
  ausente: { label: "Ausente", icon: XCircle, className: "text-destructive", bgClass: "bg-destructive/10 border-destructive/30 text-destructive" },
  justificado: { label: "Justificado", icon: Clock, className: "text-[hsl(var(--warning))]", bgClass: "bg-[hsl(var(--warning))]/10 border-[hsl(var(--warning))]/30 text-[hsl(var(--warning))]" },
  pendente: { label: "Pendente", icon: Clock, className: "text-muted-foreground", bgClass: "bg-muted border-border text-muted-foreground" },
};

export function ChamadaTurmaTab() {
  const today = new Date(2026, 3, 6);
  const [selectedTurma, setSelectedTurma] = useState(mockTurmas[0].id);
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [presencas, setPresencas] = useState<Record<string, StatusPresenca>>({});
  const [saved, setSaved] = useState(false);

  const turma = mockTurmas.find((t) => t.id === selectedTurma)!;

  const aula = useMemo(() => {
    const dateObj = new Date(selectedDate + "T12:00:00");
    return mockAulas.find(
      (a) =>
        a.turmaId === selectedTurma &&
        a.date.getFullYear() === dateObj.getFullYear() &&
        a.date.getMonth() === dateObj.getMonth() &&
        a.date.getDate() === dateObj.getDate()
    );
  }, [selectedTurma, selectedDate]);

  const alunosList = useMemo(() => {
    if (!aula) return [];
    return aula.presencas.filter((p) =>
      p.alunoNome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [aula, searchQuery]);

  function getStatus(alunoId: string, original: StatusPresenca): StatusPresenca {
    return presencas[alunoId] ?? original;
  }

  function toggleStatus(alunoId: string, current: StatusPresenca) {
    const order: StatusPresenca[] = ["pendente", "presente", "ausente", "justificado"];
    const next = order[(order.indexOf(current) + 1) % order.length];
    setPresencas((prev) => ({ ...prev, [alunoId]: next }));
    setSaved(false);
  }

  function marcarTodos(status: StatusPresenca) {
    if (!aula) return;
    const updates: Record<string, StatusPresenca> = {};
    aula.presencas.forEach((p) => {
      updates[p.alunoId] = status;
    });
    setPresencas((prev) => ({ ...prev, ...updates }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  // Compute stats
  const stats = useMemo(() => {
    if (!aula) return { total: 0, presentes: 0, ausentes: 0, pendentes: 0 };
    const total = aula.presencas.length;
    let presentes = 0, ausentes = 0, pendentes = 0;
    aula.presencas.forEach((p) => {
      const s = getStatus(p.alunoId, p.status);
      if (s === "presente") presentes++;
      else if (s === "ausente" || s === "justificado") ausentes++;
      else pendentes++;
    });
    return { total, presentes, ausentes, pendentes };
  }, [aula, presencas]);

  // Generate available dates for this turma
  const availableDates = useMemo(() => {
    return mockAulas
      .filter((a) => a.turmaId === selectedTurma)
      .map((a) => {
        const d = a.date;
        return {
          value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
          label: d.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" }),
        };
      })
      .filter((v, i, arr) => arr.findIndex((x) => x.value === v.value) === i)
      .sort((a, b) => b.value.localeCompare(a.value));
  }, [selectedTurma]);

  return (
    <div className="space-y-4">
      {/* Select turma & date */}
      <div className="flex items-end gap-4 rounded-xl border border-border bg-card p-4">
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Turma</label>
            <Select value={selectedTurma} onValueChange={(v) => { setSelectedTurma(v); setPresencas({}); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {mockTurmas.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.nome} — {t.modalidade} ({t.professor})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Data da Aula</label>
            <Select value={selectedDate} onValueChange={(v) => { setSelectedDate(v); setPresencas({}); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {availableDates.map((d) => (
                  <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {!aula ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">Nenhuma aula encontrada para esta turma nesta data.</p>
        </div>
      ) : (
        <>
          {/* Info bar */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{turma.nome} — {turma.modalidade}</p>
                <p className="text-xs text-muted-foreground">
                  Prof. {turma.professor} · {aula.horario} · {aula.date.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1.5 text-[hsl(var(--success))]">
                <CheckCircle2 className="h-3.5 w-3.5" /> {stats.presentes}
              </span>
              <span className="flex items-center gap-1.5 text-destructive">
                <XCircle className="h-3.5 w-3.5" /> {stats.ausentes}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {stats.pendentes}
              </span>
              <span className="text-xs text-muted-foreground">/ {stats.total} alunos</span>
            </div>
          </div>

          {/* Actions bar */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar aluno..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => marcarTodos("presente")} className="gap-1.5 text-xs">
                <UserCheck className="h-3.5 w-3.5" /> Todos presentes
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-1.5 text-xs">
                <Save className="h-3.5 w-3.5" />
                {saved ? "Salvo ✓" : "Salvar chamada"}
              </Button>
            </div>
          </div>

          {/* Attendance list */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-12">#</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aluno</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody>
                {alunosList.map((p, i) => {
                  const status = getStatus(p.alunoId, p.status);
                  const sc = statusConfig[status];
                  const Icon = sc.icon;
                  return (
                    <tr key={p.alunoId} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground text-xs">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                            {p.alunoNome.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <span className="font-medium text-foreground">{p.alunoNome}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", sc.bgClass)}>
                          <Icon className="h-3 w-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="inline-flex items-center gap-1">
                          {(["presente", "ausente", "justificado"] as StatusPresenca[]).map((s) => {
                            const cfg = statusConfig[s];
                            const SIcon = cfg.icon;
                            const isActive = status === s;
                            return (
                              <button
                                key={s}
                                onClick={() => setPresencas((prev) => ({ ...prev, [p.alunoId]: s }))}
                                title={cfg.label}
                                className={cn(
                                  "h-8 w-8 rounded-lg flex items-center justify-center transition-all border",
                                  isActive
                                    ? cfg.bgClass
                                    : "border-transparent text-muted-foreground/50 hover:bg-muted hover:text-foreground"
                                )}
                              >
                                <SIcon className="h-4 w-4" />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
