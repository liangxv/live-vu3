import axios from 'axios';
// const baseURL='http://192.168.1.20:8080'
const baseURL='http://localhost:8080'
const instance = axios.create({baseURL})

instance.interceptors.response.use(
    result =>{
        return result.data
    },
    err=>{
       
    }
)

export default instance;