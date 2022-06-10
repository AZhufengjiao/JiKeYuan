import {
    BrowserRouter,
    Routes,
    Route, Navigate,
} from "react-router-dom";
import Layouts from './components/Layouts/index.js'
import Login from './pages/Login/index.js'
import AuthGuard from "./components/AuthRoutes/AuthGuard";
import React from "react";

function App() {
  return (
     <BrowserRouter>
        <Routes>
            <Route path='/'  element={<Navigate to='/home' />}  />
            <Route path='/home/*'  element={<AuthGuard><Layouts /></AuthGuard>}  />
            <Route path="/about" element={<div>about</div>}/>
            <Route path='/login' element={<Login /> } />
        </Routes>
     </BrowserRouter>
  );
}

export default App;
