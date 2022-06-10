import {ArticleTable, GetChannels} from "../action-types/article-types";
// 频道功能
const initialState={
    // 频道
    channels:[],
    // 表格列表
    tableList:[],
    // 当前页
    page:1,
    // 一页显示多少条
    per_page:10,
    // 一共
    total_count:''
}
const article=(state=initialState,action)=>{
    console.log(action)
    switch (action.type) {
        case GetChannels:
            return {
                ...state,
                channels:action.payload
            }
        case ArticleTable:
            return {
                ...state,
                tableList:action.payload.results,
                page:action.payload.page,
                per_page: action.payload.per_page,
                total_count:action.payload.total_count
            }
        default:
            return state
    }
    return state
}

export  default article
