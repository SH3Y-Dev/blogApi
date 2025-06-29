"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;

    if (!firstname || !lastname) {
      toast.error("First and last name required");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
        
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.token) {
    toast.error(data.message || "Registration failed");
    return;
  }

  Cookies.set("token", data.token);
  localStorage.setItem("userEmail", data.data.user.email);
  window.dispatchEvent(new Event("user-logged-in"));
  toast.success("Signup successful");
  router.push("/dashboard");
} catch (err) {
  toast.error("Something went wrong");
}

  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center flex-col items-center">
        <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-white-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First name"
                required
                className="w-1/2 rounded-md border px-3 py-2 text-sm text-gray-900"
              />
              <input
                type="text"
                placeholder="Last name"
                required
                className="w-1/2 rounded-md border px-3 py-2 text-sm text-gray-900"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                className="w-full rounded-md border px-3 py-2 text-sm text-gray-900"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full rounded-md border px-3 py-2 text-sm text-gray-900"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm password"
                required
                className="w-full rounded-md border px-3 py-2 text-sm text-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black border border-black"
            >
              Sign up
            </button>

            <p className="text-red-600 text-center text-[16px] my-4">
              {error && error}
            </p>

            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
