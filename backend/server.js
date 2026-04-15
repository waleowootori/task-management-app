const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-management-app-one-self.vercel.app",
    ],
  }),
);

// routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ CONNECT TO MONGODB FIRST
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/test", (req, res) => {
  res.json({ ok: true });
});

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");
// const taskRoutes = require("./routes/taskRoutes");

// dotenv.config();

// connectDB();

// const app = express();

// app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://task-management-app-one-self.vercel.app",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }),
// );

// app.use("/api/tasks", taskRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
