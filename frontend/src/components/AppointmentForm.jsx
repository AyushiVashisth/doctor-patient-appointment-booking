import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faExclamationCircle,
  faSave,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = ({ doctor, onSubmit, onCancel }) => {
  const [appointmentData, setAppointmentData] = useState({
    patient: "",
    doctor: doctor._id,
    appointmentDate: "",
    startTime: "",
    endTime: "",
    status: "scheduled",
    disease: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "appointmentDate" ||
      name === "startTime" ||
      name === "endTime"
    ) {
      const selectedDate = new Date(value);

      if (selectedDate < new Date()) {
        toast.error(`${name} cannot be set to a past date or time.`, {
          position: "top-right",
          autoClose: 3000
        });

        setAppointmentData({
          ...appointmentData,
          [name]: appointmentData[name]
        });
        return;
      }
    }
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(appointmentData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-10 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md bg-opacity-20 backdrop-blur-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-indigo-600">
            Book Appointment
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-indigo-600 hover:text-indigo-400 focus:outline-none"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-indigo-600 text-bold text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-2 text-indigo-600"
              />
              Appointment Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={appointmentData.appointmentDate}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-600 text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faClock}
                className="mr-2 text-indigo-600"
              />
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={appointmentData.startTime}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-600 text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faClock}
                className="mr-2 text-indigo-600"
              />
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={appointmentData.endTime}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-indigo-600 text-sm font-bold mb-2">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="mr-2 text-indigo-600"
              />
              Disease
            </label>
            <input
              type="text"
              name="disease"
              value={appointmentData.disease}
              onChange={handleInputChange}
              className="w-full border-2 border-indigo-600 rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-700"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
