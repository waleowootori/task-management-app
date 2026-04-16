import { useState } from "react";

function TaskForm({ addTask, isLoggedIn }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const submitTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTask({
      title,
      priority,
      // status: "pending",
    });

    setTitle("");
  };

  return (
    <form
      onSubmit={submitTask}
      className="flex flex-col sm:flex-row gap-3 backdrop-blur-md bg-white/40 border border-white/40 p-4 rounded-2xl shadow-md">
      <input
        className="flex-1 p-3 rounded-xl bg-white/60 border border-white/50 outline-none focus:ring-2 focus:ring-purple-300"
        placeholder={
          isLoggedIn ? "Enter a new task..." : "Log in to add a new task"
        }
        value={title}
        disabled={!isLoggedIn}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        disabled={!isLoggedIn}
        className=" w-full sm:w-auto px-5 py-3 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition">
        Add Task
      </button>
    </form>
    // <form onSubmit={submitTask} className="flex gap-2 mb-4">
    //   <input
    //     className="border p-2 flex-1 rounded"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //     placeholder="Enter task..."
    //   />

    //   <select
    //     className="border p-2 rounded"
    //     value={priority}
    //     onChange={(e) => setPriority(e.target.value)}>
    //     <option value="low">Low</option>
    //     <option value="medium">Medium</option>
    //     <option value="high">High</option>
    //   </select>

    //   <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
    //     Add
    //   </button>
    // </form>
  );
}

export default TaskForm;
