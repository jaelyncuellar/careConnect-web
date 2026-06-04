const BASE_URL = "http://localhost:3000/schedules";

export async function getSchedules() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createSchedule(schedule) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule),
  });
  return res.json();
}

export async function updateSchedule(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return res.json();
}

export async function deleteCarePlan(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return true;
}
