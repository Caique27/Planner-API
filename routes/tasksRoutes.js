import express from "express";
import TaskController from "../controllers/tasksController.js";

const router = express.Router();
router.get("/tasks", TaskController.listTasks);
router.get("/categories", TaskController.listCategories);
router.post("/categories", TaskController.createCategory);
router.post("/tasks", TaskController.createTask);

export default router;
