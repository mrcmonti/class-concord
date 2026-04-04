import { CreditCard, CalendarCheck, Clock, TrendingUp } from "lucide-react";

interface StatsData {
  totalMatriculas: number;
  mensalidadesEmDia: boolean;
  frequenciaMensal: number;
  diasDesdeMatricula: number;
}

export function StudentStatsCards({ stats }: { stats: StatsData }) {
  const cards = [
    {
      label: "Matrículas Ativas",
      value: stats.totalMatriculas,
      icon: CreditCard,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Mensalidades",
      value: stats.mensalidadesEmDia ? "Em dia" : "Pendente",
      icon: CalendarCheck,
      color: stats.mensalidadesEmDia ? "text-[hsl(var(--success))]" : "text-destructive",
      bg: stats.mensalidadesEmDia ? "bg-[hsl(var(--success))]/10" : "bg-destructive/10",
    },
    {
      label: "Frequência Mensal",
      value: `${stats.frequenciaMensal}%`,
      icon: Clock,
      color: "text-[hsl(var(--info))]",
      bg: "bg-[hsl(var(--info))]/10",
    },
    {
      label: "Dias como Aluno",
      value: stats.diasDesdeMatricula,
      icon: TrendingUp,
      color: "text-[hsl(var(--warning))]",
      bg: "bg-[hsl(var(--warning))]/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="text-lg font-bold text-foreground">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
