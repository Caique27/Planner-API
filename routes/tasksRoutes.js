import express from "express";
import TaskController from "../controllers/tasksController.js";

const router = express.Router();
router.get("/tasks", TaskController.listTasks);

export default router;
