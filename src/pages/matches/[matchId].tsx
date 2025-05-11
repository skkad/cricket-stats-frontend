import React, { useEffect } from "react";

import { Trophy, TrendingUp, Award, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useApi } from "@/hooks/useApi";

const Scorecard = () => {
  const router = useRouter();
  const matchDetails = useApi({
    url: "/matches/get-match",
    method: "GET",
    id: router.query.matchId,
  });
  // TODO: Fetch match data using id
  //   const match = {
  //     date: "2025-03-15",
  //     team1: {
  //       name: "Super Kings",
  //       score: "245/6",
  //       overs: "50",
  //       batting: [
  //         { name: "John Doe", runs: 85, balls: 65, fours: 8, sixes: 4 },
  //         { name: "Jane Smith", runs: 45, balls: 38, fours: 4, sixes: 1 },
  //       ],
  //       bowling: [
  //         { name: "Mike Brown", overs: 10, runs: 45, wickets: 2, economy: 4.5 },
  //         { name: "Tom Wilson", overs: 10, runs: 52, wickets: 3, economy: 5.2 },
  //       ],
  //     },
  //     team2: {
  //       name: "Royal Challengers",
  //       score: "240/8",
  //       overs: "50",
  //       batting: [
  //         { name: "Steve Johnson", runs: 75, balls: 58, fours: 7, sixes: 3 },
  //         { name: "David Miller", runs: 55, balls: 42, fours: 5, sixes: 2 },
  //       ],
  //       bowling: [
  //         { name: "Chris Lee", overs: 10, runs: 48, wickets: 2, economy: 4.8 },
  //         { name: "Sam Taylor", overs: 10, runs: 50, wickets: 2, economy: 5.0 },
  //       ],
  //     },
  //     result: "Super Kings won by 5 runs",
  //   };

  const team1_players = matchDetails?.data?.data?.scorecard?.team1?.players.map(
    (item: any) => ({
      ...item,
      name: item.playerId.name,
      role: item.playerId.role,
    })
  );
  const team2_players = matchDetails?.data?.data?.scorecard?.team2?.players.map(
    (item: any) => ({
      ...item,
      name: item.playerId.name,
      role: item.playerId.role,
    })
  );

  const batters1 = team1_players
    ?.filter((ele: any) => ele.role !== "bowler")
    .filter((item: any, index: number) => index < 3);
  const bowlers1 = team1_players
    ?.filter((ele: any) => ele.role !== "batsman")
    .filter((item: any, index: number) => index < 3);
  const batters2 = team2_players
    ?.filter((ele: any) => ele.role !== "bowler")
    .filter((item: any, index: number) => index < 3);
  const bowlers2 = team2_players
    ?.filter((ele: any) => ele.role !== "batsman")
    .filter((item: any, index: number) => index < 3);
  //   console.log("inside", batters1, bowlers1);

  const match = {
    date: matchDetails?.data?.data?.date,
    overs: matchDetails?.data?.data?.overs,
    result: "Super Kings won by 5 runs",
    team1: {
      team_id: matchDetails?.data?.data?.team1._id,
      name: matchDetails?.data?.data?.team1.name,
      overs: matchDetails?.data?.data?.scorecard?.team1?.overs,
      runs: matchDetails?.data?.data?.scorecard?.team1?.runs,
      wickets: matchDetails?.data?.data?.scorecard?.team1?.wickets,
      batting: batters1?.sort((a: any, b: any) => b.runs - a.runs),
      bowling: bowlers1?.sort(
        (a: any, b: any) => b.wicketsTaken - a.wicketsTaken
      ),
    },
    team2: {
      team_id: matchDetails?.data?.data?.team2._id,
      name: matchDetails?.data?.data?.team2?.name,
      overs: matchDetails?.data?.data?.scorecard?.team2?.overs,
      runs: matchDetails?.data?.data?.scorecard?.team2?.runs,
      wickets: matchDetails?.data?.data?.scorecard?.team2?.wickets,
      batting: batters2?.sort((a: any, b: any) => b.runs - a.runs),
      bowling: bowlers2?.sort(
        (a: any, b: any) => b.wicketsTaken - a.wicketsTaken
      ),
    },
  };

  console.log("matches:", matchDetails?.data?.data);

  //   useEffect(() => {
  //     const batters1 = matchDetails?.data?.data.scorecard.team1.players.filter(
  //       (ele: any) => ele.playerId?.player_role === "batsman"
  //     );
  //     const bowlers1 = matchDetails?.data?.data.scorecard.team1.players.filter(
  //       (ele: any) => ele.playerId?.player_role === "bowlers"
  //     );
  //     console.log("inside", batters1, bowlers1);
  //   }, []);

  const BattingTable = ({
    battingData = [],
  }: {
    battingData: {
      name: string;
      runs: number;
      balls: number;
      fours: number;
      sixes: number;
      //   strike_rate: number;
    }[];
  }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Batsman
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Runs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Balls
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              4s
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              6s
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              SR
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {battingData.map((batter, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {batter.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{batter.runs}</td>
              <td className="px-6 py-4 whitespace-nowrap">{batter.balls}</td>
              <td className="px-6 py-4 whitespace-nowrap">{batter.fours}</td>
              <td className="px-6 py-4 whitespace-nowrap">{batter.sixes}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {((batter.runs / batter.balls) * 100).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const BowlingTable = ({
    bowlingData = [],
  }: {
    bowlingData: {
      name: string;
      oversBowled: number;
      runsGiven: number;
      wicketsTaken: number;
      economy: number;
    }[];
  }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Bowler
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Overs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Runs
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Wickets
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Economy
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bowlingData.map((bowler, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {bowler.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {bowler.oversBowled}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {bowler.runsGiven}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {bowler.wicketsTaken}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(bowler.runsGiven / bowler.oversBowled).toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="cursor-pointer mb-6">
          <a href={`/matches`}>
            <ArrowLeft />
          </a>
        </div>
        <div className="text-center mb-8">
          <p className="text-gray-600">{new Date(match.date).toDateString()}</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            {match.team1.name} vs {match.team2.name}
          </h1>
          <p className="text-indigo-600 font-medium mt-2">{match?.result}</p>
        </div>

        {/* Team 1 Innings */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">
              {match.team1.name} - {match.team1.runs}/{match.team1.wickets} (
              {match.team1.overs} overs)
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Batting</h3>
              </div>
              <BattingTable battingData={match.team1.batting} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Bowling</h3>
              </div>
              <BowlingTable bowlingData={match.team2.bowling} />
            </div>
          </div>
        </div>

        {/* Team 2 Innings */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold">
              {match.team2.name} - {match.team2.runs}/{match.team2.wickets} (
              {match.team2.overs} overs)
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Batting</h3>
              </div>
              <BattingTable battingData={match.team2.batting} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Bowling</h3>
              </div>
              <BowlingTable bowlingData={match.team1.bowling} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
