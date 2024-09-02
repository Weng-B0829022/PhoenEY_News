import { API_BASE_URL } from './endpoints';
import { getAccessToken } from './tokenManagement';
import handleResponse from './handleResponse';
import refreshAccessToken from '../features/auth/refreshAccessToken';

export default async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = true, isRetry = false) {
    const accessToken = getAccessToken();
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (requiresAuth && accessToken) {
        headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const config = {
        method,
        headers,
        credentials: 'include', // 確保跨域請求包含憑證
    };

    // 構建 URL
    let url = `${API_BASE_URL}${endpoint}`;

    // 對於 GET 請求，將 body 轉換為查詢參數
    if (method === 'GET' && body !== null) {
        const queryParams = new URLSearchParams(body).toString();
        url += `?${queryParams}`;
    } else if (method !== 'GET' && method !== 'HEAD' && body !== null) {
        // 對於非 GET 和非 HEAD 請求，將 body 添加到請求中
        config.body = JSON.stringify(body);
    }

    try {
        console.log(`Sending ${method} request to: ${url}`);
        console.log('Request config:', config);

        const response = await fetch(url, config);

        if (response.status === 401 && !isRetry) {
            console.log('Token expired, refreshing...');
            await refreshAccessToken();
            return apiRequest(endpoint, method, body, requiresAuth, true);
        }

        return await handleResponse(response);
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
}

// 使用示例
// apiRequest(endpoints.executeNewsApi);
// apiRequest(endpoints.executeNewsApi, 'GET', { keyword: 'example' }, true);