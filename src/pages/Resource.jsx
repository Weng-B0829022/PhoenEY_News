import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sliders } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import LoadingAndImg from './components/LoadingAndImg';
import StarIcon from '../svg/StarSvg';
import SearchIcon from '../svg/SearchSvg';
import Layout from '../Layout';

const NavItem = ({ label, active, onClick }) => (
  <button 
    className={`flex items-center px-3 py-1 whitespace-nowrap rounded-md ${
      active ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
    }`}
    onClick={onClick}
  >
    <span className="mr-2">{label}</span>
  </button>
);

const NavigationBar = ({ items, setItems }) => { 
  const toggleActive = (id) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ));  
  };

  return (
    <div className="flex space-x-2 p-4 pb-2 bg-bgPrimary items-center overflow-x-auto custom-scrollbar">
      <button className="bg-bgPrimary w-8 h-8 flex items-center justify-center rounded-md text-white font-bold">
        <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 21H13.5V18H6V21ZM21 21H24V18H21V21ZM6 15H13.5V12H6V15ZM21 15H24V6H21V15ZM6 9H13.5V6H6V9ZM3 27C2.175 27 1.469 26.7065 0.882 26.1195C0.294 25.5315 0 24.825 0 24V3C0 2.175 0.294 1.4685 0.882 0.8805C1.469 0.2935 2.175 0 3 0H27C27.825 0 28.5315 0.2935 29.1195 0.8805C29.7065 1.4685 30 2.175 30 3V24C30 24.825 29.7065 25.5315 29.1195 26.1195C28.5315 26.7065 27.825 27 27 27H3ZM3 24H27V3H3V24ZM27 24H3V3H27V24Z" fill="#FBFF2B"/>
        </svg>
      </button>
      {items.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          active={item.active}
          onClick={() => toggleActive(item.id)}
        />
      ))}
    </div>
  );
};

const ResourceMain = () => {
  const [items, setItems] = useState([
    { id: 1, label: '圖片', active: true, category: 'image', datas: [
      'https://picsum.photos/300/200?random=1',
      'https://picsum.photos/300/200?random=7',
    ] },
    { id: 2, label: '主播', active: true, category: 'host', datas: [
      'https://picsum.photos/300/200?random=99',
    ] },
    { id: 3, label: '影片', active: true, category: 'video', datas: [
      'https://picsum.photos/300/200?random=2',
      'https://picsum.photos/300/200?random=5',
      'https://picsum.photos/300/200?random=1',
    ] },
    { id: 4, label: '文字', active: true, category: 'text', datas: [
      'https://picsum.photos/300/200?random=98',
    ] },
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-mainYellow">
        探索熱門新聞
      </h1>
      {/* Search bar */}
      <div className='flex w-full'>
        <div className="relative flex-1 ">
          <input type="text" placeholder="運動網的時事新聞" className="w-full p-2 pl-10 h-14 bg-gray-700 rounded-lg md:rounded-l-lg md:rounded-r-none" />
          <Search className="h-14 absolute left-3 top-0 text-gray-400" size={20} />
        </div>
        <div className="hidden md:flex gap-2 pr-2 items-center bg-gray-700 rounded-r">
          <button className="h-10 bg-gray-700 p-2 "><Sliders size={20} /></button>
          <button className="h-10 bg-[#FFFEF0] text-[#818181] px-4 py-2 rounded-lg flex "><StarIcon/>優化提示詞</button>
          <button className="h-10 bg-mainYellow text-[#818181] px-4 py-2 rounded-lg flex"><SearchIcon/>生成</button>
        </div>
      </div>

      {/* Tags */} 
      <NavigationBar items={items} setItems={setItems}/>

      {/* News grid */}
      {items.filter(item => item.active).map((item) => (
        <div key={item.id}>
          <h2 className="text-2xl font-bold mb-4">{item.label}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {item.datas.map((data, i) => (
              <NewsItem key={i} index={i} src={data} category={item.category} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

const NewsItem = ({ index, src, category }) => { 
  return (
    <div>
      <Link to={`/resources/${category}/${index + 1}`} className="w-full h-full rounded-lg transition-colors">
        <div className='relative'>
          <LoadingAndImg
            src={src}
            alt="News thumbnail"
            className="rounded-lg w-full h-full"
          />
        </div>
      </Link>
    </div>
  );
};

const Resource = () => {
  return (
      <Layout>
        <Routes>
            <Route index element={<ResourceMain />} />
            <Route path=":category/:id" element={<div>123</div>} />
            {/*還要討論*/}
        </Routes>
      </Layout>
  );
};

export default Resource;