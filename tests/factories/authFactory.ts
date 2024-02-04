import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { prisma } from "../../src/config/database.js";
import { CreateUser } from "../../src/controllers/authController.js";

function createSignUpCredentials() {
  const fakeCapitalLetter = faker.internet.password({
    pattern: /(?=.*[A-Z])/,
    length: 2,
  });
  const fakeLowerCase = faker.internet.password({
    pattern: /(?=.*[a-z])/,
    length: 5,
  });
  const fakeDigs = faker.internet.password({
    pattern: /(?=.*\d)/,
    length: 2,
  });
  const fakeChars = faker.internet.password({
    pattern: /(?=.*[@$!%*?&])/,
    length: 5,
  });
  const signUpInfos = {
    email: faker.internet.email(),
    password: fakeLowerCase + fakeCapitalLetter + fakeDigs + fakeChars,
    repeatPassword: fakeLowerCase + fakeCapitalLetter + fakeDigs + fakeChars,
  };
  return signUpInfos;
}
async function createUser(signUpCredentials: CreateUser) {
  const emailLowerCase = signUpCredentials.email.toLowerCase();
  const user = await prisma.user.create({
    data: {
      email: emailLowerCase,
      password: bcrypt.hashSync(signUpCredentials.password, 10),
    },
  });

  return user;
}
const userFactory = {
  createSignUpCredentials,
  createUser,
};
export default userFactory;
