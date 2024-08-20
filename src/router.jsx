// router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import Resource from './pages/Resource';
import Dashboard from './pages/Dashboard';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/explore/*" element={<Explore />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/resources/*" element={<Resource/>} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
        </Routes>
      </Router>
    );
  };

export default AppRouter;
