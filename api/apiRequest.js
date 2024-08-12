import { API_BASE_URL } from './endpoints';
import { getAccessToken } from './tokenManagement';
import handleResponse from './handleResponse';
import refreshAccessToken from '../features/auth/refreshAccessToken';

export default async function apiRequest(endpoint, method = 'GET', body = null, requiresAuth = true, isRetry = false) {
    const accessToken = getAccessToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(requiresAuth && accessToken && { 'Authorization': `Bearer ${accessToken}` })
    };

    const config = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (response.status === 401 && !isRetry) {
            await refreshAccessToken();
            return apiRequest(endpoint, method, body, requiresAuth, true);
        }

        return await handleResponse(response);
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
}