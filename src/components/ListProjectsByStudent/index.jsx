import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import style from "./ListProjectsByStudent.module.scss";

import { getData } from "../../service/requests";
import LinkButton from "../LinkButton";

export default function ListProjects(props) {
  const [ loading, setLoading ] = useState();
  const [ projects, setProjects ] = useState();

  useEffect(() => {
    getData('/aluno/projetosGrupo/3', setProjects, setLoading);
  }, [])

  return (
    <>
      { loading ? (
        <ul>
          { projects?.map((project) => {
            if(project.statusProjeto === "EM_ANDAMENTO") {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-project/${project.id}`} classStyle="purple">
                    {project.nomeProjeto}
                  </LinkButton>
                  <span className={style.active}>Ativo</span>
                  <span className={style.infoText}>Nota: {project.notaProjeto}</span>
                  <div className={style.infoProject}>
                    <span className={style.infoText}>Matéria: {project.nomeMateria}</span>
                    <span className={style.infoText}>Grupo: {project.nomeGrupo}</span>
                  </div>
                </li>
              );
            } else if(project.statusProjeto === "CONCLUIDO") {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-project/${project.id}`} classStyle="purple">
                    {project.nomeProjeto}
                  </LinkButton>
                  <span className={style.finished}>Concluído</span>
                  <span className={style.infoText}>Nota: {project.notaProjeto}</span>
                  <div className={style.infoProject}>
                    <span className={style.infoText}>Matéria: {project.nomeMateria}</span>
                    <span className={style.infoText}>Grupo: {project.nomeGrupo}</span>
                  </div>
                </li>
              );
            } else {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-project/${project.id}`} classStyle="purple">
                    {project.nome}
                  </LinkButton>
                  <span className={style.active}>{project.status}</span>
                  <span className={style.infoText}>Nota: {project.notaProjeto}</span>
                  <div className={style.infoProject}>
                    <span className={style.infoText}>Matéria: {project.nomeMateria}</span>
                    <span className={style.infoText}>Grupo: {project.nomeGrupo}</span>
                  </div>
                </li>
              );
            }}
            )
          }
        </ul>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </>
  );
}