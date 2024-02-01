import joi from "joi";
import { RequestUser } from "../controllers/authController.js";

const signUpSchema = joi.object<RequestUser>({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}/
    )
    .required(),
  repeatPassword: joi.string().required().valid(joi.ref("password")),
});

export default signUpSchema;
