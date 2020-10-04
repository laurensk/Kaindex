import cars from "./routes/cars1";
import classrooms from "./routes/classrooms1";
import departments from "./routes/departments1";
import teachers from "./routes/teachers1";
import user from "./routes/user1";

import express from "express";
export const router = express.Router();

router.use("/cars", cars);
router.use("/classrooms", classrooms);
router.use("/departments", departments);
router.use("/teachers", teachers);
router.use("/user", user);
