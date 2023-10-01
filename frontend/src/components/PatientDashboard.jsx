import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0); // State to hold total appointments
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/doctor/all");
        if (response.data.doctors) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchTotalAppointments = async () => {
      const patientId = localStorage.getItem("userId");
      try {
        if (patientId) {
          const response = await axios.get(
            `http://localhost:8080/appointment/patient/${patientId}`
          );

          const data = response.data;
          setTotalAppointments(data.appointment.length);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchDoctors();
    fetchTotalAppointments();
  }, []);

  return (
    <>
      <header className="bg-blue-600 text-white py-4 fixed top-0 w-full z-10">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">Doctor Directory</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-screen-xl p-8 mt-12">
        <div className="mt-18 text-right flex items-center justify-end space-x-2 relative">
          {/* Round button with total appointments */}
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/myappointment");
            }}
          >
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
            My Appointment
            {totalAppointments > 0 && (
              <div className="absolute top-0 right-0  text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center -mt-2 -mr-2 p-3 text-sm border-2 z-10 bg-white border-indigo-700">
                {totalAppointments}
              </div>
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
