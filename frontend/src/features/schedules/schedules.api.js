const BASE_URL = "http://localhost:3000/schedules";

// GET all schedules
export async function getSchedules() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// CREATE new schedule
export async function createSchedule(schedule) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule),
  });

  return res.json();
}

// UPDATE existing schedule
export async function updateSchedule(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return res.json();
}

// DELETE care plan
export async function deleteCarePlan(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return true;
}
