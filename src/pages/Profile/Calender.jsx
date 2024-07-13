import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Layout from '../../Layout';

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
  const publishedNews = [
    { id: 1, title: '搭乘大眾運輸面對突發事件', image: 'https://picsum.photos/300/200?random=1', time: '08:30', duration: '1:30' },
    { id: 2, title: '接獲大眾運輸突發事件', image: 'https://picsum.photos/300/200?random=2', time: '11:23', duration: '1:00' },
    { id: 3, title: '國際焦點', image: 'https://picsum.photos/300/200?random=3', time: '12:45' },
    { id: 4, title: '本地新聞', image: 'https://picsum.photos/300/200?random=4', time: '13:15', duration: '2:00' },
  ];

  const unpublishedNews = [
    { id: 5, title: '搭乘大眾運輸面對突發事件', image: 'https://picsum.photos/300/200?random=5', time: '14:10', duration: '1:30' },
    { id: 6, title: '接獲大眾運輸突發事件', image: 'https://picsum.photos/300/200?random=6', time: '16:05', duration: '2:00' },
    { id: 7, title: '晚間新聞預告', image: 'https://picsum.photos/300/200?random=7', time: '17:30' },
  ];

  return (
    <Layout>
    <div className="w-full min-h-screen bg-bg-bgPrimary text-white p-6">
      <div className="mb-6">
        <button onClick={onBack} className="text-mainYellow mb-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-mainYellow">{date}</h1>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">已發布</h2>
        <ImageGrid items={publishedNews} />
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