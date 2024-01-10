import request from '@/utils/requests.js';

export function findByUserId(conditions) {
    return request.get(`/order/findByUserId`,{ params: conditions });
}