import React, { useState, useRef, useEffect, useContext } from 'react';
import { ContentContext } from './components/Context';
import LeftArrowIcon from '../../svg/LeftArrowSvg';
import DownArrowIcon from '../../svg/DownArrowSvg';
import { executeNewsGenImg, executeNewsCompositeVideo } from '../../../features/data/genStory'; // 請確保路徑正確


const tvSchedule = [
    [
        { time: "01:00", screen: "https://picsum.photos/300/200?random=1" },
        { time: "02:00", screen: "https://picsum.photos/300/200?random=2" },
        { time: "03:00", screen: "https://picsum.photos/300/200?random=3" },
        { time: "04:00", screen: "https://picsum.photos/300/200?random=4" },
    ],
    [
        { time: "05:00", screen: "https://picsum.photos/300/200?random=5" },
        { time: "06:00", screen: "https://picsum.photos/300/200?random=6" },
        { time: "07:00", screen: "https://picsum.photos/300/200?random=7" },
        { time: "08:00", screen: "https://picsum.photos/300/200?random=8" },
    ],
    [
        { time: "09:00", screen: "https://picsum.photos/300/200?random=9" },
        { time: "10:00", screen: "https://picsum.photos/300/200?random=10" },
        { time: "11:00", screen: "https://picsum.photos/300/200?random=11" },
        { time: "12:00", screen: "https://picsum.photos/300/200?random=12" },
    ],
    [
        { time: "13:00", screen: "https://picsum.photos/300/200?random=13" },
        { time: "14:00", screen: "https://picsum.photos/300/200?random=14" },
        { time: "15:00", screen: "https://picsum.photos/300/200?random=15" },
        { time: "16:00", screen: "https://picsum.photos/300/200?random=16" },
    ],
    [
        { time: "17:00", screen: "https://picsum.photos/300/200?random=17" },
        { time: "18:00", screen: "https://picsum.photos/300/200?random=18" },
        { time: "19:00", screen: "https://picsum.photos/300/200?random=19" },
        { time: "20:00", screen: "https://picsum.photos/300/200?random20" },
    ],
    [
        { time: "21:00", screen: "https://picsum.photos/300/200?random=21" },
        { time: "22:00", screen: "https://picsum.photos/300/200?random=22" },
        { time: "23:00", screen: "https://picsum.photos/300/200?random=23" },
        { time: "00:00", screen: "https://picsum.photos/300/200?random=24" },
    ],
];

const Generate = () => {
    const { createdContent } = useContext(ContentContext);
    const [storyboardData, setStoryboardData] = useState([]);
    const [storyboardTitle, setStoryboardTitle] = useState('');
    const [selectedDataIndex, setSelectedDataIndex] = useState(0);
    //模擬訊息
    useEffect(() => {
        if (createdContent) {
            const jsonResult = StoryboardProcessor.convertArticlesToJson(createdContent);
            setStoryboardTitle(createdContent.articles[selectedDataIndex].title);
            setStoryboardData(StoryboardProcessor.convertToStoryboardData(jsonResult[selectedDataIndex]).storyboard);
        }
    }, [createdContent, selectedDataIndex]);

    const handleSelectionChange = (event) => {
        setSelectedDataIndex(parseInt(event.target.value));
    };

    const handleGenerateVideo = async (index) => {
        setGeneratingVideo(true);
        setGenerationResult(null);
        try {
            const result = await executeNewsGenImg(index);
            console.log('Video generation response:', result);
            setGenerationResult(result);
            // 可以在這裡處理成功生成的邏輯，例如顯示成功消息或更新UI
        } catch (error) {
            console.error('Error generating video:', error);
            setGenerationResult({ error: 'Failed to generate video' });
            // 可以在這裡處理錯誤，例如顯示錯誤消息
        } finally {
            setGeneratingVideo(false);
        }
    };
    
    return (
        <div className="p-12">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <LeftArrowIcon/>
                    <h1 className="text-3xl font-bold mb-0 ml-4">Express Mode 生成結果</h1>
                </div>
                <p className="mt-2 text-m">播放日 2024-12-17</p>
            </div>
            {/*下拉選單*/}
            <div className="mb-4 mt-4">
                <label htmlFor="storyboardSelect" className="mr-2">選擇分鏡稿：</label>
                <select 
                    id="storyboardSelect" 
                    value={selectedDataIndex} 
                    onChange={handleSelectionChange}
                    className="border rounded p-1"
                >
                    {createdContent && createdContent.articles.map((article, index) => (
                        <option key={index} value={index}>
                            {article.title}
                        </option>
                    ))}
                </select>
            </div>

            {/*時間軸*/}
            <TimeLine createdContent={createdContent}/>
            {/*分鏡稿*/}
            <Storyboard 
                storyboardData={storyboardData}
                storyboardTitle={storyboardTitle}
                selectedIndex={selectedDataIndex}
            />
        </div>
    );
};

const TimeLine = () => {
    const [state, setState] = useState({
        isTimeLineOpen: false,
        timePeriods: [false, false, false, false, false, false]
    });

    const handleTimeLineClick = () => {
        setState(prevState => ({
            ...prevState,
            isTimeLineOpen: !prevState.isTimeLineOpen
        }));
    };

    const handleClickTime = (index) => {
        setState(prevState => {
            const newTimePeriods = [...prevState.timePeriods];
            newTimePeriods[index] = !newTimePeriods[index];
            return {
                ...prevState,
                timePeriods: newTimePeriods
            };
        });
    };

    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current = contentRefs.current.slice(0, TimePeriod.length);
    }, []);

    const TimePeriod = [
        { Period: "深夜 01:00~04:00", click: () => handleClickTime(0), idx: 0 },
        { Period: "清晨 05:00~08:00", click: () => handleClickTime(1), idx: 1 },
        { Period: "上午 09:00~12:00", click: () => handleClickTime(2), idx: 2 },
        { Period: "下午 13:00~16:00", click: () => handleClickTime(3), idx: 3 },
        { Period: "晚間 17:00~20:00", click: () => handleClickTime(4), idx: 4 },
        { Period: "夜間 21:00~00:00", click: () => handleClickTime(5), idx: 5 },
    ]

    return (
        <div>
            <div className={`p-3 sm:p-4 group ${
                        state.isTimeLineOpen
                        ? '' 
                        : 'border-gray-100 text-textLight hover:border-neutral-100 hover:bg-blue-50 hover:text-blue-500'
                    } font-bold border-2 cursor-pointer rounded-md `}
                    onClick={handleTimeLineClick}>
                <h1 className="text-3xl font-bold ml-2 mt-2">時間軸</h1>
                <p className="mt-2 text-m ml-2 mb-2">點擊時段，放入新聞或廣告，即可在下方分鏡稿產出結果並預覽</p>
                {state.isTimeLineOpen && (
                    <div>
                        {TimePeriod.map((item,index) => (
                            <div
                                key={index}
                                className="text-m cursor-pointer bg-white p-6"
                                onClick={item.click}>
                                <div className='flex items-center'>
                                    <p className='text-black mr-2'>{item.Period}</p>
                                    <DownArrowIcon/>
                                </div>
                                {state.timePeriods[item.idx] && (
                                    <table className="h-32 border border-white border-collapse mt-2 ">
                                        <tbody>
                                            <tr>
                                                {tvSchedule[item.idx].map((scheduleItem, index) => (
                                                    <React.Fragment key={index}>
                                                        <td className="text-center text-black w-20 border border-gray bg-blue-100">
                                                            {scheduleItem.time}
                                                        </td>
                                                        <td className="text-center w-48 border border-gray">
                                                            <img
                                                                src={scheduleItem.screen}
                                                                alt={scheduleItem.time}
                                                                className="w-44 h-auto mx-auto p-2"
                                                            />
                                                        </td>
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
const Storyboard = ({ storyboardData, storyboardTitle, selectedIndex }) => {
    const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
    const [generatingVideo, setGeneratingVideo] = useState(false);
    const [generationResult, setGenerationResult] = useState(null);
    const [generationTime, setGenerationTime] = useState(0);
    const [videoGenerationStatus, setVideoGenerationStatus] = useState(null);
    const [videoBlob, setVideoBlob] = useState(null);

    const handleClick = () => {
        setIsStoryboardOpen(prevState => !prevState);
    };

    useEffect(() => {
        let timer;
        if (generatingVideo) {
            timer = setInterval(() => {
                setGenerationTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            setGenerationTime(0);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [generatingVideo]);

    useEffect(() => {
        if (generationResult && generationResult.status === "success") {
            handleVideoGeneration();
        }
    }, [generationResult]);

    useEffect(() => {
        // 當組件卸載時，釋放 Blob URL
        return () => {
            if (videoBlob) {
                URL.revokeObjectURL(videoBlob);
            }
        };
    }, [videoBlob]);

    const handleGenerateVideo = async () => {
        setGeneratingVideo(true);
        setGenerationResult(null);
        setGenerationTime(0);
        setVideoGenerationStatus(null);
        setVideoBlob(null);
        try {
            const result = await executeNewsGenImg(selectedIndex);
            console.log('Image generation response:', result);
            setGenerationResult(result);
        } catch (error) {
            console.error('Error generating images:', error);
            setGenerationResult({ error: 'Failed to generate images' });
        } finally {
            setGeneratingVideo(false);
        }
    };

    const handleVideoGeneration = async () => {
        setVideoGenerationStatus('開始生成影片，請稍等...');
        try {
            // 步驟 1: 調用 API
            console.log('正在調用 executeNewsCompositeVideo...');
            const response = await executeNewsCompositeVideo(selectedIndex);
            console.log('Video generation response:', response);
    
            // 檢查響應是否成功
            if (!response.ok) {
                throw new Error(`API 響應不成功: ${response.status} ${response.statusText}`);
            }
    
            // 步驟 2: 將響應轉換為 Blob
            console.log('正在將響應轉換為 Blob...');
            const blob = await response.blob();
            console.log('Blob 類型:', blob.type);
    
            // 步驟 3: 檢查 Blob 類型
            if (blob.type !== 'video/mp4' && blob.type !== 'application/octet-stream') {
                throw new Error(`未知的文件類型: ${blob.type}`);
            }
    
            // 步驟 4: 創建 Blob URL
            console.log('正在創建 Blob URL...');
            const videoUrl = URL.createObjectURL(blob);
    
            // 步驟 5: 更新狀態
            setVideoBlob(videoUrl);
            setVideoGenerationStatus('影片生成完成');
    
        } catch (error) {
            console.error('影片生成過程中發生錯誤:', error);
            setVideoGenerationStatus(`影片生成失敗: ${error.message}`);
    
            // 額外的錯誤信息記錄
            if (error.response) {
                console.error('錯誤響應數據:', await error.response.text());
            }
        }
    };

    const renderGenerationResult = () => {
        if (!generationResult && !videoBlob) return null;
    
        return (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
                {generationResult && generationResult.status === "success" && (
                    <div>
                        <h2 className="text-xl font-bold mb-2">生成的圖片：</h2>
                        <p>{generationResult.message}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {generationResult.data.map((imageUrl, index) => (
                                <img 
                                    key={index}
                                    src={imageUrl} 
                                    alt={`Generated image ${index + 1}`}
                                    className="w-full h-auto rounded shadow-lg"
                                />
                            ))}
                        </div>
                    </div>
                )}
                
                {videoGenerationStatus && (
                    <p className="mt-4 text-lg font-semibold">{videoGenerationStatus}</p>
                )}
                
                {videoBlob && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">生成的影片：</h3>
                        <video width="640" height="360" controls>
                            <source src={videoBlob} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        );
    };

    const headers = ['段落', '秒數', '畫面', '畫面描述', '旁白', '字數'];

    return (
        <div>
            <div className={`p-3 sm:p-4 group mt-4 ${
                    isStoryboardOpen
                    ? '' 
                    : 'border-gray-100 text-textLight hover:shadow-sm hover:border-neutral-100 hover:bg-blue-50 hover:text-blue-500'
                } font-bold border-2 rounded-md `}
            >
                <div onClick={handleClick} className='cursor-pointer'>
                    <h1 className="text-3xl font-bold ml-2 mt-2">分鏡稿</h1>
                    <p className="mt-2 text-m ml-2 mb-2">為單則影片之分鏡稿，依選擇模式可進行不同程度的調整</p>
                </div>
                {isStoryboardOpen && (
                    <div className="flex justify-between p-2 bg-white">
                        <div className='mr-4 p-2 ml-2'>
                            <div className='border border-gray-300 w-48 mb-4 rounded'>
                                <div className="flex justify-between">
                                    <h1 className="text-lg font-bold p-2">主標題</h1>
                                    {storyboardTitle && 
                                    <p className="text-lg p-2">
                                        {storyboardTitle}
                                    </p>}
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="text-lg font-bold p-2">副標題</h1>
                                    <p className="text-lg p-2">這是副標題</p>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold mb-2">主播</h1>
                                <img className='rounded' src="https://picsum.photos/300/200?random=7" alt="主播"/>
                            </div>
                            <div className="mt-4">
                                <button 
                                    onClick={handleGenerateVideo}
                                    disabled={generatingVideo}
                                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${generatingVideo ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {generatingVideo ? `生成中 (${generationTime}s)` : '生成影片'}
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto pr-2 pb-2">
                            <table className="min-w-full border-collapse mt-2 text-black">
                                <tbody>
                                    {headers.map((header, index) => (
                                    <tr key={header}>
                                        <th className="text-center border px-2 py-2">{header}</th>
                                        {storyboardData.map((scene, sceneIndex) => (
                                        <td key={sceneIndex} className="text-center border px-2 py-2">
                                            {header === '畫面' ? (
                                            <img src={scene.畫面} alt={scene.畫面描述} className="w-44 h-auto mx-auto" />
                                            ) : (
                                            scene[header]
                                            )}
                                        </td>
                                        ))}
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            {renderGenerationResult()}
        </div>
    );
};


export default Generate;

const StoryboardProcessor = {
    convertStoryboardToJson(storyboardText) {
        const cleanedText = "\n\n" + storyboardText.replace(/^(Storyboard:|\*\*Storyboard[^*]*\*\*)/i, '').trim();
        const scenes = cleanedText.split(/\n\d+\n/).filter(Boolean);
        
        return scenes.map((scene, index) => {
            const lines = scene.trim().split('\n');
            const timeCode = lines[0];
            let visualElement = '';
            let voiceoverText = '';
            
            for (let i = 1; i < lines.length; i++) {
            if (lines[i].startsWith('Image:') || lines[i].startsWith('Video:')) {
                visualElement = lines[i];
            } else if (lines[i].startsWith('Voiceover Text:')) {
                voiceoverText = lines[i].split('Voiceover Text:')[1].trim();
            }
            }
            
            return {
            sceneNumber: index + 1,
            timeCode: timeCode,
            visualElements: visualElement ? [{
                type: visualElement.toLowerCase().startsWith('image:') ? 'image' : 'video',
                content: visualElement.split(':')[1].trim()
            }] : [],
            voiceoverText: voiceoverText.replace(/^"|"$/g, '')
            };
        });
        },
    
        convertArticlesToJson(data) {
        const articles = data.articles;
        return articles.map(article => ({
            title: article.title,
            content: article.content,
            storyboard: this.convertStoryboardToJson(article.storyboard)
        }));
        },
    
        convertToStoryboardData(input) {
        if (!input || typeof input !== 'object') {
            console.error('Invalid input: expected an object');
            return null;
        }
    
        const defaultScene = {
            timeCode: '0',
            visualElements: [{ content: 'No description available' }],
            voiceoverText: ''
        };
    
        return {
            title: input.title || 'Untitled',
            content: input.content || '',
            storyboard: Array.isArray(input.storyboard) ? input.storyboard.map((scene, index) => {
                const safeScene = { ...defaultScene, ...scene };
                return {
                    段落: (index).toString().padStart(2, '0'),
                    秒數:  safeScene.timeCode,
                    畫面: `https://picsum.photos/300/200?random=${index + 1}`,
                    畫面描述: safeScene.visualElements[0]?.content || 'No description available',
                    旁白: (safeScene.voiceoverText || '').replace(/^「|」$/g, ''),
                    字數: `${(safeScene.voiceoverText || '').replace(/^「|」$/g, '').length}字`
                };
            }) : []
        };
        },
    
        processCreatedContent(createdContent) {
            if (createdContent) {
                const jsonResult = this.convertArticlesToJson(createdContent);
                console.log(JSON.stringify(jsonResult, null, 2));
                const storyboardData = this.convertToStoryboardData(jsonResult[3]).storyboard;
                console.log(JSON.stringify(storyboardData, null, 2));
                return storyboardData.slice(1);
            }
                return [];
        }
    };