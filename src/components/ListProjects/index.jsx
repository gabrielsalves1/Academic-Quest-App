import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import style from "./ListProjects.module.scss";

import { getData } from "../../service/requests";
import LinkButton from "../LinkButton";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarGray from "../StatusBarGray";
import BoxChild from "../BoxChild";

export default function ListProjects(props) {
  const [ loading, setLoading ] = useState();
  const [ projects, setProjects ] = useState();

  useEffect(() => {
    getData(`/projetos/materia/${props.subjectId}`, setProjects, setLoading);
  }, [props.subjectId]);

  return (
    <>
      { loading ? (
        <div className={style.containerProjetos}>
          <div className={style.boxStatus}>
            <StatusBarGreen>Ativos</StatusBarGreen>  
              { projects?.map((project) => {
                if(project.status === "EM_ANDAMENTO") {
                  return (
                    <BoxChild urlProject={`/view-project/${project.id}`} urlConfigProject={`/project/${project.id}/quest-management`} key={project.id}>
                      {project.nome}
                    </BoxChild>
                  );
                }  else {
                    return (
                      <div className={style.boxForLayout} key={project.id}></div>
                    )
                }
              })}
          </div>
          <div className={style.boxStatus}>
            <StatusBarGray>Finalizados</StatusBarGray>  
              { projects?.map((project) => {
                if(project.status === "CONCLUIDO") {
                  return (
                    <BoxChild urlProject={`/view-project/${project.id}`} urlConfigProject={`/project/${project.id}/quest-management`} key={project.id}>
                      {project.nome}
                    </BoxChild>
                  );
                } else {
                    return (
                      <div className={style.boxForLayout} key={project.id}></div>
                    )
                }
              })}
          </div>
        
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }

       
    </>
  );
}