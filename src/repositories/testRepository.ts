import { prisma } from "../config/database.js";
import { CreateTest } from "../controllers/testsController.js";

async function findByCategoryId(categoryId: number) {
  return await prisma.category.findFirst({ where: { id: categoryId } });
}

async function findByTeacherDisciplineId(teacherDisciplineId: number) {
  return await prisma.teacherDiscipline.findFirst({
    where: { id: teacherDisciplineId },
  });
}
async function postTest(testInfos: CreateTest) {
  await prisma.test.create({ data: testInfos });
}
async function findTestsByDiscipline() {
  const tests = await prisma.term.findMany({
    include: {
      discipline: {
        include: {
          teacherDiscipline: {
            include: { teacher: true, test: { include: { category: true } } },
          },
        },
      },
    },
  });
  return tests;
}
async function findTestsByTeacher() {
  const tests = await prisma.teacher.findMany({
    include: {
      teacherDiscipline: {
        include: {
          discipline: true,
          test: { include: { category: true } },
        },
      },
    },
  });
  return tests;
}

const testRepository = {
  findByCategoryId,
  findByTeacherDisciplineId,
  postTest,
  findTestsByDiscipline,
  findTestsByTeacher,
};

export default testRepository;
