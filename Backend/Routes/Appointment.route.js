const express = require("express");
const AppointmentRouter = express.Router();
const {
  createAppointment,
  updateAppointmentById,
  deleteAppointmentById,
  getPatientAppointmentById,
  getDoctorAppointmentById
} = require("../Controllers/Appointment.controller");
const Auth = require("../Middlewares/JWT.authentication");

// Create a new appointment
AppointmentRouter.post("/", createAppointment);

// Get a single appointment by ID
AppointmentRouter.get("/doctor/:doctorId", getDoctorAppointmentById);

AppointmentRouter.get("/patient/:patientId", getPatientAppointmentById);

// Update an appointment by ID
AppointmentRouter.patch("/:appointmentId", Auth, updateAppointmentById);   

// Delete an appointment by ID
AppointmentRouter.delete("/:appointmentId", Auth, deleteAppointmentById);


module.exports = AppointmentRouter;
