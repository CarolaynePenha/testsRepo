import joi from "joi";
import { CreateTest } from "../controllers/testsController.js";

const testSchema = joi.object<CreateTest>({
  name: joi.string().max(50).required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().integer().required(),
  teacherDisciplineId: joi.number().integer().required(),
});

export default testSchema;
