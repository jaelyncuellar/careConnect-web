import { useEffect, useState } from "react";
import { getCarePlans } from "./carePlans.api.js";
// import Card from "../../UI/Card"; 

export default function CarePlanList({ data }) {
  console.log("CARE PLAN DATA:", data);
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No care plans available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((plan) => (
        <div
          key={plan.carePlanId} // this DOM ele reps this spec DB record 
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          {/* Client Name */}
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {plan.clientFullName}
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Care Plan • {plan.focusArea}
          </p>

          {/* Focus area */}
          <div className="mb-3">
            <h3 className="text-sm text-gray-700 font-medium mb-1">
              Focus Area
            </h3>
            <p className="text-sm text-gray-600">
              {plan.focusArea}
            </p>
          </div>

          {/* last updated */}
          <p className="text-xs text-gray-400 mt-4">
            Last updated: {" "}
            {plan.lastUpdated 
              ? new Date(plan.lastUpdated).toLocaleDateString()
            : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}
