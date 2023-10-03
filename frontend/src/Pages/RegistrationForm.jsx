import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationRules } from "./validationRules";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm(); // Initialize react-hook-form
  const [role, setRole] = useState("patient");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        role === "doctor"
          ? "http://localhost:8080/doctor/register"
          : "http://localhost:8080/patient/register",
        data
      );
      console.log("formData", response.data);
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

  const renderInputField = (field) => (
    <div key={field.name} className="mb-4">
      <label className="block text-indigo-700 text-sm font-bold mb-2">
        {field.label}{" "}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={field.name}
        control={control}
        defaultValue=""
        rules={validationRules[field.type]}
        render={({ field }) => (
          <input
            type={field.type}
            {...field}
            className={`w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400 ${
              errors[field.name] ? "border-red-500" : ""
            }`}
            placeholder={`Enter ${field.label}`}
          />
        )}
      />
      {errors[field.name] && (
        <p className="text-red-500">{errors[field.name].message}</p>
      )}
    </div>
  );

  return (
    <div className="bg-[url(https://healthworldnet.com/imagesHealthCloudBusinessofHealthHospitalsClinicshospital_800.jpg)] bg-cover py-10 ">
      <div className="bg-opacity-10 backdrop-blur-xl container mx-auto max-w-screen-md p-8  rounded-lg shadow-md border">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Registration
        </h2>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              Role
            </label>
            <div className="flex items-center -mt-2 text-indigo-600 font-bold">
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
          onSubmit={handleSubmit(onSubmit)}
          className={`mb-4 ${role === "doctor" ? "" : "hidden"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                required: true
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                required: true
              },
              { label: "Email", name: "email", type: "email", required: true },
              {
                label: "Password",
                name: "password",
                type: "password",
                required: true
              },
              {
                label: "Specialty",
                name: "specialty",
                type: "text",
                required: true
              },
              {
                label: "Clinic Location",
                name: "clinicLocation",
                type: "text",
                required: true
              },
              {
                label: "Contact Number",
                name: "contactNumber",
                type: "tel",
                required: true
              },
              {
                label: "Working Hours",
                name: "workingHours",
                type: "text",
                required: true
              }
            ].map(renderInputField)}
          </div>
          <div className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              About
            </label>
            <Controller
              name="about"
              control={control}
              defaultValue=""
              rules={validationRules.text}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400 ${
                    errors.about ? "border-red-500" : ""
                  }`}
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              )}
            />
            {errors.about && (
              <p className="text-red-500">{errors.about.message}</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Register as Doctor
            </button>
          </div>
          {/* "Already registered?" text with a "Login" link */}
          <div className="text-center mt-4">
            <span className="text-black">Already registered?</span>{" "}
            <Link to="/login" className="text-indigo-700 font-bold">
              Login here.
            </Link>
          </div>
        </form>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`mb-4 ${role === "doctor" ? "hidden" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                required: true
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                required: true
              },
              { label: "Email", name: "email", type: "email", required: true },
              {
                label: "Password",
                name: "password",
                type: "password",
                required: true
              }
            ].map(renderInputField)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-indigo-700 text-sm font-bold mb-2">
                Contact Number<span className="text-red-500">*</span>
              </label>
              <Controller
                name="contactNumber"
                control={control}
                defaultValue=""
                rules={validationRules.tel}
                render={({ field }) => (
                  <input
                    {...field}
                    type="tel"
                    className={`w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400 ${
                      errors.contactNumber ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your contact number"
                  />
                )}
              />
              {errors.contactNumber && (
                <p className="text-red-500">{errors.contactNumber.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-indigo-700 text-sm font-bold mb-2">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue=""
                rules={validationRules.dateOfBirth}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className={`w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400 ${
                      errors.dateOfBirth ? "border-red-500" : ""
                    }`}
                    placeholder="Select your date of birth"
                  />
                )}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500">{errors.dateOfBirth.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-indigo-700 text-sm font-bold mb-2">
                Gender<span className="text-red-500">*</span>
              </label>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={validationRules.gender}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400 ${
                      errors.gender ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    {["male", "female", "other"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-indigo-700 text-sm font-bold mb-2">
                Blood Group<span className="text-red-500">*</span>
              </label>
              <Controller
                name="bloodGroup"
                control={control}
                defaultValue=""
                rules={validationRules.bloodGroup}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full border-b-4 border-indigo-600 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-700 text-gray-700 placeholder-gray-400 ${
                      errors.bloodGroup ? "border-red-500" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select your blood group
                    </option>
                    {[
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                      "other"
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.bloodGroup && (
                <p className="text-red-500">{errors.bloodGroup.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Street", name: "street", type: "text", required: true },
              { label: "City", name: "city", type: "text", required: true },
              { label: "State", name: "state", type: "text", required: true },
              {
                label: "Postal Code",
                name: "postalCode",
                type: "text",
                required: true
              }
            ].map(renderInputField)}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 mt-10 w-full transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Register as Patient
            </button>
          </div>
          {/* "Already registered?" text with a "Login" link */}
          <div className="text-center mt-4">
            <span className="text-black">Already registered?</span>{" "}
            <Link to="/login" className="text-indigo-700 hover:underline">
              Login here.
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
