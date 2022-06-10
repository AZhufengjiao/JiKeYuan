import {http} from "../../utils";
import {ArticleTable, GetChannels} from "../action-types/article-types";

// 获取所有频道列表
export const channels=()=>async (dispatch)=>{
    const res=await http.get('/channels')
    await dispatch({
        type:GetChannels,payload:res.channels
    })
}

export const delArticle=id=>{
    return async dispatch=>{
        await http.delete('mp/articles/'+id)
    }
}

// 获取表格数据
export const getArticleTable=(params)=>async (dispatch)=>{
    const res =await  http.get('/mp/articles', {params})
    dispatch({type:ArticleTable,payload:res})
}


