import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserAuth from './components/auth/UserAuth';
import AdminAuth from './components/auth/AdminAuth';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import SharedWithMe from './components/SharedWithMe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-login" element={<UserAuth />} />
        <Route path="/admin-login" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/shared" element={<SharedWithMe />} />
      </Routes>
    </Router>
  );
}

export default App;