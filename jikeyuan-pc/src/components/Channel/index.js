import {Form, Select} from "antd";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {channels} from "../../store/actions";
import {Option} from "antd/es/mentions";


function Channel({width,value,onChange}) {
    const dispatch=useDispatch()
    useEffect( ()=> {
        dispatch(channels());
    },[dispatch])


    // 获取所有频道列表
    const RadioList = useSelector((state) => state.article.channels)

    return <Select placeholder='请选择文章频道'
                   value={value}
                   onChange={(e) => onChange(e)}
                       style={width?{width}:null} >
            {RadioList.map((item)=>
                <Select.Option key={item.id}
                  value={item.id}>{item.name}</Select.Option>
            )}
        </Select>
}
export  default Channel
