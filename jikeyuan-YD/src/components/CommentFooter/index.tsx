import { NavBar  } from 'antd-mobile'
import {useNavigate} from "react-router-dom";
import './index.scss'
const CommentFooter=()=>{
    const navigator=useNavigate()
    return (
        <div className={'CommentFooter'}>
            <NavBar onBack={()=>navigator(-1)}>我的收藏</NavBar>

            <div className={'CommentFooter_box'}>
                <h2>8985</h2>
                <span>13995862933</span> &nbsp;&nbsp;
                <span>0评论</span>&nbsp;&nbsp;
                <span>32分钟内</span>
            </div>
            <p>没有更多了</p>
        </div>
    )
}
export default CommentFooter
