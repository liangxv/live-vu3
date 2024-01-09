import request from '@/utils/requests.js';

export function getUser(conditions) {
    return request.get(`/user/findUserVo/${conditions}`);
}

//登录
export function login(data) {
    return request.post(`/user/login`, data);
}
export function getUserInfoMassage(conditions) {
    return request.get(`/user/getUserInfoMassage/${conditions}`);
}

export function rechargeAndConsumption() {
    return request.put(`/user/rechargeAndConsumption/${conditions}`);
}

//充值支付
export function rechargeAndPay(data) {
    return request.post(`/user/rechargeAndPay`, data);
}
