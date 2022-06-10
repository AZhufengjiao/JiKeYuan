import {combineReducers} from 'redux'

import {login} from './login'
import personalCenter from './personalCenter'
import home from './home'
import search from './search'
import article from "./article";

const rootReducer=combineReducers({
    login,
    personalCenter ,
    home,
    search,
    article
})

export default rootReducer
