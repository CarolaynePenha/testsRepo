import { Test } from "@prisma/client";
import { Request, Response } from "express";
import testService from "../services/testService.js";
import { badRequestError } from "../middlewares/handleErrorsMiddleware.js";

export type CreateTest = Omit<Test, "id" | "createdAt">;
enum TYPE_QUERY {
  DISCIPLINE = "discipline",
  TEACHER = "teacher",
}

export async function postTest(req: Request, res: Response) {
  const testInfos: CreateTest = req.body;
  await testService.saveTest(testInfos);
  res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
  const { filter } = req.query;
  if (filter === TYPE_QUERY.DISCIPLINE) {
    const tests = await testService.getTestsBydisciplines();
    return res.status(200).send(tests);
  }
  if (filter === TYPE_QUERY.TEACHER) {
    const tests = await testService.getTestsByTeacher();
    res.status(200).send(tests);
    return;
  }
  const message = "Mandatory query string sending";
  throw badRequestError;
}
