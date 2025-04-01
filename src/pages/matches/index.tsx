"use client";
import React, { useState } from "react";
import { Trophy } from "lucide-react";

const Matches = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Matches
        </h1>
        <button
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            /* TODO: Open new match modal */
          }}
        >
          Record New Match
        </button>
      </div>

      {/* Matches List */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Match Results</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Match Card Template */}
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">March 15, 2025</span>
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center flex-1">
                <h3 className="font-semibold">Team A</h3>
                <p className="text-xl md:text-2xl font-bold">245/6</p>
                <p className="text-sm text-gray-500">50 overs</p>
              </div>

              <div className="px-4">
                <span className="text-gray-400">vs</span>
              </div>

              <div className="text-center flex-1">
                <h3 className="font-semibold">Team B</h3>
                <p className="text-xl md:text-2xl font-bold">240/8</p>
                <p className="text-sm text-gray-500">50 overs</p>
              </div>
            </div>

            <div className="text-center text-sm">
              <p className="text-indigo-600 font-semibold">
                Team A won by 5 runs
              </p>
            </div>

            <button
              className="w-full mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              onClick={() => {
                /* TODO: Show match details */
              }}
            >
              View Scorecard
            </button>
          </div>

          {/* Placeholder when no matches */}
          <div className="col-span-full text-center py-8 text-gray-500">
            No matches recorded yet
          </div>
        </div>
      </div>
    </div>
  );
};
export default Matches;
