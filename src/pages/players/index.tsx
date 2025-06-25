"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Phone } from "lucide-react";
import { ROLE_TYPE } from "@/utils/constants";
import { useApi } from "@/hooks/useApi";
import Toast from "@/components/Toast";
// import Profile from "./Profile";

type MatchResultProps = {
  message: string;
  status: boolean;
};

type PayloadProps = {
  name: string;
  email: string;
  mobile_number: number;
  age: number;
  player_role: string;
};

const Players = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [profileView, setProfileView] = useState(false);
  // const [playerId, setPlayerId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "batsman",
    mobile_number: "",
    age: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    role: "",
    mobile_number: "",
    age: "",
  });
  const [filterData, setFilterData] = useState<unknown[]>([]);
  const [paginatedData, setPaginatedData] = useState<unknown[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [result, setResult] = useState<MatchResultProps | null>(null);
  const playerList = useApi({
    url: "/players/get-all-players",
    method: "GET",
    id: "",
  });

  const postAPICall = async (
    url: string,
    method_type: string,
    payload: PayloadProps
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
        email: "",
        password: "",
        role: "batsman",
        mobile_number: "",
        age: "",
      });
      setResult(result);
    } catch (error) {
      console.log("Error fetching data", error);
      setError({ name: "", email: "", role: "", mobile_number: "", age: "" });
      setLoading(false);
      setResult({
        message: "Failed to create match. Please try again.",
        status: false,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement player registration
    // console.log("Player registration:", formData);
    if (validation()) {
      // console.log("Now we can submit the form");
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile_number: Number(formData.mobile_number),
        age: Number(formData.age),
        player_role: formData.role,
      };
      console.log("befor api call :", loading, payload);

      postAPICall("/players/register-players", "POST", payload);

      console.log("after api call :", loading);
      // console.log("apiResponseObj", apiResponseObj);
    } else {
      console.log("api call not happening:");
    }
  };
  const validation = () => {
    const err: typeof error = {
      name: "",
      email: "",
      role: "",
      mobile_number: "",
      age: "",
    };
    if (!formData.name) {
      err.name = "Name is required";
    }
    if (!formData.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = "Email is invalid";
    }
    if (!formData.mobile_number) {
      err.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      err.mobile_number = "Mobile number should be 10 digits";
    }
    if (!formData.age) {
      err.age = "Age is required";
    } else if (isNaN(Number(formData.age))) {
      err.age = "Age should be a number";
    } else if (Number(formData.age) < 0) {
      err.age = "Age should be a positive number";
    }
    if (!formData.role) {
      err.role = "Role is required";
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
    const rawData = Array.isArray(playerList?.data?.data)
      ? playerList?.data?.data
      : [];
    const filtered = searchTerm.trim()
      ? rawData.filter(
          (ele: unknown) =>
            typeof ele === "object" &&
            ele !== null &&
            Object.values(ele).some((val: unknown) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
      : rawData;
    setFilterData(filtered);
    setTotalPages(Math.ceil(filtered?.length / 5));
    // setCurrentPage(1);
  }, [searchTerm, playerList]);

  useEffect(() => {
    const data = filterData?.slice((currentPage - 1) * 5, currentPage * 5);
    setPaginatedData(data);
  }, [currentPage, filterData]);

  // useEffect(() => {
  //   if (playerList?.data?.data) {
  //     let total = Math.ceil(playerList?.data?.data?.length / 5);
  //     const paginated = playerList?.data?.data?.slice(
  //       (currentPage - 1) * 5,
  //       currentPage * 5
  //     );
  //     setPaginatedData(paginated);
  //     setTotalPages(total);
  //     // setFilterData(playerList?.data?.data);
  //   }
  // }, []);

  // useEffect(() => {
  //   const data = playerList?.data?.data?.filter((ele: any) =>
  //     Object.values(ele).some((val: any) =>
  //       String(val).toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  //   console.log("search data", data);
  //   // setTotalPages(Math.ceil(data?.length / 5));
  //   setFilterData(data);
  //   setCurrentPage(1); // Reset to first page when search term changes
  // }, [searchTerm]);

  // console.log("Player List", playerList);

  return (
    <div className="space-y-6 mx-4 md:mx-22 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900">
          Players
        </h1>
        <button
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => {
            /* TODO: Open registration modal */
            setShow(true);
          }}
        >
          Register New Player
        </button>
      </div>

      {/* Registration Form */}
      {show && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-lg md:text-xl font-semibold mb-6">
            Player Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter player's full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  // required
                />
              </div>
              <span className="text-red-500 text-sm mt-1">{error.name}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  // required
                />
              </div>
              <span className="text-red-500 text-sm mt-1">{error.email}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter mobile number"
                  value={formData.mobile_number}
                  pattern="[0-9]*"
                  onChange={(e) => {
                    // if(e.target.value)
                    const regex = /^[a-zA-Z]/g;
                    // var regex1 = /^\d{10}$/g;
                    if (!regex.test(e.target.value)) {
                      setFormData({
                        ...formData,
                        mobile_number: e.target.value,
                      });
                    }
                    // setFormData({ ...formData, mobile_number: e.target.value });
                  }}
                  // required
                />
              </div>
              <span className="text-red-500 text-sm mt-1">
                {error.mobile_number}
              </span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  className="pl-10 py-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter mobile number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  // required
                />
              </div>
              <span className="text-red-500 text-sm mt-1">{error.age}</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Player Role
              </label>
              <div className="relative">
                <select
                  className="w-full py-1 px-1 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  // required
                >
                  {/* <option value="batsman">Batsman</option>
                <option value="bowler">Bowler</option>
                <option value="all-rounder">All-Rounder</option> */}
                  {ROLE_TYPE.map((role) => (
                    <option value={role.value} key={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-red-500 text-sm mt-1">{error.role}</span>
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
              Register Player
            </button>
          </form>
        </div>
      )}

      {/* Players List */}
      {!show && (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Registered Players
            </h2>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    paginatedData?.map((ele) => {
                      const player = ele as {
                        _id: string;
                        name: string;
                        age: number;
                        player_role: string;
                        totalRuns: number;
                        totalWickets: number;
                      };
                      return (
                        <tr
                          className="odd:bg-gray-50 even:bg-white text-left text-xs font-medium  uppercase tracking-wider"
                          key={player._id}
                        >
                          <td
                            className="px-6 py-3 cursor-pointer text-indigo-600 hover:text-indigo-900"
                            // onClick={() => {
                            //   setProfileView(true);
                            //   setPlayerId(player._id);
                            // }}
                          >
                            <a href={`/players/${player._id}`}>{player.name}</a>
                          </td>
                          <td className="px-6 py-3">{player.age}</td>
                          <td className="px-6 py-3">
                            {
                              ROLE_TYPE.find(
                                (role) => role.value === player.player_role
                              )?.label
                            }
                          </td>
                          <td className="px-6 py-3">
                            {player.player_role === "Bowler"
                              ? `${player.totalWickets} wickets`
                              : `${player.totalRuns} runs`}
                          </td>
                        </tr>
                      );
                    })
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

      {/* {profileView && (
        <Profile
          playerId={playerId}
          setProfileView={() => setProfileView(false)}
        />
      )} */}

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
export default Players;
