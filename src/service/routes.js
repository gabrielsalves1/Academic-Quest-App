import React, { useState, useContext, useEffect } from 'react';
import { Routes as RoutesSwitch, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import { Context } from "../Context/AuthContext";
import NavigationBar from '../components/Navbar';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import Groups from '../pages/Groups';
import CreateGroup from '../pages/CreateGroup';
import CreateProject from '../pages/CreateProject';
import CreateQuest from '../pages/CreateQuest';
import QuestManagement from '../pages/QuestManagement';
import EvaluateQuest from '../pages/EvaluateQuest';
import ViewTask from '../pages/ViewTask';
import ViewGroup from '../pages/ViewGroup';

export default function Routes() {
  const [ tokenIsValid, setTokenIsValid ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const { authenticated, recoverUser } = useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if(role === "PROFESSOR") {
      setIsAdmin(true);
    }
    setTokenIsValid(recoverUser(token));
  }, [tokenIsValid]);

  function PrivateRouteAdmin() {
    return authenticated || tokenIsValid && isAdmin ? <Outlet/> : <Navigate to="/login"/>
  }

  return (
    <>
      {pathname !== '/login' && <NavigationBar />}

      <RoutesSwitch>
        <Route exact path="/login" element={<Login/>} />

        <Route element={<PrivateRouteAdmin/>}>
            <Route exact path="/projects" element={<Projects/>}/>
            <Route exact path="/groups" element={<Groups/>}/>
            <Route exact path="/create-group" element={<CreateGroup/>}/>
            <Route exact path="/project/:idProject/create-quest" element={<CreateQuest/>}/>
            <Route exact path="/create-project" element={<CreateProject/>}/>
            <Route exact path="/project/:idProject/quest-management" element={<QuestManagement/>}/>
            <Route exact path="/project/:idProject/evaluate-quest/:idQuest" element={<EvaluateQuest/>}/>
            <Route exact path="/project/:idProject/view-task/:idQuest/task-group/:idTaskGroup" element={<ViewTask/>}/>
            <Route exact path="/view-group/:idGroup/subject/:idSubject" element={<ViewGroup/>}/>
        </Route>
      </RoutesSwitch>
    </>
  );
}