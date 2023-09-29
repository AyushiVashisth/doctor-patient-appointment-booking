import { Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard,';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<RegistrationForm/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='patient-dashboard' element={<PatientDashboard/>}/>
      <Route path='doctor-dashboard' element={<DoctorDashboard/>}/>
      <Route path="admin-dashboard" element={<AdminDashboard/>}/>
    </Routes>
    </div>
  );
}

export default App;
