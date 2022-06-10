import {NavBar, Toast, Button} from 'antd-mobile'
import {CloseCircleOutline} from 'antd-mobile-icons'
import {CloseOutline} from 'antd-mobile-icons'
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../types/store";
import {useState} from "react";
import {addChannel, delChannel, getAllChannel} from "../../../../store/actions/home";
import {useInitialState} from "../../../../utils/use-initial-state";
import classNames from "classnames";
import {Channel} from "../../../../types/data";
import {HomeState} from "../../../../store/reducers/home";

type Props = {
    onClose: () => void
}

/***
 * 退出弹出框
 * @param onClose
 * @constructor
 */
function Channels({onClose}: Props) {
    const dispatch = useDispatch()
    // 我的频道
    const {userChannel} = useSelector((state: RootState) => state.home)
    // 我没有的频道
    const {restChannel} = useInitialState(getAllChannel, 'home')

    const right = (
        <div style={{fontSize: 18, color: '#bfc2cb', fontWeight: 700}}>
            <CloseOutline onClick={onClose}/>
        </div>
    )
    const back = () =>
        Toast.show({
            content: '点击了返回区域',
            duration: 1000,
        })

    const [isEdit, setIsEdit] = useState(false)
    const onChangeEdit = () => {
        setIsEdit(!isEdit)
    }

    // 点击频道   删除
    const onChannelClick = (item: Channel) => {
        if (!isEdit) {
            dispatch({type: 'home/changeTab', payload: item.id + ''})
            onClose()
            return
        }
        // 判断是不是推荐频道 是就组织
        if (item.id === 0) return
        // 判断我的频道数量是否小于四
        if (userChannel.length <= 4) return
        dispatch(delChannel(item))
    }

    // 添加频道
    const onAddChannel=(item:Channel)=>{
       dispatch(addChannel(item))
    }

    return <>
        <NavBar right={right} onBack={back} backArrow={false}>
        </NavBar>
        <div className={'ChannelE'}>

            <div className={'editChannel'}>我的频道：  &nbsp;
                <span>点击进入频道</span>
                <Button className={classNames(isEdit && 'colorFont')} size='mini' shape='rounded'
                        onClick={onChangeEdit}>
                    {isEdit ? '完成' : '编辑'}
                </Button>
            </div>

            {/* 我的频道 */}
            <div className={'list'}>
                <ul>
                    {userChannel.map((item) =>
                        <li onClick={() => onChannelClick(item)} key={item.id}>{item.name}
                            {isEdit ? <CloseCircleOutline className={'Icon'} color='#bfc2cb'/> : null}
                        </li>
                    )}
                </ul>
            </div>

            <div className={'optionChannel'}>可选频道：</div>

            {/* 可选频道 */}
            <div className={'list'}>
                <ul>
                    {restChannel.map((item) => {
                        return <li onClick={()=>onAddChannel(item)} key={item.id}>+ {item.name}</li>
                    })}
                    {/*<li className={'orange'} className={classnames('orange')}>推荐</li>*/}
                </ul>
            </div>
        </div>
    </>
}

export default Channels
