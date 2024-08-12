import React, { useState, useEffect } from 'react';
import login from '../features/auth/login';
import getData from '../features/data/getData';
import { clearTokens } from '../api/tokenManagement';
import simulateTokenExpiry from '../features/auth/simulateTokenExpiry';

const APISimulation = () => {
    const [logs, setLogs] = useState([]);

    const addLog = (message) => {
        setLogs(prevLogs => [...prevLogs, message]);
        console.log(message);
    };

    const simulateAPIFlow = async () => {
        addLog('開始 API 流程模擬');
        addLog('-----------------');

        try {
            // 步驟 1: 登入
            addLog('步驟 1: 嘗試登入');
            const loginResult = await login('testuser', 'testpassword');
            addLog(`登入成功: ${JSON.stringify(loginResult)}`);
            addLog('-----------------');

            // 步驟 2: 獲取數據
            addLog('步驟 2: 嘗試獲取數據');
            const data = await getData();
            addLog(`獲取的數據: ${JSON.stringify(data)}`);
            addLog('-----------------');

            // 步驟 3: 模擬 token 過期
            addLog('步驟 3: 模擬 token 過期');
            simulateTokenExpiry();
            addLog('Token 已設置為過期');
            addLog('-----------------');

            // 步驟 4: 再次嘗試獲取數據（應該觸發 token 刷新）
            addLog('步驟 4: 使用過期 token 嘗試獲取數據');
            try {
                const newData = await getData();
                addLog(`獲取的新數據（應該在內部刷新 token）: ${JSON.stringify(newData)}`);
            } catch (error) {
                addLog(`獲取數據失敗（預期的結果）: ${error.message}`);
                addLog('這應該觸發了 token 刷新流程');
            }
            addLog('-----------------');

            // 步驟 5: 清除 tokens
            addLog('步驟 5: 清除 tokens（模擬登出）');
            clearTokens();
            addLog('Tokens 已清除');
            addLog('-----------------');

            // 步驟 6: 嘗試在登出後獲取數據
            addLog('步驟 6: 嘗試在登出後獲取數據');
            try {
                await getData();
            } catch (error) {
                addLog(`獲取數據失敗（預期的結果）: ${error.message}`);
            }

        } catch (error) {
            addLog(`模擬過程中發生錯誤: ${error.message}`);
        }

        addLog('-----------------');
        addLog('API 流程模擬完成');
    };

    useEffect(() => {
        simulateAPIFlow();
    }, []);

    return (
        <div>
            <h1>API 模擬流程</h1>
            <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {logs.map((log, index) => (
                    <div key={index}>{}</div>
                ))}
            </div>
        </div>
    );
};

export default APISimulation;