"use client";
import React, { useState, useEffect } from "react";
import {
  Trophy,
  User,
  Mail,
  Shield,
  Phone,
  Calendar,
  Disc,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import Toast from "@/components/Toast";

import { ROLE_TYPE } from "@/utils/constants";

const Matches = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    team1: "",
    team2: "",
    date: "",
    overs: "",
    toss_winner: "",
    toss_decision: "",
  });
  const [error, setError] = useState({
    team1: "",
    team2: "",
    date: "",
    overs: "",
    toss_winner: "",
    toss_decision: "",
  });
  const [filterData, setFilterData] = useState<any>([]);
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [searchTearm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [result, setResult] = useState<any>(null);

  const teamList = useApi({
    url: "/teams/get-all-teams",
    method: "GET",
    id: "",
  });

  const matchesList = useApi({
    url: "/matches/get-all-matches",
    method: "GET",
    id: "",
  });

  const [teamsDD, setTeamsDD] = useState<any>([]);

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
        team1: "",
        team2: "",
        date: "",
        overs: "",
        toss_winner: "",
        toss_decision: "",
      });
      setResult(result);
    } catch (error: any) {
      console.log("Error fetching data", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement player registration
    // console.log("Player registration:", formData);
    if (validation()) {
      // console.log("Now we can submit the form");
      let payload = {
        team1: formData.team1,
        team2: formData.team2,
        date: formData.date,
        overs: formData.overs,
        toss_winner: formData.toss_winner,
        toss_decision: formData.toss_decision,
      };
      console.log("befor api call :", loading, payload);

      postAPICall("/matches/create-match", "POST", payload);

      console.log("after api call :", loading);
      // console.log("apiResponseObj", apiResponseObj);
    } else {
      console.log("api call not happening:");
    }
  };
  const validation = () => {
    const err: typeof error = {
      team1: "",
      team2: "",
      date: "",
      overs: "",
      toss_winner: "",
      toss_decision: "",
    };

    // return err;
    setError(err);
    if (Object.values(err).some((msg) => msg !== "")) {
      return false;
    } else {
      return true;
    }
  };

  // useEffect(() => {
  //   if (teamList?.data?.data) {
  //     const teams = teamList?.data.data?.map((team: any) => ({
  //       label: team.name,
  //       value: team._id,
  //     }));
  //     console.log(teams);
  //     setTeamsDD(teams);
  //   }
  // }, [teamList]);
  console.log("check", matchesList);

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
            setShow(true);
          }}
        >
          Record New Match
        </button>
      </div>

      {show && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-6">
            Match Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* new form */}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Team A
              </label>
              <div className="relative">
                <select
                  className="w-full py-1 px-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={formData.team1}
                  onChange={(e) =>
                    setFormData({ ...formData, team1: e.target.value })
                  }
                  // required
                >
                  <option>{"Select team A..."}</option>
                  {teamList?.data?.data.map((role: any) => (
                    <option value={role._id} key={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-red-500 text-sm mt-1">{error.team1}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Team B
              </label>
              <div className="relative">
                <select
                  className="w-full py-1 px-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={formData.team2}
                  onChange={(e) =>
                    setFormData({ ...formData, team2: e.target.value })
                  }
                >
                  <option>{"Select team B..."}</option>
                  {teamList?.data?.data.map((role: any) => (
                    <option value={role._id} key={role._id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-red-500 text-sm mt-1">{error.team2}</span>
            </div>

            <div className="space-y-2 flex gap-2">
              <div className="md:w-50% w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Select date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    // required
                  />
                </div>
                <span className="text-red-500 text-sm mt-1">{error.date}</span>
              </div>

              <div className="md:w-50% w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Overs
                </label>
                <div className="relative">
                  <Disc className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter no.of overs"
                    value={formData.overs}
                    min={0}
                    onChange={(e) =>
                      setFormData({ ...formData, overs: e.target.value })
                    }
                    // required
                  />
                </div>
                <span className="text-red-500 text-sm mt-1">{error.overs}</span>
              </div>
            </div>

            <div className="space-y-2 flex gap-2">
              <div className="md:w-50% w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Toss Winner
                </label>
                <div className="relative">
                  <select
                    className="w-full py-1 px-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={formData.toss_winner}
                    onChange={(e) =>
                      setFormData({ ...formData, toss_winner: e.target.value })
                    }

                    // required
                  >
                    <option>{"Select toss winner..."}</option>
                    {teamList?.data?.data
                      .filter(
                        (item: any) =>
                          item._id === formData.team1 ||
                          item._id === formData.team2
                      )
                      .map((role: any) => (
                        <option value={role._id} key={role._id}>
                          {role.name}
                        </option>
                      ))}
                  </select>
                </div>
                <span className="text-red-500 text-sm mt-1">
                  {error.toss_winner}
                </span>
              </div>

              <div className="md:w-50% w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Toss Decision
                </label>
                <div className="relative">
                  <select
                    className="w-full py-1 px-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={formData.toss_decision}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        toss_decision: e.target.value,
                      })
                    }
                    // required
                  >
                    <option>{"Select toss decision..."}</option>
                    <option value={"bat"}>{"Batting"}</option>
                    <option value={"bowl"}>{"Bowling"}</option>
                  </select>
                </div>
                <span className="text-red-500 text-sm mt-1">{error.overs}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShow(false)}
              className="w-full mt-5 bg-white text-indigo-600 py-2 px-4 rounded-lg hover:bg-white transition-colors cursor-pointer border border-indigo-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Create
            </button>
          </form>
        </div>
      )}

      {/* Matches List */}
      {!show && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Match Results
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Match Card Template */}
            {matchesList?.data?.data?.length > 0 ? (
              matchesList?.data.data.map((ele: any) => (
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(ele.date).toDateString()}
                    </span>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center flex-1">
                      <h3 className="font-semibold">{ele.team1.name}</h3>
                      <p className="text-xl md:text-2xl font-bold">{`${ele.scorecard.team1.runs}/${ele.scorecard.team1.wickets}`}</p>
                      <p className="text-sm text-gray-500">{`${ele.scorecard.team1.overs} overs`}</p>
                    </div>

                    <div className="px-4">
                      <span className="text-gray-400">vs</span>
                    </div>

                    <div className="text-center flex-1">
                      <h3 className="font-semibold">{ele.team2.name}</h3>
                      <p className="text-xl md:text-2xl font-bold">{`${ele.scorecard.team2.runs}/${ele.scorecard.team2.wickets}`}</p>
                      <p className="text-sm text-gray-500">{`${ele.scorecard.team2.overs} overs`}</p>
                    </div>
                  </div>

                  <div className="text-center text-sm">
                    <p className="text-indigo-600 font-semibold">
                      Team A won by 5 runs
                    </p>
                  </div>

                  <button className="w-full mt-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    <a href={`/matches/${ele._id}`}>View Scorecard</a>
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No matches recorded yet
              </div>
            )}
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
export default Matches;
