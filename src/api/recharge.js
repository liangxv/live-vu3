import request from '@/utils/requests.js';

export function recharged(conditions) {
    return request.post(`/user/recharge`, { params: conditions });
}
