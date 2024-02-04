import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { unauthorizedError } from "./handleErrorsMiddleware.js";
export default async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    const message = "Mandatory token sending";
    throw unauthorizedError(message);
  }
  const decodedToken = jwt.verify(token, process.env.KEY);
  console.log("decodedToken: ", decodedToken);
  if (!decodedToken) {
    const message = "Invalid token";
    throw unauthorizedError(message);
  }
  next();
}
