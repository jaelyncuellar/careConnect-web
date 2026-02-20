// src/App.jsx
import { BrowserRouter as Router, 
      Routes, Route,
      Link, useNavigate, Outlet
 } from "react-router-dom";
import Navbar from "./app/Navbar.jsx";
import Dashboard from "./app/DashboardPage.jsx";
import Login from "./app/LoginPage.jsx";
import TasksPage from "./features/tasks/TasksPage.jsx";
import CarePlans from "./features/carePlans/CarePlansPage.jsx";
import Attendance from "./features/attendance/AttendancePage.jsx";
import Settings from "./app/SettingsPage.jsx"; // create simple placeholder
import RegisterPage from "./app/RegisterPage.jsx"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/care-plans" element={<CarePlans />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
