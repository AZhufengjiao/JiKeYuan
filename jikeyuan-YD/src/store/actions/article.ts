import {RootThunkAction} from "../../types/store";
import {http} from "../../utils";
import {ArticleCommentResponse, ArticleDetailResponse} from "../../types/data";
import dayjs from "dayjs";
import {isNumber} from "util";

// 获取数据
export const getArticleById=(artId:string):RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.get<ArticleDetailResponse>(`/articles/${artId}`)

        const data=res.data
        console.log(data)

        dispatch({
            type:'article/get',
            payload: {
                ...data,
                pubdate:dayjs(data.pubdate).locale('zh-cn').format('YYYY-MM-DD')
            }
        })
    }
}

// 关注
export const followAuthor=(id:string,isFollowed:boolean):RootThunkAction=>{
    return async (dispatch)=>{
        if(isFollowed){
            // 取关
           await http.delete(`/user/followings/${id}`)
        }else{
            // 关注
            await http.post('/user/followings',{
                target:id
            })
        }

        dispatch({
            type:'article/updateInfo',
            payload:{
                name:'is_followed',
                value:!isFollowed
            }
        })
    }
}

// 关注
export const collectArticle=(id:string,isCollect:boolean):RootThunkAction=>{
    return async (dispatch)=>{
        if(isCollect){
            // 取消收藏
            await  http.post(`/article/collections/${id}`)
        }else{
            //  false 收藏
          await  http.post('/article/collections',{
              target:id
          })
        }

        dispatch({
            type:'article/updateInfo',
            payload:{
                name:'is_collected',
                value:!isCollect
            }
        })
    }
}

// 点赞
export const likeArticle=(id:string,attitude:number):RootThunkAction=>{
    return async (dispatch)=>{
        if(attitude===-1){
            // 已点赞
            await http.delete(`/article/likings/${id}`)
        }else{
        //  点赞
            await http.post('/article/likings',{
                target:id
            })
        }

        dispatch({
            type:'article/updateInfo',
            payload:{
                name:'attitude',
                value:attitude===-1?0:-1
            }
        })
    }
}

// 获取文章评论 - 覆盖数据
export const getArticleComment=(type:string,id:string):RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.get<ArticleCommentResponse>('/comments',{
            params:{
                type,
                source:id
            }
        })
        console.log(id, "aaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(res)
       dispatch({type:'getComment',payload:res.data})
    }
}

// 获取更多文章评论数据 - 追加数据
export const getMoreArticleComments=(type:string,id:string,offset:string|null):RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.get('/comments',{
            params:{
                type,
                source:id,
                offset
            }
        })
        console.log(res)
    }
}
