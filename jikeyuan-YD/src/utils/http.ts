import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import store from "../store";
import {Toast} from "antd-mobile";
import {useNavigate} from "react-router-dom";

const baseURL='http://geek.itheima.net/v1_0'
const http = axios.create({
    baseURL:baseURL,
    timeout: 5000
})


// 统一添加token在请求头
// 请求拦截器
http.interceptors.request.use((config:AxiosRequestConfig) => {
    // 获取token
    // 注意：极客园h5项目中，login 存储的是一个对象，对象中的 token 属性，才是登录身份令牌
    const {login:{token}}= store.getState()
    // 除了登录请求外，其他请求统一添加token
    if(token){
        config.headers!.Authorization = `Bearer ${token}`
    }
    return config
},  (e:AxiosError) => Promise.reject(e))

// 处理token失效
http.interceptors.response.use((res:AxiosResponse)=>{
    return res?.data ||res
},( async error => {
    console.log(error)
    // 响应失败时，会执行此处的回调函数
    if(!error.response){
        // 网络超时
        Toast.show({
            content:'网络繁忙，请稍后再试',
            duration:1000
        })
        return Promise.reject(error)
    }

    // 在此处，通过refresh_token来换取新的token
    if(error.response.status===401){
        console.log(1111)
        try {
            // 先判断是否有refresh_token
            const refresh_token=localStorage.getItem('refresh_token')
            console.log(refresh_token)
            if(!refresh_token){
                await Promise.resolve(error)
            }

            // 有 refresh_token，就用 refresh_token 换取新的 token
            // 注意：
            //  1 此处需要使用 axios 发请求
            //  2 因为使用的是 axios 所以，此处需要指定完整的 接口路径
            //  3 对于 put 请求来来说，第 3 个参数才表示配置项，才能够设置 请求头
            //  4 此处的请求头用的是 refresh_token 而不是 token
            const res=await axios.put(`${baseURL}/authorizations`,null,{
                headers:{
                    Authorization: `Bearer ${refresh_token}`
                }
            })

            // 组装所有 token
            const tokens={
                token:res.data.data.token,
                refresh_token
            }
            localStorage.setItem('geek-yd-token',tokens.token)
            store.dispatch({type:'setLoginToken',payload:tokens})

            return http(error.config)

        }catch (e) {
            // 如果换取新 token 的过程中，代码出错了，一般就说明 refresh_token 失效了
            // 此时，就清空token然后返回登录页面
            // 注意：在直接分发 thunk action 时，会报类型错误
            // store.dispatch(logout())
            // 解决方式：先自己手动分发对象形式的 action 来实现退出
            store.dispatch({type:'login/logout'})
            // 手动清理本地token
            localStorage.removeItem('geek-yd-token')

            Toast.show({
                content:'登录超时，请重新登录11',
                duration:1000,
                afterClose: () => {
                    window.location.href="http://localhost:3000/login"  // url里面是/# 就是hash    window.location.hash跳转
                }
            })

            return Promise.reject(error)
        }
    }
}))


http.interceptors.response.use((res:AxiosResponse) => {
    return res?.data?.data || res
}, (e:AxiosResponse) => Promise.reject(e))

export {http}
