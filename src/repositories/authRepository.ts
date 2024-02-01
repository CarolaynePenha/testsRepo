import { prisma } from "../config/database.js";
import { CreateUser } from "../controllers/authController.js";

async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
}
async function postUserInfos(signUpInfos: CreateUser) {
  await prisma.user.create({ data: signUpInfos });
}

const authRepository = {
  findByEmail,
  postUserInfos,
};

export default authRepository;
