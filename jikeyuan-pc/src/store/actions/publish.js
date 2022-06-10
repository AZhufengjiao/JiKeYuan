import {http} from "../../utils";

export const addArticle=(data,draft=false)=>{
    return async dispatch=>{
      await http.post(`mp/articles?draft=${draft}`,data)
    }
}


export const getArticle=id=>{
    return async dispatch=>{
     return  await http.get('mp/articles/'+id)
    }
}


// 编辑表格数据
export const editArticle=(data,draft=false)=>{
    return async dispatch=>{
        await http.put(`mp/articles/${data.id}?draft=${draft}`,data)
    }
}
