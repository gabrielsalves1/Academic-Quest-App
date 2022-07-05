import React, { useState, useContext, useEffect } from 'react';
import { Routes as RoutesSwitch, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import { Context } from "../Context/AuthContext";
import NavigationBar from '../components/Navbar';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Projects from '../pages/Projects';
import Groups from '../pages/Groups';
import CreateGroup from '../pages/CreateGroup';
import CreateProject from '../pages/CreateProject';
import CreateQuest from '../pages/CreateQuest';
import EditGroup from '../pages/EditGroup';
import QuestManagement from '../pages/QuestManagement';
import EvaluateQuest from '../pages/EvaluateQuest';
import ViewTask from '../pages/ViewTask';
import ViewGroup from '../pages/ViewGroup';
import ViewProject from '../pages/ViewProject';
import EditProject from '../pages/EditProject';

export default function Routes() {
  const [ tokenIsValid, setTokenIsValid ] = useState(false);
  const { authenticated, recoverUser } = useContext(Context);
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    setTokenIsValid(recoverUser(token));
  }, [tokenIsValid]);

  function PrivateRouteAdmin() {
    const role = localStorage.getItem('role').replace(/"/g, '');

    if(authenticated || tokenIsValid) {
      if(role === "PROFESSOR") {
        return authenticated || tokenIsValid ? <Outlet/> : <Navigate to="/login"/>;
      }
    }
  }

  function PrivateRouteStudent() {
    const role = localStorage.getItem('role').replace(/"/g, '');

    if(authenticated || tokenIsValid) {
      if(role === "ALUNO") {
        return authenticated || tokenIsValid ? <Outlet/> : <Navigate to="/login"/>;
      }
    }
  }

  return (
    <>
      {pathname !== '/login' && <NavigationBar />}

      <RoutesSwitch>
        <Route exact path="/login" element={<Login/>} />
        <Route path="*" element={<Page404/>}/>

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
          <Route exact path="/view-project/:idProject" element={<ViewProject/>}/>
          <Route exact path="/edit-group/:idGroup/subject/:idSubject" element={<EditGroup/>}/>
          <Route exact path="/edit-project/:idProject" element={<EditProject/>}/>
        </Route>

        <Route element={<PrivateRouteStudent/>}>
          <Route exact path="/teste" element={<h1>xD</h1>}/>
        </Route>
      </RoutesSwitch>
    </>
  );
}