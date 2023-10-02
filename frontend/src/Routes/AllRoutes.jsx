import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../Pages/RegistrationForm";
import Login from "../Pages/Login";
import PatientDashboard from "../Pages/Patient/PatientDashboard";
import DoctorDashboard from "../Pages/Doctor/DoctorDashboard,";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import MyAppointment from "../Pages/Patient/MyAppointment";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/myappointment" element={<MyAppointment />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
