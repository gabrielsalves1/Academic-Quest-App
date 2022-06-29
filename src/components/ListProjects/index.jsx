import React, { useEffect, useState } from "react";
import style from "./ListProjects.module.scss";
import { BsPencil } from "react-icons/bs";
import { getProjects } from "../../service/requests";
import LinkButton from "../LinkButton";

export default function ListProjects(props) {
  const [ projects, setProjects ] = useState();

  useEffect(() => {
    getProjects(props.subjectId, setProjects);
  }, [props.subjectId]);

  return (
    <>
      { projects && projects.length !== 0 &&
        <>
          <ul>
            { projects?.map((project) => {
              if(project.status === "EM_ANDAMENTO") {
                return (
                  <li className={style.project} key={project.id}>
                    <LinkButton to="/projects" classStyle="purple">
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
                    <LinkButton to="/projects" classStyle="purple">
                      {project.nome}
                    </LinkButton>
                    <span className={style.active}>Concluído</span>
                    <LinkButton to={`/project/${project.id}/quest-management`}>
                      Gerenciar Quest <BsPencil className={style.icon}/>
                    </LinkButton>
                  </li>
                );
              } else {
                return (
                  <li className={style.project}>
                    <LinkButton to="/projects" classStyle="purple">
                      {project.nome}
                    </LinkButton>
                    <span className={style.finished}>Finalizado</span>
                    <LinkButton to={`/project/${project.id}/quest-management`}>
                      Gerenciar Quest <BsPencil className={style.icon}/>
                    </LinkButton>
                  </li>
                );
              }
              })
            }
          </ul>
        </>
      }
    </>
  );
}