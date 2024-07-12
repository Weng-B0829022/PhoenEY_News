// router.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutPage from './LayoutPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Settings from './pages/Settings';


const AppRouter = () => {
  return (
    <Router>
      <LayoutPage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/*" element={<Explore/>}/>
          <Route path="/personal" element={<Profile />} />
          <Route path="/material" element={<Settings />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </LayoutPage>
    </Router>
  );
};

export default AppRouter;
