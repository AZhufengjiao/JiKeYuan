import {ArticleAction} from "../../types/store";
import {ArticleComment, ArticleDetail} from "../../types/data";

type ArticleState={
    articleList:ArticleDetail,
    comment:ArticleComment,
}

const initialState={
    articleList: {},
    // 评论列表数据
    comment:{
        results:[] as ArticleComment['results']
    }
}as ArticleState

const article=(state=initialState,action:ArticleAction):ArticleState =>{
    switch (action.type) {
        case "article/get":
            return {
                ...state,
                articleList:action.payload
            }
        case 'article/updateInfo':
            return {
                ...state,
                articleList:{
                    ...state.articleList,
                    [action.payload.name]:action.payload.value
                }
            }
        case 'getComment':
            return {
                ...state,
                comment:action.payload
            }
    }
    return state
}

export default article
