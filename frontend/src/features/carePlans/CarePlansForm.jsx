import { useState, useEffect } from "react";
import { createCarePlan } from "./carePlans.api.js";
import { getClients } from "../clients/clients.api.js"; 
const { user } = useAuth(); 

export default function CarePlanForm({ onCreated }) {
  const [clients, setClients] = useState([]); 
  const [selectedClient, setSelectedClient] = useState(""); 

  useEffect(() => { 
    async function fetchClients() { 
      const data = await getClients(); 
      setClients(data); 
    }
    fetchClients(); 
  }, []); 

  const [planType, setPlanType] = useState("");
  const [goals, setGoals] = useState("");
  const [tasks, setTasks] = useState("");
  const [disorders, setDisorders] = useState("");
  const [meds, setMeds] = useState("");
  const [food, setFood] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const selected = clients.find((c)=>c.id ===selectedClient); 

    if (!selected){ 
      alert("Please select a client"); 
      return; 
    }
    console.log("clients:", clients);
    console.log("selected:", selected);

    const newPlan = {
      clientId: selected.id, 
      createdBy: user.id, 
      focus_area: planType, 
      start_date: new Date().toISOString().split("T")[0], 
      // goals: goals.split(",").map((g) => g.trim()).filter(Boolean),
      // tasks: tasks.split(",").map((t) => t.trim()).filter(Boolean),
      // disorders: disorders.split(",").map((d) => d.trim()).filter(Boolean),
      // meds: meds.split(",").map((m) => m.trim()).filter(Boolean),
      // food: food.split(",").map((f) => f.trim()).filter(Boolean),
      // lastUpdated: new Date().toISOString(),
    };

    const created = await createCarePlan(newPlan);
    onCreated(created);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200"
    >
      {/* Client Dropdown */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Client</label>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full border-gray-300 rounded-lg shadow-sm"
          required
        >
          <option value="">Select a client</option>
          {clients.map((client)=> (
            <option key={client.id}value={client.id}>
              {client.first_name} {client.last_name} 
            </option>
          ))}
        </select>
      </div>

      {/* Plan Type */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Plan Type</label>
        <input
          type="text"
          value={planType}
          onChange={(e) => setPlanType(e.target.value)}
          placeholder="rehab, behavior, etc."
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Goals */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Goals</label>
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="comma-separated"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Tasks */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Tasks</label>
        <input
          type="text"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder="comma-separated"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Disorders */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Disorders</label>
        <input
          type="text"
          value={disorders}
          onChange={(e) => setDisorders(e.target.value)}
          placeholder="comma-separated"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Medications */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Medications</label>
        <input
          type="text"
          value={meds}
          onChange={(e) => setMeds(e.target.value)}
          placeholder="comma-separated"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Food / Allergies */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Food / Sensory</label>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="comma-separated"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Submit Button - full width */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
        >
          Save Care Plan
        </button>
      </div>

    </form>
  );
}
