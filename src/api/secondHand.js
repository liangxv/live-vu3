import request from '@/utils/requests.js';

export function getData(conditions) {
   return request.get(`/Second/findPage`,{ params: conditions });
}
export function getSecondDetails(id) {
     return request.get(`/Second/findTitle/${id}`);
}
export function getSecondClassification(classification) {
  return request.get(`/Second/findClassification/${classification}`)
}

export function  getSecondAdd(secondHandMarket) {
    return request.post(`/Second/add`,secondHandMarket)
}

export function  uplodad(file) {
    return request.post(`/Second/upload`,file,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
}