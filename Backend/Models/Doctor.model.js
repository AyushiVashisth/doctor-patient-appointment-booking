const mongoose=require('mongoose');

const DoctorSchema=mongoose.Schema({
    profile:{
      type:String,
      required:true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    clinicLocation: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    workingHours: {
        type: String,
    },
    about: {
        type: String,
    },      
    // Appointments associated with this doctor
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointments',
    }],
})

const DoctorModel=mongoose.model("Doctors",DoctorSchema)

module.exports=DoctorModel