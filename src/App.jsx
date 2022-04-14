import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from './App.module.scss';

import NavigationBar from './components/Navbar';
import Projects from './components/Projects';
import QuestForm from './components/QuestForm';

function App() {
  return (
    <Router>
      <NavigationBar/>

      <div className={style.base}>
        <div className={style.content}>

          <Routes>
            <Route exact path="/create-quest" element={<QuestForm/>} />
            <Route exact path="/" element={<Projects/>} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
