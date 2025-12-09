// src/components/tasks/TasksForm.jsx
import { useEffect, useState } from "react";

export default function TasksForm({ onCreate, onUpdate, editingTask, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    completed: false,
  });

  useEffect(() => {
    if (editingTask) setForm(editingTask);
  }, [editingTask]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingTask) {
      onUpdate(editingTask.id, form);
    } else {
      onCreate({
        ...form,
        id: Date.now(),
      });
    }
    setForm({ title: "", description: "", assignedTo: "", dueDate: "", completed: false });
  }

  return (
    <div className="bg-white shadow-sm border rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-3">
        {editingTask ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="w-full p-2 border rounded-lg"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-2 border rounded-lg"
          rows="3"
        />

        <input
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To"
          className="w-full p-2 border rounded-lg"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          <span>Completed</span>
        </label>

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            {editingTask ? "Save Changes" : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
