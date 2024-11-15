"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success ", response);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-3xl text-gray-400">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <label htmlFor="name" className="py-2 text-gray-400">
        User name
      </label>
      <input
        id="name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        type="text"
        placeholder="username"
        className="p-2 rounded-lg text-black border mb-4"
      />
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
        onClick={onSignup}
      >
        {buttonDisabled ? "Fill The Form" : "Sign up"}
      </button>
      <Link href={"/login"} className="font-bold text-gray-400">
        Visit Login Page
      </Link>
    </div>
  );
}
