export const API_BASE_URL = 'http://localhost:8000';  // 或者您的實際 API URL

export const endpoints = {
    login: '/api/token',
    refreshToken: '/api/token/refresh',
    getData: '/api/data',
    executeNewsApi: '/api/execute-newsapi',
    executeNewsGen: '/api/execute-news-gen'
};