function TaskList({ tasks, updateTask, deleteTask }) {
  const moveTask = (task, status) => {
    updateTask(task._id, { status });
  };

  const editTask = (task) => {
    const newTitle = prompt("Edit task title:", task.title);

    if (newTitle && newTitle.trim()) {
      updateTask(task._id, { title: newTitle });
    }
  };

  const Column = ({ title, status, color }) => (
    <div className="w-1/3 p-2">
      <h2 className={`font-bold mb-3 text-center ${color}`}>{title}</h2>

      {tasks
        .filter((t) => t.status === status)
        .map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 mb-2 rounded-xl shadow border">
            <p className="font-medium">{task.title}</p>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              {/* MOVE */}
              <button onClick={() => moveTask(task, "pending")}>Pending</button>

              <button onClick={() => moveTask(task, "in-progress")}>
                Progress
              </button>

              <button onClick={() => moveTask(task, "completed")}>Done</button>

              {/* EDIT */}
              <button onClick={() => editTask(task)} className="text-blue-600">
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="flex gap-4">
      <Column title="Pending" status="pending" color="text-yellow-600" />
      <Column title="In Progress" status="in-progress" color="text-blue-600" />
      <Column title="Completed" status="completed" color="text-green-600" />
    </div>
  );
}

export default TaskList;
