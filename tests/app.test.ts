import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/config/database.js";
import userFactory from "./factories/authFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`DELETE FROM users `;
});

describe("User tests suite", () => {
  it("given email and password,create user", async () => {
    const signUpCredentials = userFactory.createSignUpCredentials();
    const response = await supertest(app)
      .post("/signUp")
      .send(signUpCredentials);
    expect(response.status).toBe(201);
    const user = await prisma.user.findFirst({
      where: { email: signUpCredentials.email.toLowerCase() },
    });
    expect(user.email).toBe(signUpCredentials.email.toLowerCase());
  });

  it("given email and password,login", async () => {
    const signUpCredentials = userFactory.createSignUpCredentials();
    await userFactory.createUser(signUpCredentials);
    delete signUpCredentials.repeatPassword;
    const response = await supertest(app)
      .post("/signIn")
      .send(signUpCredentials);
    expect(response.body.token).not.toBeNull();
    expect(response.body.token).not.toBeUndefined();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
