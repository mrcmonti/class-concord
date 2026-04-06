import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Users, GraduationCap, ClipboardList } from "lucide-react";
import { CalendarioAulasTab } from "./CalendarioAulasTab";
import { ChamadaTurmaTab } from "./ChamadaTurmaTab";
import { VisaoProfessorTab } from "./VisaoProfessorTab";

export function PresencaManagementPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Gestão de Presença</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe aulas, turmas e registre a presença dos alunos.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="calendario" className="space-y-4">
        <TabsList className="bg-muted/50 p-1 h-auto gap-1">
          <TabsTrigger value="calendario" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2.5">
            <CalendarIcon className="h-4 w-4" />
            Calendário de Aulas
          </TabsTrigger>
          <TabsTrigger value="chamada" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2.5">
            <Users className="h-4 w-4" />
            Lista de Presença
          </TabsTrigger>
          <TabsTrigger value="professor" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2.5">
            <GraduationCap className="h-4 w-4" />
            Visão por Professor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendario">
          <CalendarioAulasTab />
        </TabsContent>
        <TabsContent value="chamada">
          <ChamadaTurmaTab />
        </TabsContent>
        <TabsContent value="professor">
          <VisaoProfessorTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
