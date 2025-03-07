import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/signup", formData, {
        withCredentials: true, // Important for cookies
      });

      toast.success("Signup successful! You can now log in.", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({ name: "", email: "", password: "" }); // Reset form
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring bg-black text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring bg-black text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring bg-black text-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-black p-2 rounded-lg hover:bg-gray-300 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
