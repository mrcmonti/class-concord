import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Calendar, Edit2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Student {
  nome: string;
  email: string;
  telefone: string;
  telefone2?: string;
  dataNascimento: string;
  endereco: string;
  cpf: string;
  rg?: string;
  idade: number;
  sexo: string;
  status: "ativo" | "inativo" | "inadimplente";
}

const statusConfig = {
  ativo: { label: "Ativo", variant: "success" as const },
  inativo: { label: "Inativo", variant: "secondary" as const },
  inadimplente: { label: "Inadimplente", variant: "destructive" as const },
};

export function StudentProfileHeader({ student }: { student: Student }) {
  const navigate = useNavigate();
  const initials = student.nome.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const sc = statusConfig[student.status];

  return (
    <div className="space-y-4">
      <button
        onClick={() => navigate("/alunos")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Alunos
      </button>

      <div className="rounded-xl border border-border bg-card">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-foreground">{student.nome}</h1>
                  <Badge variant={sc.variant}>{sc.label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  CPF: {student.cpf} · {student.idade} anos · {student.sexo}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Edit2 className="h-3.5 w-3.5" />
              Editar
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0 text-muted-foreground/70" />
              <span>{student.telefone}{student.telefone2 ? ` · ${student.telefone2}` : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 shrink-0 text-muted-foreground/70" />
              <span>{student.dataNascimento}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{student.endereco}</span>
            </div>
          </div>
        </div>

        {student.rg && (
          <div className="border-t border-border px-6 py-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">RG</span>
            <p className="text-sm font-medium text-foreground mt-0.5">{student.rg}</p>
          </div>
        )}
      </div>
    </div>
  );
}
