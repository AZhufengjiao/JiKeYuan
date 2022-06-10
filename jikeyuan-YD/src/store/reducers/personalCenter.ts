import {User, UserProfile} from "../../types/data";
import {ProfileAction} from "../../types/store";

// 我的
type ProfileState={
    user:User,
    userProfile:UserProfile
}

const initialState={
    user:{},
    userProfile:{}
} as ProfileState

const personalCenter=(state=initialState,action:ProfileAction):ProfileState=>{
    switch (action.type) {
        case "profile/getUser":
            return {
                ...state,
                user:action.payload
            };
        case 'profile/getUserProfile':
            return {
                ...state,
                userProfile:action.payload
            };
        case 'profile/update':
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    ...action.payload
                }
            }
        default:
           return  state
    }
}
export default personalCenter
