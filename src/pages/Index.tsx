import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { StudentInfoCard } from "@/components/StudentInfoCard";
import { StudentRecordsTable } from "@/components/StudentRecordsTable";
import { ChevronLeft } from "lucide-react";

const mockStudent = {
  nome: "Maíra Silva",
  email: "maira.silva@email.com",
  telefone: "(11) 99876-5432",
  dataNascimento: "15/06/1995",
  endereco: "Rua das Flores, 123 - São Paulo/SP",
  cpf: "123.456.789-00",
};

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Breadcrumb / back */}
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Voltar para Alunos
          </button>

          <StudentInfoCard student={mockStudent} />
          <StudentRecordsTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
