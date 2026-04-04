import { TrendingUp, Lock } from "lucide-react";

export function EvolucaoSection() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--warning))]/10">
            <TrendingUp className="h-5 w-5 text-[hsl(var(--warning))]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Evolução & Desempenho</h2>
            <p className="text-sm text-muted-foreground">Análise de progresso, avaliações físicas e metas</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-5 py-12 flex flex-col items-center justify-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
          <Lock className="h-6 w-6 text-muted-foreground/50" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Em breve</h3>
        <p className="text-xs text-muted-foreground max-w-sm">
          Acompanhe a evolução do aluno com gráficos de progresso, avaliações físicas periódicas, 
          metas personalizadas e relatórios de desempenho por modalidade.
        </p>
      </div>
    </div>
  );
}
