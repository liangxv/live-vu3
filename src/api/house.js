import request from '@/utils/requests.js';

export function getData(conditions) {
    return request.get(`/houserental/findByPage`, { params: conditions });
}

export function getDetails(id) {
    return request.get(`/houserental/getDetails/${id}`);
}

export function houseAdd(formHouseData) {
    return request.post(`/houserental/houseSave`,formHouseData);

}