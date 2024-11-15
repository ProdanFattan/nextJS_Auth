"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success ", response);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-3xl text-gray-400">
        {loading ? "Processing" : "Log in"}
      </h1>
      <hr />
      <label htmlFor="email" className="py-2 text-gray-400">
        Email
      </label>
      <input
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="email"
        className="p-2 rounded-lg text-black border mb-4"
      />
      <label htmlFor="password" className="py-2 text-gray-400">
        Password
      </label>
      <input
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="text"
        placeholder="password"
        className="p-2 rounded-lg text-black border mb-4"
      />
      <button
        className="p-2 bg-white rounded-full border mb-4 text-gray-400"
        onClick={onLogin}
      >
        {buttonDisabled ? "Fill The Form" : "Log in"}
      </button>
      <Link href={"/signup"} className="font-bold text-gray-400">
        Visit signup Page
      </Link>
    </div>
  );
}
