//请求模块
import request from "../utils/requests"

//获取数据
export const getArticles=(params)=>{
    return request({
        method:"Get",
        url:"/houserental/findByPage",
        params,
    });
};