import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import API from "./services/api";
import toast from "react-hot-toast";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    await API.post("/", taskData);
    fetchTasks(); // 🔥 ensures UI always matches backend
  };

  const updateTask = async (id, data) => {
    await API.put(`/${id}`, data);
    fetchTasks();
  }; // 🔥 instant update

  const deleteTask = async (id) => {
    await API.delete(`/${id}`);
    toast.success("Task deleted");
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Task Manager</h1>

        <TaskForm addTask={addTask} />

        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
