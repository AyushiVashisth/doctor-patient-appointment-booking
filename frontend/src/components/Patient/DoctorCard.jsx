import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faUserMd,
  faMapMarkerAlt,
  faPhone,
  faClock,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import axios from "axios";
import AppointmentForm from "./AppointmentForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorCard = ({ doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAppointmentSubmit = (appointmentData) => {
    const patientId = localStorage.getItem("userId");

    appointmentData.patient = patientId;

    axios
      .post(
        "https://doctor-appointment-hpp0.onrender.com/appointment/",
        appointmentData
      )
      .then((response) => {
        toast.success("Appointment created successfully");
        // updateDoctorAppointments(response.data.doctor, response.data._id);
        // updatePatientAppointments(response.data.patient, response.data._id);
        closeModal();
      })
      .catch((error) => {
        toast.error("Error creating appointment");
        console.error("Error creating appointment:", error);
      });
  };

  // const updateDoctorAppointments = (doctorId, appointmentId) => {
  //   const token = localStorage.getItem("token");
  //   console.log("Updating doctor appointments. Doctor ID:", doctorId, token);

  //   const requestBody = {
  //     appointmentId: appointmentId,
  //     role: "doctor"
  //   };

  //   axios
  //     .patch(
  //       `https://doctor-appointment-hpp0.onrender.com/doctor/appointment/${doctorId}`,
  //       requestBody,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     )
  //     .then((response) => {
  //       toast.success("Doctor's appointments updated successfully");
  //     })
  //     .catch((error) => {
  //       toast.error("Error updating doctor's appointments");
  //       console.error("Error updating doctor's appointments:", error);
  //     });
  // };

  // const updatePatientAppointments = (patientId, appointmentId) => {
  //   const token = localStorage.getItem("token");
  //   console.log("Updating patient appointments. Patient ID:", patientId, token);
  //   const requestBody = {
  //     appointmentId: appointmentId,
  //     role: "doctor"
  //   };
  //   axios
  //     .patch(
  //       `https://doctor-appointment-hpp0.onrender.com/patient/appointment/${patientId}`,
  //       requestBody,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     )
  //     .then((response) => {
  //       toast.success("Patient's appointments updated successfully");
  //     })
  //     .catch((error) => {
  //       toast.error("Error updating patient's appointments");
  //       console.error("Error updating patient's appointments:", error);
  //     });
  // };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <div className="relative h-64 mb-4">
        <img
          src={doctor.profile}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="w-full h-full rounded-lg"
        />
        <div className="absolute bottom-0 left-0 p-2 bg-indigo-700 text-white rounded-tr-lg">
          <FontAwesomeIcon icon={faStethoscope} className="mr-2" />
          {doctor.specialty}
        </div>
      </div>
      <div className="text-indigo-700 font-semibold mb-2">
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className="text-gray-700 text-sm mb-2">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
        {doctor.clinicLocation}
      </div>
      <div className="text-gray-700 text-sm mb-2">
        <FontAwesomeIcon icon={faPhone} className="mr-2" />
        {doctor.contactNumber}
      </div>
      <div className="text-gray-700 text-sm mb-2">
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        Working Hours: {doctor.workingHours}
      </div>
      <div className="text-gray-700 text-sm mb-2">
        <FontAwesomeIcon icon={faUserMd} className="mr-2" />
        {doctor.about}
      </div>
      <div className="text-center">
        <button
          onClick={openModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
          Book Appointment
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Book Appointment"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <AppointmentForm
          doctor={doctor}
          onSubmit={handleAppointmentSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default DoctorCard;
