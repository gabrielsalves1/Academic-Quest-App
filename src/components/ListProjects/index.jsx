import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import style from "./ListProjects.module.scss";

import { getData } from "../../service/requests";
import LinkButton from "../LinkButton";

export default function ListProjects(props) {
  const [ loading, setLoading ] = useState();
  const [ projects, setProjects ] = useState();

  useEffect(() => {
    getData(`/projetos/materia/${props.subjectId}`, setProjects, setLoading);
  }, [props.subjectId]);

  return (
    <>
      { loading ? (
        <ul>
          { projects?.map((project) => {
            if(project.status === "EM_ANDAMENTO") {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-project/${project.id}`} classStyle="purple">
                    Projeto {project.nome}
                  </LinkButton>
                  <span className={style.active}>Ativo</span>
                  <LinkButton to={`/project/${project.id}/quest-management`}>
                    Gerenciar Quest <BsPencil className={style.icon}/>
                  </LinkButton>
                </li>
              );
            } else if(project.status === "CONCLUIDO") {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-project/${project.id}`} classStyle="purple">
                    {project.nome}
                  </LinkButton>
                  <span className={style.finished}>Concluído</span>
                  <LinkButton to={`/project/${project.id}/quest-management`}>
                    Gerenciar Quest <BsPencil className={style.icon}/>
                  </LinkButton>
                </li>
              );
            } else {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-project/${project.id}`} classStyle="purple">
                    {project.nome}
                  </LinkButton>
                  <span className={style.active}>{project.status}</span>
                  <LinkButton to={`/project/${project.id}/quest-management`}>
                    Gerenciar Quest <BsPencil className={style.icon}/>
                  </LinkButton>
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