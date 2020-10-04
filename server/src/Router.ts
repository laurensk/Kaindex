import cars from "./routes/cars";
import classrooms from "./routes/classrooms";
import departments from "./routes/departments";
import teachers from "./routes/teachers";
import user from "./routes/user";

import express from "express";
export const router = express.Router();

router.use("/cars", cars);
router.use("/classrooms", classrooms);
router.use("/departments", departments);
router.use("/teachers", teachers);
router.use("/user", user);
