import { CreateTest } from "../controllers/testsController.js";
import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import testRepository from "../repositories/testRepository.js";

async function saveTest(testInfos: CreateTest) {
  await checkCategory(testInfos.categoryId);
  await checkTeacherDiscipline(testInfos.teacherDisciplineId);
  await testRepository.postTest(testInfos);
}
async function checkCategory(categoryId: number) {
  const category = await testRepository.findByCategoryId(categoryId);
  if (!category) {
    const message = "Category not found";
    throw notFoundError(message);
  }
}
async function checkTeacherDiscipline(teacherDisciplineId: number) {
  const teacherDiscipline = await testRepository.findByTeacherDisciplineId(
    teacherDisciplineId
  );
  if (!teacherDiscipline) {
    const message = "Teacher or Discipline not found";
    throw notFoundError(message);
  }
}

async function getTestsBydisciplines() {
  const terms = await testRepository.findTestsByDiscipline();
  return terms;
}
async function getTestsByTeacher() {
  const terms = await testRepository.findTestsByTeacher();
  return terms;
}
const testService = {
  saveTest,
  getTestsBydisciplines,
  getTestsByTeacher,
};
export default testService;
