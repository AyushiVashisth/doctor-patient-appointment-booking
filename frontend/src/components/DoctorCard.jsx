import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faUserMd,
  faMapMarkerAlt,
  faPhone,
  faClock,
  faCalendarCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <div className="relative h-64 mb-4">
        <img
          src={doctor.profile}
          alt={`${doctor.firstName} ${doctor.lastName}`}
          className="w-full h-full object-cover rounded-lg"
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
          Book Appointment
        </button>
      </div>
      
    </div>
  );
};

export default DoctorCard;
