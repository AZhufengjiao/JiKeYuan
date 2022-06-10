import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Provider } from "react-redux";
import {store} from './store'
import './App.scss';
import {ConfigProvider} from 'antd'

// 默认语言为 en-US，如果你需要设置其他语言，推荐在入口文件全局设置 locale
// import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={locale}>
           <Provider store={store}>
                <App />
           </Provider>
    </ConfigProvider>
);

