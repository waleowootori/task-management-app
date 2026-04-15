import { useState } from "react";
import API from "../services/api";

function Signup({ setUser, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", form);

      // ✅ SAME FLOW AS LOGIN (important)
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      onClose(); // close modal after signup
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* Modal */}
      <div
        className="
        w-full max-w-md
        bg-white/20
        backdrop-blur-xl
        border border-white/30
        rounded-2xl
        shadow-2xl
        p-6
        text-white
        relative
      ">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/70 hover:text-white text-xl">
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account ✨
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="
              bg-white/20
              border border-white/30
              rounded-xl
              px-4 py-2
              placeholder-white/70
              text-white
              focus:outline-none
              focus:ring-2 focus:ring-white/50
            "
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="
              bg-white/20
              border border-white/30
              rounded-xl
              px-4 py-2
              placeholder-white/70
              text-white
              focus:outline-none
              focus:ring-2 focus:ring-white/50
            "
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="
              bg-white/20
              border border-white/30
              rounded-xl
              px-4 py-2
              placeholder-white/70
              text-white
              focus:outline-none
              focus:ring-2 focus:ring-white/50
            "
          />

          <button
            type="submit"
            className="
              mt-2
              bg-white/30
              hover:bg-white/50
              transition
              rounded-xl
              py-2
              font-semibold
              text-white
            ">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
