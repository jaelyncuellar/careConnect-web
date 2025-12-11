const BASE_URL = "http://localhost:3000/care-plans";

export async function getCarePlans() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createCarePlan(plan) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  return res.json();
}
