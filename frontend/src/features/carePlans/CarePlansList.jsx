import { useEffect, useState } from "react";
import { getCarePlans } from "../../../../backend/src/services/carePlansService"; 
import Card from "../../UI/Card"; 

export default function CarePlanList({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No care plans available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((plan) => (
        <div
          key={plan.id}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          {/* Client Name */}
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {plan.clientName}
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Care Plan • {plan.planType}
          </p>

          {/* Goals */}
          <div className="mb-3">
            <h3 className="text-sm text-gray-700 font-medium mb-1">
              Goals
            </h3>
            <ul className="text-sm text-gray-600 list-disc ml-5">
              {plan.goals?.map((g, idx) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          </div>

          {/* Tasks */}
          <div className="mb-3">
            <h3 className="text-sm text-gray-700 font-medium mb-1">
              Tasks
            </h3>
            <ul className="text-sm text-gray-600 list-disc ml-5">
              {plan.tasks?.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Disorders */}
          {plan.disorders?.length > 0 && (
            <div className="mb-3">
              <h3 className="text-sm text-gray-700 font-medium mb-1">
                Disorders
              </h3>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {plan.disorders.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Meds */}
          {plan.meds?.length > 0 && (
            <div className="mb-3">
              <h3 className="text-sm text-gray-700 font-medium mb-1">
                Medications
              </h3>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {plan.meds.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Food / Sensory */}
          {plan.food?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm text-gray-700 font-medium mb-1">
                Food / Sensory
              </h3>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {plan.food.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* last updated */}
          <p className="text-xs text-gray-400 mt-4">
            Last updated: {new Date(plan.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
