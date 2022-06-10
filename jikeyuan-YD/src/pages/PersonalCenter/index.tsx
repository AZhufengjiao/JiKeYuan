import './index.scss'
import styles from './index.scss'
import {NavLink, useNavigate} from "react-router-dom";
import {Grid} from "antd-mobile";
import {BellOutline, ClockCircleOutline, HeartOutline, InformationCircleOutline, UserOutline} from "antd-mobile-icons";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "../../store/actions";
import {RootState} from "../../types/store";

function PersonalCenter() {
    // 获取用户信息
    const dispatch=useDispatch()
    const navigator=useNavigate()
    useEffect(()=>{
        dispatch(getUser())
    },[dispatch])

    const {user}=useSelector((state:RootState)=>state.personalCenter)
    const { photo, name ,fans_count } = user; //, like_count, follow_count, art_count 没用到得参数


    return <div className={'PersonalCenter'}>
        <div className={'PersonalCenter-top'}>
            <div className={'info'}>
                <div className={'info-img'}>
                    <img src={photo} alt=""/>
                </div>
                <h3>{name}</h3>
                <NavLink className={'btn'} to={'/personalCenter/edit'}>个人信息</NavLink>
            </div>
            <div className={'van-row'}>
                <Grid columns={4} gap={8}>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <p>10</p>
                            <p>动态</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <p>1</p>
                            <p>关注</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <p>{fans_count}</p>
                            <p>粉丝</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <p>0</p>
                            <p>被赞</p>
                        </div>
                    </Grid.Item>
                </Grid>
            </div>
            <div className={'notification'}>
                <Grid columns={4} gap={8}>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <BellOutline fontSize={22} />
                            <p>消息通知</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item onClick={()=>navigator('/commentFooter')}>
                        <div className={styles['grid-demo-item-block']}>
                            <HeartOutline fontSize={22} />
                            <p>我的收藏</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <ClockCircleOutline fontSize={22} />
                            <p>阅读历史</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <UserOutline fontSize={22} />
                            <p>我的作品</p>
                        </div>
                    </Grid.Item>
                </Grid>
            </div>
        </div>
        <div className={'moreService'}>
            <div className={'moreService-box'}>
                <h3>更多服务</h3>
                <Grid columns={4} gap={8}>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <InformationCircleOutline fontSize={22}  />
                            <p>用户反馈</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                        <div className={styles['grid-demo-item-block']}>
                            <BellOutline fontSize={22} />
                            <p>小智同学</p>
                        </div>
                    </Grid.Item>
                    <Grid.Item>
                    </Grid.Item>
                    <Grid.Item>
                    </Grid.Item>
                </Grid>
            </div>
        </div>
    </div>
}
export default PersonalCenter;
