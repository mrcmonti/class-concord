import { Mail, Phone, MapPin, Calendar, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudentInfoProps {
  student: {
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    endereco: string;
    cpf: string;
  };
}

export function StudentInfoCard({ student }: StudentInfoProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
            {student.nome.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{student.nome}</h2>
            <p className="text-xs text-muted-foreground">CPF: {student.cpf}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 h-8 text-xs">
          <Edit2 className="h-3 w-3" />
          Editar
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{student.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <span>{student.telefone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>{student.dataNascimento}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{student.endereco}</span>
        </div>
      </div>
    </div>
  );
}
