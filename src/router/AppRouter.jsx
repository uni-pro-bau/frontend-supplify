import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ReportsDashboard from '../pages/ReportsDashboard.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/reports"
        element={
          <DashboardLayout>
            <ReportsDashboard />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;

