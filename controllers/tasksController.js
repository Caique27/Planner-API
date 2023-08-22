import con from "../dbConnection.js";

class TasksController {
	static listTasks = (req, res) => {
		var categories;
		var tasks;
		con.query("SELECT * FROM categories ORDER BY id", (err, result) => {
			if (err) {
				if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
					res.send({
						error: true,
						code: 2,
						content: "Error connecting to the database",
					});
					return;
				}
				res.send({ error: true, code: 100, content: err.code });

				return;
			}
			categories = Object.values(JSON.parse(JSON.stringify(result)));

			con.query(
				`SELECT * FROM tasks ORDER BY category_id,id`,
				(err, result) => {
					if (err) {
						if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
							res.send({
								error: true,
								code: 2,
								content: "Error connecting to the database",
							});
							return;
						}
						res.send({ error: true, code: 100, content: err.code });
					}
					tasks = Object.values(JSON.parse(JSON.stringify(result)));

					for (var c = 0; c < categories.length; c++) {
						categories[c].tasks = [];
						for (var d = 0; d < tasks.length; d++) {
							if (categories[c].id == tasks[d].category_id) {
								categories[c].tasks.push(tasks[d]);
								//tasks.splice(d, 1);
							}
						}
					}
					res.send({ error: false, code: 0, content: categories });
				}
			);
		});
	};

	static listCategories = (req, res) => {
		con.query("SELECT * FROM categories ORDER BY id", (err, result) => {
			if (err) {
				if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
					res.send({
						error: true,
						code: 2,
						content: "Error connecting to the database",
					});
					return;
				}
				res.send({ error: true, code: 100, content: err.code });
				return;
			}
			res.send({ error: false, code: 0, content: result });
		});
	};

	static createCategory = (req, res) => {
		if (req.body.name == "" || req.body.name == undefined) {
			res.send({
				error: true,
				code: 3,
				content: "There's no value for name",
			});
			return;
		}

		con.query(
			`INSERT INTO categories (name) VALUES ("${req.body.name}")`,
			(err, result) => {
				if (err) {
					if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
						res.send({
							error: true,
							code: 2,
							content: "Error connecting to the database",
						});
						return;
					}
					if (err.errno == 1062) {
						res.send({
							error: true,
							code: 4,
							content:
								"There's already a category with that name",
						});
						return;
					}
					res.send({ error: true, code: 100, content: err.code });
					return;
				}
				res.send({
					error: false,
					code: 0,
					content: "Succesfully created category",
				});
			}
		);
	};

	static createTask = (req, res) => {
		if (req.body.title == "" || req.body.title == undefined) {
			res.send({
				error: true,
				code: 6,
				content: "There's no value for title",
			});
			return;
		}
		if (req.body.category_id == "" || req.body.category_id == undefined) {
			res.send({
				error: true,
				code: 5,
				content: "There's no value for category id",
			});
			return;
		}
		con.query(
			`INSERT INTO tasks (category_id,title,status) VALUES 
		(${req.body.category_id},"${req.body.title}","undone")`,
			(err, result) => {
				if (err) {
					if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
						res.send({
							error: true,
							code: 2,
							content: "Error connecting to the database",
						});
						return;
					}
					if (err.errno == 1452) {
						res.send({
							error: true,
							code: 7,
							content: "There is no category with this id",
						});
						return;
					}
					if (err.errno == "1062") {
						res.send({
							error: true,
							code: 8,
							content: "A task with this name already exists",
						});
						return;
					}
					res.send({
						error: true,
						code: 100,
						content: err.code,
					});
					return;
				}
				res.send({
					error: false,
					code: 0,
					content: "Succesfully created task",
				});
			}
		);
	};
	static deleteCategory = (req, res) => {
		const id = req.params.id;

		con.query(`DELETE FROM categories WHERE id=${id}`, (err, result) => {
			if (err) {
				if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
					res.send({
						error: true,
						code: 2,
						content: "Error connecting to the database",
					});
					return;
				}
				res.send({
					error: true,
					code: 100,
					content: err.code,
				});
				return;
			}
			if (result.affectedRows == 0) {
				if (result.affectedRows == 0) {
					res.send({
						error: true,
						code: 9,
						content: "There is no element with such id",
					});
					return;
				}
			}
			res.send({
				error: false,
				code: 0,
				content: "Succesfully deleted category",
			});
		});
	};

	static deleteTask = (req, res) => {
		const id = req.params.id;
		con.query(`DELETE FROM tasks WHERE id=${id}`, (err, result) => {
			if (err) {
				if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
					res.send({
						error: true,
						code: 2,
						content: "Error connecting to the database",
					});
					return;
				}
				res.send({
					error: true,
					code: 100,
					content: err.code,
				});
				return;
			}
			if (result.affectedRows == 0) {
				if (result.affectedRows == 0) {
					res.send({
						error: true,
						code: 9,
						content: "There is no element with such id",
					});
					return;
				}
			}
			res.send({
				error: false,
				code: 0,
				content: "Succesfully deleted task",
			});
		});
	};

	static changeCategoryName = (req, res) => {
		const id = req.params.id;

		if (req.body.name == "" || req.body.name == undefined) {
			res.send({
				error: true,
				code: 3,
				content: "There's no value for name",
			});
			return;
		}

		con.query(
			`UPDATE categories SET name = "${req.body.name}" WHERE id = ${id}`,
			(err, result) => {
				if (err) {
					if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
						res.send({
							error: true,
							code: 2,
							content: "Error connecting to the database",
						});
						return;
					}
					if (err.errno == 1062) {
						res.send({
							error: true,
							code: 4,
							content:
								"There's already a category with that name",
						});
						return;
					}

					res.send({ error: true, code: 100, content: err.code });
					return;
				} else {
					if (result.affectedRows == 0) {
						res.send({
							error: true,
							code: 9,
							content: "There is no element with such id",
						});
						return;
					}
				}

				res.send({
					error: false,
					code: 0,
					content: "Category succesfully renamed",
				});
			}
		);
	};

	static changeTaskStatus = (req, res) => {
		const id = req.params.id;
		con.query(
			`UPDATE tasks t 
		SET status=IF(status="Done","Undone","Done")
		 WHERE id = ${req.params.id};`,
			(err, result) => {
				if (err) {
					if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
						res.send({
							error: true,
							code: 2,
							content: "Error connecting to the database",
						});
						return;
					}
					res.send({ err: true, code: 100, content: err.code });
					return;
				} else {
					if (result.affectedRows == 0) {
						res.send({
							error: true,
							code: 9,
							content: "There is no element with such id",
						});
						return;
					}
				}

				res.send({
					error: false,
					code: 0,
					content: "Task succesfully updated",
				});
			}
		);
	};
	static invalidRoute = (req, res) => {
		res.send({ error: true, code: 1, content: "The route does not exist" });
	};
}
export default TasksController;
