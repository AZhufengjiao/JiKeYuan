import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../types/store";
import {useEffect} from "react";
type StateNameType = "home"

const useInitialState=  (action:any,stateName:StateNameType)  =>{
    const dispatch=useDispatch()
    const state=useSelector((state:RootState)=>state[stateName])

    useEffect(()=>{
        dispatch(action())
    },[dispatch,action])

    return state
}
// const useInitialState= <T>(action:any,stateName:StateNameType):T =>{
//     const dispatch=useDispatch()
//     const state=useSelector((state:RootState)=>state[stateName])
//
//     useEffect(()=>{
//         dispatch(action())
//     },[dispatch,action])
//
//     return state as T
// }
export {useInitialState}
