import request from '@/utils/requests.js';

export function recharge(conditions) {
    return request.post(`/user/recharge`, { params: conditions });
}
