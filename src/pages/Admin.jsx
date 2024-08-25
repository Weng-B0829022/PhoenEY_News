import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import headIcon from '../assets/趙啟宣.png';
import Layout from '../Layout';
import CreateContent from './Admin/Create';
import Generate from './Admin/Generate';
import Dashboard from './Admin/Dashboard';

const Admin = () => {
  return (
    <Layout>
      <Routes>
        <Route path="create/:id" element={<CreateContent />} />
        <Route path="generate/:id" element={<Generate />} />
        <Route path="dashboard/:id" element={<Dashboard />} />

      </Routes>
    </Layout>
  );
};

export default Admin;