import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Image from '../../assets/趙啟宣.png';
import LoadingAndImg from '../components/LoadingAndImg';

const User = () => {
  return (
    <div className="bg-bgPrimary text-white min-h-screen p-8">
      <Link className="text-mainYellow mb-6" to='/explore'>
        <ChevronLeft size={24} />
      </Link>
      {/* Header */}
      <div className="flex items-center justify-between bg-bgPrimary text-white p-4">
      <div className="flex items-center space-x-4">
        <LoadingAndImg
          src={Image}
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover"
        />
        <h2 className="text-2xl font-semibold">林煜泰</h2>
      </div>
      <button className="btn-secondary">
        追蹤
      </button>
    </div>

      {/* User bio */}
      <p className="text-sm mb-6">
        功嘆又大雷每池不測規社大人活反期指也量刀：干沖醒了眼黨告正溫、乳神秘實法新揚；次用次話力。此此則問要綠容的格的呢三種場意於我我大謝不。是是平接躍謝多打？要第一世平任或了、的了便的溯非打有水出陳有成下了並問嗎儒告爾告。第電站苦自必不晴元非勒數
      </p>

      {/* News section */}
      <section>
        <h3 className="text-mainYellow text-2xl font-bold mb-4">發布新聞</h3>

        {/* Date filter */}
        <div className="flex justify-end items-center mb-4 gap-4">
          <div className="flex items-center space-x-2">
            <span>類型</span>
            <select className="bg-gray-600 rounded-lg p-1">
              <option>政治</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span>日期</span>
            <input type="date" className="bg-gray-800 rounded-lg p-1" />
            <ChevronRight className="text-yellow-400" />
            <input type="date" className="bg-gray-800 rounded-lg p-1" />
          </div>
        </div>

        {/* News grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* News items */}
          {[...Array(8)].map((_, index) => (
            <div key={index} className="relative">
              <LoadingAndImg src={`https://picsum.photos/300/200?random=${index + 1}`} alt={`News ${index + 1}`} className="w-full h-60 object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default User;