import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/config/database.js";
import userFactory from "./factories/authFactory.js";
import testsFactory from "./factories/testsFactory.js";

export default function testTests() {
  describe("Test tests suite", () => {
    it("given tests infos,post test", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      const testInfos = testsFactory.createTestInfos();
      response = await supertest(app)
        .post("/tests")
        .send(testInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(201);
      const test = await prisma.test.findFirst({
        where: { name: testInfos.name },
      });
      expect(test.pdfUrl).toBe(testInfos.pdfUrl);
    });

    it("given invalid url,returns 422", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      const testInfos = testsFactory.createTestInfos();
      const wrongTestInfos = { ...testInfos, pdfUrl: "Test" };
      response = await supertest(app)
        .post("/tests")
        .send(wrongTestInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(422);
    });

    it("given invalid input,returns 422", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      const testInfos = testsFactory.createTestInfos();
      delete testInfos.teacherDisciplineId;
      response = await supertest(app)
        .post("/tests")
        .send(testInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(422);
    });

    it("given invalid teacherDisciplineId,returns 404", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      const testInfos = testsFactory.createTestInfos();
      const wrongTestInfos = { ...testInfos, teacherDisciplineId: 25 };
      response = await supertest(app)
        .post("/tests")
        .send(wrongTestInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(404);
    });

    it("given invalid categoryId,returns 404", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      const testInfos = testsFactory.createTestInfos();
      const wrongTestInfos = { ...testInfos, categoryId: 25 };
      response = await supertest(app)
        .post("/tests")
        .send(wrongTestInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(404);
    });

    it("given invalid token,returns 401", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = "wrongToken";
      const testInfos = testsFactory.createTestInfos();
      response = await supertest(app)
        .post("/tests")
        .send(testInfos)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(401);
    });

    it("given no token,returns 401", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      const testInfos = testsFactory.createTestInfos();
      const response = await supertest(app).post("/tests").send(testInfos);
      expect(response.status).toBe(401);
    });

    it("given a filter equal to teacher,get tests ", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      await testsFactory.postTest();
      response = await supertest(app)
        .get(`/tests?filter=teacher`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("given a filter equal to discipline,get tests ", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      await testsFactory.postTest();
      response = await supertest(app)
        .get(`/tests?filter=discipline`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).not.toBeNull();
    });

    it("given no filter,returns 400 ", async () => {
      const signUpCredentials = userFactory.createSignUpCredentials();
      delete signUpCredentials.repeatPassword;
      await userFactory.createUser(signUpCredentials);
      let response = await supertest(app)
        .post(`/signIn`)
        .send(signUpCredentials);
      const token = response.body.token;
      await testsFactory.postTest();
      response = await supertest(app)
        .get(`/tests`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(400);
    });
  });
}
