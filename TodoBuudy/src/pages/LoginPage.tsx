import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../assets/logo.png';
import Button from "../components/Button";
import { login } from "../redux/authSlice";
import axios from "axios";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      if (res.data && res.data.data) {
        const { id, email, role } = res.data.data.user;
        const token = res.data.data.accessToken;

        // Dispatch login to Redux
        dispatch(
          login({
            user: { user: id, role },
            token,
          })
        );

        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Logo and Heading */}
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="TaskMaster Logo"
            className="mx-auto mb-2 h-8"
          />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
