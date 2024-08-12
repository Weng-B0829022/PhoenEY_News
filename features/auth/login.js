import { endpoints } from '../../api/endpoints';
import { updateTokens } from '../../api/tokenManagement';
import apiRequest from '../../api/apiRequest';

export default async function login(username, password) {
    const response = await apiRequest(endpoints.login, 'POST', { username, password }, false);
    if (response && response.access && response.refresh) {
        updateTokens(response.access, response.refresh);
    }
    return response;
}