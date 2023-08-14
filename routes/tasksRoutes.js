import express from "express";
import TaskController from "../controllers/tasksController.js";

const router = express.Router();
router.get("/tasks/get", TaskController.listTasks);
router.get("/categories/get", TaskController.listCategories);
router.post("/categories/create", TaskController.createCategory);
router.post("/tasks/create", TaskController.createTask);
router.delete("/categories/delete/:id", TaskController.deleteCategory);
router.delete("/tasks/delete/:id", TaskController.deleteTask);
export default router;
