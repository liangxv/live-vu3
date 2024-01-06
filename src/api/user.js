import request from '@/utils/requests.js';

export function getUser(conditions) {
    return request.get(`/user/findUserVo/${conditions}`);
}

export function getUserInfoMassage(conditions) {
    return request.get(`/user/findUserInfo/${conditions}`);
}

export function rechargeAndConsumption() {
    return request.put(`/user/rechargeAndConsumption/${conditions}`);
}