import supertest from "supertest";
import userFactory from "./factories/authFactory.js";
import app from "../src/app.js";
import { prisma } from "../src/config/database.js";
import { faker } from "@faker-js/faker";

export default function authTests() {
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

    it("given email already in use,returns 409", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      await supertest(app).post("/signUp").send(signUpCredentials);
      const response = await supertest(app)
        .post("/signUp")
        .send(signUpCredentials);
      expect(response.status).toBe(409);
    });

    it("given an invalid input,returns 422", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.password;
      const response = await supertest(app)
        .post("/signUp")
        .send(signUpCredentials);
      expect(response.status).toBe(422);
    });

    it("given an invalid repeat password,returns 422", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      const wrongRepeatPassWord = faker.internet.password({ length: 8 });
      const wrongSignUpCredentials = {
        ...signUpCredentials,
        repeatPassword: wrongRepeatPassWord,
      };
      const response = await supertest(app)
        .post("/signUp")
        .send(wrongSignUpCredentials);
      expect(response.status).toBe(422);
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

    it("given an invalid password,returns 401", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      await userFactory.createUser(signUpCredentials);
      delete signUpCredentials.repeatPassword;
      const wrongSignUpCredentials = {
        ...signUpCredentials,
        password: "Aluno11!!!!",
      };
      const response = await supertest(app)
        .post("/signIn")
        .send(wrongSignUpCredentials);
      expect(response.status).toBe(401);
    });

    it("given an invalid email,returns 401", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      await userFactory.createUser(signUpCredentials);
      delete signUpCredentials.repeatPassword;
      const wrongSignUpCredentials = {
        ...signUpCredentials,
        email: "Aluno21@gmail.com",
      };
      const response = await supertest(app)
        .post("/signIn")
        .send(wrongSignUpCredentials);
      expect(response.status).toBe(401);
    });
  });
}
