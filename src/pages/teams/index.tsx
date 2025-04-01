"use client";

import React, { useState } from "react";
import { Users } from "lucide-react";

const Teams = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    captain: "",
    players: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement team creation
    console.log("Team creation:", formData);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Teams</h1>
        <button
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            /* TODO: Open team creation modal */
            setShow(true);
          }}
        >
          Create New Team
        </button>
      </div>

      {/* Team Creation Form */}
      {show && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-6">Create Team</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Team Name
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="pl-10 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter team name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Captain
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.captain}
                onChange={(e) =>
                  setFormData({ ...formData, captain: e.target.value })
                }
                required
              >
                <option value="">Select a captain</option>
                {/* TODO: Add player options */}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Players
              </label>
              <select
                multiple
                className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-32"
                value={formData.players}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    players: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
                required
              >
                {/* TODO: Add player options */}
              </select>
              <p className="text-sm text-gray-500">
                Hold Ctrl/Cmd to select multiple players
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShow(false)}
              className="w-full bg-white text-indigo-600 py-2 px-4 rounded-lg hover:bg-white transition-colors cursor-pointer border border-indigo-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Team
            </button>
          </form>
        </div>
      )}

      {/* Teams List */}
      {!show && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Teams</h2>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Captain
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Players
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td
                      className="px-4 md:px-6 py-4 whitespace-nowrap text-gray-500"
                      colSpan={4}
                    >
                      No teams created yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
