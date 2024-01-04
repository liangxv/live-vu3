import request from '@/utils/requests.js';

export function getUser(conditions) {
    return request.get(`/user/findUserVo/${conditions}`);
}
