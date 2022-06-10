import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
import "./index.scss"
import {TabBar} from "antd-mobile";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {lazy} from "react";
import Todo from '../Todo'
import Message from '../Message'
import PersonalCenter from '../PersonalCenter'
import AuthRoute from "../../components/AuthRoute";

// 路由懒加载
const   Home= lazy(()=>import(/* webpackChunkName: "Home" */ "../Home"))

function Layout() {
    // 路由高亮
    const location=useLocation()
    // 获取token
    // const token=localStorage.getItem('geek-yd-token')
    // 跳转路由
    const navigate = useNavigate()
    const setRouteActive = (value:string ) => {
        navigate(value)
    }
    const tabs = [
        {
            key: '/home',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/todo',
            title: '我的待办',
            icon: <UnorderedListOutline />,
            badge: '5',
        },
        {
            key: '/message',
            title: '我的消息',
            icon:  <MessageOutline />,
            badge: '99+',
        },
        {
            key: '/personalCenter',
            title: '个人中心',
            icon: <UserOutline />,
        },
    ]

    return (
        <div className='layout'>
            <div className='layout-contents'>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' />}></Route>
                    <Route path='/home' element={<Home></Home>}> </Route>
                    <Route path='/todo' element={<Todo></Todo>}> </Route>
                    <Route path='/message' element={<Message></Message>}> </Route>
                    <Route path={"/personalCenter"} element={<AuthRoute  path='/personalCenter'>
                        <PersonalCenter></PersonalCenter>
                    </AuthRoute>}/>

                    {/*<Route path='/personalCenter' element={!token?<Navigate to='/login' />:<PersonalCenter></PersonalCenter>}> </Route>*/}
                </Routes>

            </div>
            <TabBar activeKey={location.pathname} className="tab-bar"  onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    )
}
export default Layout
