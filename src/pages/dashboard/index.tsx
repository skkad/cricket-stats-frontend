"use client";

import React from "react";
import { useApi } from "@/hooks/useApi";

type Player = {
  _id: string;
  name: string;
  totalRuns?: number;
  battingAverage?: number;
  totalMatches?: number;
  totalWickets?: number;
  bowlingEconomy?: number;
  match_won_as_captain?: number;
  match_lost_as_captain?: number;
  battingStrikeRate?: number;
  player_role?: string;
};

type TopPlayersResponse = {
  bestBatsman: Player[];
  bestBowler: Player[];
  bestAllrounder: Player[];
  bestCaptain: Player[];
  bestBattingStrikeRate: Player[];
};

const Dashboard = () => {
  // const [showToast, setShowToast] = useState<Boolean>(true);
  const playerList = useApi({
    url: "/players/top-players",
    method: "GET",
    id: "",
  });
  const bestBatsman = (playerList?.data?.data as TopPlayersResponse)
    ?.bestBatsman[0];
  const bestBowler = (playerList?.data?.data as TopPlayersResponse)
    ?.bestBowler[0];
  const bestAllRounder = (playerList?.data?.data as TopPlayersResponse)
    ?.bestAllrounder[0];
  const bestCaptain = (playerList?.data?.data as TopPlayersResponse)
    ?.bestCaptain[0];
  const bestStrikeRate = (playerList?.data?.data as TopPlayersResponse)
    ?.bestBattingStrikeRate[0];
  console.log("Player List:", bestCaptain);

  return (
    <div className="space-y-6 mx-4 md:mx-22 mt-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Cricket Statistics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Batting Stats */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Best Batsmen
          </h2>
          <div className="space-y-2">
            {bestBatsman ? (
              <p className="text-indigo-600 font-medium">
                {bestBatsman.name} {" | "} {bestBatsman.totalRuns} Runs {" | "}
                {bestBatsman.battingAverage} Avg {" | "}
                {bestBatsman.totalMatches} Matches
              </p>
            ) : (
              <p className="text-gray-600">No batting statistics available</p>
            )}
          </div>
        </div>

        {/* Bowling Stats */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Best Bowlers
          </h2>
          <div className="space-y-2">
            {bestBowler ? (
              <p className="text-indigo-600 font-medium">
                {bestBowler.name} {" | "} {bestBowler.totalWickets} Wickets
                {" | "}
                {bestBowler.bowlingEconomy} Eco {" | "}
                {bestBowler.totalMatches} Matches
              </p>
            ) : (
              <p className="text-gray-600">No bowling statistics available</p>
            )}
          </div>
        </div>

        {/* All-Rounders */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Best All-Rounders
          </h2>
          <div className="space-y-2">
            {bestAllRounder ? (
              <p className="text-indigo-600 font-medium">
                {bestAllRounder.name} {" | "} {bestAllRounder.totalRuns} Runs{" "}
                {" | "}
                {bestAllRounder.totalWickets} Wickets {" | "}
                {bestAllRounder.totalMatches} Matches
              </p>
            ) : (
              <p className="text-gray-600">
                No all-rounder statistics available
              </p>
            )}
          </div>
        </div>

        {/* Best Captains */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Best Captains
          </h2>
          <div className="space-y-2">
            {bestCaptain ? (
              <p className="text-indigo-600 font-medium">
                {bestCaptain.name} {" | "} {bestCaptain.totalMatches} Matches
                {" | "}
                {bestCaptain.match_won_as_captain} Wins {" | "}
                {bestCaptain.match_lost_as_captain} Losses
              </p>
            ) : (
              <p className="text-gray-600">No captain statistics available</p>
            )}
          </div>
        </div>

        {/* Best Batting StrikeRate */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Best Strike Rate
          </h2>
          <div className="space-y-2">
            {bestStrikeRate ? (
              <p className="text-indigo-600 font-medium">
                {bestStrikeRate.name} {" | "} {bestStrikeRate.battingStrikeRate}{" "}
                SR {" | "} {bestStrikeRate.battingAverage} Avg {" | "}
                {bestStrikeRate.totalMatches} Matches
              </p>
            ) : (
              <p className="text-gray-600">No batting statistics available</p>
            )}
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
