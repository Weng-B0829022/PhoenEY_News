import { endpoints } from '../../api/endpoints';
import { getRefreshToken, updateTokens, clearTokens } from '../../api/tokenManagement';
import apiRequest from '../../api/apiRequest';

export default async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    try {
        const response = await apiRequest(endpoints.refreshToken, 'POST', { refresh: refreshToken }, false);
        updateTokens(response.access, refreshToken);
        return response.access;
    } catch (error) {
        clearTokens();
        throw error;
    }
}