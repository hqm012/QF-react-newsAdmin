import axios from "axios";
import store from '@/redux/store'

const service = axios.create({
    baseURL: 'http://localhost:3004',
    timeout: 5000
})

service.interceptors.request.use(
    function (config) {
        //此处书写在发送请求之前做什么
        store.dispatch({
            type: 'changeLoading',
            payload: true
        })
        return config;
    },
    function (error) {
        //此处书写对请求错误做什么
        return Promise.reject(error);
    }
)
service.interceptors.response.use(
    function (response) {
        console.log(response);
        //2xx范围内的状态码都会触发该函数。此处书写对响应数据做点什么
        store.dispatch({
            type: 'changeLoading',
            payload: false
        })
        return response;
    },
    function (error) {
        //超出2xx范围的状态码都会触发该函数，此处书写对相应错误做点什么
        store.dispatch({
            type: 'changeLoading',
            payload: false
        })
        return Promise.reject(error);
    }
)

export default service