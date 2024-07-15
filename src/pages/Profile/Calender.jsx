import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Layout from '../../Layout';

const NewsEvent = ({ time, title, image, isLeft }) => {
  return (
    <div className={`flex items-center relative`}>
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8 order-2'}`}>
        <div className="relative inline-block">
          <img src={image} alt={title} className="w-64 h-48 object-cover rounded-lg shadow-md" />
          
        </div>
      </div>
      <div className="w-2/12 flex justify-center order-1">
        <div className="w-[1px] bg-mainYellow h-full absolute top-0 bottom-0"></div>
        <div className="w-4 h-4 bg-mainYellow rounded-full absolute top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className={`absolute top-1/2 ${isLeft ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} w-8 h-[1px] bg-mainYellow`}></div>
        </div>
      </div>
      <div className={`w-5/12 ${isLeft ? 'text-left pl-8 order-2' : 'text-right pr-8'}`}>
        <div className="text-lg font-medium text-mainYellow">{time}</div>
      </div>
    </div>
  );
};

const NewsTimeline = ({ events }) => {
  return (
    <div className="p-4 bg-bgPrimary rounded-lg flex flex-col items-center">
      <div className="relative max-w-[800px] w-full">
        {events.map((event, index) => (
          <NewsEvent
            key={index}
            time={event.time}
            title={event.title}
            image={event.image}
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

const ImageGrid = ({ items }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.map((item) => (
      <div key={item.id} className="relative">
        <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
      </div>
    ))}
  </div>
);

const Publish = ({ date, onBack }) => {
  // 模擬新聞數據
  const newsEvents = [
    {
      time: '07:20',
      title: '國際大事件：全球經濟影響',
      image: 'https://picsum.photos/300/200?random=60'
    },
    {
      time: '09:45',
      title: '科技創新：AI 在醫療領域取得突破',
      image: 'https://picsum.photos/300/200?random=50'
    },
    {
      time: '12:00',
      title: '搭乘大眾運輸面臨突發事件',
      image: 'https://picsum.photos/300/200?random=40'
    },
    {
      time: '15:30',
      title: '環境保護：新政策出台',
      image: 'https://picsum.photos/300/200?random=30'
    }
  ];

  const unpublishedNews = [
    { id: 5, title: '搭乘大眾運輸面對突發事件', image: 'https://picsum.photos/300/200?random=5', time: '14:10', duration: '1:30' },
    { id: 6, title: '接獲大眾運輸突發事件', image: 'https://picsum.photos/300/200?random=6', time: '16:05', duration: '2:00' },
    { id: 7, title: '晚間新聞預告', image: 'https://picsum.photos/300/200?random=7', time: '17:30' },
  ];

  return (
    <Layout>
    <div className="w-full min-h-screen bg-bgPrimary text-white p-6">
      <div className="mb-6">
        <button onClick={onBack} className="text-mainYellow mb-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-mainYellow">{date}</h1>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl text-mainYellow font-semibold mb-4 ">已發布</h2>
        <div className="flex items-center justify-end space-x-2">
          <span>類型</span>
          <select className="bg-gray-600 rounded-lg p-1">
            <option>政治</option>
          </select>
        </div>
        <NewsTimeline events={newsEvents} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">未發布</h2>
        <ImageGrid items={unpublishedNews} />
      </div>
    </div>
    </Layout>
  );
};

export default Publish;