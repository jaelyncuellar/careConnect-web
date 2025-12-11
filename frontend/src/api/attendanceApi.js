
const BASE_URL = "http://localhost:3000/attendance"; 
export async function getAttendance() { 
    const res = await fetch(BASE_URL); 
    return res.json(); 
}
export async function createAttendance(entry){ 
    const res = await fetch(BASE_URL, {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(entry),
    }); 
    return res.json(); 
}
