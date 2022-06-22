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
          <div className={style.titles}>
            <h2 className={style.title}>Projeto</h2>
            <h2 className={style.title}>Status</h2>
          </div>

          <ul>
            { projects?.map((project) => {
              if(project.status === "EM_ANDAMENTO") {
                return (
                  <li className={style.project}>
                    <LinkButton to="/projects" classStyle="purple">
                      {project.nome}
                    </LinkButton>
                    <span className={style.active}>Ativo</span>
                    <LinkButton to={`/quest-management/${project.id}`}>
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