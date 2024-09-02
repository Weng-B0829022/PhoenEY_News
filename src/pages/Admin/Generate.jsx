import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../Layout';
import LeftArrowIcon from '../../svg/LeftArrowSvg';
import DownArrowIcon from '../../svg/DownArrowSvg';

const Generate = () => {
    return (
        <div className="p-12">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <LeftArrowIcon/>
                    <h1 className="text-3xl font-bold mb-0 ml-4">Express Mode 生成結果</h1>
                </div>
                <p className="mt-2 text-m">播放日 2024-12-17</p>
            </div>
            {/*時間軸*/}
            <TimeLine/>
            {/*分鏡稿*/}
            <Storyboard/>

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

const Storyboard = () => {
    const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
    
    const handleClick = () => {
        setIsStoryboardOpen(prevState => !prevState);
    };

    const storyboardData = [
        {
        段落: "01",
        秒數: "8s",
        畫面: "https://picsum.photos/300/200?random=1",
        畫面描述: "台積電總部及其先進技術",
        旁白: "台積電是全球半導體代工龍頭，以先進製程技術聞名全球",
        字數: "23字"
        },
        {
        段落: "02",
        秒數: "8s",
        畫面: "https://picsum.photos/300/200?random=2",
        畫面描述: "研發團隊與實驗室景象",
        旁白: "研發團隊不斷突破極限，27nm 製程技術應運而生",
        字數: "23字"
        },
        {
        段落: "03",
        秒數: "8s",
        畫面: "https://picsum.photos/300/200?random=3",
        畫面描述: "晶圓廠生產線上的工作場景",
        旁白: "新製程不僅提升效能，更大幅降低功耗",
        字數: "18字"
        },
        {
        段落: "04",
        秒數: "8s",
        畫面: "https://picsum.photos/300/200?random=4",
        畫面描述: "智慧手機和物聯網設備圖片",
        旁白: "27nm製程為AI、5G等應用帶來重大突破",
        字數: "20字"
        },
        {
        段落: "05",
        秒數: "8s",
        畫面: "https://picsum.photos/300/200?random=5",
        畫面描述: "台積電與國際客戶合作的場景",
        旁白: "與全球頂尖客戶緊密合作，共創雙贏",
        字數: "17字"
        },
        {
        段落: "06",
        秒數: "8s",
        畫面: "https://picsum.photos/300/200?random=6",
        畫面描述: "未來科技應用場景",
        旁白: "27nm製程助力創新，為世界帶來更智慧的未來生活",
        字數: "23字"
        }
    ];

    const headers = ['段落', '秒數', '畫面', '畫面描述', '旁白', '字數'];

    return (
        <div>
            <div
                className={`p-3 sm:p-4 group mt-4 ${
                    isStoryboardOpen
                    ? '' 
                    : 'border-gray-100 text-textLight hover:shadow-sm hover:border-neutral-100 hover:bg-blue-50 hover:text-blue-500'
                } font-bold border-2 cursor-pointer rounded-md `}
                onClick={handleClick}>
                <h1 className="text-3xl font-bold ml-2 mt-2">分鏡稿</h1>
                <p className="mt-2 text-m ml-2 mb-2">為單則影片之分鏡稿，依選擇模式可進行不同程度的調整</p>
            
                    {isStoryboardOpen && (
                        <div className="flex justify-between p-2 bg-white">
                            <div className='mr-4 p-2 ml-2'>
                                <div className='border border-gray-300 w-48 mb-4 rounded'>
                                    <div className="flex justify-between">
                                        <h1 className="text-lg font-bold p-2">主標題</h1>
                                        <p className="text-lg p-2">這是主標題</p>
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
                            </div>

                            <div className="overflow-x-auto pr-2 pb-2">
                                <table className="min-w-full border-collapse mt-2 text-black">
                                    <tbody>
                                        {headers.map((header, index) => (
                                        <tr key={header}>
                                            <th className="text-center border px-4 py-2">{header}</th>
                                            {storyboardData.map((scene, sceneIndex) => (
                                            <td key={sceneIndex} className="text-center border px-4 py-2">
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
        </div>    
    );
};

export default Generate;