import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from './App.module.scss';

import NavigationBar from './components/Navbar';
import Projects from './components/Projects';
import CreateProject from './components/CreateProject';
import CreateQuest from './components/CreateQuest';

function App() {
  return (
    <Router>
      <NavigationBar/>

      <div className={style.base}>
        <div className={style.content}>

          <Routes>
            <Route exact path="/" element={<Projects/>} />
            <Route exact path="/create-quest" element={<CreateQuest/>} />
            <Route exact path="/create-project" element={<CreateProject/>} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
