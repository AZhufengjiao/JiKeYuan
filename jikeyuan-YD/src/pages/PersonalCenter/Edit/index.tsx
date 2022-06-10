import { List, NavBar,Dialog,Popup,Toast,DatePicker } from 'antd-mobile'
import './index.scss'
import dayjs from 'dayjs'
import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../types/store";
import {useNavigate} from "react-router-dom";
import {getUserProfile, logout, updateUserPhoto, updateUserProfile} from "../../../store/actions";
import {useEffect} from "react";
import EditInput from "./EditInput";
import EditGender from "./EditGender";

type InputPopup={
    type:'' |'name' | 'intro',
    value:string,
    visible:boolean
}
type GenderPopup={
    type:''| 'gender'|'photo',
    visible:boolean
}

function Edit(){
    const navigator=useNavigate()
    const dispatch=useDispatch()
    const fileRef=useRef<HTMLInputElement>(null)

    // 发起请求
    useEffect(()=>{
        dispatch(getUserProfile())
    },[dispatch])

    // 获取图片
    const {userProfile:{photo,name,gender,birthday,intro}}=useSelector((state:RootState)=>state.personalCenter)

    // 退出
    const EditHandle=()=>{
        Dialog.confirm({
            title: '温馨提示',
            content: '亲，您确定要退出吗？',
            onConfirm:()=>{
                dispatch(logout())
                navigator('/login')
            }
        })
    }

    // 修改昵称,简介组件显示
    const [visibleName, setVisibleName] = useState<InputPopup>({
        type:'',
        value:'',
        visible:false
    })
    // 昵称组件显示
    const onInputShow=()=>{
        setVisibleName({
            type:'name',
            value:name,
            visible:true
        })
    }
    // 组件隐藏
    const onInputHide=()=>{
        setVisibleName({
            type:'',
            value:'',
            visible:false
        })
    }
    // 简介组件显示
    const onIntroShow=()=>{
        setVisibleName({
            type:'intro',
            value:intro,
            visible:true
        })
    }
    // 在修改昵称组件返回
    const InputHide=()=>{
        onInputHide()
    }


    // 修改性别，头像组件显示
    const [visibleGender, setVisibleGender] = useState<GenderPopup>({
        type:'',
        visible:false
    })
    // 修改性别组件显示
    const onGenderShow=()=>{
        setVisibleGender({
            type:'gender',
            visible:true
        })
    }
    // 修改头像组件显示
    const onImageShow=()=>{
        setVisibleGender({
            type:'photo',
            visible:true
        })
    }
    // 修改性别组件隐藏
    const onGenderHide=()=>{
        setVisibleGender({
            type:'',
            visible:false
        })
    }


    // 日期修改 日期组件显示
    const [visibleDatePicker, setVisibleDatePicker] = useState(false)
    // 日期组件显示
    const onDatePickerShow=()=>{
        setVisibleDatePicker(true)
    }
    // 日期组件隐藏
    const onDatePickerHide=()=>{
        setVisibleDatePicker(false)
    }

    // 拿到昵称，简介修改的数据
    const onUpdateName=(type:'name'|'intro'| 'gender' | 'photo'|'birthday',name:string)=>{
        if(type==='photo'){
            fileRef.current?.click()
        }else{
            console.log(type,name)
            dispatch(updateUserProfile({[type]:name}))
            Toast.show({
                icon: 'success',
                content: '更新成功',
                duration: 1000,
            })
            onInputHide()
            onGenderHide()
        }
    }
    // 拿到头像，性别修改的数据
    const onChangeFile=async (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files?.[0]
        if(!file)return
        const photoData=new FormData()
        photoData.append('photo',file)

      await  dispatch(updateUserPhoto(photoData))
        onGenderHide()
    }
    // 拿到日期修改的数据
    const onUpdateDatePicker=(res:Date)=>{
        const birthday=dayjs(res).format('YYYY-MM-DD')
        onUpdateName('birthday',birthday)
    }


    return <div className={'edit'}>
         {/* 标题  有框架 手写的就用这一次 */}
         {/*<Header  msg={title}></Header>*/}
        <NavBar onBack={()=> navigator(-1)}>个人信息</NavBar>

        <List className={'listBorder'} style={{height:'150px'}}>
            <List.Item extra={
                <div className={'listBorder-img'}>
                    <img src={photo} alt=""/>
                </div>
            } onClick={onImageShow}>
                头像
            </List.Item>
            <List.Item extra={name} onClick={onInputShow}>
                昵称
            </List.Item>
            <Popup
                visible={visibleName.visible}
                position='right'
                destroyOnClose
                bodyStyle={{ width: '100%' }}
            >
                <EditInput key={visibleName.type} type={visibleName.type} onClose={InputHide} onUpdateName={onUpdateName}   value={visibleName.type==='name'?name:intro??''} ></EditInput>
            </Popup>

            <List.Item extra={
                <span className={'intro'}>{intro || '未填写'}</span>
            }  onClick={onIntroShow}>简介</List.Item>
        </List>

        <List className={'BorderTop'} style={{background: '#fff'}}>
            <List.Item extra={gender?'女':'男'} onClick={onGenderShow}>
               性别
            </List.Item>
            <Popup
                visible={visibleGender.visible}
                onMaskClick={onGenderHide}
            >
                <EditGender type={visibleGender.type} onUpdateGender={onUpdateName} onClose={onGenderHide}></EditGender>
            </Popup>

            <List.Item extra={birthday}  onClick={onDatePickerShow}>生日</List.Item>

            <Popup
                visible={visibleDatePicker}
                onMaskClick={onDatePickerHide}
            >
                <DatePicker
                    title='选择生日'
                    value={new Date(birthday)}
                    visible={visibleDatePicker}
                    onClose={onDatePickerHide}
                    min={new Date(1900, 0, 1, 0, 0, 0)}
                    max={new Date()}
                    onConfirm={onUpdateDatePicker }
                />
            </Popup>

        </List>

        <h2 onClick={EditHandle}  className={'quit'}>退出登录</h2>

        <div >
            <input type="file" hidden ref={fileRef} onChange={onChangeFile} />
        </div>
    </div>
}
export default Edit
