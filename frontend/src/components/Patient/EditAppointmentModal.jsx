import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditAppointmentModal = ({
  appointment,
  closeModal,
  updateAppointment
}) => {
  const doctorFirstName = appointment.doctor.firstName || "";
  const doctorLastName = appointment.doctor.lastName || "";

  const [editedData, setEditedData] = useState({
    doctorId: appointment.doctor._id,
    doctorFirstName: doctorFirstName,
    doctorLastName: doctorLastName,
    appointmentDate: appointment.appointmentDate,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    disease: appointment.disease,
    status: appointment.status,
    additionalInfo: appointment.additionalInfo
  });
  // console.log("edited appointment", editedData);

  const handleChange = (e) => {
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

        setEditedData({ ...editedData, [name]: editedData[name] });
        return;
      }
    }
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSave = () => {
    updateAppointment(editedData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-10 backdrop-blur-xs">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md bg-opacity-20 backdrop-blur-3xl ">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
          <FontAwesomeIcon icon={faEdit} className="mr-2 text-blue-600" />
          Edit Appointment
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700">
            Doctor
          </label>
          <input
            type="text"
            name="doctorFirstName"
            value={`${editedData.doctorFirstName} ${editedData.doctorLastName}`}
            readOnly 
            className="mt-1 block w-full p-2 rounded-md shadow-sm focus:outline-none focus:border-indigo-700 border-b-4 border-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700">
            Appointment Date
          </label>
          <input
            type="date"
            name="appointmentDate"
            value={editedData.appointmentDate}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-blue-700">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={editedData.startTime}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-blue-700">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={editedData.endTime}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700">
            Disease
          </label>
          <input
            type="text"
            name="disease"
            value={editedData.disease}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700">
            Status
          </label>
          <select
            name="status"
            value={editedData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-700">
            Additional Info
          </label>
          <textarea
            name="additionalInfo"
            value={editedData.additionalInfo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="text-blue-600 hover:underline"
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            Save
          </button>
          <button
            onClick={closeModal}
            className="text-red-600 ml-4 hover:underline"
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
