import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentProfileHeader } from "./StudentProfileHeader";
import { StudentStatsCards } from "./StudentStatsCards";
import { MatriculasSection } from "./MatriculasSection";
import { MensalidadesSection } from "./MensalidadesSection";
import { PresencaSection } from "./PresencaSection";
import { EvolucaoSection } from "./EvolucaoSection";
import { GraduationCap, DollarSign, CalendarCheck, TrendingUp } from "lucide-react";

const mockStudent = {
  nome: "Mauricio Monti",
  email: "teste@live.com",
  telefone: "(18) 99724-1094",
  telefone2: "(19) 99999-9999",
  dataNascimento: "22/05/1994",
  endereco: "Rua Laura, 131 — Jardim Imperial · Regente Feijó · SP",
  cpf: "300.300.300-30",
  rg: "12121212",
  idade: 31,
  sexo: "Masculino",
  status: "ativo" as const,
};

const mockStats = {
  totalMatriculas: 2,
  mensalidadesEmDia: true,
  frequenciaMensal: 83,
  diasDesdeMatricula: 80,
};

const tabs = [
  { value: "matriculas", label: "Matrículas", icon: GraduationCap },
  { value: "mensalidades", label: "Mensalidades", icon: DollarSign },
  { value: "presenca", label: "Presença", icon: CalendarCheck },
  { value: "evolucao", label: "Evolução", icon: TrendingUp },
];

export function StudentProfilePage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <StudentProfileHeader student={mockStudent} />
      <StudentStatsCards stats={mockStats} />

      <Tabs defaultValue="matriculas" className="w-full">
        <TabsList className="w-full justify-start h-auto p-1 bg-secondary rounded-lg gap-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2 text-sm"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="matriculas" className="mt-4">
          <MatriculasSection />
        </TabsContent>
        <TabsContent value="mensalidades" className="mt-4">
          <MensalidadesSection />
        </TabsContent>
        <TabsContent value="presenca" className="mt-4">
          <PresencaSection />
        </TabsContent>
        <TabsContent value="evolucao" className="mt-4">
          <EvolucaoSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
