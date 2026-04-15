const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user,
  });
  res.json(task);
});

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
