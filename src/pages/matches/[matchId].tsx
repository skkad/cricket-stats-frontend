import React, { useEffect, useState } from "react";

import { Trophy, TrendingUp, Award, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useApi } from "@/hooks/useApi";
import Toast from "@/components/Toast";

const Scorecard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [performanceType, setPerformanceType] = useState<"batting" | "bowling">(
    "batting"
  );
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [battingForm, setBattingForm] = useState({
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
    is_out: "",
  });

  const [bowlingForm, setBowlingForm] = useState({
    overs: 0,
    runs: 0,
    wickets: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  // const [matchId, setMatchId] = useState<any>(router.query.matchId);

  const matchDetails = useApi({
    url: "/matches/get-match",
    method: "GET",
    id: router.query.matchId,
  });
  const matchperformanceData = useApi({
    url: "/performance/get-match-performance",
    method: "GET",
    id: router.query.matchId,
  });
  const playersDD = useApi({
    url: "/teams/get-team",
    method: "GET",
    id: selectedTeam,
  });

  const postAPICall = async (
    url: string,
    method_type: string,
    payload: any
  ) => {
    setLoading(true);
    try {
      const respone = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: method_type,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await respone.json();
      console.log("Result", result);
      setLoading(false);
      setBattingForm({ runs: 0, balls: 0, fours: 0, sixes: 0, is_out: "" });
      setBowlingForm({ overs: 0, runs: 0, wickets: 0 });
      setPerformanceType("batting");
      setIsEditing(false);
      setResult(result);
      // setMatchDetails(() => fetchMatchDetails(router.query.matchId));
      // setMatchId(router.query.matchId);
    } catch (error: any) {
      console.log("Error fetching data", error);
      setError(error);
      setLoading(false);
    }
  };

  const handlePerformanceSubmit = async () => {
    try {
      const performanceData =
        performanceType === "batting" ? battingForm : bowlingForm;
      // TODO: Submit performance data to backend
      console.log("Performance data:", {
        matchId: router.query.matchId,
        teamId: selectedTeam,
        playerId: selectedPlayer,
        // type: performanceType,
        battingData: battingForm,
        bowlingData: bowlingForm,
        // ...performanceData,
      });
      const payload = {
        match_id: router.query.matchId,
        player_id: selectedPlayer,
        team_id: selectedTeam,
        runs: battingForm.runs,
        balls: battingForm.balls,
        fours: battingForm.fours,
        sixes: battingForm.sixes,
        is_out: battingForm.is_out === "out" ? true : false,
        overs_bowled: bowlingForm.overs,
        runs_conceded: bowlingForm.runs,
        wickets: bowlingForm.wickets,
      };
      postAPICall("/performance/update-performance", "POST", payload);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving performance:", error);
    }
  };

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

  // const team1_players = matchDetails?.data?.data?.scorecard?.team1?.players.map(
  //   (item: any) => ({
  //     ...item,
  //     name: item.playerId.name,
  //     role: item.playerId.role,
  //   })
  // );
  // const team2_players = matchDetails?.data?.data?.scorecard?.team2?.players.map(
  //   (item: any) => ({
  //     ...item,
  //     name: item.playerId.name,
  //     role: item.playerId.role,
  //   })
  // );

  // const batters1 = team1_players
  //   ?.filter((ele: any) => ele.role !== "bowler")
  //   .filter((item: any, index: number) => index < 3);
  // const bowlers1 = team1_players
  //   ?.filter((ele: any) => ele.role !== "batsman")
  //   .filter((item: any, index: number) => index < 3);
  // const batters2 = team2_players
  //   ?.filter((ele: any) => ele.role !== "bowler")
  //   .filter((item: any, index: number) => index < 3);
  // const bowlers2 = team2_players
  //   ?.filter((ele: any) => ele.role !== "batsman")
  //   .filter((item: any, index: number) => index < 3);

  const team1_players = matchperformanceData?.data?.data?.filter(
    (ele: any) => ele.teamId === matchDetails?.data?.data?.team1._id
  );
  const team2_players = matchperformanceData?.data?.data?.filter(
    (ele: any) => ele.teamId === matchDetails?.data?.data?.team2._id
  );
  const batters1 = team1_players
    ?.filter((ele: any) => ele.playerId.player_role !== "bowler")
    .filter((item: any, index: number) => index < 3);
  const bowlers1 = team1_players
    ?.filter((ele: any) => ele.playerId.player_role !== "batsman")
    .filter((item: any, index: number) => index < 3);
  const batters2 = team2_players
    ?.filter((ele: any) => ele.playerId.player_role !== "bowler")
    .filter((item: any, index: number) => index < 3);
  const bowlers2 = team2_players
    ?.filter((ele: any) => ele.playerId.player_role !== "batsman")
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
      playerId: any;
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
                {batter?.playerId?.name}
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
      playerId: any;
      name: string;
      overs_bowled: number;
      runs_conceded: number;
      wickets: number;
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
                {bowler?.playerId?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {bowler.overs_bowled}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {bowler.runs_conceded}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{bowler.wickets}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {(bowler.runs_conceded / bowler.overs_bowled).toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // useEffect(() => {
  //   setMatchId(router.query.matchId);
  // }, []);

  console.log(
    "team1_players",
    router.query.matchId,
    matchperformanceData
    // playersDD.data.data.players.map((ele: any) => ({
    //   label: ele.name,
    //   value: ele._id,
    // }))
  );

  return (
    <div className="mx-4 md:mx-22 mt-6 space-y-6">
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
          {/* Add Performance Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {!isEditing ? "Add Player Performance" : "Back to Scorecard"}
          </button>
        </div>

        {/* Performance Recording Form */}
        {isEditing && (
          <div className="mb-8 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-semibold mb-4">
              Record Player Performance
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Team
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <option value="">Select Team</option>
                  <option value={match.team1.team_id}>
                    {match.team1.name}
                  </option>
                  <option value={match.team2.team_id}>
                    {match.team2.name}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Player
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={selectedPlayer}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                >
                  <option value="">Select Player</option>
                  {selectedTeam === match.team1.team_id && [
                    playersDD?.data?.data?.players?.map((player: any) => (
                      <option key={player._id} value={player._id}>
                        {player.name}
                      </option>
                    )),
                    // ...match.team1.bowling.map((player: any) => (
                    //   <option key={player.playerId} value={player.playerId}>
                    //     {player.name}
                    //   </option>
                    // )),
                  ]}
                  {selectedTeam === match.team2.team_id && [
                    playersDD?.data?.data?.players?.map((player: any) => (
                      <option key={player._id} value={player._id}>
                        {player.name}
                      </option>
                    )),
                    // ...match.team2.bowling.map((player: any) => (
                    //   <option key={player.playerId} value={player.playerId}>
                    //     {player.name}
                    //   </option>
                    // )),
                  ]}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Performance Type
                </label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      performanceType === "batting"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setPerformanceType("batting")}
                  >
                    Batting
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      performanceType === "bowling"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setPerformanceType("bowling")}
                  >
                    Bowling
                  </button>
                </div>
              </div>

              {performanceType === "batting" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Runs
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={battingForm.runs}
                      onChange={(e) =>
                        setBattingForm((prev) => ({
                          ...prev,
                          runs: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Balls
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={battingForm.balls}
                      onChange={(e) =>
                        setBattingForm((prev) => ({
                          ...prev,
                          balls: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fours
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={battingForm.fours}
                      onChange={(e) =>
                        setBattingForm((prev) => ({
                          ...prev,
                          fours: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sixes
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={battingForm.sixes}
                      onChange={(e) =>
                        setBattingForm((prev) => ({
                          ...prev,
                          sixes: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Out/Not Out
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={battingForm.is_out}
                      onChange={(e) =>
                        setBattingForm((prev) => ({
                          ...prev,
                          is_out: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select...</option>
                      <option value={"out"}>{"Out"}</option>
                      <option value={"not-out"}>{"Not Out"}</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overs
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={bowlingForm.overs}
                      onChange={(e) =>
                        setBowlingForm((prev) => ({
                          ...prev,
                          overs: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Runs Conceded
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={bowlingForm.runs}
                      onChange={(e) =>
                        setBowlingForm((prev) => ({
                          ...prev,
                          runs: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wickets
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      value={bowlingForm.wickets}
                      onChange={(e) =>
                        setBowlingForm((prev) => ({
                          ...prev,
                          wickets: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handlePerformanceSubmit}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Performance
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Team 1 Innings */}
        {!isEditing && (
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
        )}

        {/* Team 2 Innings */}
        {!isEditing && (
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
        )}
      </div>

      <Toast
        message={
          result?.message ? result.message : "Player registered successfully"
        }
        status={result?.status ? "success" : "error"}
        open={result ? true : false}
        onClose={() => setResult(null)}
      />
    </div>
  );
};

export default Scorecard;
