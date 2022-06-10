import {Image, List, NavBar, Space} from 'antd-mobile'
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import ArticleItem from "../../components/ArticleItem";
import './index.scss'

function Todo() {
    const navigator=useNavigate()
    const demoSrc='\thttps://pic1.zhimg.com/80/v2-8e77b2771314f674cccba5581560d333_xl.jpg?source=4e949a73'
    const TodoList=[1,2,3,4,5,6,7,8,9,10]

    return <div className={'todo'}>
        <NavBar onBack={()=>navigator(-1)}>问答</NavBar>


        <List>
            {TodoList.map((item)=>(
                <List.Item key={item}>
                    <div>
                        <div  className={'div_pl'}>
                            <h3 className={'dis w'}>作为 IT 行业的过来人，你有什么话想对后辈说的？</h3>
                            <span>赞同 1000+</span> &nbsp;&nbsp;
                            <span>500+ 评论</span>&nbsp;&nbsp;
                            <span>1 小时内</span>&nbsp;&nbsp;
                        </div>

                        <div className={classNames('imagesContainer',{dis:true})}>
                            <Space wrap>
                                <Image src={demoSrc}  style={{ borderRadius: 4 }} />
                            </Space>
                        </div>
                    </div>
                </List.Item>
            )) }

        </List>


    </div>
}
export default Todo;
