import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAulas, mockTurmas } from "./mockData";

export function VisaoProfessorTab() {
  const professores = [...new Set(mockTurmas.map((t) => t.professor))];
  const [selectedProfessor, setSelectedProfessor] = useState(professores[0]);

  const professorTurmas = useMemo(
    () => mockTurmas.filter((t) => t.professor === selectedProfessor),
    [selectedProfessor]
  );

  const professorAulas = useMemo(
    () => mockAulas.filter((a) => a.professor === selectedProfessor),
    [selectedProfessor]
  );

  const today = new Date(2026, 3, 6);
  const aulasHoje = professorAulas.filter(
    (a) =>
      a.date.getFullYear() === today.getFullYear() &&
      a.date.getMonth() === today.getMonth() &&
      a.date.getDate() === today.getDate()
  );

  const totalAlunos = new Set(
    professorTurmas.flatMap((t) => t.alunos.map((a) => a.id))
  ).size;

  // Compute attendance rate for past classes
  const pastAulas = professorAulas.filter((a) => a.date < today);
  const totalPresencas = pastAulas.reduce(
    (acc, a) => acc + a.presencas.filter((p) => p.status === "presente").length,
    0
  );
  const totalRegistros = pastAulas.reduce((acc, a) => acc + a.presencas.length, 0);
  const taxaFrequencia = totalRegistros > 0 ? Math.round((totalPresencas / totalRegistros) * 100) : 0;

  // Recent classes (last 7)
  const recentAulas = [...professorAulas]
    .filter((a) => a.date <= today)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 7);

  return (
    <div className="space-y-4">
      {/* Professor selector */}
      <div className="flex items-end gap-4 rounded-xl border border-border bg-card p-4">
        <div className="space-y-1.5 flex-1 max-w-xs">
          <label className="text-xs font-medium text-muted-foreground">Professor</label>
          <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {professores.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Turmas", value: professorTurmas.length, icon: BookOpen, color: "text-primary" },
          { label: "Alunos Total", value: totalAlunos, icon: Users, color: "text-[hsl(var(--info))]" },
          { label: "Aulas Hoje", value: aulasHoje.length, icon: CalendarIcon, color: "text-[hsl(var(--warning))]" },
          { label: "Frequência Geral", value: `${taxaFrequencia}%`, icon: CheckCircle2, color: "text-[hsl(var(--success))]" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <s.icon className={cn("h-5 w-5", s.color)} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Turmas list */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Turmas do Professor</h3>
        </div>
        <div className="divide-y divide-border">
          {professorTurmas.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                  {t.nome}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.modalidade}</p>
                  <p className="text-xs text-muted-foreground">{t.horario} · {t.diasSemana.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {t.alunos.length} alunos
                </span>
                <Badge variant="secondary" className="text-[10px]">Ativa</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent classes */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Últimas Aulas</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Turma</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Horário</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Presentes</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ausentes</th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">Frequência</th>
            </tr>
          </thead>
          <tbody>
            {recentAulas.map((a) => {
              const presentes = a.presencas.filter((p) => p.status === "presente").length;
              const ausentes = a.presencas.filter((p) => p.status === "ausente" || p.status === "justificado").length;
              const total = a.presencas.length;
              const freq = total > 0 ? Math.round((presentes / total) * 100) : 0;
              return (
                <tr key={a.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">
                    {a.date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}
                  </td>
                  <td className="px-5 py-3 text-foreground">{a.turmaNome} — {a.modalidade}</td>
                  <td className="px-5 py-3 text-muted-foreground">{a.horario}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-[hsl(var(--success))] font-medium">{presentes}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-destructive font-medium">{ausentes}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Badge variant="secondary" className={cn(
                      "text-[10px]",
                      freq >= 80 ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" : freq >= 50 ? "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" : "bg-destructive/10 text-destructive"
                    )}>
                      {freq}%
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
