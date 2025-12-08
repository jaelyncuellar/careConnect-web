const BASE_URL = "http://localhost:3000/tasks";

export async function getTasks() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createTask(entry) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  return res.json();
}
