const express = require("express");
const {
  register,
  login,
  deleteDoctor,
  updateDoctor,
  getAllDoctors,
  updateAppointment,
  findDoctor
} = require("../Controllers/Doctor.Controller");
const DoctorRouter = express.Router();
const Auth = require("../Middlewares/JWT.authentication");
const { DoctorAuth } = require("../Middlewares/RoleBased.authentication");

// Doctor Registration
DoctorRouter.post("/register", register);

// Doctor Login
DoctorRouter.post("/login", login);

// Doctor Deletion
DoctorRouter.delete("/:doctorId", Auth, DoctorAuth, deleteDoctor);

// Doctor Update
// DoctorRouter.patch("/:doctorId", Auth, DoctorAuth, updateDoctor);
DoctorRouter.patch("/:doctorId",Auth,DoctorAuth, updateDoctor);

// All Doctors Data
DoctorRouter.get("/all",Auth, getAllDoctors);
//find Doctor by id
DoctorRouter.get("/", Auth, DoctorAuth, findDoctor);
//only do changes in appoinment
DoctorRouter.patch("/appoinment/:doctorId", Auth, DoctorAuth, updateAppointment);

module.exports = DoctorRouter;
