// createSrore方法创建存储状态的store对象
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers'

//中间件
import thunk from 'redux-thunk'

//createStore方法的第一个参数是一个函数, 函数函数返回什么, Store 中就存储什么
export const store = createStore(rootReducer, applyMiddleware(thunk));
