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
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  ChevronRight,
  RotateCcw,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type StudentStatus = "ativo" | "inativo" | "inadimplente";

interface Student {
  id: string;
  nome: string;
  idade: number;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  status: StudentStatus;
  plano: string | null;
  modalidades: string[];
  dataMatricula: string;
  foto?: string;
}

const statusConfig: Record<StudentStatus, { label: string; variant: "success" | "secondary" | "destructive" }> = {
  ativo: { label: "ATIVO", variant: "success" },
  inativo: { label: "INATIVO", variant: "secondary" },
  inadimplente: { label: "INADIMPLENTE", variant: "destructive" },
};

const statusFilters: { label: string; value: "todos" | StudentStatus }[] = [
  { label: "Todos", value: "todos" },
  { label: "Ativos", value: "ativo" },
  { label: "Inativos", value: "inativo" },
];

const mockStudents: Student[] = [
  {
    id: "1",
    nome: "Mauricio Monti",
    idade: 31,
    cpf: "300.300.300-30",
    email: "teste@live.com",
    telefone: "(18) 99724-1094",
    dataNascimento: "22/05/1994",
    status: "ativo",
    plano: "Plano Mensal",
    modalidades: ["Musculação", "Funcional"],
    dataMatricula: "15/01/2026",
  },
  {
    id: "2",
    nome: "Ana Clara Ferreira",
    idade: 24,
    cpf: "123.456.789-00",
    email: "ana.clara@email.com",
    telefone: "(11) 98765-4321",
    dataNascimento: "10/08/2001",
    status: "ativo",
    plano: "Plano Trimestral",
    modalidades: ["Pilates", "Yoga"],
    dataMatricula: "01/02/2026",
  },
  {
    id: "3",
    nome: "Carlos Eduardo Silva",
    idade: 35,
    cpf: "987.654.321-00",
    email: "carlos.edu@email.com",
    telefone: "(11) 91234-5678",
    dataNascimento: "03/11/1990",
    status: "inadimplente",
    plano: "Plano Mensal",
    modalidades: ["Musculação"],
    dataMatricula: "10/12/2025",
  },
  {
    id: "4",
    nome: "Juliana Rocha Santos",
    idade: 28,
    cpf: "456.789.123-00",
    email: "juliana.rs@email.com",
    telefone: "(11) 92345-6789",
    dataNascimento: "15/06/1997",
    status: "inativo",
    plano: null,
    modalidades: [],
    dataMatricula: "05/09/2025",
  },
  {
    id: "5",
    nome: "Pedro Alves Mendonça",
    idade: 42,
    cpf: "654.321.987-00",
    email: "pedro.alves@email.com",
    telefone: "(11) 93456-7890",
    dataNascimento: "28/02/1984",
    status: "ativo",
    plano: "Plano Semestral",
    modalidades: ["CrossFit", "Musculação", "Funcional"],
    dataMatricula: "20/06/2025",
  },
  {
    id: "6",
    nome: "Bianca Lima Costa",
    idade: 19,
    cpf: "321.654.987-00",
    email: "bianca.lima@email.com",
    telefone: "(11) 94567-8901",
    dataNascimento: "12/12/2006",
    status: "ativo",
    plano: "Plano Mensal",
    modalidades: ["Dança"],
    dataMatricula: "01/03/2026",
  },
];

function StudentCard({ student }: { student: Student }) {
  const sc = statusConfig[student.status];
  const initials = student.nome.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const navigate = useNavigate();

  return (
    <div className="group rounded-xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/20">
      {/* Top accent line */}
      <div className="h-1 rounded-t-xl bg-gradient-to-r from-primary/60 to-primary/20" />

      <div className="p-5 space-y-4">
        {/* Header: Avatar + Name + Status */}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground truncate">{student.nome}</h3>
              <Badge variant={sc.variant} className="text-[10px] px-1.5 shrink-0">
                {sc.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {student.idade} anos · {student.cpf}
            </p>
          </div>
        </div>

        {/* Info grid */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span className={cn(student.plano ? "text-foreground font-medium" : "")}>
              {student.plano || "Sem plano"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>{student.dataNascimento}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span>{student.telefone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
            <span className="truncate">{student.email}</span>
          </div>
        </div>

        {/* Modalidades */}
        {student.modalidades.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {student.modalidades.map((mod) => (
              <span
                key={mod}
                className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
              >
                {mod}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border px-5 py-3">
        <button
          onClick={() => navigate(`/alunos/${student.id}`)}
          className="flex w-full items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          Ver detalhes
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function AlunosPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | StudentStatus>("todos");
  const [planoFilter, setPlanoFilter] = useState("todos");

  const planos = [...new Set(mockStudents.map((s) => s.plano).filter(Boolean))] as string[];

  const filtered = mockStudents.filter((s) => {
    const matchSearch =
      s.nome.toLowerCase().includes(search.toLowerCase()) ||
      s.cpf.includes(search) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.telefone.includes(search);
    const matchStatus = statusFilter === "todos" || s.status === statusFilter;
    const matchPlano = planoFilter === "todos" || s.plano === planoFilter;
    return matchSearch && matchStatus && matchPlano;
  });

  const counts = {
    todos: mockStudents.length,
    ativo: mockStudents.filter((s) => s.status === "ativo").length,
    inativo: mockStudents.filter((s) => s.status === "inativo").length,
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("todos");
    setPlanoFilter("todos");
  };

  const hasActiveFilters = search || statusFilter !== "todos" || planoFilter !== "todos";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Alunos</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os alunos cadastrados
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo aluno
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, CPF, plano, turma ou responsável..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
            <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
              {statusFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                    statusFilter === f.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plano</span>
            <Select value={planoFilter} onValueChange={setPlanoFilter}>
              <SelectTrigger className="w-48 h-8 text-xs">
                <SelectValue placeholder="Todos os planos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os planos</SelectItem>
                {planos.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs" onClick={clearFilters}>
                <RotateCcw className="h-3 w-3" />
                Limpar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          aluno{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-muted-foreground">
          {statusFilter !== "todos" ? statusConfig[statusFilter].label + "s" : "Todos"}
        </p>
      </div>

      {/* Student Cards Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Users className="h-12 w-12 opacity-30 mb-3" />
          <p className="text-sm font-medium">Nenhum aluno encontrado</p>
          <p className="text-xs mt-1">Tente ajustar os filtros ou cadastrar um novo aluno.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}
