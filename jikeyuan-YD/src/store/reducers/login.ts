interface Token {
    token:string,
    refresh_token:string
}
const initialState: Token={
    token:localStorage.getItem('geek-yd-token') ||'',
    refresh_token:''
}
export const login=(state=initialState,action:any)=>{
    switch (action.type) {
        case 'setLoginToken':
            return {
                ...state,
                token:action.payload.token,
                refresh_token:action.payload.refresh_token
            }
        case 'login/logout':
            console.log(state.token)
            return initialState
    }
    return state
}
