import React, { useState, useEffect, createContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Mail, ChevronDown, Menu, X, Moon, Sun } from 'lucide-react';
import logo from './assets/logo.png';
import headIcon from './assets/趙啟宣.png';

const navItems = [
  { key: 'profile', label: '個人' },
  { key: 'explore', label: '探索' },
  { key: 'home', label: '首頁' },
  { key: 'resources', label: '素材' },
  { key: 'admin/create/id', label: '後台' },
];

const UserContext = createContext();
export const ThemeContext = createContext();

const LayoutPage = ({ children }) => {
  const [activeTab, setActiveTab] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userInfo] = useState({
    name: '趙啟宣',
    avatar: headIcon,
    following: [],
  });

  const navigate = useNavigate();
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  //偵測activeTab要不要換layout顏色
  useEffect(() => {
    if (activeTab.startsWith('admin/')) {
      setIsDarkMode(false);
    } else if (!isDarkMode) {
      setIsDarkMode(true);
    }
  }, [activeTab]);

  const LocationAwareComponent = () => {
    const location = useLocation();

    useEffect(() => {
      setActiveTab(location.pathname.slice(1));
    }, [location]);

    return null;
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-bgPrimary text-white' : 'bg-bgPrimaryLight text-black'}`}>
        <LocationAwareComponent />
        {/* Header */}
        <header className={`flex justify-between items-center p-4 relative z-20 ${isDarkMode ? 'bg-sideBar' : 'bg-sideBarLight'}`}>
          <div className="flex items-center">
            <button className="mr-2 lg:hidden" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <Link to="/explore" className='flex'>
              <img src={logo} alt="PhoenEX" className="h-8 mr-2" />
              <span className="text-xl font-bold">PhoenEX</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Mail size={20} className="hidden sm:block" />
            <Bell size={20} className="hidden sm:block" />
            <div className="flex items-center">
              <img src={userInfo.avatar} alt="趙啟宣" className="h-8 w-8 rounded-full mr-2" />
              <span className="hidden sm:inline">{userInfo.name}</span>
              <ChevronDown size={16} className="hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <div className={`w-64 flex flex-col lg:relative fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 ${isDarkMode ? 'bg-sideBar' : 'bg-sideBarLight'}`}>
            <div className="flex justify-between items-center p-4 lg:hidden">
              <button onClick={toggleSidebar}>
                <X size={24} />
              </button>
            </div>
            <div className="p-4 mb-6">
              <Link to='/settings' onClick={()=>(setIsSidebarOpen(false))}>
                <img src={userInfo.avatar} alt="趙啟宣" className="h-24 w-24 rounded-full mx-auto mb-2" />
                <h2 className="text-center text-xl">{userInfo.name}</h2>
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
                          ? `${isDarkMode ? ' bg-mainYellow text-black' : 'text-white bg-bgSecondary'}`
                          : `${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`
                      }`}
                      onClick={() => {
                        setActiveTab(item.key);
                        setIsSidebarOpen(false);
                        navigate((key) => navigate(`/${key === 'home' ? '' : key}`));
                      }}
                    >
                      <div className='ml-8'>
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
                      activeTab === 'settings' ? 'bg-mainYellow text-black' : `hover:bg-gray-700 ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`
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
                  className={`py-2 px-4 cursor-pointer transition-colors hover:bg-gray-700 ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}
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
          <UserContext.Provider value={userInfo}>
            <main className={`flex-1 p-6 overflow-auto ${isDarkMode ? 'bg-bgPrimary' : 'bg-white'}`}>
              {children}
            </main>
          </UserContext.Provider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default LayoutPage;