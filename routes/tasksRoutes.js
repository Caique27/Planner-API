import express from "express";
import TaskController from "../controllers/tasksController.js";

const router = express.Router();
router.get("/tasks/get", TaskController.listTasks);
router.get("/categories/get", TaskController.listCategories);
router.post("/categories/create", TaskController.createCategory);
router.post("/tasks/create", TaskController.createTask);
router.put("/categories/change/:id", TaskController.changeCategoryName);
router.put("/tasks/change/:id", TaskController.changeTaskStatus);
router.delete("/categories/delete/:id", TaskController.deleteCategory);
router.delete("/tasks/delete/:id", TaskController.deleteTask);
router.get("*", TaskController.invalidRoute);
router.post("*", TaskController.invalidRoute);
router.put("*", TaskController.invalidRoute);
router.delete("*", TaskController.invalidRoute);
export default router;
