import React, {useState} from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import loginBackground from '../assets/login-background.webp';
import logo from '../assets/logo.png';
import GoogleSvg from '../svg/GoogleSvg';
import FacebookSvg from '../svg/FacebookSvg';
import OAuthLogin from './login/OAuth';
import { config } from '../../config.js';

const clientId = config.googleClientId;

export default function LoginPage() {
    const [register, setRegister] = useState(false);


    return (
        <div className="flex h-screen">
            {/* Left side - Image and text */}
            <div className="hidden md:flex-1 bg-black text-white p-12 flex flex-col justify-between relative overflow-hidden md:block">
                <img 
                style={{backgroundImage: `url(${loginBackground})`}}
                className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50">
                    <div className="absolute top-6 left-6 flex items-center space-x-4">
                        <img
                        src={logo}
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
            {register ? 
            <div className="flex-1 flex items-center justify-center bg-bgPrimary">
                <div className="w-full max-w-md p-4 space-y-8 flex-col items-center">
                    <a href='#' onClick={()=>(setRegister(false))} className='inline-block'>
                        <ChevronLeft size={24} className='text-mainYellow'/>
                    </a>    
                    <div className="w-full flex justify-center">
                        <img
                            src={logo}
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
                    <button className="flex w-full items-center justify-center h-10 rounded-[8px] bg-mainYellow text-black">
                    註冊
                    </button>
                </div>
                </div>
            </div> :
            <div className="flex-1 flex items-center justify-center bg-bgPrimary"> {/* Right side - Regist form */}
                <div className="w-full max-w-md pr-8 pl-8 space-y-4 flex-col items-center">
                    <div className="w-full flex justify-center">
                        <img
                            src={logo}
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
                    <button onClick={()=>(window.location.href = '/explore')} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FBFF2B] hover:bg-clickYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        登入
                    </button>
                    </div>
                </form>
                <div className="mt-4 flex justify-center space-x-4">
                    <div className="mt-2 flex-grow h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-mainYellow font-medium">or</span>
                    <div className="mt-2 flex-grow h-px bg-gray-300"></div>
                </div>
                <div className="mt-4 flex-row items-center justify-center space-x-4 space-y-4">
                    <button className="flex w-full items-center justify-center h-14 rounded-[8px] bg-[#2F384E] text-[#B6BFD4]">
                        <FacebookSvg/>
                        以Facebook繼續
                    </button>
                    <OAuthLogin 
                        clientId={clientId}
                        redirectUri="/explore"
                    />
                </div>
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-400">還沒有帳號嗎？</span>
                    <a href='#' onClick={()=>(setRegister(true))}className="ml-1 font-medium text-mainYellow hover:text-clickYellow"> 
                    創建新帳號
                    </a>
                </div>
                <div className="mt-4 text-center">
                    <button className="text-gray-400 flex items-center justify-center mx-auto text-sm">
                    繁體中文 <ChevronDown className="ml-1" size={16} />
                    </button>
                </div>
                </div>
            </div>}
        </div>
    );
}