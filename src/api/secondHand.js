import request from '@/utils/requests.js';

export function getData(conditions) {
   return request.get(`/Second/findPage`,{ params: conditions });
}
export function getSecondDetails(id) {
     return request.get(`/Second/findTitle/${id}`);
}

export function  getSecondAdd(secondHandMarket) {
    return request.post(`/Second/add`,secondHandMarket)
}