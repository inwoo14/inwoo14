import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom"; 

import Login from "./login"
import Main from "./main"
import Write from "./write"
import Detail from './detail/detail';
import Modify from './detail/modify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/main" element={<Main />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/detail" element={<Detail />}/>
        <Route path="/detail/modify" element={<Modify />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

