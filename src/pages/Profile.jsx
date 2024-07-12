import React, { useState } from 'react';
import Publish from './Profile/Calender';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    image: 'https://picsum.photos/200/100?random=1',
    title: '探索道乳不能盡晶霜影光',
    content:'測試測試測試測試測試測試測試測試測試測試'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/100?random=2',
    title: '晶霜影光探先？記還有。摺羅處',
    content:'測試測試測試測試測試測試測試測試測試測試'
  }
];

const DashboardLayout = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPublish, setShowPublish] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    // 創建日期並添加 8 小時
    const selected = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day, 8, 0, 0));
    setSelectedDate(selected);
    setShowPublish(true);
  };

  const handleBack = () => {
    setShowPublish(false);
    setSelectedDate(null);
  };
  //publish page
  if (showPublish && selectedDate) {
    console.log(selectedDate.toISOString());
    return <Publish date={selectedDate.toISOString().split('T')[0]} onBack={handleBack} />;
  }

  return (
    <div className="w-full h-screen bg-bgPrimary text-white p-4">
      <div className="flex flex-col h-full">
        {/* Upper half */}
        <div className="flex h-1/2 mb-4">
          {/*------------------------------------------------------Left upper: Date picker */}
          <div className="w-2/5 bg-bgSecondary rounded-lg p-4 mr-4">
            <h2 className="text-xl font-bold mb-2 text-mainYellow">新聞行事曆</h2>
            <div className="flex items-center justify-between mb-2">
              <button onClick={prevMonth}><ChevronLeft /></button>
              <span>{currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月</span>
              <button onClick={nextMonth}><ChevronRight /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
                <div key={index} className="font-bold">{day}</div>
              ))}
              {[...Array(firstDayOfMonth)].map((_, index) => (
                <div key={`empty-${index}`} className="p-1"></div>
              ))}
              {[...Array(daysInMonth)].map((_, index) => (
                <div 
                  key={index} 
                  className="p-1 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => handleDateClick(index + 1)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          {/* Right upper: Content */}
          <div className="w-3/5 bg-bgSecondary rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-mainYellow">製作中</h2>
            
          </div>
        </div>
        {/* Lower half */}
        <div className="flex h-1/2">
          {/*------------------------------------------------------Left lower: Content */}
          <div className="w-3/5 bg-bgSecondary rounded-lg p-4 mr-4">
            <h2 className="text-xl font-bold mb-2 text-mainYellow">發布新聞</h2>
            <div className="p-4 rounded-lg">
              <div>
                {newsItems.map(item => (
                  <NewsItem key={item.id} image={item.image} title={item.title} content={item.content}/>
                ))}
              </div>
            </div>
          </div>
          {/* Right lower: Content */}
          <div className="w-2/5 bg-bgSecondary rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2 text-mainYellow">流量 (過去 預測)</h2>
            {/* Add content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsItem = ({ image, title, content }) => (
  <div className="flex items-center rounded-lg overflow-hidden mb-2">
    <img src={image} alt={title} className="w-24 h-16 object-cover" />
    <div className="flex-1 px-4 py-2">
      <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
      <p className="text-xs">{content}</p>
    </div>
    <ChevronRight className="text-gray-400 mr-2" size={20} />
  </div>
);

export default DashboardLayout;