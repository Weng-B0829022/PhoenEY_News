import React from 'react';
import { ChevronLeft } from 'lucide-react';
import headIcon from '../assets/趙啟宣.png';
const UserProfileEdit = () => {
  return (
    <div className="min-h-screen bg-bgPrimary text-white p-6">
      <div className="max-w-lg mx-auto">
        <Link className="text-mainYellow mb-6" to='/'>
          <ChevronLeft size={24} />
        </Link>
        
        <div className="flex justify-center mb-6">
          <img 
            src={headIcon}
            alt="User Avatar" 
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">姓名</label>
            <input 
              type="text" 
              className="w-full bg-bgSecondary rounded p-2 text-white"
              placeholder="請輸入姓名"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input 
              type="email" 
              className="w-full bg-bgSecondary rounded p-2 text-white"
              placeholder="請輸入E-mail"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">個人網站</label>
            <input 
              type="url" 
              className="w-full bg-bgSecondary rounded p-2 text-white"
              placeholder="請輸入個人網站"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">簡介</label>
            <textarea 
              className="w-full bg-bgSecondary rounded p-2 text-white h-32"
              placeholder="請輸入簡介"
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 bg-bgSecondary rounded">
              刪除帳號
            </button>
            <button type="submit" className="px-4 py-2 bg-mainYellow text-black rounded">
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileEdit;