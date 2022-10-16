import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import style from "./ListProjectsByStudent.module.scss";

import { getData } from "../../service/requests";
import { Link } from "react-router-dom";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarGray from "../StatusBarGray";
import BoxFlexDirectionColumn from "../BoxFlexDirectionColumn";

export default function ListProjects(props) {
  const [ loading, setLoading ] = useState();
  const [ projects, setProjects ] = useState();

  useEffect(() => {
    const idUser = sessionStorage.getItem('idUser')
    getData(`/aluno/projetosGrupo/${idUser}`, setProjects, setLoading);
  }, [])

  return (
    <>
   
      { loading ? (
        <div className={style.containerForbox}>
          { projects?.map((project) => {
            switch(project.statusProjeto) {
              case "EM_ANDAMENTO":
                return (
                  <Link to={`/project/${project.projetoId}/group/${project.grupoId}/tasks`} key={project.id}>
                    <div className={style.BoxGroupQuest}>
                      <BoxFlexDirectionColumn>
                        <StatusBarGreen classStyle="slim">Em andamento</StatusBarGreen> 
                        <h1 className={style.title}> {project.nomeMateria}</h1>
                        <h2 className={style.subtitle}>Projeto:  <span className={style.textBody}>{project.nomeProjeto}</span></h2>
                        <p className={style.nota}><span className={style.textBody}>Nota:</span> {project.notaProjeto}</p>
                      </BoxFlexDirectionColumn>
                    </div>
                </Link>
                )
              case "CONCLUIDO":
                return (
                  <Link to={`/project/${project.projetoId}/group/${project.grupoId}/tasks`} key={project.id}>
                    <div className={style.BoxGroupQuest}>
                    <BoxFlexDirectionColumn>
                        <StatusBarGray classStyle="slim">Concluído</StatusBarGray> 
                        <h1 className={style.title}> {project.nomeMateria}</h1>
                        <h2 className={style.subtitle}>Projeto:  <span className={style.textBody}>{project.nomeProjeto}</span></h2>
                        <p className={style.nota}><span className={style.textBody}>Nota:</span> {project.notaProjeto}</p>
                      </BoxFlexDirectionColumn>
                    </div>
                  </Link>
                )
            }}
            )
          }
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    
    </>
  );
}