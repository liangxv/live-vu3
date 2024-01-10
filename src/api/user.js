import request from '@/utils/requests.js';

export function getUser(conditions) {
    return request.get(`/user/findUserVo/${conditions}`);
}

//登录
export function login(data) {
    return request.post(`/user/login`, data);
}

// 手机号码登录
export function login2(data) {
    return request.post(`/user/login2`, data);
}

export function getUserInfoMassage() {
    return request.get(`/user/getUserInfoMassage/`);
}

export function rechargeAndConsumption() {
    return request.put(`/user/rechargeAndConsumption/${conditions}`);
}

//充值支付
export function rechargeAndPay(data) {
    return request.post(`/user/rechargeAndPay`, data);
}

//发送短信验证码
export function sms(tel) {
    return request.post(`/user/sms?tel=${tel}`);
}

//修改图片
export function avatar(avatar) {
    return request.post(`/user/updateById?avatar=${avatar}`);
}
