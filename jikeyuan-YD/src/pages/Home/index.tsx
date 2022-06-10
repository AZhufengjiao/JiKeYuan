import {Space, Tabs,Popup} from "antd-mobile";
import React, {useEffect, useRef, useState} from 'react'
import {SearchOutline, AppstoreOutline} from 'antd-mobile-icons'
import './index.scss'
import {useInitialState} from "../../utils/use-initial-state";
import {getUserChannel} from "../../store/actions/home";
import Channels from "./components/Channels";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/store";
import ArticleList from "./components/ArticleList";
import {useNavigate} from "react-router-dom";
import {HomeState} from "../../store/reducers/home";


function Home() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    // 获取频道
    const {userChannel} = useInitialState(getUserChannel, 'home')
    // 弹出层的开关
    const [channelVisible, setChannelVisible] = useState(false)
    // 切换频道
    let {channelActiveKey}=useSelector((state:RootState)=>state.home)


    const onChannelOpen=()=>{
        setChannelVisible(true)
    }
    const onChannelClose=()=>{
        setChannelVisible(false)
    }

    const onActiveKey=(key:string)=>{
        dispatch({type:'home/changeTab',payload:key})
    }

    const div=useRef(null)
    useEffect(()=>{
        console.log(div.current)
    },[])

    return (
        <div ref={div} className={'home-box'}>
            <div className={'home'}>
                {/* 频道 */}
                {userChannel.length>0 && (
                    <Tabs
                        className="tabs"
                        activeLineMode='fixed'
                        onChange={onActiveKey}
                        activeKey={channelActiveKey}
                        style={{
                            '--fixed-active-line-width': '30px',
                        }}>

                        {userChannel?.map((item)=>{
                            return <Tabs.Tab  title={item.name} key={item.id}>
                                <ArticleList channelId={item.id}></ArticleList>
                            </Tabs.Tab>
                        })}
                    </Tabs>
                )}

                {/* 搜索和管理频道 */}
                <div className={'search-bar'}>
                    <Space wrap style={{fontSize: 36}}>
                        <SearchOutline onClick={()=>navigate('/search')} color='#9ea1ae' fontSize={22}/>
                        <AppstoreOutline onClick={onChannelOpen} color='#9ea1ae' fontSize={22}/>
                    </Space>
                </div>
            </div>

            <Popup
                visible={channelVisible}
                onMaskClick={onChannelClose}
                position='left'
                bodyStyle={{ width: '100%' }}
            >
                <Channels onClose={onChannelClose}></Channels>

            </Popup>
        </div>
    )
}

export default Home;
