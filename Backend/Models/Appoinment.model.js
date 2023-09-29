// models/appointment.js

const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String, 
        required: true,
    },
    endTime: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'canceled'],
        default: 'scheduled',
    },
    disease: {
        type: String,
        required:true
    },   
});

const AppointmentModel = mongoose.model('Appointments', appointmentSchema);

module.exports = AppointmentModel;
