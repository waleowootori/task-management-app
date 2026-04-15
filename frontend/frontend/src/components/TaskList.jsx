import { useState } from "react";
import EditModal from "./EditModal";

function TaskList({ tasks, updateTask, deleteTask }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const moveTask = (task, status) => {
    updateTask(task._id, { status });
  };

  const Column = ({ title, status, color }) => (
    <div className="flex-1 min-w-70">
      {/* Header */}
      <h2 className={`font-bold mb-4 text-center text-lg ${color}`}>{title}</h2>

      {/* Tasks */}
      <div className="flex flex-col gap-3">
        {tasks
          .filter((t) => t.status === status)
          .map((task) => (
            <div
              key={task._id}
              className="
                backdrop-blur-md 
                bg-white/40 
                border border-white/40 
                rounded-2xl 
                p-4 
                shadow-lg
                hover:scale-[1.02] 
                transition
              ">
              <p className="font-semibold text-gray-800">{task.title}</p>

              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                  task.priority === "high"
                    ? "bg-red-400/30 text-red-700"
                    : task.priority === "medium"
                      ? "bg-yellow-400/30 text-yellow-700"
                      : "bg-green-400/30 text-green-700"
                }`}>
                {task.priority}
              </span>

              <div className="flex flex-wrap gap-2 mt-4 text-xs">
                <button
                  onClick={() => moveTask(task, "pending")}
                  className="px-2 py-1 rounded-lg bg-yellow-200/60 hover:bg-yellow-300 transition">
                  Pending
                </button>

                <button
                  onClick={() => moveTask(task, "in-progress")}
                  className="px-2 py-1 rounded-lg bg-blue-200/60 hover:bg-blue-300 transition">
                  Progress
                </button>

                <button
                  onClick={() => moveTask(task, "completed")}
                  className="px-2 py-1 rounded-lg bg-green-200/60 hover:bg-green-300 transition">
                  Done
                </button>

                <button
                  onClick={() => setSelectedTask(task)}
                  className="px-2 py-1 rounded-lg bg-purple-200/60 text-purple-700 hover:bg-purple-300 transition">
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="px-2 py-1 rounded-lg bg-red-200/60 text-red-700 hover:bg-red-300 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <>
      {/* FIXED RESPONSIVE LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-4 overflow-x-auto">
        <Column title="Pending" status="pending" color="text-yellow-600" />
        <Column
          title="In Progress"
          status="in-progress"
          color="text-blue-600"
        />
        <Column title="Completed" status="completed" color="text-green-600" />
      </div>

      {selectedTask && (
        <EditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={updateTask}
        />
      )}
    </>
  );
}

export default TaskList;
