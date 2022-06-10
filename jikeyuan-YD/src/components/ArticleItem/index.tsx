import { Image, Space } from 'antd-mobile'
import './index.scss'
import {Article} from "../../types/data";
import classNames from "classnames";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

type Props={
    article:Article
}

const ArticleItem=({article:{aut_name,comm_count,cover,title,pubdate,art_id}}:Props)=>{
    const navigator=useNavigate()
    return (
        <div className={'ArticleItem'} onClick={()=>navigator(`/article?artId=${art_id}`)}>
            <div>
                <h3 className={classNames({'dis w':cover.type === 1})}>{title}</h3>
                <div className={classNames('imagesContainer',{'dis':cover.type===1})}>
                    <Space wrap>
                        {cover.images?.map((item,index)=>(
                            <Image src={item} key={index}  style={{ borderRadius: 4 }} />
                        ))}
                        {/*<Image src={demoSrc}  style={{ borderRadius: 4 }} />*/}
                        {/*<Image src={demoSrc}  style={{ borderRadius: 4 }} />*/}
                        {/*<Image src={demoSrc}  style={{ borderRadius: 4 }} />*/}
                    </Space>
                </div>
            </div>


            <div  className={'div_pl'}>
                <span>{aut_name}</span> &nbsp;&nbsp;
                <span>{comm_count} 评论</span>&nbsp;&nbsp;
                <span>1 小时内</span>&nbsp;&nbsp;
                {/*<span>{dayjs().from(dayjs(pubdate))} 小时内 </span>*/}
            </div>
        </div>
    )
}
export default ArticleItem
