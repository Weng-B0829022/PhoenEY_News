// LayoutPage.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Mail, ChevronDown, Menu, X } from 'lucide-react';
import logo from './assets/logo.png';
import headIcon from './assets/趙啟宣.png';

const LayoutPage = ({ children }) => {
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
    <div className="bg-bgPrimary text-white min-h-screen flex flex-col">
      <LocationAwareComponent />
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-sideBar relative z-20">
        <div className="flex items-center">
          <button className="mr-2 lg:hidden" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Link to="/explore" className='flex'>
            <img src={logo} alt="PhoenEY" className="h-8 mr-2" />
            <span className="text-xl font-bold">PhoenEY</span>
          </Link>
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
        <div className={`w-64 bg-sideBar flex flex-col lg:relative fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30`}>
          <div className="flex justify-between items-center p-4 lg:hidden">
            <button onClick={toggleSidebar}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4 mb-6">
            <Link to='/settings' onClick={()=>(setIsSidebarOpen(false))}>
              <img src={headIcon} alt="趙啟宣" className="h-24 w-24 rounded-full mx-auto mb-2" />
              <h2 className="text-center text-xl">趙啟宣</h2>
            </Link>
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
                    <div className='ml-8 '>
                      {item.label}
                    </div>
                    
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mb-4">
              <li>
                <Link
                  to="/settings"
                  className={`block py-2 px-4 cursor-pointer transition-colors ${
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
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;
