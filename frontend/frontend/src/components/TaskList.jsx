import { useState } from "react";
import EditModal from "./EditModal";

function TaskList({ tasks, updateTask, deleteTask }) {
  const moveTask = (task, status) => {
    updateTask(task._id, { status });
  };

  const [selectedTask, setSelectedTask] = useState(null); //

  const editTask = (task) => {
    setSelectedTask(task);
  };

  const saveTask = (id, updatedTask) => {
    updateTask(id, updatedTask);
    setSelectedTask(null);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
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

            <span
              className={`text-xs px-2 py-1 rounded ${
                task.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
              }`}>
              {task.priority}
            </span>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              {/* MOVE */}
              <button onClick={() => moveTask(task, "pending")}>Pending</button>

              <button onClick={() => moveTask(task, "in-progress")}>
                Progress
              </button>

              <button onClick={() => moveTask(task, "completed")}>Done</button>

              {/* EDIT */}
              <button
                onClick={() => setSelectedTask(task)}
                className="px-2 py-1 rounded bg-blue-100 text-blue-600">
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
  if (tasks.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No tasks yet. Create one 🚀
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4">
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

//     <div className="w-1/3 p-2">
//       <h2 className={`font-bold mb-3 text-center ${color}`}>{title}</h2>

//       {tasks
//         .filter((t) => t.status === status)
//         .map((task) => (
//           <div
//             key={task._id}
//             className="bg-white p-4 mb-2 rounded-xl shadow border">
//             <p className="font-medium">{task.title}</p>

//             <div className="flex flex-wrap gap-2 mt-3 text-xs">
//               {/* MOVE */}
//               <button onClick={() => moveTask(task, "pending")}>Pending</button>

//               <button onClick={() => moveTask(task, "in-progress")}>
//                 Progress
//               </button>

//               <button onClick={() => moveTask(task, "completed")}>Done</button>

//               {/* EDIT */}
//               <button onClick={() => editTask(task)} className="text-blue-600">
//                 Edit
//               </button>

//               {/* DELETE */}
//               <button
//                 onClick={() => deleteTask(task._id)}
//                 className="text-red-600">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//     </div>
//   );

//   return (
//     <div className="flex gap-4">
//       <Column title="Pending" status="pending" color="text-yellow-600" />
//       <Column title="In Progress" status="in-progress" color="text-blue-600" />
//       <Column title="Completed" status="completed" color="text-green-600" />
//     </div>
//   );
// }

// export default TaskList;
