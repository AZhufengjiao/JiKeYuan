import {http} from '../../utils/index'
import {Dispatch} from "redux";
import {AxiosResponse} from "axios";
// 登录
export const login=(mobile:string,code:string)=>{
    return async (dispatch:Dispatch)=>{
        const res:AxiosResponse = await http.post('/authorizations',{mobile,code})
        const refresh_token=res.data.refresh_token
        const token=res.data.token
        // 设置本地token
        localStorage.setItem('geek-yd-token',token)
        localStorage.setItem('refresh_token',refresh_token)
        dispatch({type:'setLoginToken',payload:{token,refresh_token}})
    }
}
// 退出登录
export const logout=()=>{
    return async (dispatch:Dispatch)=>{
         dispatch({type:'login/logout'})
        localStorage.removeItem('geek-yd-token')
        localStorage.removeItem('refresh_token')
    }
}
