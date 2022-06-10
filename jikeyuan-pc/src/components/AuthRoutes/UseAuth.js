import {useEffect, useState} from "react";

function isAuth() {
    let token=localStorage.getItem('geep-pc-token')
if(token){
    // 模拟鉴权成功
    return Promise.resolve()
}
return Promise.reject()

}
function useAuth(){
    // 用于存储鉴权的结果
    const [auth,setAuth]=useState(false)  // true 鉴权成功  false 鉴权失败
    // 用于存储异步状态
    const [loading,setLoading]=useState(true) // true 等待  false 是结束
    useEffect(()=>{
        // console.log(localStorage.getItem('geep-pc-token'))
        isAuth()
            // 成功
            .then(()=>{
                setAuth(true)
             })
            .catch(()=>{
                 setAuth(false)
             })
            .finally(()=>{
                // 不管成功还是失败，都是将异步状态更新为结束
                setLoading(false)
            })
    },[])
    // 返回异步状态和鉴权结果
    return {auth,loading}
}
export default useAuth
