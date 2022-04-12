import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from './App.module.scss';

import NavigationBar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <NavigationBar/>

      <div className={style.base}>
        <div className={style.content}>

          <Routes>
            <Route exact path="/" element={<Home/>} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
