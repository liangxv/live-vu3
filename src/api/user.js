import request from '@/utils/requests.js';

export function getUser(conditions) {
    return request.get(`/user/findUserVo/${conditions}`);
}

//登录
export function login(data) {
    return request.post(`/user/login`, data);
}
