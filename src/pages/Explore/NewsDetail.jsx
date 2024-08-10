import React, { useState , useRef, useEffect} from 'react';
import { ChevronLeft, ChevronRight, X, Play, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import headIcon from '../../assets/趙啟宣.png';
import LoadingAndImg from '../components/LoadingAndImg';


const NewsDetailPage = () => {
    
return (
    <div className="bg-bgPrimary text-white min-h-screen p-8">
    <div className="">
        {/* 頂部導航 */}
        <div className="flex justify-between items-center mb-4">
        <Link className="text-mainYellow mb-6" to='/explore'>
          <ChevronLeft size={24} />
        </Link>
        <X className="text-mainYellow cursor-pointer" size={24} />
        </div>
        <div className='sm:flex flex-row gap-4'>
            <div className='sm:w-2/3 w-full'>
                <ImageBrowser/>
            </div>
            <div className="sm:w-1/3 w-full">
                <div className="w-full bg-bgPrimary p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Link to='/explore/user/id123' className='flex w-full items-center'>
                            <img src={headIcon} alt="林煜泰" className="w-10 h-10 rounded-full" />
                            <div className="font-bold flex-grow ml-4 text-start alian-center h-full">林煜泰</div>
                        </Link>
                        <button className="btn-secondary">追蹤</button>
                    </div>
                    <h3 className="font-bold mb-2">提示詞</h3>
                    <p className="text-sm text-gray-300">
                    功哪文大愴每炭不溫眼杜太人活反期搭也刀了主沖曡了則室信正灣，乳神頭景法布個；次用次感的。此此則間要爸受的接帕剛三疊場章於宗我大倒不。遮星年接鎮明年約打？葉第一世年住硬子、的了使的添界有有來出佮有成子了...
                    </p>
                    <button className="text-blue-400 text-sm mt-2">更多 ＞</button>
                </div>
                {/* 分類 */}
                <div className="mb-4 mt-4">
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
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-gray-800 h-52 rounded-lg overflow-hidden">
                <LoadingAndImg src={`https://picsum.photos/300/200?random=${item}`} alt={`News ${item}`} className="w-full h-full object-cover" />

            </div>
            ))}
        </div>
        </div>
    </div>
    </div>
);
};

const ImageBrowser = () => {
  const images = [1, 2, 3, 4, 5, 6, 7].map((item) => `https://picsum.photos/300/200?random=${item}`);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const thumbnailContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - thumbnailContainerRef.current.offsetLeft);
    setScrollLeft(thumbnailContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - thumbnailContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    thumbnailContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction) => {
    const container = thumbnailContainerRef.current;
    const scrollAmount = container.offsetWidth / 2;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = thumbnailContainerRef.current;
    if (container) {
      container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }, { passive: false });
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 主要圖片顯示區域 */}
      <div className="relative aspect-video bg-gray-800 mb-4 rounded-lg overflow-hidden w-full">
        <LoadingAndImg src={selectedImage} alt="Main Image" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-blue-500 rounded-full p-4">
            <Play size={32} className="text-white" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
          <h1 className="text-2xl font-bold text-white">搭乘大眾運輸面對突發事件</h1>
        </div>
      </div>

      {/* 縮略圖列表容器 */}
      <div className="relative">
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1 z-10"
        >
          <ChevronRight size={24} />
        </button>
        <div 
          ref={thumbnailContainerRef}
          className="flex space-x-2 mb-4 overflow-x-hidden cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {images.map((image, index) => (
            <LoadingAndImg
              src={image}
              key={index}
              className={`flex-shrink-0 w-24 h-16 bg-gray-700 rounded transition-all duration-200 ${
                selectedImage === image ? 'border-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedImage(image)}
              alt={`Thumbnail ${index + 1}`}
              draggable="false"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;