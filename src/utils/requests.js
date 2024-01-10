import axios from 'axios';
const baseURL='http://192.168.1.78:8080'
const instance = axios.create({baseURL})

instance.interceptors.response.use(
    result =>{
        return result.data
    },
    err=>{
       
    }
)

// 请求拦截请求头加上touken
instance.interceptors.request.use(
    config=>{
        config.headers.Authorization = 'Bearer '+localStorage.getItem('token')
        return config
    }
)

export default instance;