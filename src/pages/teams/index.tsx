"use client";

import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import Toast from "@/components/Toast";

const Teams = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    captain: "",
    players: [] as string[],
  });
  const [error, setError] = useState({
    name: "",
    captain: "",
    players: "",
  });

  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState<any>([]);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [searchTearm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [result, setResult] = useState<any>(null);
  const [playersDD, setPlayersDD] = useState<any>([]);
  const teamList = useApi({
    url: "/teams/get-all-teams",
    method: "GET",
    id: "",
  });
  const playerList = useApi({
    url: "/players/get-all-players",
    method: "GET",
    id: "",
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
      setFormData({
        name: "",
        captain: "",
        players: [],
      });
      setPlayersDD([]);
      setResult(result);
    } catch (error: any) {
      console.log("Error fetching data", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement team creation
    console.log("Team creation:", formData);
    if (validation()) {
      let payload = {
        team_name: formData.name,
        captain_id: formData.captain,
        players_list: formData.players,
      };
      console.log(payload);
      postAPICall("/teams/create-team", "POST", payload);
    } else {
      console.log("Error in post api of team creation.", error);
    }
  };

  const validation = () => {
    const err: typeof error = {
      name: "",
      captain: "",
      players: "",
    };
    if (!formData.name) {
      err.name = "Name is required";
    }
    if (!formData.captain) {
      err.captain = "Captain is required";
    }
    if (formData.players.length === 0) {
      err.players = "At least one player is required";
    }
    if (formData.players.length > 11) {
      err.players = "Maximum 11 players are allowed";
    }
    // return err;
    setError(err);
    if (Object.values(err).some((msg) => msg !== "")) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    let rawData = teamList?.data?.data || [];
    const filtered = searchTearm.trim()
      ? rawData.filter((ele: any) =>
          Object.values(ele).some((val: any) =>
            String(val).toLowerCase().includes(searchTearm.toLowerCase())
          )
        )
      : rawData;
    setFilterData(filtered);
    setTotalPages(Math.ceil(filtered?.length / 5));
    // setCurrentPage(1);
  }, [searchTearm, teamList, show]);

  useEffect(() => {
    const data = filterData?.slice((currentPage - 1) * 5, currentPage * 5);
    setPaginatedData(data);
  }, [currentPage, filterData]);

  // useEffect(() => {
  //   let data = playerList?.data?.data || [];
  //   data = data.map((ele: any) => {
  //     return {
  //       label: ele.name,
  //       value: ele._id,
  //     };
  //   });
  //   setPlayersDD(data);
  // }, []);

  console.log(playersDD);

  return (
    <div className="space-y-6 mx-4 md:mx-22 mt-6">
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
                  className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter team name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <span className="text-red-500 text-sm mt-1">{error.name}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Players
              </label>
              <div className="relative">
                <select
                  multiple
                  className="w-full py-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 h-32"
                  value={formData.players}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const isPresent = formData.players.includes(selectedValue);
                    console.log("isPresent", isPresent);

                    setFormData((prev) => {
                      return {
                        ...prev,
                        players: isPresent
                          ? prev.players.filter((ele) => ele !== selectedValue)
                          : [...prev.players, selectedValue],
                      };
                    });
                    setPlayersDD((prev: any) => {
                      return isPresent
                        ? playersDD.filter(
                            (ele: any) => ele.value !== selectedValue
                          )
                        : [
                            ...prev,
                            {
                              value: e.target.value,
                              label: e.target.selectedOptions[0].text,
                            },
                          ];
                    });
                  }}
                >
                  {/* TODO: Add player options */}
                  {playerList.data.data?.map((ele: any) => (
                    <option
                      key={ele._id}
                      value={ele._id}
                      className="text-sm p-2"
                    >
                      {ele.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500">
                Hold Ctrl/Cmd to select multiple players
              </p>
              <span className="text-red-500 text-sm mt-1">{error.players}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Captain
              </label>
              <div className="relative">
                <select
                  className="w-full py-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={formData.captain}
                  onChange={(e) =>
                    setFormData({ ...formData, captain: e.target.value })
                  }
                >
                  {/* <option value="">Select a captain</option> */}
                  {playersDD?.map((ele: any) => (
                    <option
                      key={ele.value}
                      value={ele.value}
                      className="text-sm p-2"
                    >
                      {ele.label}
                    </option>
                  ))}
                  {/* TODO: Add player options */}
                </select>
              </div>
              <span className="text-red-500 text-sm mt-1">{error.captain}</span>
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
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Registered Teams
            </h2>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Search players..."
              value={searchTearm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                  {paginatedData?.length === 0 ? (
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-gray-500"
                        colSpan={3}
                      >
                        No players registered yet
                      </td>
                    </tr>
                  ) : (
                    paginatedData?.map((ele: any) => (
                      <tr
                        className="odd:bg-gray-50 even:bg-white text-left text-xs font-medium  uppercase tracking-wider"
                        key={ele._id}
                      >
                        <td className="px-6 py-3 cursor-pointer text-indigo-600 hover:text-indigo-900">
                          <a href={`/teams/${ele._id}`}>{ele.name}</a>
                        </td>
                        <td className="px-6 py-3">{ele.captain?.name}</td>
                        <td className="px-6 py-3 ">{`${ele.players.length} players`}</td>
                        <td className="px-6 py-3 ">{`${ele.wins}/${ele.matches} wins`}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex  md:justify-end sm:justify-center gap-3 items-center mt-4">
              <button
                className={`${
                  currentPage === 1
                    ? "bg-white text-gray-500"
                    : "bg-indigo-600 text-white"
                }  px-4 py-2 rounded-lg cursor-pointer`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Prev
              </button>
              <span>
                Pages {currentPage} of {totalPages}
              </span>
              <button
                className={`${
                  currentPage === totalPages
                    ? "bg-white text-gray-500"
                    : "bg-indigo-600 text-white"
                }  px-4 py-2 rounded-lg cursor-pointer`}
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Teams;
