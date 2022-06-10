import {NavBar, List  , SearchBar} from 'antd-mobile'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { DeleteOutline,CloseOutline,SearchOutline } from 'antd-mobile-icons'
import {clearSuggestion, getSuggestion} from "../../../../store/actions/search";
import {RootState, RootThunkAction} from "../../../../types/store";
import classNames from "classnames";
import './index.scss'
import {log} from "util";

let timer: NodeJS.Timer;

function Search() {
    const GEEK_SEARCH_KEY='search_Key'
    const dispatch = useDispatch()
    const navigator=useNavigate()
    let searchVal=useRef('')
    // 获取关键字数据
    const {suggestion}=useSelector((state:RootState)=>state.search)
    // 历史记录
    const [searchHistory,setSearchHistory]=useState<string[]>([])

    useEffect(()=>{
        const hsitories=JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY)??'[]')
        setSearchHistory(hsitories)
    },[])

    // 防抖
    const onSearchChange = (val: string) => {
        if(!val) return dispatch(clearSuggestion())
        // dispatch(getSuggestion(val))
        clearInterval(timer)
        timer = setTimeout(() => {
            dispatch(getSuggestion(val))
            searchVal.current=val
        }, 500)
    }

    // 让关键字变红色
    const highlightSuggestion=suggestion?.map((item)=>{
        // 转小写  关键字
        const lowerCaseItem=item?.toLocaleLowerCase()
        // 转小写  输入框
        const lowerCaseSearchVal=searchVal.current.toLocaleLowerCase()
        // 查找关键字索引
        const index=lowerCaseItem?.indexOf(lowerCaseSearchVal)
        // 获取搜索字符长度
        const searchValLength=lowerCaseSearchVal.length

        // 关键字左边的字符
        const left=item?.slice(0,index)
        const right=item?.slice(index+searchValLength)
        const search=item?.slice(index,index+searchValLength)
        return {
            left,right,search
        }
    })

    useEffect(()=>{
       return clearInterval(timer)
    })

    // 点击搜索anniu
    const onSearch=(val:string)=>{
        dispatch(clearSuggestion())
        navigator(`/search/result?q=${val}`)
        saveHistories(val)
    }

    // 存储历史记录
    const saveHistories=(value:string)=>{
        // 获取本地搜索历史记录
        const localHistories=JSON.parse(
            localStorage.getItem(GEEK_SEARCH_KEY)??'[]'
        )
        let histories=[]

        // 没有     判断历史记录有没有
        if(localHistories.length===0){
            histories=[value]
        }else{
        //  有  判断是否包含当前搜搜内容
            const exist=localHistories.indexOf(value)>=0
            if(exist){
              // 如果存在
                const leftHistories=localHistories.filter((item:string)=>item!==value)
                histories=[value,...leftHistories]
            }else{
                //如果不存在
                histories=[value,...localHistories]
            }
        }
        localStorage.setItem(GEEK_SEARCH_KEY,JSON.stringify(histories))
    }

    // 清空全部历史记录
    const onClearHistory=()=>{
        setSearchHistory([])
        localStorage.removeItem(GEEK_SEARCH_KEY)
    }

    // 删除单个历史
    const onDeleteHistory=(value:string)=>{
        const newSearchHistory=searchHistory.filter((item)=>item!==value)
        setSearchHistory(newSearchHistory)
        localStorage.setItem('search_Key',JSON.stringify(newSearchHistory))
    }

    return (
        <div className={'Search'}>
            <NavBar right={<span onClick={()=>onSearch(searchVal.current)}>搜索</span>} onBack={()=>navigator(-1)}>
                <SearchBar onChange={onSearchChange} placeholder='请输入内容'/>
            </NavBar>

            {/* 渲染关键字*/}
            <div className={classNames('list',{showZ:suggestion.length>0})}>
                <List>
                    {highlightSuggestion.map((item,index)=>(
                        <List.Item onClick={()=>{ onSearch(item.left+item.search+item.right)}} key={index} prefix={<SearchOutline />}>
                            {item.left}
                            <span>{item.search}</span>
                            {item.right}
                        </List.Item>
                    ))}
                </List>
            </div>

            {/* 历史记录 */}
            <div className={classNames('list',{ show:searchHistory.length>0})}>
                <List header={<i>历史记录
                                    <div onClick={onClearHistory} className={'icon'}>
                        <DeleteOutline />
                    </div></i>}  >

                    {searchHistory.map((item,index)=>(
                        <List.Item onClick={()=>{}} key={index} extra={<CloseOutline onClick={()=>onDeleteHistory(item)} />}>
                            {item}
                        </List.Item>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default Search
