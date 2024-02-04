import { prisma } from "../src/config/database.js";
import authTests from "./auth.tests.js";
import testTests from "./test.tests.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users `;
  await prisma.$executeRaw`DELETE FROM tests `;
});

authTests();
testTests();

afterAll(async () => {
  await prisma.$disconnect();
});
