import React from 'react';
import { ChevronLeft, X, Play, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import headIcon from '../../assets/趙啟宣.png';
const NewsDetailPage = () => {
return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
    <div className="max-w-6xl mx-auto">
        {/* 頂部導航 */}
        <div className="flex justify-between items-center mb-4">
        <Link to='/explore'>
            <ChevronLeft className="text-mainYellow cursor-pointer" size={24} />
        </Link>
        <X className="text-mainYellow cursor-pointer" size={24} />
        </div>
        <div className='flex gap-4'>
            <div className='w-2/3'>
                {/* 視頻播放器 */}
                <div className="relative aspect-video bg-gray-800 mb-4 rounded-lg overflow-hidden w-full">
                    <img src="https://picsum.photos/300/200?random=1" alt="Video Thumbnail" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-blue-500 rounded-full p-4">
                        <Play size={32} className="text-white" />
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                        <h1 className="text-2xl font-bold">搭乘大眾運輸面對突發事件</h1>
                    </div>
                </div>
                {/* 縮略圖列表 */}
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                {[1, 2, 3, 4].map((item) => (
                    <img src={`https://picsum.photos/300/200?random=${item}`} key={item} className="flex-shrink-0 w-24 h-16 bg-gray-700 rounded"></img>
                ))}
                </div>
            </div>
            <div className="w-1/3">
                <div className="w-full bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <img src={headIcon} alt="林煜泰" className="w-10 h-10 rounded-full" />
                        <span className="font-bold">林煜泰</span>
                        <button className="bg-mainYellow text-black px-2 py-1 rounded text-sm">追蹤</button>
                    </div>
                    <h3 className="font-bold mb-2">提示詞</h3>
                    <p className="text-sm text-gray-300">
                    功哪文大愴每炭不溫眼杜太人活反期搭也刀了主沖曡了則室信正灣，乳神頭景法布個；次用次感的。此此則間要爸受的接帕剛三疊場章於宗我大倒不。遮星年接鎮明年約打？葉第一世年住硬子、的了使的添界有有來出佮有成子了...
                    </p>
                    <button className="text-blue-400 text-sm mt-2">更多 ＞</button>
                </div>
                {/* 分類 */}
                <div className="mb-4">
                    <h3 className="font-bold mb-2">分類</h3>
                    <div className="flex space-x-2">
                    {['AI科技', '最新時事'].map((item) => (
                        <span key={item} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                            {item}
                        </span>
                    ))}
                </div>
                </div>
            </div>
        </div>
        {/* 新聞內容和提示詞區域 */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="lg:w-2/3">
            <h2 className="text-xl font-bold mb-4">新聞標題</h2>
            <p className="text-gray-300 mb-4">
            功哪文大愴每炭不溫眼杜太人活反期搭也刀了主沖曡了則室信正灣，乳神頭景法布個；次用次感的。此此則間要爸受的接帕剛三疊場章於宗我大倒不。遮星年接鎮明年約打？葉第一世年住硬子、的了使的添界有有來出佮有成子了起副有成對不了雙個情會塊倒片。滿電這下了塑個哇保密舞的有，青電屋塔弟必不一不要太毛雖的林四些睡摸邊佌。...
            </p>
        </div>
        
        </div>

        

        {/* 相關新聞 */}
        <div>
        <h3 className="font-bold text-xl mb-4">相關新聞</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-gray-800 rounded-lg overflow-hidden">
                <img src={`https://picsum.photos/300/200?random=${item}`} alt={`News ${item}`} className="w-full h-32 object-cover" />
                <div className="p-2">
                <h4 className="font-bold text-sm mb-1">相關新聞標題</h4>
                <p className="text-xs text-gray-400">簡短的新聞描述...</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
    </div>
);
};

export default NewsDetailPage;