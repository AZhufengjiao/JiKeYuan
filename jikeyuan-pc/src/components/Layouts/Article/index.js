import React from 'react'
import {Card, Breadcrumb, DatePicker, Form, Button, Radio } from "antd";
import {Link} from "react-router-dom";
import './index.scss'
import {  getArticleTable} from "../../../store/actions";
import Channel from '../../Channel'
import {useDispatch } from "react-redux";
import ArticleTable from "./Article-table";
import Pag from './Pag'
import moment from 'moment';



function Article() {
    const dispatch=useDispatch()
    //表单
    const onFinish = (values) => {
        const params={}
        params.status=values.state
        params.channel_id=values.channel_id

        if(values.dateArr){
            params.begin_pubdate= moment(values.dateArr[0]).format("YYY-MM-DD")
            params.end_pubdate=moment(values.dateArr[1]).format("YYY-MM-DD")
        }else{
            params.begin_pubdate= undefined
            params.end_pubdate=undefined
        }
        dispatch(getArticleTable(params))
    };



    return (
    <div style={{ padding:'20px' }}>
        <Card title={<Breadcrumb  style={{ width:'100%' }}   separator='/' >
            <Breadcrumb.Item>
                <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
        </Breadcrumb>} style={{ width: "100% "}}>
            {/* 表单 */}
            <Form
                onFinish={onFinish}
                style={{ width: 500  }}>
                <Form.Item
                    label="状态"
                    name="state"
                >
                    <Radio.Group>
                        <Radio value={undefined}>全部</Radio>
                        <Radio value={1}>草稿</Radio>
                        <Radio value={2}>待审核</Radio>
                        <Radio value={3}>审核通过</Radio>
                        <Radio value={4}>审核失败</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="频道"
                    name="channel_id"
                >
                    <Channel width={288}></Channel>
                </Form.Item>

                <Form.Item
                    label="日期"
                    name="dateArr"
                    // rules={[{  message: 'Please input your username!' }]}
                >
                    <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item   >
                    <Button type='primary' htmlType="submit">筛选</Button>
                </Form.Item>
            </Form>
        </Card>

        <Card title={<span style={{padding:"0 24px"}}>根据筛选条件共查询到 5030 条结果：</span>}  style={{ width: '100%' ,marginTop: 24}}>
            <ArticleTable></ArticleTable>
            <Pag></Pag>
        </Card>
    </div>
)
}
export default Article
