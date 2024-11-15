"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/about");
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-3xl text-gray-400">Profile Page</h1>
      <h2 className="font-bold text-lg pt-8 text-gray-400">
        {data === "nothing" ? (
          "No data for display"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        className="border text-white rounded-full p-2 mt-3 bg-blue-600"
        onClick={logOut}
      >
        Logout
      </button>
      <button
        className="border text-white rounded-full p-2 mt-3 bg-green-600"
        onClick={getUserDetails}
      >
        Get Data
      </button>
    </div>
  );
}
