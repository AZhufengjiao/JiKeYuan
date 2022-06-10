 // 用来存储跟Redux相关类型 action里
 import { ThunkAction } from 'redux-thunk';
 import store from '../store';
 import {
    ArtComment,
     ArticleComment,
    ArticleDetail,
    Articles,
    Channel,
    SearchResult,
    Suggestion,
    User,
    UserProfile
} from "./data";

 // Redux 应用的状态
export type RootState = ReturnType<typeof store.getState>;

export type RootAction=ProfileAction|HomeAction|SearchAction |ArticleAction


 // 使用 thunk 中间件后的 Redux dispatch 类型
 // ReturnType：thunk action 的返回类型
 // State: Redux 的状态  RootState
 // ExtraThunkArg: 额外的参数，没有用到，可以指定为 unknown
 // BasicAction: 非 thunk action，即对象形式的 action
 export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;

 // 项目中所有 action 的类型
 type RootAction = unknown;

 // -------------------- Redux 对象形式的 action 的类型 ---------------------------

 // 登录相关的 action 类型
 // 文章相关的 action 类型
 // 等等

 //ProfileAction 我的页面 相关的 action 类型
 export type ProfileAction=
| {
     type:'profile/getUser',
     payload:User
  }
| {
     type:'profile/getUserProfile',
     payload:UserProfile
  }
| {
     type:'profile/update',
     payload:Partial<UserProfile>
 }

// Home 首页 相关的 action 类型
export  type HomeAction=
 | {
        type:'home/getUserChannel',
         payload:Channel[]
 }
| {
        type:'home/getAllChannel',
        payload:restChannels
 }
| {
     type:'home/changeTab',
     payload:string
 }
| {
    type:'home/delChannel',
    payload:Channel
}
| {
     type:'home/addChannel',
    payload:Channel
  }
  |{
    type:'home/getChannelArticles',
    payload:{
         // 频道id
         channelId:number,
        // 该频道的文章列表数据
        data:Articles
    }
}


export type SearchAction={
    type:'search/suggestion';
    payload:Suggestion['options']
}|{
    type:'search/clearSuggestion',
}|{
    type:'search/getSearchResult',
    payload:SearchResult
}


export type ArticleAction={
     type:'article/get',
    payload:ArticleDetail
}
|{
     type:'article/updateInfo',
    payload:{
        // 指定要修改的状态名称
        name: 'is_followed' | 'is_collected' | 'attitude';
        // 指定要修改的值
        value: boolean | number;
    }
}
|{
    type:'getComment',
    payload:ArticleComment
}
