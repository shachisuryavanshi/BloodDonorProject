import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchDonors from './pages/SearchDonors';
import CreateRequest from './pages/CreateRequest';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchDonors />} />

          {/* Protected Routes (Any logged in user) */}
          <Route path="/create-request" element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          } />

          {/* Donor Routes */}
          <Route path="/donor-dashboard" element={
            <ProtectedRoute role="DONOR">
              <DonorDashboard />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
