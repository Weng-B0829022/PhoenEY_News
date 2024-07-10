import { Bell, Mail, ChevronDown, Search, Sliders } from 'lucide-react';
import React, { useState } from 'react';
import { X } from 'lucide-react';

const NavItem = ({ label, active, onClose }) => (
  <button 
    className={`flex items-center px-3 py-1 rounded-md ${
      active ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
    }`}
  >
    <span className="mr-2">{label}</span>
    {onClose && (
      <X 
        size={16} 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }} 
        className="cursor-pointer"
      />
    )}
  </button>
);

const NavigationBar = () => {
  const [items, setItems] = useState([
    { id: 1, label: '專題故事', active: true },
    { id: 2, label: '焦點新聞', active: false },
    { id: 3, label: '話題榜', active: false },
    { id: 4, label: '股市', active: false },
    { id: 5, label: '房地產', active: false },
    { id: 6, label: '國際', active: false },
  ]);

  const toggleActive = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, active: true } : { ...item, active: false }
    ));
  };

  const closeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="flex space-x-2 p-4 bg-gray-900 items-center">
      <button className="bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-md text-white font-bold">
        <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 21H13.5V18H6V21ZM21 21H24V18H21V21ZM6 15H13.5V12H6V15ZM21 15H24V6H21V15ZM6 9H13.5V6H6V9ZM3 27C2.175 27 1.469 26.7065 0.882 26.1195C0.294 25.5315 0 24.825 0 24V3C0 2.175 0.294 1.4685 0.882 0.8805C1.469 0.2935 2.175 0 3 0H27C27.825 0 28.5315 0.2935 29.1195 0.8805C29.7065 1.4685 30 2.175 30 3V24C30 24.825 29.7065 25.5315 29.1195 26.1195C28.5315 26.7065 27.825 27 27 27H3ZM3 24H27V3H3V24ZM27 24H3V3H27V24Z" fill="#FBFF2B"/></svg>
      </button>
      {items.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          active={item.active}
          onClose={() => closeItem(item.id)}
          onClick={() => toggleActive(item.id)}
        />
      ))}
    </div>
  );
};

const Explore = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">
                探索
            </h1>
            {/* Search bar */}
            <div className="flex mb-4">
                <div className="relative flex-1">
                <input type="text" placeholder="運動網的時事新聞" className="w-full p-2 pl-10 bg-gray-700 rounded-l" />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
                <button className="bg-gray-600 p-2 rounded-r"><Sliders size={20} /></button>
                <button className="ml-2 bg-mainYellow text-black px-4 py-2 rounded">生成</button>
            </div>

            {/* Tags */}
            <NavigationBar/>

            {/* News grid */}
            <div className="grid grid-cols-3 gap-4">
                {/* Replace with actual news items */}
                {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded">
                    <img src={`https://picsum.photos/300/200?random=${i}`} alt="News thumbnail" className="w-full h-40 object-cover mb-2 rounded" />
                    <h3 className="font-bold mb-1">新聞標題 {i + 1}</h3>
                    <p className="text-sm text-gray-400">新聞摘要...</p>
                </div>
                ))}
            </div>
        </>
    );
}



export default Explore;