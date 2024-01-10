//请求模块
import request from "@/utils/requests"

export function getData(conditions) {
    return request.get(`/audit/list`, { params: conditions });
}