import request from '@/utils/requests.js';

export function getData(conditions) {
    return request.get(`/carRequirement/findByCondition`, { params: conditions });
}

export function getDetail(id) {
    return request.get(`/carRequirement/${id}`);
}