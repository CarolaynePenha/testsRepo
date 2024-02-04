import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import testSchema from "../schemas/testSchema.js";
import { getTests, postTest } from "../controllers/testsController.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const testsRouter = Router();

testsRouter.post(
  "/tests",
  validateSchema(testSchema),
  tokenValidation,
  postTest
);
testsRouter.get("/tests", tokenValidation, getTests);

export default testsRouter;
