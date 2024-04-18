import { ToastContainer } from "react-toastify";
import AllRoutes from "./Routes/AllRoutes";


function App() {
  return (
    <div>
      <AllRoutes/>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
