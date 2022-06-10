import  {combineReducers} from "redux";

import  user from './user'
import article from "./article";

// configureStore 方法用于创建 store 对象。
const rootReducer=combineReducers({
    user,article
})
export  default rootReducer;
