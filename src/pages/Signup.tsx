import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/login-bg.jpeg"; // Make sure this matches your renamed image

function Signup() {
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        setError(data.detail || "Signup failed");
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8 mx-4">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mb-2">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0 .768-.292 1.535-.879 2.121a3 3 0 01-4.242 0 3 3 0 010-4.242A3 3 0 0112 11zm0 0V7m0 4v4m6 5H6a2 2 0 01-2-2V6a2 2 0 012-2h4.5a2 2 0 011.42.59l5.5 5.5A2 2 0 0118 11.5V18a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>
          <p className="text-gray-600 text-sm text-center">
            Join the fight against prescription fraud
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
