//imports

const  express=require('express');
const connection=require("./Config/server");
const DoctorRouter = require('./Routes/Doctor.route');
const PatientRouter = require('./Routes/Patient.route');
const AppointmentRouter = require('./Routes/Appointment.route');
const AdminRouter = require('./Routes/Admin.route');
require("dotenv").config()
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{    
    res.send("Doctors Appoinment Backend")
})
app.use("/doctor",DoctorRouter)
app.use("/patient",PatientRouter)
app.use("/appointment",AppointmentRouter)
app.use("/admin",AdminRouter)
app.listen(process.env.PORT||3001,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log("unable to connect to database")
    }
    console.log("server is running on port 8080")
})
