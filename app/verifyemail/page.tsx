"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyPage() {
  // const router = useRouter(); //using next js function
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerify(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //nextjs use kore eivabe token neoya hoy
    // const { query } = router;
    // const urlToken2 = query.token;
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-3xl text-gray-400">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black mt-10 rounded-lg">
        {token ? `${token}` : "No token"}
      </h2>
      {verify && (
        <div className="text-gray-400">
          <h2>Verified</h2>
          <Link href="/login"></Link>
        </div>
      )}
      {verify && (
        <div>
          <h2 className="text-gray-400">Verified</h2>
          <Link href="/login"></Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-gray-400">Error</h2>
        </div>
      )}
    </div>
  );
}
