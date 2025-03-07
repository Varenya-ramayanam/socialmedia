import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthProvider";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setUser: setAuthUser } = useAuth(); // Get setUser from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required!", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData, {
        withCredentials: true, // Ensure cookies are included
      });

      if (response.status !== 200) {
        throw new Error("Login failed"); // Ensure non-200 responses trigger catch block
      }

      const userData = response.data; // Get user data from response

      // Store the correct user data
      localStorage.setItem("authUser", JSON.stringify(userData));
      localStorage.setItem("user", JSON.stringify(formData.email));
      setAuthUser(userData);

      toast.success("Login successful! Redirecting...", { position: "top-right", autoClose: 3000 });

      setTimeout(() => {
        window.location.href = "/"; // Redirect to home page
      }, 4000);
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
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
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
