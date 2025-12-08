import { useEffect, useState } from "react";
import { getTasks } from "./tasksService"; 
import Card from "../../UI/Card"; 

export default function TaskList() { 
    const [tasks, setTasks] = useState([]); 
    useEffect(() => { 
        getTasks().then(setTasks);
    }, []);

    return ( 
        <div className="space-y-3">
            {tasks.map((task)=> ( 
                <Card key={task.id}>
                    <p><strong>{task.title}</strong></p>
                    <p>Status: {task.status}</p>
                </Card>
            ))}
        </div>
    );
}