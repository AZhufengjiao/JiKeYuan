import { RootThunkAction} from "../../types/store";
import {http} from "../../utils";
import {SearchResult, SuggestionResponse} from "../../types/data";
import {useClickAway} from "ahooks";

//  搜索框获取关键字
export const getSuggestion=(value:string):RootThunkAction=>{
    return  async (dispatch)=>{
        const res=await http.get<SuggestionResponse>('/suggestion',{
            params:{
                q:value
            }
        } )
        dispatch({type:'search/suggestion',payload:res.data.options})
    }
}

// 清楚关键字
export const clearSuggestion=()=>({type:'search/clearSuggestion'})

// 获取搜索结果
export const getSearchResult=(val:string):RootThunkAction=>{
    return async (dispatch)=>{
        const res=await http.get<SearchResult>('/search',{
            params:{
                q:val,
                page:1
            }
        })
        dispatch({type:'search/getSearchResult',payload:res.data})
    }
}
