import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient"
  });
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  // console.log("login", login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log("handleInputChange", name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    // console.log("Role change", e.target.value);
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://doctor-appointment-hpp0.onrender.com/${formData.role}/login`,
        formData
      );

      if (response.data.status) {
        toast.success("Login successful!");
        // console.log("UserId: " + response.data.userId, response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        if (formData.role === "patient") {
          history("/patient-dashboard");
          login();
        } else if (formData.role === "doctor") {
          history("/doctor-dashboard");
          login();
        } else if (formData.role === "admin") {
          history("/admin-dashboard");
          login();
        }
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url(https://healthworldnet.com/imagesHealthCloudBusinessofHealthHospitalsClinicshospital_800.jpg)] bg-cover ">
      <div className=" bg-opacity-10 backdrop-blur-xl w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent border-b-4 border-indigo-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent border-b-4 border-indigo-600"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Role
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={formData.role === "patient"}
                  onChange={handleRoleChange}
                  className="mr-2 -mt-2"
                />
                <span className="text-sm text-indigo-700 font-bold -mt-2">
                  Patient
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={formData.role === "doctor"}
                  onChange={handleRoleChange}
                  className="mr-2 -mt-2"
                />
                <span className="text-sm text-indigo-700 font-bold -mt-2">
                  Doctor
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleRoleChange}
                  className="mr-2 -mt-2"
                />
                <span className="text-sm text-indigo-700 font-bold -mt-2">
                  Admin
                </span>
              </label>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? "Please wait, logging in..." : "Login"}{" "}
            </button>
          </div>
          <div className="text-center mt-4">
            New user?
            <Link to="/" className="text-indigo-700 hover:underline">
              Register here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
