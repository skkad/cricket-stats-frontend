"use client";

import Toast from "@/components/Toast";
import React, { useState } from "react";

const Dashboard = () => {
  const [showToast, setShowToast] = useState<Boolean>(true);
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Cricket Statistics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Batting Stats */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Top Batsmen</h2>
          <div className="space-y-2">
            <p className="text-gray-600">No batting statistics available</p>
          </div>
        </div>

        {/* Bowling Stats */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Top Bowlers</h2>
          <div className="space-y-2">
            <p className="text-gray-600">No bowling statistics available</p>
          </div>
        </div>

        {/* All-Rounders */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Top All-Rounders
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">No all-rounder statistics available</p>
          </div>
        </div>

        {/* Best Captains */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Best Captains
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">No captain statistics available</p>
          </div>
        </div>
      </div>

      {/* <Toast
        message="Hello World"
        status="success"
        open={showToast}
        onClose={() => setShowToast(false)}
      />
      <Toast message="Hello World" status="error" open={showToast} />
      <Toast message="Hello World" status="info" open={showToast} /> */}
    </div>
  );
};

export default Dashboard;
