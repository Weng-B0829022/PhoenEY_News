import React, { useState } from 'react';
import { Bell, Mail, ChevronDown, Search, Sliders } from 'lucide-react';
import loginIcon from './assets/login-icon.png';
import headIcon from './assets/趙啟宣.png';
import Explore from './pages/Explore';

const LayoutPage = () => {
  const [activeTab, setActiveTab] = useState('探索');

  const navItems = ['個人', '探索', '首頁', '素材'];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex items-center">
          <img src={loginIcon} alt="PhoenEY" className="h-8 mr-2" />
          <span className="text-xl font-bold">PhoenEY</span>
        </div>
        <div className="flex items-center space-x-4">
          <Mail size={20} />
          <Bell size={20} />
          <div className="flex items-center">
            <img src={headIcon} alt="趙啟宣" className="h-8 w-8 rounded-full mr-2" />
            <span>趙啟宣</span>
            <ChevronDown size={16} />
          </div>
        </div> 
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4">
          <div className="mb-6">
            <img src={headIcon} alt="趙啟宣" className="h-24 w-24 rounded-full mx-auto mb-2" />
            <h2 className="text-center text-xl">趙啟宣</h2> 
          </div>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li 
                  key={item}
                  className={`p-2 rounded cursor-pointer ${
                    activeTab === item 
                      ? 'bg-mainYellow text-black' 
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main area */}
        <main className="flex-1 p-6">
          

          {activeTab === '個人' && (
            <div>個人頁面內容</div>
          )}

          {activeTab === '首頁' && (
            <div>首頁頁面內容</div>
          )}

          {activeTab === '探索' && (
            <Explore/>
          )}

          
          
          {activeTab === '素材' && (
            <div>素材頁面內容</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LayoutPage;