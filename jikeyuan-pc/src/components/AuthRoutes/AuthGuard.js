import useAuth from "./UseAuth";
import { Navigate } from "react-router-dom";
import Buffer from '../Spin'

function AuthGuard({children}) {
    // 调用鉴权狗子，获取异步状态及鉴权结果
    const {auth,loading} =useAuth() // loading true 等待  false 是结束   auth true 鉴权成功  false 鉴权失败
    if(loading) return <Buffer></Buffer>
    return auth? children: <Navigate to="/login" />;
}
export default AuthGuard
