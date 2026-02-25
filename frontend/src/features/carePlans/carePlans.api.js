

const BASE_URL = "http://localhost:3000/carePlans"; // backend 

export async function getCarePlans() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch"); 
  return res.json();
}

export async function createCarePlan(plan) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  if (!res.ok){ 
    const error = await res.json(); 
    console.error("Backend validation errors:", error.errors);
    console.error("Full error:", error); 
    throw new Error("failed to create care plan");
  }

  return res.json();
}

export async function updateCarePlan(id, updates) {
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

