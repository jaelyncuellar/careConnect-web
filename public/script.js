const BASE = "http://localhost:3000"; 

function show(data) { 
  document.getElementById("output").textContent = JSON.stringify(data, null, 2); 
}

/* NOTES API */
async function getAttendance() { 
  const res = await fetch(`${BASE}/api/attendance`); 
  show(await res.json());
} 
async function createAttendance() { 
  const res = await fetch(`${BASE}/api/attendance`, { 
    method: "POST", 
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({
      id: "1", 
      employeeId : "1",
      date: "2025-11-30",
      timeIn: "10:38",
      timeOut:  "10:40",
      status: "on-time"
    })
  });
  show(await res.json()); 
}

/* leaderboard api */
async function getCarePlans() { 
  const res = await fetch(`${BASE}/api/care-plans`); 
  show(await res.json()); 
} 
async function addCarePlan() { 
  const res = await fetch(`${BASE}/api/care-plans`, { 
    method: "POST", 
    headers: { "Content-Type": "application/json"}, 
    body: JSON.stringify({
      id: "1",
      clientName: "Jill" ,
      clientId: "1",
      planType: "rehab",
      goals: ["employment"],
      tasks: ["appointment on 12/1"],
      lastUpdated: "2025-11-30T14:45:00Z" 
    })
  });
  show(await res.json()); 
}

/* PRODUCTS API */
async function getTasks() { 
  const res = await fetch(`${BASE}/api/tasks`); 
  show(await res.json()); 
} 
async function createTask() { 
  const res = await fetch(`${BASE}/api/tasks`, { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({
      id: "1", 
      title: "appt",
      clientId: "1", 
      description: "appt at hearing place in boise. noon.",
      status: "in-progress",
      dueDate: "2025-11-30", 
      assignedTo: "Jane"
    })
  }); 
  show(await res.json());
}