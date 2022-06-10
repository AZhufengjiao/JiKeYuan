import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getSearchResult} from "../../../../store/actions";
import {RootState} from "../../../../types/store";
import ArticleItem from "../../../../components/ArticleItem";
import './index.scss'
import {List,NavBar,Empty} from "antd-mobile";

function SearchResult(){
    const dispatch=useDispatch()
    const location=useLocation()
    const navigator=useNavigate()
    console.log(location.search)
    const params=new URLSearchParams(location.search)
    const q=params.get('q')??''

    useEffect(()=>{
        dispatch(getSearchResult(q))
    },[dispatch])

    const {searchResults}=useSelector((state:RootState)=>state.search)



    return (
        <div  className={'SearchResult'}>
            <NavBar onBack={()=>navigator(-1)}>搜索结果</NavBar>
            {searchResults.results.length>0?(
                // 历史记录有的话
                <List>
                    {searchResults.results.map((item,index)=>(
                        <List.Item key={index}>
                            <ArticleItem key={index} article={item}></ArticleItem>
                        </List.Item>
                    ))}
                </List>
            ):(
                // 历史记录没有的话
                <Empty description='暂无数据' />
            )}
        </div>
    )
}
export default SearchResult
