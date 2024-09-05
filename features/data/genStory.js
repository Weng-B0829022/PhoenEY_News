import { endpoints } from '../../api/endpoints';
import apiRequest from '../../api/apiRequest';

export async function executeNewsApi(unencodedKeyword) {
    try {
        const keyword = encodeURIComponent(unencodedKeyword);
        const result = await apiRequest(endpoints.executeNewsApi, 'GET', { keyword }, true);
        //console.log('News API 結果:', result);
        return result;
    } catch (error) {
        //console.error('News API 錯誤:', error);
        throw error;
    }
}

export async function executeNewsGen() {
    try {
        const result = await apiRequest(endpoints.executeNewsGen, 'GET');
        //console.log('News Gen 結果:', result);
        return result;
    } catch (error) {
        //console.error('News Gen 錯誤:', error);
        throw error;
    }
}

export async function statusCheck() {
    try {
        const result = await apiRequest(endpoints.statusCheck, 'GET');
        //console.log('News Gen 結果:', result);
        return result;
    } catch (error) {
        //console.error('News Gen 錯誤:', error);
        throw error;
    }
}

