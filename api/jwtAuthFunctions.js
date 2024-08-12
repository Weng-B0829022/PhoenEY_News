import { apiRequest, login as apiLogin, getData as apiGetData } from './apiRequest';
import { endpoints } from './endpoints';

// 登录并获取 JWT token
export async function login(username, password) {
    try {
        return await apiLogin(username, password);
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

// 使用 refresh token 获取新的 access token
export async function refreshAccessToken(refreshToken) {
    try {
        return await apiRequest(endpoints.refreshToken, 'POST', { refresh: refreshToken }, false);
    } catch (error) {
        console.error("Token refresh error:", error);
        throw error;
    }
}

// 使用 access token 访问受保护的数据端点
export async function getData() {
    try {
        return await apiGetData();
    } catch (error) {
        console.error("Data fetch error:", error);
        throw error;
    }
}

// 模拟 token 过期
export function simulateTokenExpiry() {
    return 'expired_token';
}