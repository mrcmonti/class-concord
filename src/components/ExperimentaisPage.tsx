import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Beaker,
  Plus,
  Search,
  Clock,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Users,
  CalendarCheck,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ExperimentalStatus =
  | "agendada"
  | "realizada"
  | "follow_up"
  | "contatada"
  | "nao_compareceu"
  | "convertida"
  | "descartada";

interface ExperimentalClass {
  id: string;
  aluno: string;
  idade: number;
  modalidade: string;
  professor: string;
  data: string;
  horario: string;
  status: ExperimentalStatus;
  diasSemContato?: number;
  telefone?: string;
}

const statusConfig: Record<
  ExperimentalStatus,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  agendada: {
    label: "Agendada",
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/20",
  },
  realizada: {
    label: "Realizada",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  follow_up: {
    label: "Follow-up pendente",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
  },
  contatada: {
    label: "Contatada",
    color: "text-info",
    bgColor: "bg-info/10",
    borderColor: "border-info/20",
  },
  nao_compareceu: {
    label: "Não compareceu",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
  },
  convertida: {
    label: "Convertida",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
  },
  descartada: {
    label: "Descartada",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
  },
};

const kanbanColumns: { status: ExperimentalStatus; icon: React.ElementType }[] = [
  { status: "agendada", icon: CalendarCheck },
  { status: "realizada", icon: Beaker },
  { status: "follow_up", icon: PhoneCall },
  { status: "contatada", icon: PhoneCall },
  { status: "convertida", icon: TrendingUp },
];

const mockData: ExperimentalClass[] = [
  {
    id: "1",
    aluno: "Gustavo Mendes",
    idade: 31,
    modalidade: "Ginástica",
    professor: "Maurício",
    data: "seg., 30/03",
    horario: "15:00",
    status: "agendada",
    telefone: "(11) 99876-1234",
  },
  {
    id: "2",
    aluno: "Ana Clara",
    idade: 24,
    modalidade: "Pilates",
    professor: "Fernanda",
    data: "ter., 25/03",
    horario: "10:00",
    status: "realizada",
    telefone: "(11) 98765-4321",
  },
  {
    id: "3",
    aluno: "Carlos Eduardo",
    idade: 35,
    modalidade: "Musculação",
    professor: "Roberto",
    data: "qui., 20/03",
    horario: "08:00",
    status: "follow_up",
    diasSemContato: 5,
    telefone: "(11) 91234-5678",
  },
  {
    id: "4",
    aluno: "Juliana Rocha",
    idade: 28,
    modalidade: "Yoga",
    professor: "Patrícia",
    data: "seg., 24/03",
    horario: "17:00",
    status: "follow_up",
    diasSemContato: 1,
    telefone: "(11) 92345-6789",
  },
  {
    id: "5",
    aluno: "Pedro Alves",
    idade: 42,
    modalidade: "Ginástica",
    professor: "Maurício",
    data: "qua., 19/03",
    horario: "09:00",
    status: "contatada",
    telefone: "(11) 93456-7890",
  },
  {
    id: "6",
    aluno: "Bianca Lima",
    idade: 19,
    modalidade: "Dança",
    professor: "Camila",
    data: "sex., 21/03",
    horario: "14:00",
    status: "convertida",
  },
  {
    id: "7",
    aluno: "Rafael Costa",
    idade: 33,
    modalidade: "Pilates",
    professor: "Fernanda",
    data: "ter., 18/03",
    horario: "11:00",
    status: "nao_compareceu",
    telefone: "(11) 94567-8901",
  },
  {
    id: "8",
    aluno: "Larissa Santos",
    idade: 26,
    modalidade: "Musculação",
    professor: "Roberto",
    data: "qua., 26/03",
    horario: "16:00",
    status: "agendada",
    telefone: "(11) 95678-9012",
  },
  {
    id: "9",
    aluno: "Marcos Vinicius",
    idade: 38,
    modalidade: "Yoga",
    professor: "Patrícia",
    data: "qui., 13/03",
    horario: "07:00",
    status: "follow_up",
    diasSemContato: 12,
    telefone: "(11) 96789-0123",
  },
];

function MetricCard({
  label,
  value,
  icon: Icon,
  trend,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      {trend && (
        <span className="text-xs font-medium text-success">{trend}</span>
      )}
    </div>
  );
}

function KanbanCard({ item }: { item: ExperimentalClass }) {
  const config = statusConfig[item.status];
  const isUrgent = item.diasSemContato && item.diasSemContato >= 5;

  return (
    <div
      className={cn(
        "group rounded-xl border bg-card p-4 space-y-3 transition-all hover:shadow-md cursor-pointer",
        isUrgent ? "border-destructive/30 ring-1 ring-destructive/10" : "border-border"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
            {item.aluno
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{item.aluno}</p>
            <p className="text-xs text-muted-foreground">{item.idade} anos</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <span className="rounded-md bg-secondary px-2 py-0.5 font-medium">{item.modalidade}</span>
        <span>•</span>
        <span>{item.professor}</span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>
          {item.data}, {item.horario}
        </span>
      </div>

      {item.diasSemContato !== undefined && (
        <div
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium rounded-md px-2 py-1",
            isUrgent
              ? "bg-destructive/10 text-destructive"
              : "bg-warning/10 text-warning"
          )}
        >
          <AlertTriangle className="h-3 w-3" />
          <span>
            {item.diasSemContato === 1
              ? "Há 1 dia sem contato"
              : `Há ${item.diasSemContato} dias sem contato`}
          </span>
        </div>
      )}
    </div>
  );
}

export function ExperimentaisPage() {
  const [search, setSearch] = useState("");
  const [modalidadeFilter, setModalidadeFilter] = useState("todas");
  const [professorFilter, setProfessorFilter] = useState("todos");

  const filtered = mockData.filter((item) => {
    const matchSearch = item.aluno.toLowerCase().includes(search.toLowerCase());
    const matchModalidade =
      modalidadeFilter === "todas" || item.modalidade === modalidadeFilter;
    const matchProfessor =
      professorFilter === "todos" || item.professor === professorFilter;
    return matchSearch && matchModalidade && matchProfessor;
  });

  const totalAgendadas = mockData.filter((i) => i.status === "agendada").length;
  const totalFollowUp = mockData.filter((i) => i.status === "follow_up").length;
  const totalConvertidas = mockData.filter((i) => i.status === "convertida").length;
  const taxaConversao = mockData.length
    ? Math.round((totalConvertidas / mockData.length) * 100)
    : 0;

  const modalidades = [...new Set(mockData.map((i) => i.modalidade))];
  const professores = [...new Set(mockData.map((i) => i.professor))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Beaker className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Aulas Experimentais
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe agendamentos, follow-ups e conversões em matrícula.
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova experimental
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="Agendadas esta semana"
          value={totalAgendadas}
          icon={CalendarCheck}
          color="bg-info/10 text-info"
        />
        <MetricCard
          label="Follow-up pendente"
          value={totalFollowUp}
          icon={PhoneCall}
          color="bg-warning/10 text-warning"
        />
        <MetricCard
          label="Convertidas no mês"
          value={totalConvertidas}
          icon={TrendingUp}
          color="bg-success/10 text-success"
          trend="+12%"
        />
        <MetricCard
          label="Taxa de conversão"
          value={`${taxaConversao}%`}
          icon={Users}
          color="bg-primary/10 text-primary"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome do aluno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={modalidadeFilter} onValueChange={setModalidadeFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Modalidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas modalidades</SelectItem>
            {modalidades.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={professorFilter} onValueChange={setProfessorFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Professor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos professores</SelectItem>
            {professores.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4 min-h-[400px]">
        {kanbanColumns.map(({ status, icon: Icon }) => {
          const config = statusConfig[status];
          const items = filtered.filter((i) => i.status === status);

          return (
            <div key={status} className="flex flex-col">
              {/* Column header */}
              <div
                className={cn(
                  "flex items-center gap-2 rounded-t-xl border px-3 py-2.5",
                  config.bgColor,
                  config.borderColor
                )}
              >
                <Icon className={cn("h-4 w-4", config.color)} />
                <span className={cn("text-sm font-semibold", config.color)}>
                  {config.label}
                </span>
                <span
                  className={cn(
                    "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full text-xs font-bold",
                    config.bgColor,
                    config.color
                  )}
                >
                  {items.length}
                </span>
              </div>

              {/* Column body */}
              <div className="flex-1 space-y-3 rounded-b-xl border border-t-0 border-border bg-secondary/30 p-3">
                {items.length === 0 ? (
                  <p className="py-8 text-center text-xs text-muted-foreground">
                    Nenhum registro
                  </p>
                ) : (
                  items.map((item) => <KanbanCard key={item.id} item={item} />)
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra statuses as smaller sections */}
      {(["nao_compareceu", "descartada"] as ExperimentalStatus[]).map((status) => {
        const config = statusConfig[status];
        const items = filtered.filter((i) => i.status === status);
        if (items.length === 0) return null;

        return (
          <div key={status}>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("text-sm font-semibold", config.color)}>
                {config.label}
              </span>
              <Badge variant="secondary" className="text-xs">
                {items.length}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {items.map((item) => (
                <KanbanCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
