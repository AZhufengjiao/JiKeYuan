import  axios from 'axios'
// import {useSelector} from "react-redux";
import {store} from "../store";
import {message} from "antd";
import {logout} from "../store/actions";
const http=axios.create({
    baseURL:'http://geek.itheima.net/v1_0',
    timeout:5000
})

// http.interceptors.request.use((config) => {
//     const token = useSelector((state) => state.user.token)
//     if(token) {
//         return config.headers.Authorization = token
//     }
//     return config
// }, (err) => {
//     return err;
// })

// 统一添加token在请求头
http.interceptors.request.use(config => {
    // 对config进行修改，每次请求前做的事情
    const state = store.getState()
    if (state.user.token) {
        config.headers.Authorization  = `Bearer ${state.user.token}`
    }
    return config
}, e => Promise.reject(e))

// 处理token失效
http.interceptors.response.use(res=>{
    return res?.data?.data ||res
},e=>{
    if(e.response.state===401){
        message.error('登陆失败')
        store.dispatch(logout())
    //  路由跳转--> login页面
        window.location.href='/#/login'
    }
    return Promise.reject(e)
})

http.interceptors.response.use(res=>{
    return res?.data?.data|| res
},e=>Promise.reject(e))

export {http}
