import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import Create from './Admin/Create';
import Generate from './Admin/Generate';
import Dashboard from './Admin/Dashboard';
import { ContentProvider }from './Admin/components/Context'
import Video from './Admin/components/Video';


const Admin = () => {
  return (
    <ContentProvider>
      <Layout>
        <Routes>
          <Route path="create/:id" element={<Create/>} />
          <Route path="generate/:id" element={<Generate />} />
          <Route path="dashboard/:id" element={<Dashboard />} />
          <Route path="video/:id" element={<Video />} />
        </Routes>
      </Layout>
    </ContentProvider>
  );
};

export default Admin;