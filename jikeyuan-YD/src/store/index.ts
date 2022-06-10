import {createStore,applyMiddleware}from 'redux'
// 中间件
import thunk from 'redux-thunk'
// 调试工具
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'

const middlewares=composeWithDevTools(applyMiddleware(thunk))
const store=createStore(rootReducer,middlewares)

export default store
