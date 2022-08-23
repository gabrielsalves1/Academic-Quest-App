import React, { useState, useContext, useEffect } from 'react';
import { Routes as RoutesSwitch, Route, Navigate, Outlet, useLocation } from 'react-router-dom';

import { Context } from "../Context/AuthContext";
import NavigationBar from '../components/Navbar';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Home from '../pages/Admin/Home';
import Projects from '../pages/Admin/Projects';
import Groups from '../pages/Admin/Groups';
import CreateGroup from '../pages/Admin/CreateGroup';
import CreateProject from '../pages/Admin/CreateProject';
import CreateQuest from '../pages/Admin/CreateQuest';
import EditGroup from '../pages/Admin/EditGroup';
import QuestManagement from '../pages/Admin/QuestManagement';
import EvaluateQuest from '../pages/Admin/EvaluateQuest';
import ViewTask from '../pages/Admin/ViewTask';
import ViewGroup from '../pages/Admin/ViewGroup';
import ViewProject from '../pages/Admin/ViewProject';
import EditProject from '../pages/Admin/EditProject';
import HomeStudent from '../pages/Student/HomeStudent';
import ProjectsStudent from '../pages/Student/ProjectsStudent';
import Dashboard from '../pages/Admin/Dashboard';
import ViewDashboard from '../pages/Admin/ViewDashboard';
import TasksStudent from '../pages/Student/TasksStudent';

export default function Routes() {
  const [ tokenIsValid, setTokenIsValid ] = useState(false);
  const { authenticated, recoverUser } = useContext(Context);
  const { pathname } = useLocation();
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    
    setTokenIsValid(recoverUser(token));
  }, [tokenIsValid]);

  function PrivateRoute() {
    if(authenticated || tokenIsValid) {
      return authenticated || tokenIsValid ? <Outlet/> : <Navigate to="/login"/>;
    }
  }

  return (
    <>
      {pathname !== '/login' && <NavigationBar />}

      <RoutesSwitch>
        <Route exact path="/login" element={<Login/>} />
        <Route path="*" element={<Page404/>}/>

        <Route element={<PrivateRoute/>}>

          {role === "PROFESSOR" && (
            <>
              <Route exact path="/" element={<Home/>}/>
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
              <Route exact path="/dashboard" element={<Dashboard/>}/>
              <Route exact path="/view-dashboard/:idProject" element={<ViewDashboard/>}/>
            </>
          )}
         
          {role === "ALUNO" && (
            <>
              <Route exact path="/" element={<HomeStudent/>}/>
              <Route exact path="/projects" element={<ProjectsStudent/>}/>
              <Route exact path="/project/:idProject/group/:idGroup/tasks" element={<TasksStudent/>}/>
            </>
          )}
        </Route>
      </RoutesSwitch>
    </>
  );
}