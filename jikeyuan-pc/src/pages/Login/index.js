import './index.scss'
import logo from '../../assets/image/logo.536c5d80.png'
import {message, Button, Card, Form, Input,Checkbox} from "antd";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from '../../store/actions/user'

function Login(){
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const onFinish = async (values) => {
       const {mobile,code}=values
        try {
            await dispatch(login(mobile,code))
            // console.log(localStorage.getItem('geep-pc-token'))
            message.success('登录成功');
            navigate('/home')
        }catch (e) {
            message.error(e.response?.data?.message || '登录失败')
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.warning('用户名或密码错误，请重新登录');
        console.log('Failed:', errorInfo);
    };
    return (
            <div className='login'>
                <Card  className='login-container' style={{ width: 450 }}>
                    <img className="login-logo" src={logo} alt="" />

                    {/* 表单 */}
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            mobile: '13911111111',
                            code: '246810',
                            isAgree: true
                        }}
                    >
                        <Form.Item
                            // label="Username"
                            name="mobile"
                            rules={[
                                { required: true, message: "请输入手机号" },
                                {
                                    pattern: /^1[3-9]\d{9}$/,
                                    message: "手机格式不正确",
                                },
                            ]}
                        >
                            <Input placeholder='请输入手机号'  />
                        </Form.Item>

                        <Form.Item
                            // label="Password"
                            name="code"
                            rules={[
                                { required: true, message: "请输入验证码" },
                                { len: 6, message: "验证码6个字符串" },
                            ]}
                        >
                            <Input placeholder='请输入验证码' />
                        </Form.Item>
                        <Form.Item
                            name="isAgree"
                            rules={[
                                {
                                    validator: (_, value) => {
                                        if (value === true) return Promise.resolve();
                                        else return Promise.reject(new Error("请勾选我已阅读并同意"));
                                    },
                                },
                        ]}  valuePropName="checked">
                            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Button className='btnSub' type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
    )
}
export default Login;
