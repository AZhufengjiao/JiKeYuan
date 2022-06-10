import {Articles, Channel} from "../../types/data";
import {HomeAction} from "../../types/store";

export type HomeState={
    userChannel:Channel[]
    restChannel:Channel[],
    channelActiveKey:string,
    channelArticles:{
        [key:number]:Articles
    }
}
const initialState:HomeState={
    // 当前频道
    userChannel:[],
    // 推荐频道
    restChannel:[],
    // 选中频道
    channelActiveKey:'',
    // 文章列表
    channelArticles: {}
}
const _=require('lodash')

const home=(state=initialState,action:HomeAction):HomeState=>{
    switch (action.type) {
        case 'home/getUserChannel':
            return {
                ...state,
                userChannel: action.payload,
                // 设置默认值
                channelActiveKey:action.payload[0].id+''
            }
        case 'home/getAllChannel':
            return {
                ...state,
                restChannel:action.payload
            }
        case 'home/changeTab':
            return {
                ...state,
                channelActiveKey:action.payload
            }
        case 'home/delChannel':
            return {
                ...state,
                // 删除当前频道
                userChannel:state.userChannel.filter((item)=>{
                    return item.id!==action.payload.id
                }),
                // 将被删除频道添加到推荐频道中，根据id排序
                restChannel:_.sortBy([...state.restChannel,action.payload],'id')
            }
        case 'home/addChannel':
            return{
                ...state,
                userChannel:[...state.userChannel,action.payload],
                restChannel:state.restChannel.filter((item)=>item.id!==action.payload.id)
            }
        case 'home/getChannelArticles':
            //  数据可能为空  为其设置默认值
            const curChannelArticles=state.channelArticles[
                    action.payload.channelId
                ]??{
                pre_timestamp:null,
                results:[]
            }
            const {channelId,data:{pre_timestamp,results}}=action.payload

            return {
                 ...state,
                channelArticles:{
                     ...state.channelArticles,
                    [channelId]:{
                         pre_timestamp,
                        results:[...curChannelArticles.results,...results]
                    }
                }
            }
        default :
            return state
    }
}
export default home
