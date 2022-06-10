import {http} from '../../utils/index'
import {RootThunkAction} from "../../types/store";
import {UserPhotoResponse, UserProfile, UserProfileResponse, UserResponse} from "../../types/data";

//  我的页面请求数据
export const getUser=():RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.get<UserResponse>('/user')
        const {data}=res
        dispatch({type:'profile/getUser',payload:data})
    }
}

// 我的----个人信息页面
export const getUserProfile=():RootThunkAction=>{
    return async dispatch=>{
        const res=await http.get<UserProfileResponse>('/user/profile')
        const {data}=res
        dispatch({type:'profile/getUserProfile',payload:data})
    }
}

// 我的 -- 个人信息  修改昵称
export const updateUserProfile=(userProfile:Partial<UserProfile>):RootThunkAction=>{
    return async dispatch=>{
        await  http.patch('/user/profile',userProfile)

        // 发布action 以更新用户昵称
        dispatch({type:'profile/update',payload:userProfile})
    }
}

// 我的-- 个人信息  修改头像
export const updateUserPhoto=(data:FormData):RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.patch<UserPhotoResponse>('/user/photo',data)

        console.log(res)
       dispatch({
           type:'profile/update',
           payload:{
               photo:res.data.data.photo
           }
       })
    }
}
