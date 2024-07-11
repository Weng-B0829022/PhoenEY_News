import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom';
import { Bell, Mail, ChevronDown, Search, Sliders, Menu, X } from 'lucide-react';
import logo from './assets/logo.png';
import headIcon from './assets/趙啟宣.png';
import Explore from './pages/Explore';
import Home from './pages/Home';

const LayoutPage = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { key: 'personal', label: '個人' },
    { key: 'explore', label: '探索' },
    { key: 'home', label: '首頁' },
    { key: 'material', label: '素材' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const LocationAwareComponent = () => {
    const location = useLocation();

    useEffect(() => {
      const path = location.pathname.slice(1) || 'home';
      setActiveTab(path);
    }, [location]);

    return null;
  };

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <LocationAwareComponent />
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-gray-800 relative z-20">
          <div className="flex items-center">
            <button className="mr-2 lg:hidden" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <img src={logo} alt="PhoenEY" className="h-8 mr-2" />
            <span className="text-xl font-bold">PhoenEY</span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail size={20} className="hidden sm:block" />
            <Bell size={20} className="hidden sm:block" />
            <div className="flex items-center">
              <img src={headIcon} alt="趙啟宣" className="h-8 w-8 rounded-full mr-2" />
              <span className="hidden sm:inline">趙啟宣</span>
              <ChevronDown size={16} className="hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <div className={`w-64 bg-gray-800 flex flex-col lg:relative fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30`}>
            <div className="flex justify-between items-center p-4 lg:hidden">
              <button onClick={toggleSidebar}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4 mb-6">
              <img src={headIcon} alt="趙啟宣" className="h-24 w-24 rounded-full mx-auto mb-2" />
              <h2 className="text-center text-xl">趙啟宣</h2>
            </div>
            <nav className="flex-1 flex flex-col justify-between overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={`/${item.key === 'home' ? '' : item.key}`}
                      className={`block py-2 px-4 cursor-pointer transition-colors ${
                        activeTab === item.key
                          ? 'bg-mainYellow text-black'
                          : 'hover:bg-gray-700'
                      }`}
                      onClick={() => {
                        setActiveTab(item.key);
                        setIsSidebarOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 mb-4">
                <li>
                  <Link
                    to="/settings"
                    className={`block py-2 px-4 rounded cursor-pointer transition-colors ${
                      activeTab === 'settings' ? 'bg-mainYellow text-black' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      setActiveTab('settings');
                      setIsSidebarOpen(false);
                    }}
                  >
                    設定
                  </Link>
                </li>
                <li
                  className={`py-2 px-4 cursor-pointer transition-colors hover:bg-gray-700`}
                  onClick={() => {
                    // Handle logout logic here
                    setIsSidebarOpen(false);
                  }}
                >
                  登出
                </li>
              </ul>
            </nav>
          </div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Main area */}
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore/*" element={<Explore />} />
              <Route path="/personal" element={<div>個人頁面內容</div>} />
              <Route path="/material" element={<div>素材頁面內容</div>} />
              <Route path="/settings" element={<div>設定頁面內容</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default LayoutPage;