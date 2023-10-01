import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: ""
    },
    bloodGroup: "",
    specialty: "",
    clinicLocation: "",
    workingHours: "",
    about: ""
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        role === "doctor"
          ? "http://localhost:8080/doctor/register"
          : "http://localhost:8080/patient/register",
        formData
      );
      console.log("formData", response);
      if (response.data.status) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(
        "An error occurred while registering. Please try again later."
      );
    }
  };

  return (
    <div className="bg-[url(https://healthworldnet.com/imagesHealthCloudBusinessofHealthHospitalsClinicshospital_800.jpg)] bg-cover py-10 ">
      <div className="bg-opacity-10 backdrop-blur-xl container mx-auto max-w-screen-md p-8  rounded-lg shadow-md border">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Registration
        </h2>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="block text-indigo-700 text-sm font-extrabold mb-2">
              Role
            </label>
            <div className="flex items-center -mt-2 text-indigo-600 font-extrabold">
              <label className="mr-4">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === "patient"}
                  onChange={handleRoleChange}
                  className="mr-2 leading-tight text-indigo-600"
                />
                Patient
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={handleRoleChange}
                  className="mr-2 leading-tight text-indigo-600"
                />
                Doctor
              </label>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`mb-4 ${role === "doctor" ? "hidden" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Date of Birth", name: "dateOfBirth", type: "date" },
              {
                label: "Gender",
                name: "gender",
                type: "select",
                options: ["Male", "Female", "Other"]
              },
              { label: "Contact Number", name: "contactNumber", type: "tel" },
              { label: "Street", name: "street", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Postal Code", name: "postalCode", type: "text" },
              {
                label: "Blood Group",
                name: "bloodGroup",
                type: "select",
                options: [
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                  "Other"
                ]
              }
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-indigo-700 text-sm font-extrabold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400"
                  placeholder={`Enter ${field.label}`}
                  required
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Register as Patient
            </button>
          </div>
        </form>
        {/* Doctor form section */}
        <form
          onSubmit={handleSubmit}
          className={`mb-4 ${role === "doctor" ? "" : "hidden"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Specialty", name: "specialty", type: "text" },
              {
                label: "Clinic Location",
                name: "clinicLocation",
                type: "text"
              },
              { label: "Contact Number", name: "contactNumber", type: "tel" },
              { label: "Working Hours", name: "workingHours", type: "text" }
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-indigo-700 text-sm font-extrabold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400"
                  placeholder={`Enter ${field.label}`}
                  required
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-indigo-700 text-sm font-extrabold mb-2">
              About
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400"
              placeholder="Tell us about yourself"
              rows="4"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Register as Doctor
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
