import {NavBar, Toast} from 'antd-mobile'
import './index.scss'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import { EditSOutline,DownlandOutline,LikeOutline,MessageOutline,HeartOutline,HeartFill,StarFill} from 'antd-mobile-icons'
import ContentLoader from 'react-content-loader';
import {useInitialState} from "../../../../utils/use-initial-state";
import {
    collectArticle,
    followAuthor,
    getArticleById, getArticleComment,
    getMoreArticleComments,
    likeArticle
} from "../../../../store/actions";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../types/store";
import DOMPurify from 'dompurify'
import {useThrottle} from "ahooks";
import {log} from "util";

// 枚举，来表达评论类型
enum CommentType{
    Article='a',
    Comment='c'
}

function Article(){
    const navigator=useNavigate()
    const location=useLocation()
    const dispatch=useDispatch()
    const parmas=new URLSearchParams(location.search)
    const artId=parmas.get('artId')!
    const {articleList:{ content,
        aut_id,
        is_followed,
        aut_name,
        aut_photo,
        comm_count,
        attitude,
        like_count,
        pubdate,is_collected,
        read_count,
        title,}}=useSelector((state:RootState)=>state.article)

    // 获取数据
    useEffect(()=>{
        dispatch(getArticleById(artId))
    },[dispatch,getArticleById])

    const wrapperRef=useRef<HTMLDivElement>(null)
    const authorRef=useRef<HTMLDivElement>(null)
    const [showNavAuthor, setShowNavAuthor] = useState(false)
    // 滑动滚动条  显示与隐藏
    const handleScroll= ()=>{
        const wrapperDOM=authorRef.current!
        if(wrapperRef.current){
            const scrollTop=wrapperDOM.scrollTop
            if(scrollTop>=200){
                setShowNavAuthor(true)
            }else{
                setShowNavAuthor(false)
            }
        }

    }
    useEffect(()=>{
        const wrapperDOM=authorRef.current!
        if(!wrapperDOM) return

        wrapperDOM.addEventListener('scroll',handleScroll)

        return ()=>wrapperDOM.removeEventListener('scroll',handleScroll)
    },[title,authorRef,handleScroll])

    const commentRef=useRef<HTMLDivElement>(null)
    const [commentFlag,setCommentFlag]=useState(false)
    // 点击到评论位置
    const handleScrollPosition=()=>{
        if(!authorRef.current)return
        // 设置开关
        setCommentFlag(!commentFlag)
        const commentScroll=commentRef.current!.offsetTop

        authorRef.current.scrollTop=commentFlag?0:commentScroll
    }

    // 关注
    const onFollow=()=>{
        dispatch(followAuthor(aut_id,is_followed))
    }

    // 收藏
    const handleCollect=()=>{
        dispatch(collectArticle(aut_id,is_collected))
        Toast.show(is_collected?'取消收藏':'已收藏')
    }
    // 点赞
    const handleLike=()=>{
        dispatch(likeArticle(aut_id,attitude))
        Toast.show(attitude?'取消点赞':'已点赞')
    }

    const [params] = useSearchParams();
    // 第一次：获取评论数据
    useEffect(()=>{
        dispatch(getArticleComment(CommentType.Article, params.get("artId")!))
    },[params])

    const {comment:{end_id,last_id}}=useSelector((state:RootState)=> state.article)
    console.log(end_id,last_id)

    if (!title) {
        return (
            // 根据当前页面结构，设计好的 loading 效果
            <ContentLoader
                speed={2}
                width={375}
                height={230}
                viewBox="0 0 375 230"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
                <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
                <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
                <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
                <circle cx="33" cy="69" r="17" />
                <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
                <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
                <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
                <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
                <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
                <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
            </ContentLoader>
        );
    }
    return (
        <div ref={wrapperRef}  className={'Article'}>
            <NavBar onBack={()=>navigator(-1)}>
                {showNavAuthor&&(  <div className={'position'}>
                    <div className={'Article_personal_left_img position_img'}>
                        <img src={aut_photo} alt=""/>
                    </div> &nbsp;&nbsp;
                    <span className={'name'}>{aut_name}</span>&nbsp;&nbsp;
                    <span className={'shu'}></span>&nbsp;&nbsp;
                    <span className={'gz'}>{is_followed?'已关注':'+关注'}</span>
                </div>)}

            </NavBar>

            <div ref={authorRef}   className={'Article_content'}>
                  <div className={'Article_box'}>
                      <p>{title}</p>
                      <div className={'span'}>
                          <span>{pubdate}</span> |
                          <span> {read_count} 阅读</span> |
                          <span> {comm_count} 评论</span>
                      </div>

                      <div className={'Article_personal'}>
                          <div className={'Article_personal_left_img'}>
                              <img src={aut_photo} alt=""/>
                          </div> &nbsp;&nbsp;
                          <span>{aut_name}</span>
                          <div onClick={onFollow} className={'Article_personal_gz'}>{is_followed?'已关注':'+关注'}</div>
                      </div>
                  </div>

                  <div className={'Article_code'} >
                      <p className={'dg-html'} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(content)}}></p>

                      <div className={'Article_code_botton'}>发布文章时间：{pubdate}</div>
                  </div>

                <div ref={commentRef} className={'Article_comment'}>
                    <div className={'Article_comment_box'}>
                        <span className={'Article_comment_left'}>全部评论  (0)</span>
                        <span className={'Article_comment_right'}>{like_count} 点赞</span>
                    </div>
                    <div className={'Article_comment_bon'}>
                       <div className={'Article_comment_bon_empty'}>
                           <img src="http://geek.itheima.net/dist/img/none.21d1f2fd.png" alt=""/>
                           <p>还没有人评论哦</p>
                       </div>
                    </div>
                </div>
           </div>

            <div className={'Article_dz'}>
                <div className={'Article_dz_q'}>
                    <EditSOutline />
                    <span>抢沙发...</span>
                </div>
                <div onClick={handleScrollPosition} className={'Article_dz_p'}>
                    <MessageOutline style={{fontSize:'22px'}} /><br/>
                    <span>评论</span>
                </div>
                <div onClick={handleLike} className={'Article_dz_p'}>
                    {attitude?  <HeartFill style={{fontSize:'22px'}}  />:
                        <LikeOutline style={{fontSize:'22px'}} />
                    }
                    <br/>
                    <span>点赞</span>
                </div>
                <div onClick={handleCollect} className={'Article_dz_p'}>
                    {is_collected?    <StarFill style={{fontSize:'22px'}} />:
                        <HeartOutline style={{fontSize:'22px'}} />}
                    <br/>

                    <span>收藏</span>
                </div>
                <div className={'Article_dz_p'}>
                    <DownlandOutline style={{fontSize:'22px'}} /><br/>
                    <span>分享</span>
                </div>
            </div>
        </div>
    )
}
export default Article
