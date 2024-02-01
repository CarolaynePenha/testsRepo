import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";
import { signUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signUp", validateSchema(signUpSchema), signUp);
// authRouter.post("/signIn", validateSchema(signInSchema), signIn);

export default authRouter;
