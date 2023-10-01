import { Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard,";
import AdminDashboard from "./components/AdminDashboard";
import MyAppointment from "./components/MyAppointment";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  return (
    <div>
    <div className="">
    <Breadcrumb />
    </div>
    
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

export default App;
