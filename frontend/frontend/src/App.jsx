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

  const fetchTasks = async () => {
    const res = await API.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({}); // simple restore
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

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

          <TaskForm addTask={addTask} />

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
