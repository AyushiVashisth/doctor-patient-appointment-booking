import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faMapMarkerAlt,
  faPhone,
  faClock,
  faStethoscope,
  faInfoCircle,
  faUserPlus,
  faEdit,
  faTimes,
  faSave,
  faUser,
  faCheckCircle,
  faBan,
  faPencilAlt,
  faTrash,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusColors = {
  scheduled: "text-blue-500 ",
  completed: "text-green-500 ",
  canceled: "text-red-500 "
};

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [editedStatus, setEditedStatus] = useState({});
  const token = localStorage.getItem("token");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log("appointments", appointments, token);
  // console.log("appointments", appointments);
  useEffect(() => {
    const doctorId = localStorage.getItem("userId");

    if (doctorId) {
      axios
        .get(
          `https://doctor-appointment-hpp0.onrender.com/appointment/doctor/${doctorId}`,
          {
            role: "docotor",
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          const data = response.data;
          // console.log("response", data.appointment[0].doctor);
          // setDoctor(data.appointment[0].doctor);
          setAppointments(data.appointment);
        })
        .catch((error) => {
          console.error("Error fetching doctor data:", error);
        });
    }
  }, [token]);

  useEffect(() => {
    const doctorId = localStorage.getItem("userId");
    // console.log("doctorId: ", doctorId, token);
    if (doctorId) {
      axios
        .get(
          `https://doctor-appointment-hpp0.onrender.com/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then((response) => {
          const data = response.data;
          // console.log("response", data.doctor);
          setDoctor(data.doctor);
        })
        .catch((error) => {
          console.error("Error fetching doctor data:", error);
        });
    }
  }, [token]);

  const updateDoctorDetail = async (field, value) => {
    // console.log("Doctorid", doctor._id);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // console.log("token userId", token, userId);
    const requestBody = {
      [field]: value,
      role: "doctor"
    };
    try {
      const response = await axios.patch(
        `https://doctor-appointment-hpp0.onrender.com/doctor/${userId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        const updatedDoctor = { ...doctor, [field]: value };
        setDoctor(updatedDoctor);
        setEditingField(null);
        toast.success(`Successfully updated ${field}`);
      } else {
        console.error("Failed to update patient detail");
      }
    } catch (error) {
      console.error("Error updating patient detail:", error);
      toast.error(`Error updating ${field}`);
    }
  };

  const updateEditedStatus = (appointmentId, status) => {
    setEditedStatus((prevState) => ({
      ...prevState,
      [appointmentId]: status
    }));
  };

  const handleStatusChange = (event, appointment) => {
    const newStatus = event.target.value;
    updateEditedStatus(appointment._id, newStatus);
  };

  const saveEditedStatus = async (appointmentId) => {
    const newStatus = editedStatus[appointmentId];
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    // console.log("token userId", token, userId);
    const requestBody = {
      status: newStatus,
      role: "doctor"
    };
    try {
      const response = await axios.patch(
        `https://doctor-appointment-hpp0.onrender.com/appointment/${appointmentId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        );
        setAppointments(updatedAppointments);
        toast.success("Appointment status updated successfully");
      } else {
        console.error("Failed to update appointment status");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Error updating appointment status");
    }
  };

  const deleteAppointment = async (appointmentId) => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    try {
      const response = await axios.delete(
        `https://doctor-appointment-hpp0.onrender.com/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        const updatedAppointments = appointments.filter(
          (appointment) => appointment._id !== appointmentId
        );
        setAppointments(updatedAppointments);
        toast.success("Appointment deleted successfully");
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error deleting appointment");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // console.log("A", appointments.length);
  return (
    <>
      <div className="bg-gray-100 min-h-screen font-sans">
        <ToastContainer position="top-right" autoClose={3000} />{" "}
        <header className="bg-blue-600 text-white py-4 fixed top-0 w-full z-10 flex justify-between items-center">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-semibold">
              <FontAwesomeIcon icon={faUserMd} className="mr-2 text-4xl" />
              Welcome, Dr.{" "}
              {doctor ? `${doctor.firstName} ${doctor.lastName}` : "Loading..."}
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
        <div className="container mx-auto py-8 mt-12 w-[95%]">
          <div className="border border-gray-300 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-1 flex items-center">
                {doctor ? (
                  <div>
                    <h2 className="text-3xl font-semibold mb-2 text-blue-600">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mr-2 text-4xl"
                      />
                      {doctor.firstName} {doctor.lastName}
                    </h2>
                    {/* Edit icon and logic for First Name */}
                    {editingField === "firstName" ? (
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("firstName", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-blue-600 mr-2 text-xl"
                        />
                        <p className="text-lg text-gray-600">First Name:</p>
                        <p className="text-lg ml-2">{doctor.firstName}</p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("firstName");
                            setEditedValue(doctor.firstName);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}
                    {/* Last Name */}
                    {editingField === "lastName" ? (
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("lastName", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-blue-600 mr-2 text-xl"
                        />
                        <p className="text-lg text-gray-600">Last Name:</p>
                        <p className="text-lg ml-2">{doctor.lastName}</p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("lastName");
                            setEditedValue(doctor.lastName);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}
                    {/* Edit icon and logic for Specialty */}
                    {editingField === "specialty" ? (
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("specialty", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        {/* Display the doctor's specialty */}
                        <FontAwesomeIcon
                          icon={faStethoscope}
                          className="text-blue-600 mr-2 w-5 h-5"
                        />
                        <p className="text-lg text-gray-600">Specialty:</p>
                        <p className="text-lg ml-2">{doctor.specialty}</p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("specialty");
                            setEditedValue(doctor.specialty);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}
                    {/* Edit icon and logic for Clinic Location */}
                    {editingField === "clinicLocation" ? (
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("clinicLocation", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-blue-600 mr-2 w-5 h-5"
                        />
                        <p className="text-lg text-gray-600">
                          Clinic Location:
                        </p>
                        <p className="text-lg ml-2">{doctor.clinicLocation}</p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("clinicLocation");
                            setEditedValue(doctor.clinicLocation);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}

                    {/* Edit icon and logic for Contact Number */}
                    {editingField === "contactNumber" ? (
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("contactNumber", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="text-blue-600 mr-2 w-5 h-5"
                        />
                        <p className="text-lg text-gray-600">Contact Number:</p>
                        <p className="text-lg ml-2">{doctor.contactNumber}</p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("contactNumber");
                            setEditedValue(doctor.contactNumber);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}

                    {/* Edit icon and logic for Working Hours */}
                    {editingField === "workingHours" ? (
                      <div className="flex items-center mb-4">
                        <input
                          type="text"
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("workingHours", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-blue-600 mr-2 w-5 h-5"
                        />
                        <p className="text-lg text-gray-600">Working Hours:</p>
                        <p className="text-lg ml-2">
                          {doctor.workingHours} hours per day
                        </p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("workingHours");
                            setEditedValue(doctor.workingHours);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}

                    {/* Edit icon and logic for About */}
                    {editingField === "about" ? (
                      <div className="flex items-center mb-4">
                        <textarea
                          value={editedValue}
                          onChange={(e) => setEditedValue(e.target.value)}
                        />
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() =>
                            updateDoctorDetail("about", editedValue)
                          }
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          className="text-red-600 ml-2"
                          onClick={() => {
                            setEditingField(null);
                            setEditedValue("");
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="text-blue-600 mr-2 w-5 h-5"
                        />
                        <p className="text-lg text-gray-600">About:</p>
                        <p className="text-lg ml-7">{doctor.about}</p>
                        <button
                          className="text-blue-600 ml-2"
                          onClick={() => {
                            setEditingField("about");
                            setEditedValue(doctor.about);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-lg">Loading doctor data...</p>
                )}
              </div>

              <div className="md:col-span-1">
                <div className="w-96 h-96 mx-auto relative rounded-full overflow-hidden">
                  <img
                    src={doctor ? doctor.profile : ""}
                    alt={doctor ? `${doctor.firstName} ${doctor.lastName}` : ""}
                    className="w-96 h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 hover:bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">
                      View Profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 p-6 rounded-lg mt-8">
            <h2 className="text-3xl font-semibold mt-8 text-blue-600">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2 text-4xl" />
              Appointments
            </h2>
            <p className="text-lg text-gray-600">
              Total Appointments: {appointments.length}
            </p>
          </div>

          <hr className="my-6 border-t border-gray-300" />
          <h2 className="text-3xl font-semibold mt-8 text-blue-600">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="mr-2 text-blue-600 text-4xl"
            />
            About Dr. {doctor ? doctor.firstName : "Loading..."}{" "}
            {doctor ? doctor.lastName : "Loading..."}
          </h2>
          {doctor ? (
            <>
              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                Dr. {doctor.firstName} {doctor.lastName} is a highly respected
                and accomplished medical professional in the field of{" "}
                {doctor.specialty}. With an extensive background in{" "}
                {doctor.specialty}, Dr. {doctor.lastName} has garnered a
                reputation for excellence and a commitment to improving the
                health and well-being of patients. Graduating with top honors
                from a renowned medical institution, Dr. {doctor.lastName}{" "}
                brings a wealth of knowledge and skill to every patient
                interaction.
              </p>

              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                The journey of healing and healthcare begins at{" "}
                {doctor.clinicLocation}, where Dr. {doctor.lastName} operates a
                modern and well-equipped medical practice. Patients can trust in
                the expertise and compassionate care provided by Dr.{" "}
                {doctor.lastName} and the dedicated team.
              </p>

              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                Dr. {doctor.lastName} believes in the importance of
                accessibility and is readily available to patients via phone at{" "}
                {doctor.contactNumber}. Whether you need to schedule an
                appointment or seek medical advice, Dr. {doctor.lastName} is
                just a call away.
              </p>

              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                With a commitment to the well-being of the community, Dr.{" "}
                {doctor.lastName}
                dedicates {doctor.workingHours} hours every day to patient care,
                ensuring that no medical concern goes unattended. This
                dedication extends to providing personalized treatment plans,
                tailored to meet the unique needs of each patient.
              </p>

              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                Beyond the clinical setting, Dr. {doctor.lastName} is known for
                involvement in health education and awareness programs,
                demonstrating a passion for improving public health. Patients
                not only receive expert medical care but also benefit from Dr.{" "}
                {doctor.lastName}'s guidance on preventive health measures.
              </p>

              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                Dr. {doctor.lastName} takes pride in fostering a welcoming and
                inclusive environment for patients of all backgrounds, ensuring
                that everyone feels comfortable and respected during
                consultations. Patients consistently commend Dr.{" "}
                {doctor.lastName} for exceptional bedside manner and the ability
                to explain complex medical concepts in an understandable way.
              </p>

              <p className="text-lg border border-gray-300 p-6 rounded-lg mt-4">
                If you're looking for a healthcare provider who combines
                expertise, compassion, and a commitment to excellence, Dr.{" "}
                {doctor.lastName} is the ideal choice. Your health and
                well-being are the top priorities, and Dr. {doctor.lastName} is
                dedicated to guiding you on your path to optimal health.
                Experience the difference of patient-centered care with Dr.{" "}
                {doctor.firstName} {doctor.lastName}. Schedule your appointment
                today and embark on a journey toward a healthier, happier life
                under the care of a trusted medical professional.
              </p>
            </>
          ) : null}

          {appointments.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-3xl font-semibold mb-4 text-blue-600">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="mr-2 text-blue-600 text-4xl"
                />
                Upcoming Appointments
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-gray-800 border-collapse rounded-lg overflow-hidden text-center">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white">
                      <th className="px-6 py-4 text-lg">Patient</th>
                      <th className="px-6 py-4 text-lg">Date</th>
                      <th className="px-6 py-4 text-lg">Time</th>
                      <th className="px-6 py-4 text-lg">Disease</th>
                      <th className="px-6 py-4 text-lg">Status</th>
                      <th className="px-6 py-4 text-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr
                        key={appointment._id}
                        className={`group transition-all hover:bg-blue-200 ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4 text-lg">{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                        <td className="px-6 py-4 text-lg">
                          {appointment.appointmentDate}
                        </td>
                        <td className="px-6 py-4 text-lg">{`${appointment.startTime} - ${appointment.endTime}`}</td>
                        <td className="px-6 py-4 text-lg group-hover:overflow-visible relative">
                          <span className="">{appointment.disease}</span>
                          <div className="hidden absolute bg-white border border-gray-300 p-4 top-10 left-0 w-60 shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-2 transition-all">
                            <p className="text-sm font-normal text-gray-600">
                              {appointment.additionalInfo}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-lg">
                          {editingField === appointment._id ? (
                            <div className="flex items-center">
                              <select
                                value={
                                  editedStatus[appointment._id] ||
                                  appointment.status
                                }
                                onChange={(event) =>
                                  handleStatusChange(event, appointment)
                                }
                                className="mr-2"
                              >
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="canceled">Canceled</option>
                              </select>
                              <button
                                className="text-blue-600"
                                onClick={() => {
                                  saveEditedStatus(appointment._id);
                                  setEditingField(null);
                                }}
                              >
                                <FontAwesomeIcon icon={faSave} />
                              </button>
                            </div>
                          ) : (
                            <div
                              className={`px-4 py-2 text-lg ${
                                statusColors[appointment.status]
                              }`}
                            >
                              {appointment.status}
                              <span className="mr-2 ml-3">
                                {appointment.status === "scheduled" && (
                                  <FontAwesomeIcon icon={faClock} />
                                )}
                                {appointment.status === "completed" && (
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                )}
                                {appointment.status === "canceled" && (
                                  <FontAwesomeIcon icon={faBan} />
                                )}
                              </span>
                              <button
                                className={`${
                                  statusColors[appointment.status]
                                } ml-2 text-sm`}
                                onClick={() => {
                                  setEditingField(appointment._id);
                                  setEditedStatus({
                                    ...editedStatus,
                                    [appointment._id]: appointment.status
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faPencilAlt} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-lg">
                          <button
                            className="text-red-600 ml-2"
                            onClick={() => deleteAppointment(appointment._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DoctorDashboard;
