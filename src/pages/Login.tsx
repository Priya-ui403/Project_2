import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import bgImage from "../assets/login-bg.jpeg"; // Make sure to rename your image to login-bg.jpeg

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/app/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8 mx-4">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 text-blue-600 rounded-full p-3">
            <Shield size={28} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">
          Sign in to access your fraud detection dashboard
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@prescriptionfraud.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
