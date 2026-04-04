import { StudentProfileHeader } from "./StudentProfileHeader";
import { StudentStatsCards } from "./StudentStatsCards";
import { MatriculasSection } from "./MatriculasSection";
import { MensalidadesSection } from "./MensalidadesSection";
import { PresencaSection } from "./PresencaSection";
import { EvolucaoSection } from "./EvolucaoSection";

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

export function StudentProfilePage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <StudentProfileHeader student={mockStudent} />
      <StudentStatsCards stats={mockStats} />
      <MatriculasSection />
      <MensalidadesSection />
      <PresencaSection />
      <EvolucaoSection />
    </div>
  );
}
