console.log("Loaded: tasks");
// src/features/tasks/TasksPage.jsx
import { useEffect, useState } from "react"; 
import TasksList from "./TaskList";
import TasksForm from "./TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "./tasks.api.js"; 


export default function TasksPage() { 
    const [tasks, setTasks] = useState([]); 
    const [editingTask, setEditingTask] = useState(null); 

    useEffect(() => { 
        loadTasks();
    }, []);

    async function loadTasks() { 
        const data = await getTasks(); 
        setTasks(data); 
    }
    async function handleCreate(newTask) { 
        await createTask(newTask); 
        await loadTasks(); 
    }
    async function handleUpdate(id, updates){ 
        await updateTask(id, updates); 
        await loadTasks(); 
        setEditingTask(null); 
    }
    async function handleDelete(id) { 
        await deleteTask(id); 
        await loadTasks(); 
    }
    return ( 
        <div className = "p-6 max-w-4x1 mx-auto space-y-6"> 
            <h1 className="text-3x1 font-semibold mb-4">Tasks</h1>

            <TasksForm
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                editingTask={editingTask}
                onCancel={() => setEditingTask(null)}
            />
            <TasksList
                tasks={tasks}
                onEdit={setEditingTask}
                onDelete={handleDelete}
            />
        </div>
    );
}
