import con from "../dbConnection.js";

class TasksController {
	static listTasks = (req, res) => {
		con.query("SELECT * FROM tasks", (err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		});
	};
}

export default TasksController;
