import {useState} from "react";
import {List, InfiniteScroll,PullToRefresh} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'
import {getArticleList} from "../../../../store/actions/home";
import {RootState} from "../../../../types/store";
import ArticleItem from "../../../../components/ArticleItem";

type Props={
    channelId:number
}

const ArticleList=({channelId}:Props)=>{
    const dispatch=useDispatch()
    // 获取当前频道的文章列表数据
    const {channelArticles}=useSelector((state:RootState)=> state.home)
    // 注意：此处的频道对应的 文章列表数据，可能是不存在的，所以要设置默认值。
    const currentChannelArticle=channelArticles[channelId]??{
        pre_timestamp:Date.now()+'',
        results:[]
    }
    // pre_timestamp 时间戳
    // results 该频道id对应的文章列表数据
    const {pre_timestamp,results}=currentChannelArticle

    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        // const timesTamp=+new Date()+''
        await dispatch(getArticleList(channelId,pre_timestamp))
        setHasMore(pre_timestamp!==null)
    }

    const statusRecord: Record<PullStatus, string> = {
        pulling: '用力拉',
        canRelease: '松开吧',
        refreshing: '玩命加载中...',
        complete: '好啦',
    }

    // const {title}= currentChannelArticle
    // console.log(title)


    return (
        <>
            <PullToRefresh
                // 下拉刷新文章列表
                onRefresh={async () => {
                    await dispatch(getArticleList(channelId,+new Date()+''))
                }}
                renderText={status => {
                    return <div>{statusRecord[status]}</div>
                }}
            >
                <List>
                     {currentChannelArticle.results.map((item, index) => (
                         <List.Item key={index}>
                          <ArticleItem article={item}></ArticleItem>
                         </List.Item>

                     ))}
                </List>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </PullToRefresh>
        </>
    )
}
export default ArticleList
