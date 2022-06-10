import {Table, Space, Button, Image, Tag,Modal,message} from 'antd';
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {delArticle, getArticleTable} from "../../../store/actions";
import defaultImage from '../../../assets/image/error.png'
import './index.scss'
import {useNavigate} from "react-router-dom";



function ArticleTable() {
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const statusLabel = [
        {text: "草稿", color: "default"},
        {text: "待审核", color: "blue"},
        {text: "审核通过", color: "green"},
        {text: "审核拒绝", color: "red"},
    ];
    const columns = [
        {
            title: "封面",
            dataIndex: "cover",
            key: "cover",
            render: (cover) => (
                <Image
                    src={cover?.images?.[0] || defaultImage}
                    width={200}
                    height={120}
                />
            ),
        },
        {
            title: "标题",
            dataIndex: "title",
            key: "title",
            width: 220,
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const info = statusLabel[status]
                return <Tag color={info.color}>{info.text}</Tag>
            }
        },
        {
            title: "发布时间",
            dataIndex: "pubdate",
            key: "pubdate",
        },
        {
            title: "阅读数",
            dataIndex: "read_count",
            key: "read_count",
        },
        {
            title: "评论数",
            dataIndex: "comment_count",
            key: "comment_count",
        },
        {
            title: "点赞数",
            dataIndex: "like_count",
            key: "like_count",
        },
        {
            title: "操作",
            key: "action",
            render: (text,record) => (
                <Space size="middle">
                    <Button className='btnBlue' onClick={()=>editArticleFn(record.id)}  type="link" icon={<EditOutlined/>}/>
                  <Button className='btnRed' onClick={()=>delArticleFn(record.id) } type="link" icon={<DeleteOutlined/>}/>
                </Space>
            ),
        },
    ];
    const editArticleFn=id=>{
        navigate(`/home/publish`,{
            state:{id:id}
        })
    }

    const delArticleFn=(id)=>{
        Modal.confirm({
            title: '您是否确认删除该文章？',
            cancelText: '取消',
            okText: '确认',
            onOk:async () => {
             await    dispatch(delArticle(id))
                const params={
                }
                params.page=1
                params.per_page=20
                dispatch(getArticleTable(params))
             message.success('删除成功')

            },
        })
    }


    useEffect(() => {
        dispatch(getArticleTable({channel_id: ''}))
    }, [dispatch])

    const {tableList} = useSelector((state) => state.article)
    const data=tableList.filter((item)=>{
        item.key=item.id
        return true
    })

    return <>
        <Table pagination={false} columns={columns} dataSource={data}/>
    </>
}

export default ArticleTable
