import React, { useState, useContext, useEffect } from 'react';
import { Routes as RoutesSwitch, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import { Context } from "../Context/AuthContext";
import NavigationBar from '../components/Navbar';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import Groups from '../pages/Groups';
import CreateProject from '../pages/CreateProject';
import CreateQuest from '../pages/CreateQuest';
import QuestManagement from '../pages/QuestManagement';
import EvaluateQuest from '../pages/EvaluateQuest';
import ViewTask from '../pages/ViewTask';

export default function Routes() {
  const [ tokenIsValid, setTokenIsValid ] = useState(false);
  const { authenticated, recoverUser } = useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenIsValid(recoverUser(token));
  }, []);

  function PrivateRoute() {
    return authenticated || tokenIsValid ? <Outlet/> : <Navigate to="/login"/>
  }

  return (
    <>
      {pathname !== '/login' && <NavigationBar />}

      <RoutesSwitch>
        <Route exact path="/login" element={<Login/>} />

        <Route element={<PrivateRoute/>}>
            <Route exact path="/projects" element={<Projects/>}/>
            <Route exact path="/groups" element={<Groups/>}/>
            <Route exact path="/create-quest" element={<CreateQuest/>}/>
            <Route exact path="/create-project" element={<CreateProject/>}/>
            <Route exact path="/quest-management" element={<QuestManagement name="teste"/>}/>
            <Route exact path="/evaluate-quest" element={<EvaluateQuest/>}/>
            <Route exact path="/view-task" element={<ViewTask/>}/>
        </Route>
      </RoutesSwitch>
    </>
  );
}