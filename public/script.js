const BASE = "http://localhost:3000"; 

function show(data) { 
  document.getElementById("output").textContent = JSON.stringify(data, null, 2); 
}

/* NOTES API */
async function getNotes() { 
  const res = await fetch(`${BASE}/api/notes`); 
  show(await res.json());
} 
async function createNote() { 
  const res = await fetch(`${BASE}/api/notes`, { 
    method: "POST", 
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({title: "New Note!", content:"hi i just made a new note!"})
  });
  show(await res.json()); 
}

/* leaderboard api */
async function getLeaderboard() { 
  const res = await fetch(`${BASE}/api/leaderboard`); 
  show(await res.json()); 
} 
async function addScore() { 
  const res = await fetch(`${BASE}/api/leaderboard`, { 
    method: "POST", 
    headers: { "Content-Type": "application/json"}, 
    body: JSON.stringify({username: "Player", score: Math.floor(Math.random() * 100) })
  });
  show(await res.json()); 
}

/* PRODUCTS API */
async function getProducts() { 
  const res = await fetch(`${BASE}/api/products`); 
  show(await res.json()); 
} 
async function createProduct() { 
  const res = await fetch(`${BASE}/api/products`, { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({name: "Sample Product", price: 19.99, stock: 19.98 })
  }); 
  show(await res.json());
}