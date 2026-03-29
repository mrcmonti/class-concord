import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ClipboardList,
  Beaker,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RecordType = "matricula" | "experimental";

type StatusMatricula = "ativa" | "pausada" | "cancelada" | "inadimplente";
type StatusExperimental =
  | "agendada"
  | "realizada"
  | "follow-up"
  | "contatada"
  | "nao-compareceu"
  | "convertida"
  | "descartada";

interface RegistrationRecord {
  id: string;
  aluno: string;
  tipo: RecordType;
  status: StatusMatricula | StatusExperimental;
  planoOuModalidade: string;
  turma: string;
  professor: string;
  dataInicio: string;
  dataFim?: string;
}

const mockData: RegistrationRecord[] = [
  {
    id: "1",
    aluno: "Ana Carolina",
    tipo: "matricula",
    status: "ativa",
    planoOuModalidade: "Plano Mensal",
    turma: "Yoga Manhã",
    professor: "Mauricio Professor",
    dataInicio: "01/02/2026",
    dataFim: "01/03/2026",
  },
  {
    id: "2",
    aluno: "Bruno Santos",
    tipo: "matricula",
    status: "inadimplente",
    planoOuModalidade: "Plano Trimestral",
    turma: "Musculação A",
    professor: "Carlos Instrutor",
    dataInicio: "15/01/2026",
    dataFim: "15/04/2026",
  },
  {
    id: "3",
    aluno: "Camila Ferreira",
    tipo: "experimental",
    status: "agendada",
    planoOuModalidade: "Ginástica",
    turma: "Ginástica T1",
    professor: "Mauricio Professor",
    dataInicio: "30/03/2026",
  },
  {
    id: "4",
    aluno: "Diego Almeida",
    tipo: "experimental",
    status: "convertida",
    planoOuModalidade: "Pilates",
    turma: "Pilates Manhã",
    professor: "Juliana Instrutora",
    dataInicio: "25/03/2026",
  },
  {
    id: "5",
    aluno: "Fernanda Lima",
    tipo: "matricula",
    status: "pausada",
    planoOuModalidade: "Plano Anual",
    turma: "CrossFit B",
    professor: "Roberto Coach",
    dataInicio: "10/01/2026",
    dataFim: "10/01/2027",
  },
  {
    id: "6",
    aluno: "Gabriel Costa",
    tipo: "experimental",
    status: "realizada",
    planoOuModalidade: "Funcional",
    turma: "Funcional Noite",
    professor: "Carlos Instrutor",
    dataInicio: "28/03/2026",
  },
  {
    id: "7",
    aluno: "Helena Ribeiro",
    tipo: "matricula",
    status: "cancelada",
    planoOuModalidade: "Plano Mensal",
    turma: "Yoga Tarde",
    professor: "Mauricio Professor",
    dataInicio: "01/12/2025",
    dataFim: "01/01/2026",
  },
  {
    id: "8",
    aluno: "Igor Martins",
    tipo: "experimental",
    status: "nao-compareceu",
    planoOuModalidade: "Musculação",
    turma: "Musculação B",
    professor: "Roberto Coach",
    dataInicio: "27/03/2026",
  },
];

const typeFilters: { label: string; value: "todos" | RecordType }[] = [
  { label: "Todos", value: "todos" },
  { label: "Matrículas", value: "matricula" },
  { label: "Experimentais", value: "experimental" },
];

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "destructive" | "info" | "accent" | "secondary" | "default" }> = {
  ativa: { label: "Ativa", variant: "success" },
  pausada: { label: "Pausada", variant: "warning" },
  cancelada: { label: "Cancelada", variant: "destructive" },
  inadimplente: { label: "Inadimplente", variant: "destructive" },
  agendada: { label: "Agendada", variant: "info" },
  realizada: { label: "Realizada", variant: "success" },
  "follow-up": { label: "Follow-up", variant: "warning" },
  contatada: { label: "Contatada", variant: "accent" },
  "nao-compareceu": { label: "Não compareceu", variant: "destructive" },
  convertida: { label: "Convertida", variant: "success" },
  descartada: { label: "Descartada", variant: "secondary" },
};

export function RegistrationsTable() {
  const [activeFilter, setActiveFilter] = useState<"todos" | RecordType>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockData.filter((r) => {
    const matchesType = activeFilter === "todos" || r.tipo === activeFilter;
    const matchesSearch =
      !searchQuery ||
      r.aluno.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.planoOuModalidade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const counts = {
    todos: mockData.length,
    matricula: mockData.filter((r) => r.tipo === "matricula").length,
    experimental: mockData.filter((r) => r.tipo === "experimental").length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Matrículas & Experimentais
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} registro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Novo registro
        </Button>
      </div>

      {/* Filters bar */}
      <div className="flex items-center gap-3">
        {/* Type pills */}
        <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                activeFilter === f.value
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.value === "matricula" && <ClipboardList className="h-3 w-3" />}
              {f.value === "experimental" && <Beaker className="h-3 w-3" />}
              {f.label}
              <span
                className={cn(
                  "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px]",
                  activeFilter === f.value
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {counts[f.value]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filtrar registros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-9 text-xs bg-card"
          />
        </div>

        <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
          <Filter className="h-3 w-3" />
          Filtros
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold">
                <button className="flex items-center gap-1">
                  Aluno <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-semibold">Tipo</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">Plano / Modalidade</TableHead>
              <TableHead className="text-xs font-semibold">Turma</TableHead>
              <TableHead className="text-xs font-semibold">Professor</TableHead>
              <TableHead className="text-xs font-semibold">
                <button className="flex items-center gap-1">
                  Data <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ClipboardList className="h-8 w-8 opacity-40" />
                    <p className="text-sm font-medium">Nenhum registro encontrado</p>
                    <p className="text-xs">Tente ajustar os filtros ou adicione um novo registro.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((record) => {
                const sc = statusConfig[record.status];
                return (
                  <TableRow key={record.id} className="group cursor-pointer">
                    <TableCell className="font-medium text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-semibold">
                          {record.aluno.split(" ").map((n) => n[0]).join("")}
                        </div>
                        {record.aluno}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={record.tipo === "matricula" ? "default" : "accent"}
                        className="text-[10px] px-2"
                      >
                        {record.tipo === "matricula" ? "Matrícula" : "Experimental"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sc.variant} className="text-[10px] px-2">
                        {sc.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.planoOuModalidade}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.turma}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.professor}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground tabular-nums">
                      {record.dataInicio}
                      {record.dataFim && (
                        <span className="text-muted-foreground/50"> → {record.dataFim}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <button className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-secondary transition-all">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
