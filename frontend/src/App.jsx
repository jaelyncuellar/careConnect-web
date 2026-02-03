// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";

import Dashboard from "./pages/DashboardPage.jsx";
import Login from "./pages/LoginPage.jsx";
import TasksPage from "./features/tasks/TasksPage.jsx";
import CarePlans from "./features/carePlans/CarePlansPage.jsx";
import Attendance from "./pages/AttendancePage.jsx";
import Settings from "./pages/SettingsPage.jsx"; // create simple placeholder

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/care-plans" element={<CarePlans />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
