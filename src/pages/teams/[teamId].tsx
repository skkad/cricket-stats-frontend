import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
import { Users, Trophy, User, ArrowLeft, X, Plus, Minus } from "lucide-react";
import { useRouter } from "next/router";
import { useApi } from "@/hooks/useApi";
import Toast from "@/components/Toast";

type PlayersListProps = {
  _id: string;
  name: string;
  player_role: string;
};

type PayloadProps = {
  teamId: string;
  playerId: string;
};

const TeamDetails = () => {
  const router = useRouter();
  // const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"add" | "remove">("add");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState({
    name: "",
    captain: "",
    players: "",
  });
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

  const playerList = useApi({
    url: "/players/get-all-players",
    method: "GET",
    id: "",
  });

  const teamDetails = useApi({
    url: "/teams/get-team",
    method: "GET",
    id:
      typeof router.query.teamId === "string" ? router.query.teamId : undefined,
  });

  const team = teamDetails?.data?.data as {
    name: string;
    matches: number;
    wins: number;
    captain: { _id: string; name: string };
    players: { _id: string; name: string; player_role: string }[];
  };

  const postAPICall = async (
    url: string,
    method_type: string,
    payload: PayloadProps
  ) => {
    // setLoading(true);
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
      // setLoading(false);

      setResult(result);
    } catch (error) {
      console.log("Error fetching data", error);
      // setError(error);
      // setLoading(false);
      setError({ name: "", captain: "", players: "" });
    }
  };

  const openModal = (action: "add" | "remove") => {
    setModalAction(action);
    setSelectedPlayer("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer("");
  };

  const handlePlayerAction = () => {
    if (!selectedPlayer) return;

    if (modalAction === "add") {
      // TODO: Add player to team
      console.log("Adding player to team:", selectedPlayer);
      postAPICall("/teams/add-player", "PATCH", {
        teamId: router.query.teamId as string,
        playerId: selectedPlayer,
      });
    } else {
      // TODO: Remove player from team
      console.log("Removing player from team:", selectedPlayer);
      postAPICall("/teams/remove-player", "PATCH", {
        teamId: router.query.teamId as string,
        playerId: selectedPlayer,
      });
    }

    closeModal();
  };

  console.log(router.query.teamId);
  console.log("team:", team);

  return (
    <div
      className={`mx-4 md:mx-22 mt-6 space-y-6 ${
        isModalOpen ? "bg-gray-100" : ""
      }`}
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="cursor-pointer mb-6">
          <a href={`/teams`}>
            <ArrowLeft />
          </a>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
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
          <div className="flex flex-col sm:flex-row gap-2">
            {team?.players?.length < 11 && (
              <button
                onClick={() => openModal("add")}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add Player
              </button>
            )}
            <button
              onClick={() => openModal("remove")}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <Minus className="h-4 w-4" />
              Remove Player
            </button>
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
                  {team?.matches > 0
                    ? `${((team?.wins / team?.matches) * 100).toFixed(1)}%`
                    : "NA"}
                </span>
              </div>
            </div>
          </div>

          {/* Team Players */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold">Team Players</h2>
              </div>
              {/* {team?.players?.length < 11 && (
                <button
                  className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => {
                    
                    // setShow(true);
                  }}
                >
                  Add Player
                </button>
              )} */}
            </div>
            <div className="space-y-2">
              {team?.players?.map(
                (player: {
                  _id: string;
                  name: string;
                  player_role: string;
                }) => (
                  <a
                    key={player._id}
                    href={`/players/${player?._id}`}
                    className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg transition-colors text-align-left"
                  >
                    <span className="font-medium w-[80%]">{player?.name}</span>
                    <span className="flex justify-between items-center gap-2 text-align-left w-[20%]">
                      {/* <XSquareIcon className="h-4 w-4 text-indigo-500" /> */}
                      <span className="text-sm text-gray-600 capitalize">
                        {player?.player_role}
                      </span>
                    </span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-white-100 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">
                {modalAction === "add"
                  ? "Add Player to Team"
                  : "Remove Player from Team"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {modalAction === "add"
                      ? "Select Player to Add"
                      : "Select Player to Remove"}
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-3"
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                  >
                    <option value="">
                      {modalAction === "add"
                        ? "Choose a player to add"
                        : "Choose a player to remove"}
                    </option>
                    {modalAction === "add"
                      ? (playerList?.data?.data as []).map(
                          (player: PlayersListProps) => (
                            <option key={player._id} value={player._id}>
                              {player.name} ({player.player_role})
                            </option>
                          )
                        )
                      : team.players
                          .filter((player) => player._id !== team.captain._id) // Can't remove captain
                          .map((player) => (
                            <option key={player._id} value={player._id}>
                              {player.name} ({player.player_role})
                            </option>
                          ))}
                  </select>
                  {modalAction === "remove" && (
                    <p className="text-sm text-gray-500 mt-1">
                      Note: Team captain cannot be removed
                    </p>
                  )}
                </div>

                {modalAction === "add" && selectedPlayer && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">
                      Player Details
                    </h3>
                    {(() => {
                      const player = (
                        playerList?.data?.data as [PlayersListProps]
                      ).find((p) => p._id === selectedPlayer);
                      return player ? (
                        <div className="text-sm text-blue-800">
                          <p>
                            <strong>Name:</strong> {player.name}
                          </p>
                          <p>
                            <strong>Role:</strong> {player.player_role}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}

                {modalAction === "remove" && selectedPlayer && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-medium text-red-900 mb-2">Warning</h3>
                    <p className="text-sm text-red-800">
                      This player will be removed from the team and will no
                      longer participate in team matches.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlayerAction}
                disabled={!selectedPlayer}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  modalAction === "add"
                    ? "bg-green-600 hover:bg-green-700 disabled:bg-green-300"
                    : "bg-red-600 hover:bg-red-700 disabled:bg-red-300"
                }`}
              >
                {modalAction === "add" ? "Add Player" : "Remove Player"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={
          typeof result?.message === "string"
            ? result.message
            : "Player registered successfully"
        }
        status={result?.status ? "success" : "error"}
        open={result ? true : false}
        onClose={() => setResult(null)}
      />
    </div>
  );
};

export default TeamDetails;
