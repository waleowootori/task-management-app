import { useEffect, useState } from "react";
import API from "../services/api";

function TaskItem({ task, deleteTask, toggleStatus }) {
  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div className="flex justify-between items-center border p-3 rounded mb-3 bg-gray-50">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.status === "completed"}
          onChange={() => toggleStatus(task)}
        />

        <span
          className={
            task.status === "completed"
              ? "line-through text-gray-400"
              : "font-medium"
          }>
          {task.title}
        </span>

        <span
          className={`text-white text-xs px-2 py-1 rounded ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* <button
        onClick={() => deleteTask(task._id)}
        className="text-red-500 hover:text-red-700">
        Delete
      </button> */}
    </div>
  );
}

export default TaskItem;
