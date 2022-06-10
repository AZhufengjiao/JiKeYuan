import {Breadcrumb, Button, Card, Form, message, Radio, Upload} from "antd";
import {   PlusOutlined } from '@ant-design/icons';
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Input from "antd/es/input/Input";
 import ReactQuill from "react-quill";
 import "react-quill/dist/quill.snow.css";
import Channel from "../../Channel";

import './index.scss'
import {useDispatch} from "react-redux";
import {addArticle, editArticle, getArticle} from "../../../store/actions";

function Publish() {
    // const params=useParams()
    const location=useLocation()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [form]=Form.useForm()


    // 完成封面的切换
    const [type,setType]=useState(1)
    const onTypeChange=(e)=>{
        setType(e.target.value)
    }

    const [fileList,setFileList]=useState([])
    //上传
    const onUploadChange=({fileList})=>{
        setFileList(fileList)
    }

    const onFinish =async (values,draft=false ) => {
        if(type!==fileList.length){
            return message.warning('请按照选择的封面类型上传图片')
        }
        //组织提交的数据
        const data={
            ...values,
            cover:{
                type,
                images:fileList.map((item)=>{return item?.response?.data.url|| item.url})
            }
        }
        if(location.state){
            data.id=location.state.id
            await dispatch(editArticle(data,draft))
        }else{
            await dispatch(addArticle(data,draft))
        }
        message.success('保存成功')
        navigate('/home/article')
    };

    // 编辑文章 回显
    useEffect(()=>{
        // console.log(location.state.id)
        const setFormData=async ()=>{
            if(location.state){
                let {title,content,channel_id,cover}=  await dispatch(getArticle(location.state.id))
                form.setFieldsValue({title,content,channel_id})
                setType(cover.type)
                setFileList(cover.images.map(item=>({url:item})))
            }else{
                setType(1)
                setFileList([])
                form.resetFields()
            }
        }
        setFormData()
    },[dispatch,form,location.state])

    // 存草稿
    const saveDarft=async ()=>{
        try{
            const values=await form.validateFields()
          await  onFinish(values,true)
        }catch (e) {

        }
    }

    return (
        <div style={{padding:'20px',height :'100%'}}>
            <Card style={{height:'100%'}}  title={     <Breadcrumb   separator='>' >
                <Breadcrumb.Item>
                    <Link to="/">首页</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{location.state?'修改文章':'发布文章'}</Breadcrumb.Item>
            </Breadcrumb >  } style={{ width:'100%',height :'100%'}}>
                {/*表单*/}
                <Form
                    form={form}
                    onFinish={onFinish}
                    labelCol={{ span:4 }}
                    wrapperCol={{ span:16}}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input  style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请输入所属频道' }]}
                    >
                        <Channel width={400}></Channel>
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        // name="username"
                    >
                        <Radio.Group value={type} onChange={onTypeChange}>
                            <Radio value={1}>单图</Radio>
                            <Radio value={3}>三图</Radio>
                            <Radio value={0}>无图</Radio>
                        </Radio.Group>
                        {type>0?(
                            <div style={{ marginTop: 25, }}>
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    fileList={fileList}
                                    action="http://geek.itheima.net/v1_0/upload"
                                    onChange={ onUploadChange}
                                >
                                    {fileList.length<type?(
                                        <PlusOutlined />
                                    ):null}
                                </Upload>
                            </div>
                        ):null}
                    </Form.Item>
                    <Form.Item
                        label="文章内容："
                        name="content"
                        // wrapperCol={{ span: 16 }}
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                            <ReactQuill placeholder="请输入文章内容" />
                    </Form.Item>
                    <Form.Item style={{paddingLeft:268}}>
                        <Button size='large'  type='primary' htmlType="submit">{location.state?'修改文章':'发布文章'} </Button>
                        <Button  size='large' onClick={saveDarft} style={{marginLeft:10}} >存入草稿</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Publish
