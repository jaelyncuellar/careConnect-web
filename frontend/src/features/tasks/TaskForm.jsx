import { useState } from "react"; 
import { createTask } from "./tasksService"; 

export default function TaskForm() { 
    const [title, setTitle] = useState(""); 
    
    function handleSubmit(e) { 
        e.preventDefault(); 

        createTask({ title, status: "pending" }).then(() => { 
            alert("Task created!"); 
            setTitle("");
        });
    }

    return ( 
        <form className="space-y-3" onSubmit={handleSubmit}>
            <input
                className="border p-2"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
             />
             <button className = "bg-blue-500 text-white p-2 rounded">
                Add Task
             </button>
        </form>
    ); 
}
