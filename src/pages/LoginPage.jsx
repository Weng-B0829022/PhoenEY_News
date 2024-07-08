import React from 'react';
import { ChevronDown } from 'lucide-react';
import loginBackground from '../assets/login-background.webp';
import loginIcon from '../assets/login-icon.png';

export default function LoginPage() {
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
        <h2 className="text-3xl font-bold text-center text-white">登 入</h2>
        <form className="mt-8 space-y-6">
            <div>
                <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400" placeholder="請輸入帳號" />
            </div>
            <div>
            <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400" placeholder="請輸入密碼" />   
            </div>
            <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
                <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-mainYellow bg-gray-700 border-gray-600" />
                <label htmlFor="remember_me" className="ml-2 block text-gray-300">
                記住我
                </label>
            </div>
            <div>
                <a href="#" className="font-medium text-mainYellow hover:text-clickYellow">
                忘記密碼？
                </a>
            </div>
            </div>
            <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FBFF2B] hover:bg-clickYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                登入
            </button>
            </div>
        </form>
        <div className="mt-6 flex justify-center space-x-4">
            <div className="mt-2 flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-mainYellow font-medium">or</span>
            <div className="mt-2 flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
            <button className="flex w-full items-center justify-center h-14 rounded-[8px] bg-[#2F384E] text-[#B6BFD4]">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.77365 17.75L6.75 10.25H3.75V7.25H6.75V5.375C6.75 2.59145 8.47374 1.25 10.9569 1.25C12.1463 1.25 13.1686 1.33855 13.4665 1.37814V4.28711L11.7443 4.28789C10.3938 4.28789 10.1324 4.9296 10.1324 5.87128V7.25H14.0625L12.5625 10.25H10.1324V17.75H6.77365Z" fill="#1D61FF"/></svg>
            以Facebook繼續
            </button>
            <button className="flex w-full items-center justify-center h-14 rounded-[8px] bg-[#2F384E] text-[#B6BFD4]">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_156_79)"><path d="M14.0439 10.5825H9.99141V8.8H16.9649C16.9935 9.0946 17.0089 9.39446 17.0089 9.7025C17.0089 12.1203 16.1938 14.1251 14.8157 15.5175H13.0439V14.4713C13.9662 13.7324 14.5976 12.7169 14.829 11.5363L15.0159 10.5825H14.0439Z" fill="#4285F4" stroke="#6B7280" stroke-width="1.6"/><path d="M9.19119 18.5C11.6212 18.5 13.6537 17.69 15.1387 16.3175L12.2437 14.0675C11.4337 14.6075 10.4062 14.9375 9.19119 14.9375C6.84369 14.9375 4.85619 13.355 4.14369 11.2175H1.15869V13.535C2.63619 16.475 5.67369 18.5 9.19119 18.5Z" fill="#34A853"/><path d="M4.14391 11.2176C3.95641 10.6776 3.85891 10.1001 3.85891 9.50009C3.85891 8.90009 3.96391 8.32259 4.14391 7.78259V5.46509H1.15891C0.543905 6.68009 0.191406 8.04509 0.191406 9.50009C0.191406 10.9551 0.543905 12.3201 1.15891 13.5351L4.14391 11.2176Z" fill="#FBBC05"/><path d="M9.19119 4.0625C10.5187 4.0625 11.7037 4.52 12.6412 5.4125L15.2062 2.8475C13.6537 1.3925 11.6212 0.5 9.19119 0.5C5.67369 0.5 2.63619 2.525 1.15869 5.465L4.14369 7.7825C4.85619 5.645 6.84369 4.0625 9.19119 4.0625Z" fill="#EA4335"/></g><defs><clipPath id="clip0_156_79"><rect width="18" height="18" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg>
            以Google繼續
            </button>
        </div>
        <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">還沒有帳號嗎？</span>
            <a href="#" className="ml-1 font-medium text-mainYellow hover:text-clickYellow"> 
            創建新帳號
            </a>
        </div>
        <div className="mt-4 text-center">
            <button className="text-gray-400 flex items-center justify-center mx-auto text-sm">
            繁體中文 <ChevronDown className="ml-1" size={16} />
            </button>
        </div>
        </div>
    </div>
    </div>
);
}