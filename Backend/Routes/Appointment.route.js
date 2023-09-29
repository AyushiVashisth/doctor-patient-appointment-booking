const express = require('express');
const AppointmentRouter = express.Router();
const {
    createAppointment,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointmentById,
    getPatientAppointmentById,
} = require('../Controllers/Appointment.controller');
const Auth = require('../Middlewares/JWT.authentication');

// Create a new appointment
AppointmentRouter.post('/',Auth, createAppointment);

// Get a single appointment by ID
AppointmentRouter.get('/:appointmentId',Auth, getAppointmentById);


AppointmentRouter.get('/patient/:appointmentId',Auth, getPatientAppointmentById);

// Update an appointment by ID
AppointmentRouter.patch('/:appointmentId',Auth, updateAppointmentById);

// Delete an appointment by ID
AppointmentRouter.delete('/:appointmentId',Auth, deleteAppointmentById);

module.exports = AppointmentRouter;
