import {Button, Form, Input, Space, Toast} from "antd-mobile";
import {LeftOutline} from 'antd-mobile-icons'
import './index.scss'
import {login} from "../../store/actions/login";
import {useDispatch} from "react-redux";
import {  useNavigate} from "react-router-dom";
import { useEffect, useRef, useState} from "react";
import {InputRef} from "antd-mobile/es/components/input";

let timeVal: NodeJS.Timer;
function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form] = Form.useForm()
    // mobile 数据存储
    const inputRef = useRef<InputRef>(null)
    // 存储验证码倒计时时间
    const [timeLeft, setTimeLeft] = useState(0)

    type formType = {
        code: string;
        mobile: string;
    }
    // 提交表单
    const onFinish = async (values:formType) => {
        try {
            const {code,mobile} = values
            await dispatch(login(mobile, code))

            // 登录成功提示
            Toast.show({
                content: '登录成功',
                duration: 600,
                afterClose: () => {
                    navigate('/home')
                },
            })

        } catch (e:any) {
            Toast.show({
                content: e.response?.data?.message,
                duration: 1000,
            })
        }
    }
    // 防抖
    let spanF = useRef(true)

    // 点击验证码
    const spanCliHandle = () => {
        //  查看是否有手机号
        const mobile = form.getFieldValue('mobile')
        // 状态 校验手机号  true代表格式不正确
        const flag = form.getFieldError('mobile').length > 0
        // 给输入库自动获取焦点
        if (mobile === undefined || mobile.trim() === '' || flag) {
            return inputRef.current?.focus()
        }

        if (spanF.current) {
            setTimeLeft(3)
            spanF.current = false
            // const say = () => {
            //     let flag = true;
            //     // setTimeLeft((timeLeft) => {
            //     //     --timeLeft;
            //     //     if (timeLeft === 0) {
            //     //         spanF.current=true
            //     //         clearInterval(timeVal)
            //     //     }
            //     //     return timeLeft
            //     // })
            //     setTimeLeft((timeLeft) =>--timeLeft)
            // }
            //
            // timeVal = setInterval(say, 1000)

            timeVal = setInterval(()=>{
                setTimeLeft((timeLeft) =>timeLeft-1)
            },1000)
        }

    }
    useEffect(()=>{
        if(timeLeft===0){
            spanF.current = true
           clearInterval(timeVal)
        }
    },[timeLeft])

    return   <div className={'login'}>
        <div className={'login-nav-bar'}>
            <Space wrap style={{fontSize: 36}}>
                <LeftOutline onClick={()=>navigate(-2)} color='#999' fontSize={18}/>
            </Space>
        </div>
        <div className={'wrapper'}>
            <h3 className={'wrapper-h3'}>短信登录</h3>
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name='mobile'
                    validateTrigger={'onChange'}
                    rules={[{required: true, message: '请输入手机号'}, {
                        pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误'
                    }]}
                >
                    <Input ref={inputRef} placeholder='请输入手机号'/>
                </Form.Item>

                <Form.Item
                    name='code'
                    label=''
                    validateTrigger={'onChange'}
                    rules={[{required: true, message: '请输入验证码'}]}
                >
                    <div className={'code-box'}>
                        <Input placeholder='请输入验证码'/><span
                        onClick={timeLeft === 0 ? spanCliHandle : undefined}>{timeLeft === 0 ? '发送验证码' : `${timeLeft}后重新获取`}</span>
                    </div>

                </Form.Item>

                <Form.Item shouldUpdate>
                    <Button type={'submit'} className="login-submit">登 录</Button>
                </Form.Item>
            </Form>

        </div>
    </div>

}

export default Login
