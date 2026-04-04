import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentStatus = "pago" | "pendente" | "atrasado" | "cancelado";

interface Mensalidade {
  id: string;
  referencia: string;
  vencimento: string;
  valor: string;
  status: PaymentStatus;
  dataPagamento: string | null;
  formaPagamento: string | null;
}

const statusStyles: Record<PaymentStatus, { label: string; className: string }> = {
  pago: { label: "Pago", className: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20" },
  pendente: { label: "Pendente", className: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20" },
  atrasado: { label: "Atrasado", className: "bg-destructive/10 text-destructive border-destructive/20" },
  cancelado: { label: "Cancelado", className: "bg-secondary text-secondary-foreground border-border" },
};

const mockMensalidades: Mensalidade[] = [
  { id: "1", referencia: "Abril/2026", vencimento: "10/04/2026", valor: "R$ 149,90", status: "pendente", dataPagamento: null, formaPagamento: null },
  { id: "2", referencia: "Março/2026", vencimento: "10/03/2026", valor: "R$ 149,90", status: "pago", dataPagamento: "08/03/2026", formaPagamento: "PIX" },
  { id: "3", referencia: "Fevereiro/2026", vencimento: "10/02/2026", valor: "R$ 149,90", status: "pago", dataPagamento: "10/02/2026", formaPagamento: "Cartão de Crédito" },
  { id: "4", referencia: "Janeiro/2026", vencimento: "10/01/2026", valor: "R$ 149,90", status: "pago", dataPagamento: "09/01/2026", formaPagamento: "PIX" },
];

export function MensalidadesSection() {
  const totalPago = mockMensalidades.filter((m) => m.status === "pago").length;
  const totalPendente = mockMensalidades.filter((m) => m.status === "pendente" || m.status === "atrasado").length;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between p-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--success))]/10">
            <DollarSign className="h-5 w-5 text-[hsl(var(--success))]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Mensalidades</h2>
            <p className="text-sm text-muted-foreground">
              {totalPago} pagas · {totalPendente} pendente{totalPendente !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Nova cobrança
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Referência</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vencimento</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Valor</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data Pgto</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Forma</th>
              <th className="px-5 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {mockMensalidades.map((m) => (
              <tr key={m.id} className="border-t border-border hover:bg-muted/20 transition-colors cursor-pointer">
                <td className="px-5 py-3 font-medium text-foreground">{m.referencia}</td>
                <td className="px-5 py-3 text-muted-foreground">{m.vencimento}</td>
                <td className="px-5 py-3 font-semibold text-foreground">{m.valor}</td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium", statusStyles[m.status].className)}>
                    {statusStyles[m.status].label}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{m.dataPagamento || "—"}</td>
                <td className="px-5 py-3 text-muted-foreground">{m.formaPagamento || "—"}</td>
                <td className="px-5 py-3">
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
