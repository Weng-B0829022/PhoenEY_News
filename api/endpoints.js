export const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://163.25.111.55:8000';

export const endpoints = {
    login: '/api/token',
    refreshToken: '/api/token/refresh',
    getData: '/api/data',
    executeNewsApi: '/api/execute-newsapi',
    executeNewsGen: '/api/execute-news-gen',
    statusCheck: '/api/execute-status',
    executeNewsGenVideo: '/api/execute-news-gen-video',
    executeNewsGenImg: '/api/execute-news-gen-img',
    getGeneratedVideo: '/api/get-generated-video',
    uploadVideo: '/api/uploadVideo'
};