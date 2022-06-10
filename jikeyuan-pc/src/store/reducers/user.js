// 登录功能，只需要存储 token 即可，所以，状态默认值为：''
const initialState={
    token:localStorage.getItem('geep-pc-token')||'',
}

const user=(state=initialState,action)=>{
    switch (action.type) {
        case 'setLoginToken':
            return {
                ...state,
                token:action.payload
            }
        case 'RemoveToken':
            return {
                ...state,
                token:null
            }
        default:
            return state
    }
    return state
}

export  default user
