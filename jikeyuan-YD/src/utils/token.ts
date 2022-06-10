// 用常量来存储token
import {Token} from "../types/data";

const GEEK_TOKEN_KEY ='geek-yd-token'

// 获取token
export const getToken=()=>{
   return localStorage.getItem(GEEK_TOKEN_KEY)
}
// 设置token
export const setToken=(token:Token)=>{
    return  localStorage.setItem(GEEK_TOKEN_KEY,JSON.stringify(token))
}
// 清除token
export const clearItem=()=>{
    return  localStorage.removeItem(GEEK_TOKEN_KEY)
}
// 创建 根据token判断是否登录
export const isAuth=()=>{
    return !!getToken()
}
