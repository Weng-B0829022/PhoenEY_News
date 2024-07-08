import React from 'react';
import { ChevronDown } from 'lucide-react';
import loginBackground from '../assets/login-background.webp';
import loginIcon from '../assets/login-icon.png';

export default function NewAccount() {
return (
    <div className="flex h-screen">
    {/* Left side - Image and text */}
    <div className="flex-1 bg-black text-white p-12 flex flex-col justify-between relative overflow-hidden">
        <img 
        style={{backgroundImage: `url(${loginBackground})`}}
        className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="absolute top-6 left-6 flex items-center space-x-4">
            <img
            src={loginIcon}
            alt="PhoenEY Logo"
            className="w-10 h-10" // 使用 Tailwind 類來設置寬度和高度
            />
            <p className="text-xl text-white">PhoenEY</p>
        </div>
        </div>
        <div className="relative z-10 h-full flex flex-col mt-20 text-white text-center">
        
        <h1 className="text-5xl font-bold mb-4">Get all the news</h1>
        <p className="text-xl">By PhoenEY</p>
        </div>
    </div>

    {/* Right side - Login form */}
    <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 flex-col items-center">
        <div className="w-full flex justify-center">
            <img
                src={loginIcon}
                alt="PhoenEY Logo"
                className="w-14 h-14"
            />
            </div>
        <h2 className="text-3xl font-bold text-center text-white">註 冊</h2>
        <form className="mt-8 space-y-6">
            <div>
                <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400" placeholder="請輸入帳號" />
            </div>
            <div>
                <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400" placeholder="請輸入密碼" />
            </div>
            <div>
                <input id="password_confirm" name="password" type="password" required className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400" placeholder="請確認密碼" />
            </div>
        </form>
        <div className="mt-6 flex justify-center space-x-4">
            <button className="flex w-full items-center justify-center h-10 rounded-[8px] bg-mainYellow text-[#818181]">
            註冊
            </button>
        </div>
        </div>
    </div>
    </div>
);
}