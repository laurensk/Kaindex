import carsRouter from "./routes/User";
import classroomsRouter from "./routes/Classrooms";
import departmentsRouter from "./routes/Departments";
import teachersRouter from "./routes/Teachers";
import userRouter from "./routes/User";

import express from "express";
export const router = express.Router();

router.use("/cars", carsRouter);
router.use("/classrooms", classroomsRouter);
router.use("/departments", departmentsRouter);
router.use("/teachers", teachersRouter);
router.use("/user", userRouter);
