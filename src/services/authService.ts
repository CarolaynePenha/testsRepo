import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";
import { CreateUser } from "../controllers/authController.js";
import {
  conflictError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";

async function saveUser(signUpInfos: CreateUser) {
  const SALT = 10;
  const passwordHash = bcrypt.hashSync(signUpInfos.password, SALT);
  const emailLowerCase = signUpInfos.email.toLocaleLowerCase();
  await userExists(emailLowerCase, "signUp");
  await authRepository.postUserInfos({
    email: emailLowerCase,
    password: passwordHash,
  });
}
async function userExists(email: string, type: string) {
  const user = await authRepository.findByEmail(email);
  if (type === "signUp" && user) {
    const message = "email already exists";
    throw conflictError(message);
  }
  if (type === "signIn" && !user) {
    const message = "Invalid email or password";
    throw unauthorizedError(message);
  }
  return user;
}

const authService = {
  saveUser,
};
export default authService;
