import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import style from "./ListProjectsByDashboard.module.scss";

import { getData } from "../../service/requests";
import LinkButton from "../LinkButton";
import ViewDashboard from "../ViewDashboard";

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
                  <LinkButton to={`/view-dashboard/${project.id}`} classStyle="purple">
                    Dashboard {project.nome}
                  </LinkButton>
                  <span className={style.active}>Ativo</span>
                </li>
              );
            } else if(project.status === "CONCLUIDO") {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-dashboard/${project.id}`} classStyle="purple">
                  Dashboard {project.nome}
                  </LinkButton>
                  <span className={style.finished}>Concluído</span>
                </li>
              );
            } else {
              return (
                <li className={style.project} key={project.id}>
                  <LinkButton to={`/view-dashboard/${project.id}`} classStyle="purple">
                    Dashboard {project.nome}
                  </LinkButton>
                  <span className={style.active}>{project.status}</span>
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