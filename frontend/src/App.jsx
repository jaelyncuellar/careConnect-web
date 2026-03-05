// traffic controller of entire app 

import { BrowserRouter as Router, 
      Routes, Route,
 } from "react-router-dom";
import Navbar from "./app/Navbar.jsx";
import Dashboard from "./app/DashboardPage.jsx";
import Login from "./app/LoginPage.jsx";
import TasksPage from "./features/tasks/TasksPage.jsx";
import CarePlans from "./features/carePlans/CarePlansPage.jsx";
import Attendance from "./features/attendance/AttendancePage.jsx";
import Settings from "./app/SettingsPage.jsx";
import RegisterPage from "./app/RegisterPage.jsx"; 
import { useAuth } from "./features/auth/AuthContext.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  const { user } = useAuth(); // checks if someone is logged in 
  console.log("USER CHANGED:", user);
  return (
    <Router>
      {user && <Navbar />} {/* if logged in - show navbar - layered protection */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
          // before showing, check if user allowed 
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
