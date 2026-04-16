import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import API from "./services/api";
import toast from "react-hot-toast";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const hasToken = Boolean(localStorage.getItem("token"));

  const handleAuthFailure = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common.Authorization;
    setUser(null);
    setTasks([]);
    setShowLogin(true);
    toast.error("Your session has expired. Please log in again.");
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthFailure();
        return;
      }
      console.error("Failed to fetch tasks", error);
      toast.error("Could not load tasks");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser({});
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const addTask = async (taskData) => {
    if (!hasToken) {
      setShowLogin(true);
      toast.error("Please log in before adding a task.");
      return;
    }

    try {
      const res = await API.post("/tasks", taskData);
      setTasks((currentTasks) => [res.data, ...currentTasks]);
      toast.success("Task added");
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthFailure();
        return;
      }
      console.error("Failed to add task", error);
      toast.error("Could not add task. Please log in and try again.");
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await API.put(`/tasks/${id}`, data);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task._id === id ? res.data : task)),
      );
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthFailure();
        return;
      }
      console.error("Failed to update task", error);
      toast.error("Could not update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id),
      );
      toast.success("Task deleted");
    } catch (error) {
      if (error.response?.status === 401) {
        handleAuthFailure();
        return;
      }
      console.error("Failed to delete task", error);
      toast.error("Could not delete task");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-linear-to-br from-indigo-200 via-purple-200 to-pink-200">
      {showSignup && (
        <Signup setUser={setUser} onClose={() => setShowSignup(false)} />
      )}
      {showLogin && (
        <Login setUser={setUser} onClose={() => setShowLogin(false)} />
      )}
      <div className="flex justify-end p-3 sm:p-6 gap-2">
        <button
          onClick={() => setShowSignup(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Signup
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Login
        </button>
      </div>
      <div className="flex items-center justify-center p-3 sm:p-6 flex-1">
        <div className="w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-4 sm:p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Task Manager
          </h1>

          <TaskForm addTask={addTask} isLoggedIn={Boolean(user)} />

          <div className="mt-6">
            <TaskList
              tasks={tasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
