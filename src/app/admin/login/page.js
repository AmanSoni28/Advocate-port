"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [eyeOpen,setEyeOpen] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setPending(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07172E] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <h1 className="text-xl font-bold text-[#07172E]">Admin Login</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sign in to manage the website content.
        </p>

        <label className="mt-6 block text-sm font-medium text-[#07172E]">
          Email or Username
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            autoFocus
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
          />
        </label>

        <label className="relative mt-4 block text-sm font-medium text-[#07172E]">
          Password
          <input
            type={eyeOpen ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
            onClick={() => setEyeOpen(!eyeOpen)}
          >
            {eyeOpen ? <FaEye /> : <FaEyeSlash />}
          </span>
        </label>

        {error && (
          <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-lg bg-[#D4AF37] py-2.5 text-sm font-semibold text-[#07172E] transition-colors hover:bg-[#c89b2f] disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
