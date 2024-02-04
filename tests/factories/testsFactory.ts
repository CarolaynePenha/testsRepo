import { faker } from "@faker-js/faker";
import { prisma } from "../../src/config/database.js";

function createTestInfos() {
  const test = {
    name: faker.word.noun(),
    pdfUrl: faker.internet.url(),
    categoryId: faker.number.int({ max: 3, min: 1 }),
    teacherDisciplineId: faker.number.int({ max: 6, min: 1 }),
  };
  return test;
}

async function postTest() {
  const testInfos = createTestInfos();
  await prisma.test.create({ data: testInfos });
}

const testsFactory = {
  createTestInfos,
  postTest,
};

export default testsFactory;
