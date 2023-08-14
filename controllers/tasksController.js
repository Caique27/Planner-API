import con from "../dbConnection.js";

class TasksController {
	static listTasks = (req, res) => {
		var categories;
		var tasks;
		con.query("SELECT * FROM categories ORDER BY id", (err, result) => {
			if (err) {
				res.send(err);
			}
			categories = Object.values(JSON.parse(JSON.stringify(result)));

			con.query(
				`SELECT * FROM tasks ORDER BY category_id,id`,
				(err, result) => {
					if (err) {
						res.send(err);
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
					res.send(categories);
				}
			);
		});
	};

	static listCategories = (req, res) => {
		con.query("SELECT * FROM categories ORDER BY id", (err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		});
	};

	static createCategory = (req, res) => {
		con.query(
			`INSERT INTO categories (name) VALUES ("${req.body.name}")`,
			(err, result) => {
				if (err) {
					res.send(err);
				}
				res.send(result);
			}
		);
	};

	static createTask = (req, res) => {
		con.query(
			`INSERT INTO tasks (category_id,title,status) VALUES 
		(${req.body.category_id},"${req.body.title}","undone")`,
			(err, result) => {
				if (err) {
					res.send(err);
				}
				res.send(result);
			}
		);
	};
	static deleteCategory = (req, res) => {
		const id = req.params.id;
		con.query(`DELETE FROM categories WHERE id=${id}`, (err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		});
	};

	static deleteTask = (req, res) => {
		const id = req.params.id;
		con.query(`DELETE FROM tasks WHERE id=${id}`, (err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		});
	};
}
export default TasksController;
