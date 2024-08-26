import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

// 主要的 CreateContent 組件
const CreateContent = () => {
    const [state, setState] = useState({
        newsTopic: 'international',
        broadcastDate: '',
        newsDuration: '1:15',
        topicKeyword: '',
        isRepeatButtonClicked: false,
        selectedMode: '無分類'
    });
    useEffect(() => {
        console.log(state);
    },[state]);

    const updateState = (key, value) => {
        setState(prevState => ({ ...prevState, [key]: value }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
                {/* 頁面標題和說明 */}
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-textLight">
                        新建內容
                    </h1>
                    <p className="text-xs sm:text-sm lg:text-base text-textLight">
                        除無分鏡模式外，其餘三者模式，將可依選擇的模式進行不同程度的分鏡調整，並含有時間軸功能，方便新聞影片或廣告的排程
                    </p>
                </div>
                
                <NewsDetail
                    newsTopic={state.newsTopic}
                    broadcastDate={state.broadcastDate}
                    newsDuration={state.newsDuration}
                    updateState={updateState}
                />

                {/* 搜尋 */}
                <IntegratedNewsTopicInput
                    topicKeyword={state.topicKeyword}
                    updateState={updateState}
                />

                {/* 輪播元件 */}
                <Repeat
                    isButtonClicked={state.isRepeatButtonClicked}
                    updateState={updateState}
                />

                <div className="border-2 border-neutral-100 bg-bgPrimaryLight p-4 rounded-md mb-6">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ml-2 sm:ml-4 text-textLight">
                        分鏡生成
                    </h1>
                    <p className="text-xs sm:text-sm lg:text-base ml-2 sm:ml-4 mb-4 text-textLight">
                        點選無分鏡模式直接生成單一影片，或點擊其他選項進入生成分鏡及時間軸編輯器
                    </p>
                    <ModeSelector
                        selectedMode={state.selectedMode}
                        updateState={updateState}
                    />
                </div>

                <div className="flex justify-center mt-6 sm:mt-8">
                    <button className="bg-blue-600 text-white p-3 sm:p-4 rounded w-32 sm:w-40 text-sm sm:text-base">
                        看結果
                    </button>
                </div>
            </div>
        </div>
    );
};

const NewsDetail = ({ newsTopic, broadcastDate, newsDuration, updateState }) => {
    const labelClassName = "mr-4 text-base xl:text-lg font-medium whitespace-nowrap min-w-[100px] text-textLight";
    const inputClassName = "border-2 border-neutral-100 p-2 rounded-md text-black w-full xl:w-40 2xl:w-60 h-10 xl:h-12 text-sm xl:text-base";

    return (
        <div className="flex flex-col xl:flex-row justify-between space-y-4 xl:space-y-0 xl:space-x-4 w-full mb-6">
            <div className="flex items-center">
                <label className={labelClassName}>新聞主題</label>
                <select
                    value={newsTopic}
                    onChange={(e) => updateState('newsTopic', e.target.value)}
                    className={inputClassName}>
                    <option value="special">專題故事</option>
                    <option value="sports">運動健身</option>
                    <option value="international">國際新聞</option>
                    <option value="entertainment">娛樂影劇</option>
                    <option value="business">商業金融</option>
                    <option value="ai">AI科技</option>
                    <option value="cross-strait">兩岸議題</option>
                </select>
            </div>

            <div className="flex items-center">
                <label className={labelClassName}>播出日</label>
                <input
                    type="date"
                    value={broadcastDate}
                    onChange={(e) => updateState('broadcastDate', e.target.value)}
                    className={inputClassName}
                />
            </div>

            <div className="flex items-center">
                <label className={labelClassName}>每則新聞時長</label>
                <select
                    value={newsDuration}
                    onChange={(e) => updateState('newsDuration', e.target.value)}
                    className={inputClassName}>
                    <option value="00:30">00:30</option>
                    <option value="00:45">00:45</option>
                    <option value="01:00">01:00</option>
                    <option value="1:15">01:15</option>
                    <option value="01:30">01:30</option>
                    <option value="1:45">01:45</option>
                    <option value="02:00">02:00</option>
                </select>
            </div>
        </div>
    );
};

const IntegratedNewsTopicInput = ({ topicKeyword, updateState }) => {
    return (
        <div className="relative mb-6 rounded-lg">
            <input 
                type="text" 
                value={topicKeyword}
                onChange={(e) => updateState('topicKeyword', e.target.value)}
                placeholder="輸入想要生成新聞主題的關鍵字" 
                className="w-full p-2 pl-10 sm:pl-12 h-10 sm:h-14 bg-bgPrimaryLight rounded-lg text-textLight text-sm sm:text-base border-2 border-gray-100 focus:outline-none focus:ring-0 focus:ring-gray-100  transition duration-150 ease-in-out"
            />
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
    );
};


const Repeat = ({ isButtonClicked, updateState }) => {
    return (
        <div
            className={`p-4 rounded-md mb-6 border-2 hover:border-neutral-100 cursor-pointer group border-blue-400 ${isButtonClicked ? 'border-blue-400 text-blue-500 bg-blue-50' : 'border-gray-700 bg-bgPrimaryLight text-textLight'} hover:bg-blue-50 hover:text-blue-500`}
            onClick={() => updateState('isRepeatButtonClicked', !isButtonClicked)}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ml-2 sm:ml-4">24小時輪播</h1>
            <p className={`text-xs sm:text-sm lg:text-base ml-2 sm:ml-4 group-hover:text-blue-500 ${isButtonClicked ? 'text-blue-500' : 'text-textLight'} `}>
                根據時間軸裡的不同時段，放入新聞或廣告，每則新聞時長固定，並進行24小時不間斷播放新聞
            </p>
        </div>
    );
};

const ModeSelector = ({ selectedMode, updateState }) => {
    const modes = [
        { name: '無分類', description: '直接選出單一影片進行儲存' },
        { name: 'Express Mode', description: '一鍵自動生成，無法進行人工編輯，將由平台生成全部的內容' },
        { name: 'Professional Mode', description: '主題與來源等可手動編輯 + AI編輯生成' },
        { name: 'Editor Mode', description: '所有的生成內容、細節、分鏡、元素都可手動編輯' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modes.map((mode) => (
                <div
                    key={mode.name}
                    onClick={() => updateState('selectedMode', mode.name)}
                    className={`p-3 sm:p-4 group ${
                        selectedMode === mode.name 
                        ? 'bg-blue-50 text-blue-500 border-blue-400' 
                        : 'border-gray-300 text-textLight'
                    } font-bold border-2 hover:border-neutral-100 cursor-pointer rounded-md hover:bg-blue-50 hover:text-blue-500 border-blue-400`}
                >
                    <div className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
                        {mode.name}
                    </div>
                    <div className={`text-xs sm:text-sm ${selectedMode === mode.name ? 'text-blue-500' : 'text-gray-400'} group-hover:text-blue-500`}>
                        {mode.description}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CreateContent;
