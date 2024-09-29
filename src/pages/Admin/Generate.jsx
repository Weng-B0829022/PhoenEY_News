import React, { useState, useRef, useEffect, useContext } from 'react';
import { ContentContext } from './components/Context';
import LeftArrowIcon from '../../svg/LeftArrowSvg';
import DownArrowIcon from '../../svg/DownArrowSvg';
import { executeNewsGenVideo } from '../../../features/data/genStory'; // 請確保路徑正確
import {API_BASE_URL, endpoints} from '../../../api/endpoints';


const Generate = () => {
    const { createdContent } = useContext(ContentContext);
    const [storyboardData, setStoryboardData] = useState([]);
    const [storyboardTitle, setStoryboardTitle] = useState('');
    const [selectedDataIndex, setSelectedDataIndex] = useState(0);

    useEffect(() => {
        if (createdContent) {
            const jsonResult = StoryboardProcessor.convertArticlesToJson(createdContent);
            setStoryboardTitle(createdContent.articles[selectedDataIndex].title);
            setStoryboardData(StoryboardProcessor.convertToStoryboardData(jsonResult[selectedDataIndex]).storyboard.slice(1));
        }
    }, [createdContent, selectedDataIndex]);

    const handleSelectionChange = (event) => {
        setSelectedDataIndex(parseInt(event.target.value));
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
            <TimeLine createdContent={createdContent}/>
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

    const handleGenerateVideo = async () => {
        setGeneratingVideo(true);
        setGenerationResult(null);
        setGenerationTime(0);
        try {
            // 準備要發送的數據
            console.log(storyboardData)
            const dataToSend = {
                title: storyboardTitle,
                storyboard: storyboardData.map((scene, index, array) => {
                    return {
                        paragraph: scene.段落,
                        duration: scene.秒數,
                        calculatedDuration: calculateDuration(scene.秒數),
                        imageDescription: scene.畫面描述,
                        voiceover: scene.旁白,
                        characterCount: parseInt(scene.字數.replace(/[^0-9]/g, ''))
                    };
                })
            };

            const result = await executeNewsGenVideo(dataToSend);
            console.log('Video generation response:', result);
            setGenerationResult(result);
        } catch (error) {
            console.error('Error generating video:', error);
            setGenerationResult({ error: 'Failed to generate video' });
        } finally {
            setGeneratingVideo(false);
        }
    };

    const renderGenerationResult = () => {
        if (!generationResult) return null;

        return (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h2 className="text-xl font-bold mb-2">生成結果：</h2>
                <p>{generationResult.message || '視頻生成已完成。'}</p>
                {generationResult.image_urls && (
                    <div className="mt-2">
                        <p>生成的圖片：</p>
                        <div className="flex flex-wrap">
                            {generationResult.image_urls.map((url, index) => (
                                <img key={index} src={url.url} alt={`生成圖片 ${index + 1}`} className="w-32 h-32 object-cover m-1" />
                            ))}
                        </div>
                    </div>
                )}
                {generationResult.video_paths && (
                    <div className="mt-4">
                        <video 
                            controls 
                            className="w-full max-w-2xl mt-2"
                            src={`${API_BASE_URL}${endpoints.getGeneratedVideo}?filename=${generationResult.video_paths}`}
                        >
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
        //暫時用不到
        // processCreatedContent(createdContent) {
        //     if (createdContent) {
        //         const jsonResult = this.convertArticlesToJson(createdContent);
        //         console.log(JSON.stringify(jsonResult, null, 2));
        //         const storyboardData = this.convertToStoryboardData(jsonResult[3]).storyboard;
        //         console.log(JSON.stringify(storyboardData, null, 2));
        //         return storyboardData.slice(1);
        //     }
        //         return [];
        // }
    };
    function calculateDuration(timeString) {
        // 清除字符串中的所有空格
        timeString = timeString.replace(/\s/g, '');
        
        // 分割時間字符串
        const [startTime, endTime] = timeString.split('-->');
        
        // 將時間轉換為毫秒
        function timeToMilliseconds(t) {
            const [time, ms] = t.split(',');
            const [h, m, s] = time.split(':');
            return parseInt(h) * 3600000 + parseInt(m) * 60000 + parseInt(s) * 1000 + parseInt(ms);
        }
        
        // 計算開始和結束時間（毫秒）
        const startMs = timeToMilliseconds(startTime);
        const endMs = timeToMilliseconds(endTime);
        
        // 計算並返回持續時間（毫秒）
        return endMs - startMs;
    }