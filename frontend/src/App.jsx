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
import { useAuth } from "./features/auth/AuthContext.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const { user } = useAuth(); 
  console.log("USER CHANGED:", user);
  return (
    <Router>
      {user && <Navbar />} {/* protected navbar */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/tasks" 
            element={
              <ProtectedRoute>
              <TasksPage />
              </ProtectedRoute>
            }
          />
          <Route path="/care-plans" 
            element={
              <ProtectedRoute>
                <CarePlans />
              </ProtectedRoute>
            }
          />
          
          <Route path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
