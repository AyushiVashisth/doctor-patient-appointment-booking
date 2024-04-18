import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faSignOutAlt,
  faUserMd
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/Patient/DoctorCard";
import Breadcrumb from "../../components/Breadcrumb";
import Footer from "../../components/Footer";
import { AuthContext } from "../../Context/AuthContext";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://doctor-appointment-hpp0.onrender.com/doctor/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data.doctors) {
          setDoctors(response.data.doctors.reverse());
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
            `https://doctor-appointment-hpp0.onrender.com/appointment/patient/${patientId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
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
  }, [token]);

  const breadcrumbs = [{ title: "Home", link: "/patient-dashboard" }];
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-blue-600 text-white py-4 fixed top-0 w-full z-10 flex justify-between items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">
            <FontAwesomeIcon icon={faUserMd} className="mr-2 text-4xl" />
            Doctor Directory
          </h1>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-full focus:outline-none focus:shadow-outline-red active:bg-red-800 transform hover:scale-105 transition-transform duration-300 ease-in-out mr-4 flex"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 mt-1" />
          <h1>Logout</h1>
        </button>
      </header>

      <div className="container mx-auto max-w-screen-xl p-8 mt-12">
        <div className="mt-18 text-right flex items-center justify-end space-x-2 relative sm:mt-26 md:mt-26">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out "
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
        <Breadcrumb items={breadcrumbs} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PatientDashboard;
