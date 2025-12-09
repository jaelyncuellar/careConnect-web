console.log("Loaded: CarePlans");

import { useState, useEffect } from "react";
import { getCarePlans, createCarePlan } from "./carePlansService";
import CarePlanList from "./CarePlansList";
import CarePlanForm from "./CarePlansForm";

export default function CarePlansPage() {
  const [carePlans, setCarePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getCarePlans();
      setCarePlans(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleNewPlan(newPlan) {
    setCarePlans((prev) => [newPlan, ...prev]);
    setShowForm(false);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Care Plans</h1>
        <p className="text-gray-500">View and manage client care plans.</p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-900 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-black transition"
        >
          {showForm ? "Close Form" : "Add Care Plan"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <CarePlanForm onCreated={handleNewPlan} />
        </div>
      )}

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        {loading ? (
          <p className="text-gray-500">Loading care plans...</p>
        ) : (
          <CarePlanList data={carePlans} />
        )}
      </div>

    </div>
  );
}
