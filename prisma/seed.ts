import { prisma } from "../src/config/database.js";

async function main() {
  const termsNumber = 6;
  for (let i = 0; i < termsNumber; i++) {
    await prisma.term.upsert({
      where: { number: i },
      update: {},
      create: {
        number: i,
      },
    });
  }
  const categoriesNames = ["P1", "P2", "Exame"];
  for (let i = 0; i < categoriesNames.length; i++) {
    await prisma.category.upsert({
      where: { name: categoriesNames[i] },
      update: {},
      create: {
        name: categoriesNames[i],
      },
    });
  }
  const teachersNames = ["Ana Analisse Silva", "Maria Mariana Silva"];
  for (let i = 0; i < teachersNames.length; i++) {
    await prisma.teacher.upsert({
      where: { name: teachersNames[i] },
      update: {},
      create: {
        name: teachersNames[i],
      },
    });
  }
  const disciplines = [
    { name: "HTML", termId: 1 },
    { name: "CSS", termId: 2 },
    { name: "JavaScript", termId: 3 },
    { name: "React", termId: 4 },
    { name: "Planejamento", termId: 1 },
    { name: "Gerenciamento de projetos", termId: 2 },
    { name: "Comunicação", termId: 3 },
  ];
  for (let i = 0; i < disciplines.length; i++) {
    await prisma.discipline.upsert({
      where: { name: disciplines[i].name },
      update: {},
      create: {
        name: disciplines[i].name,
        termId: disciplines[i].termId,
      },
    });
  }
  const teachersDisciplines = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
  ];
  for (let i = 0; i < teachersDisciplines.length; i++) {
    await prisma.teacherDiscipline.upsert({
      where: {
        disciplineId_teacherId: {
          disciplineId: teachersDisciplines[i].disciplineId,
          teacherId: teachersDisciplines[i].teacherId,
        },
      },
      update: {},
      create: {
        teacherId: teachersDisciplines[i].teacherId,
        disciplineId: teachersDisciplines[i].disciplineId,
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
