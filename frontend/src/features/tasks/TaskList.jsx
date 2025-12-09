// src/components/tasks/TasksList.jsx
export default function TasksList({ tasks, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-start"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>

              <p className="text-sm text-gray-500">
                <span className="font-medium">Assigned:</span> {task.assignedTo}
              </p>

              <p className="text-sm text-gray-500">
                <span className="font-medium">Due:</span> {task.dueDate}
              </p>

              <p
                className={`text-sm font-medium ${
                  task.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 rounded-lg bg-yellow-400 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
