const AppointmentModel = require("../Models/Appoinment.model")

// Create a new appointment
const createAppointment = async (req, res) => {
    try {
        // Extract appointment data from req.body
        const {
            patient,
            doctor,
            appointmentDate,
            startTime,
            endTime,
            status,
            disease,
        } = req.body;

        // Create a new appointment instance
        const newAppointment = new AppointmentModel({
            patient,
            doctor,
            appointmentDate,
            startTime,
            endTime,
            status,
            disease,
        });

        // Save the new appointment to the database
        const savedAppointment = await newAppointment.save();

        // Send a success response with the saved appointment data
        res.status(201).json(savedAppointment);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Read a single appointment by ID
const getDoctorAppointmentById = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Find the appointment by ID
        const appointment = await AppointmentModel
            .find({ doctor: doctorId })
            .populate('doctor') // Populate the 'doctor' field with the associated doctor
            .populate('patient')
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
// console.log("Appointment", appointment)
        // Send a success response with the appointment data
        res.status(200).json({ appointment });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPatientAppointmentById = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        // Find the appointment by ID
        const appointment = await AppointmentModel
            .find({ patient: patientId })
            .populate('doctor') // Populate the 'doctor' field with the associated doctor
            .populate('patient')
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Send a success response with the appointment data
        res.status(200).json({ appointment });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function for updating an appointment by ID
const updateAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;

        // Check if the appointment with the given ID exists
        const existingAppointment = await AppointmentModel.findById(appointmentId);

        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Extract updated appointment data from req.body
        const updatedAppointmentData = {
            patient: req.body.patient,
            doctor: req.body.doctor,
            appointmentDate: req.body.appointmentDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            status: req.body.status,
            disease: req.body.disease,
        };

        // Update the appointment using findByIdAndUpdate
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            { _id: appointmentId },
            updatedAppointmentData,
        );

        // Send a success response with the updated appointment data
        res.status(200).json(updatedAppointment);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
    try {
        const appointmentId = req.params.appointmentId;

        // Find the appointment by ID
        const appointment = await AppointmentModel.findById({ _id: appointmentId });

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Delete the appointment from the database
        await AppointmentModel.findByIdAndDelete({ _id: appointmentId });

        // Send a success response
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createAppointment,
    getDoctorAppointmentById,
    updateAppointmentById,
    deleteAppointmentById,
    getPatientAppointmentById
};
