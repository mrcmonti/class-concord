import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
  Beaker,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "mes" | "semana" | "dia" | "lista";

interface CalendarEvent {
  id: string;
  title: string;
  type: "turma" | "experimental";
  modalidade: string;
  professor: string;
  horario: string;
  date: Date;
  aluno?: string;
}

const DAYS_PT = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
const MONTHS_PT = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const mockEvents: CalendarEvent[] = [
  { id: "1", title: "AT-1", type: "turma", modalidade: "Ginástica", professor: "Maurício", horario: "08:00", date: new Date(2026, 2, 30) },
  { id: "2", title: "AT-2", type: "turma", modalidade: "Pilates", professor: "Fernanda", horario: "10:00", date: new Date(2026, 2, 30) },
  { id: "3", title: "AT-2", type: "turma", modalidade: "Pilates", professor: "Fernanda", horario: "14:00", date: new Date(2026, 2, 30) },
  { id: "4", title: "Experimental · Gustavo", type: "experimental", modalidade: "Ginástica", professor: "Maurício", horario: "15:00", date: new Date(2026, 2, 30), aluno: "Gustavo" },
  { id: "5", title: "AT-2", type: "turma", modalidade: "Yoga", professor: "Patrícia", horario: "09:00", date: new Date(2026, 2, 31) },
  { id: "6", title: "AT-2", type: "turma", modalidade: "Musculação", professor: "Roberto", horario: "11:00", date: new Date(2026, 2, 31) },
  { id: "7", title: "AT-1", type: "turma", modalidade: "Ginástica", professor: "Maurício", horario: "08:00", date: new Date(2026, 3, 5) },
  { id: "8", title: "AT-2", type: "turma", modalidade: "Pilates", professor: "Fernanda", horario: "10:00", date: new Date(2026, 3, 5) },
  { id: "9", title: "AT-2", type: "turma", modalidade: "Yoga", professor: "Patrícia", horario: "16:00", date: new Date(2026, 3, 5) },
  { id: "10", title: "AT-1", type: "turma", modalidade: "Dança", professor: "Camila", horario: "07:00", date: new Date(2026, 2, 23) },
  { id: "11", title: "Experimental · Ana", type: "experimental", modalidade: "Pilates", professor: "Fernanda", horario: "11:00", date: new Date(2026, 2, 25), aluno: "Ana" },
  { id: "12", title: "AT-2", type: "turma", modalidade: "Musculação", professor: "Roberto", horario: "09:00", date: new Date(2026, 2, 16) },
];

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDow = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells: { date: Date; currentMonth: boolean }[] = [];

  // Previous month padding
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({ date: d, currentMonth: false });
  }

  // Current month
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ date: new Date(year, month, d), currentMonth: true });
  }

  // Next month padding
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

function EventPill({ event }: { event: CalendarEvent }) {
  const isExp = event.type === "experimental";
  return (
    <button
      className={cn(
        "w-full text-left truncate rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-tight transition-all hover:brightness-95",
        isExp
          ? "bg-warning/15 text-warning border border-warning/25"
          : "bg-primary/10 text-primary border border-primary/15"
      )}
      title={`${event.title} — ${event.horario} — ${event.professor}`}
    >
      {event.title}
    </button>
  );
}

function ListViewRow({ event }: { event: CalendarEvent }) {
  const isExp = event.type === "experimental";
  const dateStr = event.date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 hover:shadow-sm transition-shadow">
      <div className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold",
        isExp ? "bg-warning/15 text-warning" : "bg-primary/10 text-primary"
      )}>
        {isExp ? <Beaker className="h-4 w-4" /> : "AT"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
        <p className="text-xs text-muted-foreground">{event.modalidade} • {event.professor}</p>
      </div>
      <div className="text-right text-xs text-muted-foreground">
        <p className="font-medium text-foreground">{event.horario}</p>
        <p>{dateStr}</p>
      </div>
      <Badge variant="secondary" className={cn(
        "text-[10px]",
        isExp ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
      )}>
        {isExp ? "Experimental" : "Turma"}
      </Badge>
    </div>
  );
}

export function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026 to match mock data
  const [viewMode, setViewMode] = useState<ViewMode>("mes");
  const [turmaFilter, setTurmaFilter] = useState("todas");
  const [modalidadeFilter, setModalidadeFilter] = useState("todas");
  const [professorFilter, setProfessorFilter] = useState("todos");
  const [showExperimentais, setShowExperimentais] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const filtered = useMemo(() => {
    return mockEvents.filter((e) => {
      if (!showExperimentais && e.type === "experimental") return false;
      if (modalidadeFilter !== "todas" && e.modalidade !== modalidadeFilter) return false;
      if (professorFilter !== "todos" && e.professor !== professorFilter) return false;
      return true;
    });
  }, [showExperimentais, modalidadeFilter, professorFilter]);

  const grid = useMemo(() => getMonthGrid(year, month), [year, month]);
  const modalidades = [...new Set(mockEvents.map((e) => e.modalidade))];
  const professores = [...new Set(mockEvents.map((e) => e.professor))];

  const visibleEvents = filtered.filter((e) => {
    const first = grid[0].date;
    const last = grid[grid.length - 1].date;
    return e.date >= first && e.date <= last;
  });

  const visiblePeriodStart = grid[0].date.toISOString().slice(0, 10);
  const visiblePeriodEnd = grid[grid.length - 1].date.toISOString().slice(0, 10);

  function navigate(dir: number) {
    setCurrentDate(new Date(year, month + dir, 1));
  }

  function goToday() {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  }

  const viewModes: { value: ViewMode; label: string }[] = [
    { value: "mes", label: "Mês" },
    { value: "semana", label: "Semana" },
    { value: "dia", label: "Dia" },
    { value: "lista", label: "Lista" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CalendarIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Calendário</h1>
            <p className="text-sm text-muted-foreground">
              Fonte de verdade para aulas regulares, experimentais e eventos da filial.
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo evento
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-end gap-4 rounded-xl border border-border bg-card p-4">
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Turmas</label>
            <Select value={turmaFilter} onValueChange={setTurmaFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos</SelectItem>
                <SelectItem value="AT-1">AT-1</SelectItem>
                <SelectItem value="AT-2">AT-2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Modalidades</label>
            <Select value={modalidadeFilter} onValueChange={setModalidadeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos</SelectItem>
                {modalidades.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Professor</label>
            <Select value={professorFilter} onValueChange={setProfessorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {professores.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant={showExperimentais ? "default" : "outline"}
          onClick={() => setShowExperimentais(!showExperimentais)}
          className="gap-2 shrink-0"
        >
          <Beaker className="h-4 w-4" />
          Experimentais visíveis
        </Button>
      </div>

      {/* Stats strip */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" />
          <span>{visibleEvents.length} evento(s) no período visível</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{visiblePeriodStart} até {visiblePeriodEnd}</span>
        </div>
      </div>

      {/* Calendar container */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Calendar toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" className="h-8 font-semibold" onClick={goToday}>
              Hoje
            </Button>
          </div>

          <h2 className="text-base font-bold text-foreground capitalize">
            {MONTHS_PT[month]} de {year}
          </h2>

          <div className="flex rounded-lg border border-border overflow-hidden">
            {viewModes.map((vm) => (
              <button
                key={vm.value}
                onClick={() => setViewMode(vm.value)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  viewMode === vm.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-secondary"
                )}
              >
                {vm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar grid or list */}
        {viewMode === "lista" ? (
          <div className="p-4 space-y-2 max-h-[600px] overflow-y-auto">
            {visibleEvents
              .sort((a, b) => a.date.getTime() - b.date.getTime() || a.horario.localeCompare(b.horario))
              .map((event) => (
                <ListViewRow key={event.id} event={event} />
              ))}
            {visibleEvents.length === 0 && (
              <p className="py-12 text-center text-sm text-muted-foreground">Nenhum evento encontrado.</p>
            )}
          </div>
        ) : (
          <>
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-border">
              {DAYS_PT.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {grid.map((cell, idx) => {
                const dayEvents = filtered.filter((e) => isSameDay(e.date, cell.date));
                const isToday = isSameDay(cell.date, today);
                const isWeekend = cell.date.getDay() === 0 || cell.date.getDay() === 6;
                const maxVisible = 3;
                const overflow = dayEvents.length - maxVisible;

                return (
                  <div
                    key={idx}
                    className={cn(
                      "min-h-[100px] border-b border-r border-border p-1.5 transition-colors",
                      !cell.currentMonth && "bg-muted/40",
                      isWeekend && cell.currentMonth && "bg-muted/20",
                      idx % 7 === 0 && "border-l-0",
                    )}
                  >
                    <div className="flex justify-end mb-1">
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                          isToday && "bg-primary text-primary-foreground font-bold",
                          !isToday && cell.currentMonth && "text-foreground",
                          !cell.currentMonth && "text-muted-foreground/50"
                        )}
                      >
                        {cell.date.getDate()}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, maxVisible).map((event) => (
                        <EventPill key={event.id} event={event} />
                      ))}
                      {overflow > 0 && (
                        <button className="w-full text-center text-[10px] font-medium text-primary hover:underline">
                          +{overflow} mais
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
