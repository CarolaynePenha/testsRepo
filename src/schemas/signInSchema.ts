import joi from "joi";
import { CreateUser } from "../controllers/authController";

const signInSchema = joi.object<CreateUser>({
  password: joi
    .string()
    .pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}/
    )
    .required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

export default signInSchema;
