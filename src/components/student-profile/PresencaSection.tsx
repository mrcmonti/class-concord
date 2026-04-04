import { Badge } from "@/components/ui/badge";
import { CalendarCheck, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PresencaStatus = "presente" | "ausente" | "justificado";

interface PresencaEntry {
  id: string;
  data: string;
  horario: string;
  modalidade: string;
  turma: string;
  professor: string;
  status: PresencaStatus;
}

const statusConfig: Record<PresencaStatus, { label: string; icon: typeof CheckCircle2; className: string }> = {
  presente: { label: "Presente", icon: CheckCircle2, className: "text-[hsl(var(--success))]" },
  ausente: { label: "Ausente", icon: XCircle, className: "text-destructive" },
  justificado: { label: "Justificado", icon: Clock, className: "text-[hsl(var(--warning))]" },
};

const mockPresenca: PresencaEntry[] = [
  { id: "1", data: "04/04/2026", horario: "07:00 - 08:00", modalidade: "Musculação", turma: "MT-2", professor: "Carlos Mendes", status: "presente" },
  { id: "2", data: "03/04/2026", horario: "09:00 - 10:00", modalidade: "Ginástica", turma: "AT-1", professor: "João Silva", status: "presente" },
  { id: "3", data: "02/04/2026", horario: "07:00 - 08:00", modalidade: "Musculação", turma: "MT-2", professor: "Carlos Mendes", status: "presente" },
  { id: "4", data: "01/04/2026", horario: "09:00 - 10:00", modalidade: "Ginástica", turma: "AT-1", professor: "João Silva", status: "ausente" },
  { id: "5", data: "31/03/2026", horario: "07:00 - 08:00", modalidade: "Musculação", turma: "MT-2", professor: "Carlos Mendes", status: "presente" },
  { id: "6", data: "30/03/2026", horario: "09:00 - 10:00", modalidade: "Ginástica", turma: "AT-1", professor: "João Silva", status: "justificado" },
];

export function PresencaSection() {
  const total = mockPresenca.length;
  const presentes = mockPresenca.filter((p) => p.status === "presente").length;
  const ausentes = mockPresenca.filter((p) => p.status === "ausente").length;
  const freq = total > 0 ? Math.round((presentes / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--info))]/10">
            <CalendarCheck className="h-5 w-5 text-[hsl(var(--info))]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Lista de Presença</h2>
            <p className="text-sm text-muted-foreground">
              {presentes} presenças · {ausentes} falta{ausentes !== 1 ? "s" : ""} · Frequência: {freq}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[hsl(var(--success))]" /> Presente</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive" /> Ausente</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[hsl(var(--warning))]" /> Justificado</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Horário</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modalidade</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Turma</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Professor</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockPresenca.map((p) => {
              const sc = statusConfig[p.status];
              const Icon = sc.icon;
              return (
                <tr key={p.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{p.data}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.horario}</td>
                  <td className="px-5 py-3 text-foreground">{p.modalidade}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.turma}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.professor}</td>
                  <td className="px-5 py-3">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", sc.className)}>
                      <Icon className="h-3.5 w-3.5" />
                      {sc.label}
                    </span>
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
