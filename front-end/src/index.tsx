import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Routes, HashRouter} from 'react-router-dom';
import Home from './pages/Home';
import { GlobalDataProvider } from './hooks/useGlobalData';
import './base.css'
import 'antd/dist/antd.min.css';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home/>} />
    </Routes>
  )
}

ReactDOM.render(
	<HashRouter>
    <GlobalDataProvider>
		  <AppRoutes/>
    </GlobalDataProvider>
	</HashRouter>,
	document.getElementById('root')
);
