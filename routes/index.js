import express from "express";
import tasks from "./tasksRoutes.js";
const routes = (app) => {
	app.route("/").get((req, res) => {
		res.status(200).send({ text: "Welcome to the API" });
	});

	app.use(express.json(), tasks);
};
export default routes;
