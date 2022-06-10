import {  Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getArticleTable} from "../../../store/actions";

function Paging(){
    const dispatch= useDispatch()
    function onShowSizeChange(current, pageSize) {
        const params={
        }
        params.page=current
        params.per_page=pageSize
        dispatch(getArticleTable(params))
    }
    function pageSize(page, pageSize){
        const params={
        }
        params.page=page
        params.per_page=pageSize
        dispatch(getArticleTable(params))
    }

    const {page,per_page,total_count} =useSelector((state)=>state.article)
return <>
    <Pagination
        style={{margin:'20px',textAlign:'center'}}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={pageSize }
        defaultCurrent={1}
        total={total_count}
        current={page}
        pageSize={per_page}
    />
</>
}
export default Paging
