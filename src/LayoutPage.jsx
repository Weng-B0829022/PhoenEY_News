import React, { useState } from 'react';
import { Bell, Mail, ChevronDown, Search, Sliders, Menu, X } from 'lucide-react';
import logo from './assets/logo.png';
import headIcon from './assets/趙啟宣.png';
import Explore from './pages/Explore';
import Home from './pages/Home';

const LayoutPage = () => {
  const [activeTab, setActiveTab] = useState('探索');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = ['個人', '探索', '首頁', '素材'];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
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
                <li
                  key={item}
                  className={`py-2 px-4 cursor-pointer transition-colors ${
                    activeTab === item
                      ? 'bg-mainYellow text-black'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setActiveTab(item);
                    setIsSidebarOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mb-4">
              <li
                className={`py-2 px-4 rounded cursor-pointer transition-colors ${
                  activeTab === '設定' ? 'bg-mainYellow text-black' : 'hover:bg-gray-700'
                }`}
                onClick={() => {
                  setActiveTab('設定');
                  setIsSidebarOpen(false);
                }}
              >
                設定
              </li>
              <li
                className={`py-2 px-4 cursor-pointer transition-colors ${
                  activeTab === '登出' ? 'bg-mainYellow text-black' : 'hover:bg-gray-700'
                }`}
                onClick={() => {
                  setActiveTab('登出');
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
          {activeTab === '個人' && <div>個人頁面內容</div>}
          {activeTab === '首頁' && <Home/>}
          {activeTab === '探索' && <Explore/>}
          {activeTab === '素材' && <div>素材頁面內容</div>}
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;