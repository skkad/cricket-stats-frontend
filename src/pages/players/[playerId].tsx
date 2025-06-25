import { ArrowLeft, User, TrendingUp, Award } from "lucide-react";
import React from "react";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/router";

// interface ProfileProps {
//   playerId: string;
//   setProfileView: () => void;
// }

type PlayerProps = {
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
  inningsBatted?: number;
  totalBallsBowled?: number;
  bowlingAverage?: number;
  bowlingStrikeRate?: number;
};

const getOvers = (balls: number) => {
  const over = Math.floor(balls) + (balls % 6) / 10;
  return over.toFixed(1);
};

const Profile = () => {
  // players/get-player/67fc9ec90fc68cbe29fceb61
  const router = useRouter();
  const playerApiResponse = useApi({
    url: "/players/get-player",
    method: "GET",
    id:
      typeof router.query.playerId === "string"
        ? router.query.playerId
        : Array.isArray(router.query.playerId)
        ? router.query.playerId[0]
        : undefined,
    // router.query.playerId,
  });
  const player = playerApiResponse?.data?.data as PlayerProps;
  console.log(player);
  console.log(router.query.playerId);

  return (
    <div className="mx-4 md:mx-22 mt-6 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="cursor-pointer mb-6">
          <a href={`/players`}>
            <ArrowLeft />
          </a>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-indigo-100 p-6 rounded-full">
            <User className="h-16 w-16 text-indigo-600" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{player?.name}</h1>
            <p className="text-indigo-600 font-medium capitalize">
              {player?.player_role}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batting Stats */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Batting Statistics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Runs</span>
                <span className="font-semibold">{player?.totalRuns}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Matches</span>
                <span className="font-semibold">{player?.totalMatches}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Innings Played</span>
                <span className="font-semibold">{player?.inningsBatted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average</span>
                <span className="font-semibold">{player?.battingAverage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Strike Rate</span>
                <span className="font-semibold">
                  {player?.battingStrikeRate}
                </span>
              </div>
            </div>
          </div>

          {/* Bowling Stats */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Bowling Statistics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Wickets</span>
                <span className="font-semibold">{player?.totalWickets}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Overs</span>
                <span className="font-semibold">
                  {/* {(
                    Math.floor(player?.totalBallsBowled) +
                    (player?.totalBallsBowled % 6) / 10
                  ).toFixed(1)} */}
                  {player?.totalBallsBowled
                    ? getOvers(player?.totalBallsBowled)
                    : "0.0"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Economy</span>
                <span className="font-semibold">{player?.bowlingEconomy}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average</span>
                <span className="font-semibold">{player?.bowlingAverage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Strike Rate</span>
                <span className="font-semibold">
                  {player?.bowlingStrikeRate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
