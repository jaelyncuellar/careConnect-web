import { useState, useEffect } from "react";
import { createCarePlan } from "./carePlans.api.js";
import { getClients } from "../clients/clients.api.js"; 
import { useAuth } from "../auth/AuthContext.jsx";

export default function CarePlanForm({ onCreated }) {
  const { user } = useAuth(); 
  const [clients, setClients] = useState([]); 
  const [selectedClient, setSelectedClient] = useState(""); 

  useEffect(() => { 
    async function fetchClients() { 
      const data = await getClients(); 
      setClients(data); 
    }
    fetchClients(); 
  }, []); 

  const [endDate, setEndDate] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const selected = clients.find(
      (c)=>String(c.id) ===String(selectedClient)
    ); 

    if (!selected){ 
      alert("Please select a client"); 
      return; 
    }
    if (!user?.id){ 
      alert("User not authenticated"); 
      return; 
    }

    // debug
    console.log("clients:", clients);
    console.log("selected:", selected);
    console.log("User object:", user);
    console.log("User ID type:", typeof user?.id);

    // goes to API - service - DB 
    const newPlan = {
      client_id: selected.id, 
      created_by: user.id, // UUID string 
      focus_area: focusArea, 
      start_date: new Date().toISOString().split("T")[0], 
      notes,
      ...(endDate && { end_date: endDate }) // only send if exists 
    };
    console.log("Submitting plan:", newPlan); 

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
              {client.firstName} {client.lastName} 
            </option>
          ))}
        </select>
      </div>

      {/* end_date */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>


      {/* Focus Area */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Plan Name</label>
        <input
          type="text"
          value={focusArea}
          onChange={(e) => setFocusArea(e.target.value)}
          placeholder="e.g. Community Safety"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Notes</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Complete community safety skills 3x per week"
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

      {/* Disorders */}
      {/* <div>
        <label className="text-sm text-gray-700 mb-1 block">Related Disorders</label>
        <input
          type="text"
          value={related_disorders}
          onChange={(e) => setRelated_Disorders(e.target.value)}
          placeholder="e.g. Autistic"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div> */}

      {/* Medications
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Medications</label>
        <input
          type="text"
          value={meds}
          onChange={(e) => setMeds(e.target.value)}
          placeholder="e.g. "
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div> */}

      {/* Food / Allergies
      <div>
        <label className="text-sm text-gray-700 mb-1 block">Food / Sensory</label>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="comma-separated"
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div> */}


