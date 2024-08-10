export const apiRequest = async (endpoint, method = 'GET', body = null, additionalHeaders = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...additionalHeaders,
    };

    const config = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        // 處理 HTTP 錯誤
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // 對於 204 No Content 響應，直接返回 null
    if (response.status === 204) {
        return null;
    }

    return await response.json();
};