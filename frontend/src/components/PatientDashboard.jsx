import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "./DoctorCard"; // Import the DoctorCard component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from the server
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

    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto max-w-screen-xl p-8">
      <h2 className="text-3xl text-center font-semibold text-indigo-700 mb-6">
        Doctor Directory
      </h2>
      <div className="fixed top-18 right-8 flex items-center space-x-2">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out"
          onClick={() => {
            // Handle the "Add Appointment" button click event here
            // You can open a modal or navigate to another page for appointment booking
            // Example: history.push("/book-appointment");
          }}
        >
          <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />
          Add Appointment
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
      
    </div>
  );
};

export default PatientDashboard;
