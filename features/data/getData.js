import { endpoints } from '../../api/endpoints';
import apiRequest from '../../api/apiRequest';

export default async function getData() {
    return await apiRequest(endpoints.getData);
}