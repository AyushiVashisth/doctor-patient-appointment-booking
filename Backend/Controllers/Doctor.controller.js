const { request } = require("express");
const DoctorModel = require("../Models/Doctor.model");
const getRandomDoctorImage = require("../Utils/StaticData");
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
require("dotenv").config()
// Controller function for doctor registration
const register = async (req, res) => {
    try {
        // Check if the email already exists in the database
        const existingDoctor = await DoctorModel.findOne({ email: req.body.email });

        if (existingDoctor) {
            return res.status(400).json({ message: 'Email already exists!', status: false });
        }

        // If the email is not found, proceed with registration logic   

        // Hash the password before saving it
        const saltRounds = 10; // Number of salt rounds (adjust as needed)
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Proceed with registration logic
        const newDoctor = await new DoctorModel({
            ...req.body,
            password: hashedPassword,
            profile: getRandomDoctorImage()
        });
        // console.log(newDoctor)
        // Save the new doctor to the database
        newDoctor.save();

        // Send a success response with the saved doctor data
        res.status(201).json({ newDoctor, message: "registration successfully", status: true });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller function for doctor login
const login = async (req, res) => {
    try {
        // Find the doctor by email
        const doctor = await DoctorModel.findOne({ email: req.body.email });

        // Check if the doctor exists
        if (!doctor) {
            return res.status(400).json({ message: 'Email not found!', status: false });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, doctor.password);

        // Check if the password is correct
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Incorrect password!', status: false });
        }
        var token = jwt.sign({ userId: doctor._id }, `${process.env.secretKey}`);
      
        // If email and password are correct, send a success response
        res.status(200).json({ message: 'Login successfull!',token,userId: doctor._id, status: true });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function for deleting a doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Check if the doctor with the given ID exists
        const doctor = await DoctorModel.findById({ _id: doctorId });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Implement doctor deletion logic here
        // Example: Delete the doctor from the database
        await DoctorModel.findByIdAndDelete({ _id: doctorId });

        // Send a success response
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function for updating a doctor
const updateDoctor = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Check if the doctor with the given ID exists
        const doctor = await DoctorModel.findById({ _id: doctorId });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Implement doctor update logic here
        // Example: Update the doctor's information based on req.body
        const updatedDoctor = await DoctorModel.findByIdAndUpdate({ _id: doctorId }, req.body);

        // Send a success response with the updated doctor data
        res.status(200).json(updatedDoctor);
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const findDoctor=async(req,res)=>{
    try {
        const doctorId = req.params.doctorId;

        // Find the patient by ID
        const doctor = await DoctorModel.findById(doctorId).populate('appointments');

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Send a success response with the patient data
        res.status(200).json({doctor});
        // const doctor=await DoctorModel.find({email:req.body.email}).populate("appointments")
        // res.status(200).json({doctor})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Controller function for getting all doctors
const getAllDoctors = async (req, res) => {
    try {
        // Implement logic to retrieve all doctors' data here
        // Example: Retrieve all doctors from the database
        const doctors = await DoctorModel.find();
        // console.log(doctors)
        // Send a success response with the list of doctors
        res.status(200).json({ doctors: doctors });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function for updating an appointment
const updateAppointment = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const { appointmentId } = req.body;

        // Check if the doctor with the given ID exists
        const doctor = await DoctorModel.findById({ _id: doctorId });

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Implement appointment update logic using $push
        await DoctorModel.findByIdAndUpdate(
            { _id: doctorId },
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
    findDoctor,
    register,
    login,
    deleteDoctor,
    updateDoctor,
    getAllDoctors,
    updateAppointment,
};
