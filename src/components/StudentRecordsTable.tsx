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
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RecordType = "matricula" | "experimental";

interface StudentRecord {
  id: string;
  tipo: RecordType;
  status: string;
  modalidade: string;
  plano?: string;
  turma: string;
  professor: string;
  dataInicio: string;
  dataFim?: string;
  horario?: string;
}

const mockRecords: StudentRecord[] = [
  {
    id: "1",
    tipo: "matricula",
    status: "ativa",
    modalidade: "Musculação",
    plano: "Plano Mensal",
    turma: "Musculação A",
    professor: "Carlos Instrutor",
    dataInicio: "01/02/2026",
    dataFim: "01/03/2026",
  },
  {
    id: "2",
    tipo: "matricula",
    status: "ativa",
    modalidade: "Yoga",
    plano: "Plano Trimestral",
    turma: "Yoga Manhã",
    professor: "Juliana Instrutora",
    dataInicio: "15/01/2026",
    dataFim: "15/04/2026",
  },
  {
    id: "3",
    tipo: "matricula",
    status: "pausada",
    modalidade: "Pilates",
    plano: "Plano Mensal",
    turma: "Pilates Tarde",
    professor: "Mauricio Professor",
    dataInicio: "01/01/2026",
    dataFim: "01/02/2026",
  },
  {
    id: "4",
    tipo: "experimental",
    status: "agendada",
    modalidade: "Ginástica",
    turma: "Ginástica T1",
    professor: "Mauricio Professor",
    dataInicio: "30/03/2026",
    horario: "18:00",
  },
  {
    id: "5",
    tipo: "experimental",
    status: "realizada",
    modalidade: "Funcional",
    turma: "Funcional Noite",
    professor: "Carlos Instrutor",
    dataInicio: "20/03/2026",
    horario: "19:30",
  },
  {
    id: "6",
    tipo: "experimental",
    status: "convertida",
    modalidade: "CrossFit",
    turma: "CrossFit B",
    professor: "Roberto Coach",
    dataInicio: "10/03/2026",
    horario: "07:00",
  },
];

const typeFilters: { label: string; value: "todos" | RecordType }[] = [
  { label: "Todos", value: "todos" },
  { label: "Matrículas", value: "matricula" },
  { label: "Experimentais", value: "experimental" },
];

const statusConfig: Record<
  string,
  { label: string; variant: "success" | "warning" | "destructive" | "info" | "accent" | "secondary" }
> = {
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

export function StudentRecordsTable() {
  const [activeFilter, setActiveFilter] = useState<"todos" | RecordType>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockRecords.filter((r) => {
    const matchesType = activeFilter === "todos" || r.tipo === activeFilter;
    const matchesSearch =
      !searchQuery ||
      r.modalidade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.professor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const counts = {
    todos: mockRecords.length,
    matricula: mockRecords.filter((r) => r.tipo === "matricula").length,
    experimental: mockRecords.filter((r) => r.tipo === "experimental").length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Matrículas & Experimentais
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} registro{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button size="sm" className="gap-1.5 h-8 text-xs">
          <Plus className="h-3.5 w-3.5" />
          Adicionar
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
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

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filtrar por modalidade, professor..."
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
              <TableHead className="text-xs font-semibold">Tipo</TableHead>
              <TableHead className="text-xs font-semibold">
                <button className="flex items-center gap-1">
                  Modalidade <ArrowUpDown className="h-3 w-3" />
                </button>
              </TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-xs font-semibold">Plano</TableHead>
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
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ClipboardList className="h-7 w-7 opacity-40" />
                    <p className="text-sm font-medium">Nenhum registro encontrado</p>
                    <p className="text-xs">Adicione uma matrícula ou aula experimental.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((record) => {
                const sc = statusConfig[record.status];
                return (
                  <TableRow key={record.id} className="group cursor-pointer">
                    <TableCell>
                      <Badge
                        variant={record.tipo === "matricula" ? "default" : "accent"}
                        className="text-[10px] px-2"
                      >
                        {record.tipo === "matricula" ? "Matrícula" : "Experimental"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{record.modalidade}</TableCell>
                    <TableCell>
                      <Badge variant={sc.variant} className="text-[10px] px-2">
                        {sc.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.plano || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.turma}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.professor}</TableCell>
                    <TableCell className="text-sm text-muted-foreground tabular-nums">
                      {record.dataInicio}
                      {record.horario && (
                        <span className="text-muted-foreground/60">, {record.horario}</span>
                      )}
                      {record.dataFim && (
                        <span className="text-muted-foreground/50"> → {record.dataFim}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <button className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-secondary transition-all">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
