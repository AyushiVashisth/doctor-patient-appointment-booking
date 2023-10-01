const bcrypt = require('bcrypt');
const PatientModel = require("../Models/Patient.model");
const jwt=require("jsonwebtoken")

// Controller function for patient registration
const registerPatient = async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingPatient = await PatientModel.findOne({ email: req.body.email });

        if (existingPatient) {
            return res.status(400).json({ message: 'Email already exists!', status: false });
        }

        // Hash the password before saving it
        const saltRounds = 10; // Number of salt rounds (adjust as needed)
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Proceed with registration logic
        const newPatient =await new PatientModel({...req.body,password:hashedPassword});

        // Save the new patient to the database
        newPatient.save();

        // Send a success response with the saved patient data
        res.status(201).json({newPatient, message: "Registration successfully", status: true });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function for patient login
const loginPatient = async (req, res) => {
    try {
        // Find the patient by email
        const patient = await PatientModel.findOne({ email: req.body.email });

        // Check if the patient exists
        if (!patient) {
            return res.status(400).json({ message: 'Email not found!', status: false });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, patient.password);

        // Check if the password is correct
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password!', status: false });
        }
        var token = jwt.sign({ userId: patient._id }, `${process.env.secretKey}`);
        // userId: patient._id
        console.log("userId1: ", patient._id)
        // If email and password are correct, send a success response
        res.status(200).json({ message: 'Login successful!', status: true, token, userId: patient._id });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function to get a patient by ID
const getPatientById = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        // Find the patient by ID
        const patient = await PatientModel.findById(patientId).populate('appointments')

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Send a success response with the patient data
        res.status(200).json({patient});
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to update a patient by ID
const updatePatientById = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        // Check if the patient with the given ID exists
        const existingPatient = await PatientModel.findById(patientId);

        if (!existingPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Extract updated patient data from req.body
        const updatedPatientData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            bloodGroup: req.body.bloodGroup,
        }

        // Update the patient using findByIdAndUpdate
        const updatedPatient = await PatientModel.findByIdAndUpdate(
            {_id:patientId},
            updatedPatientData,
            { new: true } // Return the updated document
        );

        // Send a success response with the updated patient data
        res.status(200).json(updatedPatient);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function to delete a patient by ID
const deletePatientById = async (req, res) => {
    try {
        const patientId = req.params.patientId;

        // Find the patient by ID
        const patient = await PatientModel.findById(patientId);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Delete the patient from the database
        await PatientModel.findByIdAndDelete({_id:patientId});

        // Send a success response
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//update patient appointments
const updateAppointment = async (req, res) => {
    try {
        const {patientId} = req.params;
        const { appointmentId } = req.body;

        // Check if the doctor with the given ID exists
        const doctor = await PatientModel.findById({ _id: patientId });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Implement appointment update logic using $push
        await PatientModel.findByIdAndUpdate(
            { _id: patientId },
            { $push: { appointments: appointmentId } }
        );

        // Send a success response
        res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    registerPatient,
    loginPatient,
    getPatientById,
    updatePatientById,
    deletePatientById,
    updateAppointment
};
