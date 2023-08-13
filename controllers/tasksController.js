import con from "../dbConnection.js";

class TasksController {
	static listTasks = (req, res) => {
		var categories;
		var tasks;
		con.query("SELECT * FROM categories", (err, result) => {
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
}
export default TasksController;
