const express = require("express");
const {
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatientById,
  deletePatientById,
  updateAppointment
} = require("../Controllers/Patient.controller");
const Auth = require("../Middlewares/JWT.authentication");
const { PatientAuth } = require("../Middlewares/RoleBased.authentication");
const PatientRouter = express.Router();

// Register a new patient
PatientRouter.post("/register", registerPatient);

// Login a patient
PatientRouter.post("/login", loginPatient);

// Get a patient by ID
PatientRouter.get("/:patientId", Auth, PatientAuth, getPatientById);

// Update a patient by ID
PatientRouter.patch("/:patientId",Auth,PatientAuth, updatePatientById);
// PatientRouter.patch("/:patientId", updatePatientById);


PatientRouter.patch("/appointment/:patientId",Auth,PatientAuth, updateAppointment);

// Delete a patient by ID
PatientRouter.delete("/:patientId", Auth, PatientAuth, deletePatientById);

module.exports = PatientRouter;
