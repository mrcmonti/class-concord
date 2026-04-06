export interface Turma {
  id: string;
  nome: string;
  modalidade: string;
  professor: string;
  horario: string;
  diasSemana: string[];
  alunos: AlunoTurma[];
}

export interface AlunoTurma {
  id: string;
  nome: string;
  avatar?: string;
}

export interface AulaAgendada {
  id: string;
  turmaId: string;
  turmaNome: string;
  modalidade: string;
  professor: string;
  horario: string;
  date: Date;
  tipo: "regular" | "experimental";
  alunoExperimental?: string;
  presencas: PresencaRegistro[];
}

export interface PresencaRegistro {
  alunoId: string;
  alunoNome: string;
  status: "presente" | "ausente" | "justificado" | "pendente";
}

export const mockAlunos: AlunoTurma[] = [
  { id: "a1", nome: "Ana Beatriz Costa" },
  { id: "a2", nome: "Carlos Eduardo Silva" },
  { id: "a3", nome: "Daniela Ferreira" },
  { id: "a4", nome: "Eduardo Gomes" },
  { id: "a5", nome: "Fernanda Lima" },
  { id: "a6", nome: "Gabriel Santos" },
  { id: "a7", nome: "Helena Oliveira" },
  { id: "a8", nome: "Igor Martins" },
];

export const mockTurmas: Turma[] = [
  {
    id: "t1",
    nome: "AT-1",
    modalidade: "Ginástica",
    professor: "Maurício",
    horario: "08:00 - 09:00",
    diasSemana: ["seg", "qua", "sex"],
    alunos: mockAlunos.slice(0, 5),
  },
  {
    id: "t2",
    nome: "AT-2",
    modalidade: "Pilates",
    professor: "Fernanda",
    horario: "10:00 - 11:00",
    diasSemana: ["ter", "qui"],
    alunos: mockAlunos.slice(2, 7),
  },
  {
    id: "t3",
    nome: "AT-3",
    modalidade: "Musculação",
    professor: "Roberto",
    horario: "14:00 - 15:00",
    diasSemana: ["seg", "ter", "qua", "qui", "sex"],
    alunos: mockAlunos.slice(0, 8),
  },
  {
    id: "t4",
    nome: "AT-4",
    modalidade: "Yoga",
    professor: "Patrícia",
    horario: "16:00 - 17:00",
    diasSemana: ["ter", "qui"],
    alunos: mockAlunos.slice(3, 8),
  },
];

function generatePresencas(alunos: AlunoTurma[]): PresencaRegistro[] {
  return alunos.map((a) => ({
    alunoId: a.id,
    alunoNome: a.nome,
    status: "pendente" as const,
  }));
}

function generateAulasForMonth(): AulaAgendada[] {
  const aulas: AulaAgendada[] = [];
  const dayMap: Record<string, number[]> = {
    seg: [0], ter: [1], qua: [2], qui: [3], sex: [4],
  };

  // Generate for April 2026
  for (const turma of mockTurmas) {
    for (let day = 1; day <= 30; day++) {
      const date = new Date(2026, 3, day);
      const dow = date.getDay();
      const dowStr = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"][dow];
      if (turma.diasSemana.includes(dowStr)) {
        const isPast = date < new Date(2026, 3, 6);
        aulas.push({
          id: `aula-${turma.id}-${day}`,
          turmaId: turma.id,
          turmaNome: turma.nome,
          modalidade: turma.modalidade,
          professor: turma.professor,
          horario: turma.horario,
          date,
          tipo: "regular",
          presencas: turma.alunos.map((a) => ({
            alunoId: a.id,
            alunoNome: a.nome,
            status: isPast
              ? (Math.random() > 0.15 ? "presente" : Math.random() > 0.5 ? "ausente" : "justificado")
              : "pendente",
          })),
        });
      }
    }
  }

  // Add an experimental class
  aulas.push({
    id: "aula-exp-1",
    turmaId: "t1",
    turmaNome: "AT-1",
    modalidade: "Ginástica",
    professor: "Maurício",
    horario: "09:00 - 10:00",
    date: new Date(2026, 3, 7),
    tipo: "experimental",
    alunoExperimental: "Gustavo Henrique",
    presencas: [{ alunoId: "exp1", alunoNome: "Gustavo Henrique", status: "pendente" }],
  });

  return aulas;
}

export const mockAulas = generateAulasForMonth();
