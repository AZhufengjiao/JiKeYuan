import React, {lazy,Suspense} from 'react';
import  './index.scss';
import {Layout, Row, Col, Button, Menu, Popconfirm, message  } from 'antd';
import {
    LogoutOutlined,
} from "@ant-design/icons";
import {
    PieChartOutlined ,
    SolutionOutlined ,
    FileWordOutlined ,
} from '@ant-design/icons';
import logo from "../../assets/image/logo.536c5d80.png";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import DataBrowsing from "./DataBrowsing";
// import Article from "./Article";
import Publish from "./Publish";
import {Spin} from "antd";

// 路由懒加载
const   Article= lazy(()=>import(/* webpackChunkName: "Home" */ "./Article"))


const { Header, Sider, Content } = Layout;


function Layouts(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const Location=useLocation().pathname
    // 退出登录
    function confirm(e) {
        const token=''
        dispatch({type:'setLoginToken',payload:token})
        localStorage.removeItem('geep-pc-token')
        console.log(localStorage.getItem('geep-pc-token'))
        navigate('/login')
        message.success('退出成功')
    }
    //菜单Menu
    function getItem(label, key, icon, children, type) {
        return {
            label,
            key,
            icon,
            children,
            type,
        };
    }
    const items = [
        getItem('数据概览', '/home', <PieChartOutlined />),
        getItem('内容管理', '/home/article', <SolutionOutlined />),
        getItem('发布文章', '/home/publish', <FileWordOutlined />),
    ];

    const onClickHandler = ( item) => {
        navigate(item.key)
    }

    return (
        <Layout>
            <Header>
                <Row justify='space-between'>
                    <Col>
                        <img className="login-logo" src={logo} alt="" />
                    </Col>
                    <Col>
                        <span className='style-font'>花花</span>
                        <Popconfirm
                            title="是否确定退出?"
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className='style-font'  type="link" icon={<LogoutOutlined />}>
                                退出
                            </Button>
                        </Popconfirm>
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider>
                    <Menu  items={items} selectedKeys={Location} theme="dark"  mode="inline" onClick={onClickHandler}/>
                </Sider>
                <Content>
                  <Routes path='/home'>
                      {/*<Route path='/' element={<Navigate to='/home/bataBrowsing' /> }></Route>*/}
                      <Route path='/' element={<DataBrowsing />}></Route>
                      <Route path='/article'  element={<Suspense fallback={<div  className="example"><Spin /></div>}>  <Article /></Suspense>}></Route>
                      <Route path='/publish/*' element={<Publish />}></Route>
                  </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}
export  default  Layouts;
