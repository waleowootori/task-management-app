import { useState } from "react";

function EditModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(task._id, { title });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="font-bold mb-3">Edit Task</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
