import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Building2, CreditCard, Beaker, Clock, Users, Bell } from "lucide-react";
import { toast } from "sonner";

interface BranchSettings {
  // Financeiro
  allowEnrollmentFee: boolean;
  enrollmentFeeValue: string;
  allowMonthlyDiscount: boolean;
  maxDiscountPercent: string;
  defaultPaymentDay: string;

  // Acadêmico
  allowTrialClass: boolean;
  maxTrialClassesPerStudent: string;
  trialClassDuration: string;
  requireTrialBeforeEnrollment: boolean;

  // Alunos
  allowPlanFreeze: boolean;
  maxFreezeDays: string;
  requireMedicalCertificate: boolean;

  // Notificações
  sendWhatsappReminder: boolean;
  reminderHoursBefore: string;
  sendPaymentReminder: boolean;
  paymentReminderDaysBefore: string;
}

const defaultSettings: BranchSettings = {
  allowEnrollmentFee: true,
  enrollmentFeeValue: "99.90",
  allowMonthlyDiscount: false,
  maxDiscountPercent: "10",
  defaultPaymentDay: "10",
  allowTrialClass: true,
  maxTrialClassesPerStudent: "1",
  trialClassDuration: "60",
  requireTrialBeforeEnrollment: false,
  allowPlanFreeze: true,
  maxFreezeDays: "30",
  requireMedicalCertificate: false,
  sendWhatsappReminder: true,
  reminderHoursBefore: "2",
  sendPaymentReminder: true,
  paymentReminderDaysBefore: "3",
};

function SettingRow({
  icon: Icon,
  label,
  description,
  children,
}: {
  icon?: React.ElementType;
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-start gap-3 flex-1">
        {Icon && <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />}
        <div className="space-y-0.5">
          <Label className="text-sm font-medium">{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState<BranchSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const update = <K extends keyof BranchSettings>(key: K, value: BranchSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    setHasChanges(false);
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie os parâmetros da sua filial
          </p>
        </div>
        <Button onClick={handleSave} disabled={!hasChanges}>
          <Save className="h-4 w-4" />
          Salvar alterações
        </Button>
      </div>

      {/* Financeiro */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Financeiro</CardTitle>
          </div>
          <CardDescription>Configurações de cobranças e pagamentos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-border">
          <SettingRow
            label="Cobrar taxa de matrícula"
            description="Habilita a cobrança de uma taxa no momento da matrícula do aluno"
          >
            <Switch
              checked={settings.allowEnrollmentFee}
              onCheckedChange={(v) => update("allowEnrollmentFee", v)}
            />
          </SettingRow>

          {settings.allowEnrollmentFee && (
            <SettingRow label="Valor da matrícula (R$)" description="Valor padrão cobrado na matrícula">
              <Input
                type="text"
                className="w-28 text-right"
                value={settings.enrollmentFeeValue}
                onChange={(e) => update("enrollmentFeeValue", e.target.value)}
              />
            </SettingRow>
          )}

          <SettingRow
            label="Permitir desconto mensal"
            description="Permite aplicar descontos nas mensalidades dos alunos"
          >
            <Switch
              checked={settings.allowMonthlyDiscount}
              onCheckedChange={(v) => update("allowMonthlyDiscount", v)}
            />
          </SettingRow>

          {settings.allowMonthlyDiscount && (
            <SettingRow label="Desconto máximo (%)" description="Limite máximo de desconto aplicável">
              <Input
                type="text"
                className="w-20 text-right"
                value={settings.maxDiscountPercent}
                onChange={(e) => update("maxDiscountPercent", e.target.value)}
              />
            </SettingRow>
          )}

          <SettingRow label="Dia padrão de vencimento" description="Dia do mês para vencimento das mensalidades">
            <Select value={settings.defaultPaymentDay} onValueChange={(v) => update("defaultPaymentDay", v)}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20, 25].map((d) => (
                  <SelectItem key={d} value={String(d)}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SettingRow>
        </CardContent>
      </Card>

      {/* Acadêmico */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Aulas Experimentais</CardTitle>
          </div>
          <CardDescription>Configurações sobre aulas experimentais e conversão</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-border">
          <SettingRow
            label="Permitir aula experimental"
            description="Habilita o agendamento de aulas experimentais para novos alunos"
          >
            <Switch
              checked={settings.allowTrialClass}
              onCheckedChange={(v) => update("allowTrialClass", v)}
            />
          </SettingRow>

          {settings.allowTrialClass && (
            <>
              <SettingRow
                label="Máximo de experimentais por aluno"
                description="Quantas aulas experimentais cada aluno pode fazer"
              >
                <Select
                  value={settings.maxTrialClassesPerStudent}
                  onValueChange={(v) => update("maxTrialClassesPerStudent", v)}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SettingRow>

              <SettingRow label="Duração padrão (min)" description="Tempo padrão de uma aula experimental">
                <Select
                  value={settings.trialClassDuration}
                  onValueChange={(v) => update("trialClassDuration", v)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[30, 45, 60, 90].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </SettingRow>

              <SettingRow
                label="Exigir experimental antes da matrícula"
                description="O aluno precisa fazer uma aula experimental antes de se matricular"
              >
                <Switch
                  checked={settings.requireTrialBeforeEnrollment}
                  onCheckedChange={(v) => update("requireTrialBeforeEnrollment", v)}
                />
              </SettingRow>
            </>
          )}
        </CardContent>
      </Card>

      {/* Alunos */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Alunos</CardTitle>
          </div>
          <CardDescription>Regras e permissões relacionadas aos alunos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-border">
          <SettingRow
            label="Permitir trancamento de plano"
            description="Permite que alunos tranquem o plano temporariamente"
          >
            <Switch
              checked={settings.allowPlanFreeze}
              onCheckedChange={(v) => update("allowPlanFreeze", v)}
            />
          </SettingRow>

          {settings.allowPlanFreeze && (
            <SettingRow label="Máximo de dias de trancamento" description="Limite de dias que o plano pode ficar trancado">
              <Input
                type="text"
                className="w-20 text-right"
                value={settings.maxFreezeDays}
                onChange={(e) => update("maxFreezeDays", e.target.value)}
              />
            </SettingRow>
          )}

          <SettingRow
            label="Exigir atestado médico"
            description="Exige que o aluno apresente atestado médico na matrícula"
          >
            <Switch
              checked={settings.requireMedicalCertificate}
              onCheckedChange={(v) => update("requireMedicalCertificate", v)}
            />
          </SettingRow>
        </CardContent>
      </Card>

      {/* Notificações */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Notificações</CardTitle>
          </div>
          <CardDescription>Configurações de lembretes e avisos automáticos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 divide-y divide-border">
          <SettingRow
            label="Lembrete de aula via WhatsApp"
            description="Envia lembrete automático antes da aula"
          >
            <Switch
              checked={settings.sendWhatsappReminder}
              onCheckedChange={(v) => update("sendWhatsappReminder", v)}
            />
          </SettingRow>

          {settings.sendWhatsappReminder && (
            <SettingRow label="Horas antes do lembrete" description="Quantas horas antes da aula enviar o lembrete">
              <Select
                value={settings.reminderHoursBefore}
                onValueChange={(v) => update("reminderHoursBefore", v)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 6, 12, 24].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingRow>
          )}

          <SettingRow
            label="Lembrete de pagamento"
            description="Envia aviso automático antes do vencimento da mensalidade"
          >
            <Switch
              checked={settings.sendPaymentReminder}
              onCheckedChange={(v) => update("sendPaymentReminder", v)}
            />
          </SettingRow>

          {settings.sendPaymentReminder && (
            <SettingRow label="Dias antes do vencimento" description="Quantos dias antes do vencimento enviar o aviso">
              <Select
                value={settings.paymentReminderDaysBefore}
                onValueChange={(v) => update("paymentReminderDaysBefore", v)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 5, 7].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}d
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SettingRow>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
