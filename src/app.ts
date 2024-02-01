import express, { json } from "express";
import "express-async-errors";

const app = express();
app.use(json());

export default app;
