export const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const endpoints = {
    login: '/api/token',
    refreshToken: '/api/token/refresh',
    getData: '/api/data',
    executeNewsApi: '/api/execute-newsapi',
    executeNewsGen: '/api/execute-news-gen',
    statusCheck: '/api/execute-status',
    executeNewsGenVideo: '/api/execute-news-gen-video',
    executeNewsGenImg: '/api/execute-news-gen-img',
    executeNewsCompositeVideo: '/api/execute-news-composite-video'
};