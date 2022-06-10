import { NavBar,Input,TextArea} from 'antd-mobile'
import './index.scss'
import React, {useEffect, useState} from 'react'

type Props={
    type:''|'name'|'intro',
    value:string,
    onClose:()=>void,
    onUpdateName:(type:'name'|'intro',name:string)=>void,
}

function EditInput({value,onClose,onUpdateName,type}:Props){
    const [name,setName]=useState(value)
    const isName= type==='name'

    useEffect(()=>{
        setName(value??'')
    },[value])

    // 给父组件传递修改的昵称
    const onSave=()=>{
        if(type==='')return
        onUpdateName(type,name)
        onClose()
    }

    const right = (
        <div style={{ fontSize: 24 }}>
            <span className={'span'} onClick={onSave}>提交</span>
        </div>
    )

    return <div className={'editInput'}>
            <NavBar right={right} onBack={onClose}>
                编辑{isName?'昵称':'简介'}
            </NavBar>

        <div className={'input'}>
            {isName?
            <Input
                value={name}
                onChange={val => {
                    setName(val)
                }}
                 />
                :
            <TextArea
                placeholder='请输入简介'
                defaultValue={''}
                showCount
                rows={4}
                value={name}
                maxLength={100}
                onChange={val => {
                    setName(val)
                }}
            />}



        </div>
    </div>
}
export default EditInput
