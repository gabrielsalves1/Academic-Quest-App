import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from './App.module.scss';

import NavigationBar from './components/Navbar';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import CreateQuest from './pages/CreateQuest';
import QuestManagement from './pages/QuestManagement';
import EvaluateQuest from './pages/EvaluateQuest';

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
            <Route exact path="/quest-management" element={<QuestManagement name="teste"/>} />
            <Route exact path="/evaluate-quest" element={<EvaluateQuest/>} />
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
