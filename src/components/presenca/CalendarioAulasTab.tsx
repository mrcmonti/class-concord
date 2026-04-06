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
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Dumbbell,
  Users,
  Beaker,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAulas, mockTurmas, type AulaAgendada } from "./mockData";

const DAYS_PT = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
const MONTHS_PT = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const cells: { date: Date; currentMonth: boolean }[] = [];

  for (let i = startDow - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month, -i), currentMonth: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ date: new Date(year, month, d), currentMonth: true });
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }
  }
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

interface CalendarioAulasTabProps {
  onSelectAula?: (aula: AulaAgendada) => void;
}

export function CalendarioAulasTab({ onSelectAula }: CalendarioAulasTabProps) {
  const today = new Date(2026, 3, 6);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1));
  const [turmaFilter, setTurmaFilter] = useState("todas");
  const [professorFilter, setProfessorFilter] = useState("todos");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const grid = useMemo(() => getMonthGrid(year, month), [year, month]);

  const professores = [...new Set(mockTurmas.map((t) => t.professor))];

  const filtered = useMemo(() => {
    return mockAulas.filter((a) => {
      if (turmaFilter !== "todas" && a.turmaId !== turmaFilter) return false;
      if (professorFilter !== "todos" && a.professor !== professorFilter) return false;
      return true;
    });
  }, [turmaFilter, professorFilter]);

  function navigate(dir: number) {
    setCurrentDate(new Date(year, month + dir, 1));
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-end gap-4 rounded-xl border border-border bg-card p-4">
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Turma</label>
            <Select value={turmaFilter} onValueChange={setTurmaFilter}>
              <SelectTrigger><SelectValue placeholder="Todas" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                {mockTurmas.map((t) => (
                  <SelectItem key={t.id} value={t.id}>{t.nome} — {t.modalidade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Professor</label>
            <Select value={professorFilter} onValueChange={setProfessorFilter}>
              <SelectTrigger><SelectValue placeholder="Todos" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {professores.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Aulas Hoje", value: filtered.filter((a) => isSameDay(a.date, today)).length, color: "text-primary" },
          { label: "Aulas no Mês", value: filtered.filter((a) => a.date.getMonth() === month && a.date.getFullYear() === year).length, color: "text-foreground" },
          { label: "Turmas Ativas", value: mockTurmas.length, color: "text-[hsl(var(--success))]" },
          { label: "Professores", value: professores.length, color: "text-[hsl(var(--info))]" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("text-2xl font-bold mt-1", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-base font-bold text-foreground capitalize">
            {MONTHS_PT[month]} de {year}
          </h2>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Regular</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[hsl(var(--warning))]" /> Experimental</span>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-border">
          {DAYS_PT.map((d) => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {grid.map((cell, idx) => {
            const dayEvents = filtered.filter((a) => isSameDay(a.date, cell.date));
            const isToday = isSameDay(cell.date, today);
            return (
              <div
                key={idx}
                className={cn(
                  "min-h-[90px] border-b border-r border-border p-1.5",
                  !cell.currentMonth && "bg-muted/20",
                  isToday && "bg-primary/5"
                )}
              >
                <span className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                  isToday ? "bg-primary text-primary-foreground" : cell.currentMonth ? "text-foreground" : "text-muted-foreground/40"
                )}>
                  {cell.date.getDate()}
                </span>
                <div className="mt-0.5 space-y-0.5">
                  {dayEvents.slice(0, 3).map((aula) => (
                    <button
                      key={aula.id}
                      onClick={() => onSelectAula?.(aula)}
                      className={cn(
                        "w-full text-left truncate rounded px-1.5 py-0.5 text-[10px] font-medium leading-tight transition-all hover:brightness-95",
                        aula.tipo === "experimental"
                          ? "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))] border border-[hsl(var(--warning))]/25"
                          : "bg-primary/10 text-primary border border-primary/15"
                      )}
                    >
                      {aula.turmaNome} · {aula.horario.split(" - ")[0]}
                    </button>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-muted-foreground pl-1">+{dayEvents.length - 3} mais</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
