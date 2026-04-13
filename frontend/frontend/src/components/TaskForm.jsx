import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const submitTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTask({
      title,
      priority,
      status: "pending",
    });

    setTitle("");
  };

  return (
    <form onSubmit={submitTask} className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />

      <select
        className="border p-2 rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="bg-blue-600 text-white px-4 rounded">Add</button>
    </form>
  );
}

export default TaskForm;
