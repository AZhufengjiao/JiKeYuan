import {http} from '../../utils'

// 登录
export const login= (mobile,code)=>{
    return async dispatch=>{
        const res=await http.post('/authorizations',{mobile,code})
        const token=res.token

        localStorage.setItem('geep-pc-token',token)
        // console.log(localStorage.getItem('geep-pc-token'))
        dispatch({type:'setLoginToken',payload:token})
    }
}
export const logout=()=>{
    return (dispatch)=>{
    dispatch({type:'RemoveToken'})
    }
}

// 获取所有频道列表
// export const channels=()=>{
//     return async dispatch=>{
//         const res=await http.get('/channels')
//         console.log(res.channels)
//
//     }
// }
