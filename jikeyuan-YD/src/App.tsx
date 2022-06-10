import React,{Suspense} from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import {Loading} from "antd-mobile";
import Edit from "./pages/PersonalCenter/Edit";
import Article from "./pages/Home/components/Article";
import Search from "./pages/Home/components/Search";
import SearchResult from "./pages/Home/components/SearchResult";
import CommentFooter from "./components/CommentFooter";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path={'/*'} element={<Suspense fallback={<Loading></Loading>}>
                <Layout></Layout>
            </Suspense>}></Route>

            <Route path={'/login'} element={<Login></Login>}></Route>
            <Route path={'/personalCenter/edit'} element={<Edit></Edit>}></Route>
            <Route path={'/article'} element={<Article></Article>}></Route>
            <Route path={'/search'} element={<Search></Search>}></Route>
            <Route path={'/search/result'} element={<SearchResult></SearchResult>}></Route>
            <Route path={'/commentFooter'} element={<CommentFooter></CommentFooter>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
