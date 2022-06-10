import {Dispatch} from "redux";
import { RootThunkAction} from "../../types/store";
import {getToken} from "../../utils/token";
import {http} from "../../utils";
import {AllChannelsResponse, Channel,  UserChannelResponse} from "../../types/data";

const CHANNEL_KEY = 'geek-channels';
const _=require('lodash')
// 获取频道信息
export const getUserChannel=():RootThunkAction=>{
    return async (dispatch:Dispatch,getState)=>{
        // const {login:{token}}=getState()
        const token=getToken()
        let userChannel:Channel[]=[]

        if(token){
            // 登录
            const res=await http.get<UserChannelResponse>('/user/channels')
            const {channels} =res.data
            console.log('登录',channels)
            userChannel=channels
        }else{
            // 未登录
            const localChannels=JSON.parse(localStorage.getItem(CHANNEL_KEY)??'[]')

            if(localChannels.length>0){
                userChannel=localChannels
                console.log('未登录，有本地',localChannels)
            }else{
                const res=await http.get<UserChannelResponse>('/user/channels')
                const {channels} =res.data
                localStorage.setItem(CHANNEL_KEY,JSON.stringify(channels))

                userChannel=localChannels
                console.log('未登录，没有本地',channels)
            }
        }
        dispatch({type:'home/getUserChannel',payload:userChannel})
    }
}

// 获取可选频道
export const getAllChannel=():RootThunkAction=>{
    return async (dispatch,getState)=>{
        // 获取所有频道
        const res=await http.get<AllChannelsResponse>('channels')
        // 获取我的频道
        const {home:{userChannel}}=getState()
        // differenceBy方法将数组中每个元素进行迭代从原数组中删除值
        const restChannels=_.differenceBy(
            res.data.channels,
            userChannel,
            'id'
        )
        dispatch({type:'home/getAllChannel',payload:restChannels})
    }
}

// 删除频道
export const delChannel=(channel:Channel):RootThunkAction=>{
    return async (dispatch,getState)=>{
        const {login:{token}}=getState()

        if(token){
            // 已登录
            await http.delete(`user/channels/${channel.id}`)
        }
        else{
            // 未登录
            // 已有频道获取
            const localChannels=JSON.parse(localStorage.getItem(CHANNEL_KEY)??'[]')

            const userChannel=localChannels.filter((item:Channel)=>{
                return item.id!==channel.id
            })
            localStorage.setItem(CHANNEL_KEY,JSON.stringify(userChannel))
        }

        dispatch({type:'home/delChannel',payload:channel})
    }
}

// 添加频道
export const addChannel=(channel:Channel):RootThunkAction=>{
    return async (dispatch,getState)=>{
        const {login:{token}}=getState()

        // 已登录
        if(token){
            await http.patch('/user/channels',channel)
        }else{ //未登录
            // 获取本地频道
            const localChannel=JSON.parse(localStorage.getItem(CHANNEL_KEY)??'[]')
            // 将添加频道加入本地存储
            const userChannel=[...localChannel,channel]
            localStorage.setItem(CHANNEL_KEY,JSON.stringify(userChannel))
        }
        dispatch({type:'home/addChannel',payload:channel})
    }
}


// 文章列表数据
export const getArticleList=(channelId:number,timesTamp:string):RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.get('/articles',{
           params:{
               channel_id:channelId,
               timestamp:timesTamp
           }
        })
        // 文章列表可能是空  触底数据
        const obj={
            pre_timestamp:null,
            results:[]
        }
        dispatch({
            type:'home/getChannelArticles',
            payload:{
                channelId:channelId,
                data:res?res.data:obj
            }
        })
    }
}
