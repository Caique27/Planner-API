class TasksController {
	static listTasks = (req, res) => {
		res.status(200).json({text:"listTasks requisition made"});
	};
}

export default TasksController;
