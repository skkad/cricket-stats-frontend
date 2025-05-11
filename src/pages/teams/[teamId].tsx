import React from "react";
import { Users, Trophy, User, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useApi } from "@/hooks/useApi";

const TeamDetails = () => {
  const router = useRouter();
  // TODO: Fetch team data using id
  // const team = {
  //   name: "Super Kings",
  //   captain: {
  //     id: "1",
  //     name: "John Doe",
  //   },
  //   players: [
  //     { id: "1", name: "John Doe", role: "all-rounder" },
  //     { id: "2", name: "Jane Smith", role: "batsman" },
  //     { id: "3", name: "Mike Johnson", role: "bowler" },
  //   ],
  //   stats: {
  //     matches: 25,
  //     wins: 15,
  //   },
  // };

  const teamDetails = useApi({
    url: "/teams/get-team",
    method: "GET",
    id: router.query.teamId,
  });

  const team = teamDetails?.data?.data;
  console.log(router.query.teamId);
  console.log("team:", team);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="cursor-pointer mb-6">
          <a href={`/teams`}>
            <ArrowLeft />
          </a>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-indigo-100 p-6 rounded-full">
            <Users className="h-16 w-16 text-indigo-600" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{team?.name}</h1>
            <p className="text-indigo-600 font-medium">
              Captain: {team?.captain?.name}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team Stats */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Team Statistics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Matches</span>
                <span className="font-semibold">{team?.matches}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wins</span>
                <span className="font-semibold">{team?.wins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Win Rate</span>
                <span className="font-semibold">
                  {((team?.wins / team?.matches) * 100).toFixed(1) || 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Team Players */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Team Players</h2>
            </div>
            <div className="space-y-2">
              {team?.players?.map((player: any) => (
                <a
                  key={player._id}
                  href={`/players/${player?._id}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="font-medium">{player?.name}</span>
                  <span className="text-sm text-gray-600 capitalize">
                    {player?.player_role}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
