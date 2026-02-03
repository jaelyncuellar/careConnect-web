const BASE_URL = "http://localhost:3000/carePlans";

// GET all care plans
export async function getCarePlans() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// CREATE new care plan
export async function createCarePlan(plan) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });

  return res.json();
}

// UPDATE existing care plan
export async function updateCarePlan(id, updates) {
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

