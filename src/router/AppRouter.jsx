import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from '../pages/Welcome.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ReportsDashboard from '../pages/ReportsDashboard.jsx';
import Products from '../pages/Products.jsx';
import Suppliers from '../pages/Suppliers.jsx';
import TestApi from '../pages/TestApi.jsx';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/reports"
        element={
          <DashboardLayout>
            <ReportsDashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/products"
        element={
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        }
      />
      <Route
        path="/suppliers"
        element={
          <DashboardLayout>
            <Suppliers />
          </DashboardLayout>
        }
      />
      <Route
        path="/test-api"
        element={
          <DashboardLayout>
            <TestApi />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;

