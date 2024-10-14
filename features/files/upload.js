import { endpoints } from '../../api/endpoints';
import apiRequest from '../../api/apiRequest';

export async function uploadVideo(random_id) {
    try {
        const result = await apiRequest(endpoints.uploadVideo, 'POST', { random_id });
        //console.log('News Gen Img 結果:', result);
        return result;
    } catch (error) {
        //console.error('News Gen Img 錯誤:', error);
        throw error;
    }
}
