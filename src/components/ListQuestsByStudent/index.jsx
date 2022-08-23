import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ListQuestsByStudent.module.scss";

import { getData } from "../../service/requests";
import LinkButton from "../LinkButton";

export default function ListQuestsByStudent() {
  const { idProject, idGroup }  = useParams();
  const [ loading, setLoading ] = useState();
  const [ tasks, setTasks ] = useState();

  useEffect(() => {
    getData(`aluno/tarefas/projetoGrupo/${idProject}/${idGroup}`, setTasks, setLoading);
  }, [idProject, idGroup])

  return (
    <>
      { loading ? (
        <ul>
          { tasks?.map((task) => {
            if(task.statusTarefa === "PENDENTE") {
              return (
                <li className={style.task} key={task.projetoId}>
                  <LinkButton to={`/project/${task.projetoId}/group/${task.grupoId}/tasks`} classStyle="purple">
                    {task.nomeTarefa}
                  </LinkButton>
                  <span className={style.active}>Ativo</span>
                  <span className={style.infoText}>Data de Entrega: {new Date(Date.parse(task.dataEntrega)).toLocaleDateString()}</span>
                </li>
              );
            } else if(task.statusTarefa === "CONCLUIDO") {
              return (
                <li className={style.task} key={task.projetoId}>
                  <LinkButton to={`/project/${task.projetoId}/group/${task.grupoId}/tasks`} classStyle="purple">
                    {task.nomeTarefa}
                  </LinkButton>
                  <span className={style.finished}>Concluído</span>
                  <span className={style.infoText}>Data de Entrega: {new Date(Date.parse(task.dataEntrega)).toLocaleDateString()}</span>
                </li>
              );
            } else {
              return (
                <li className={style.task} key={task.projetoId}>
                  <LinkButton to={`/project/${task.projetoId}/group/${task.grupoId}/tasks`} classStyle="purple">
                    {task.nomeTarefa}
                  </LinkButton>
                  <span className={style.active}>{task.statusTarefa}</span>
                  <span className={style.infoText}>Data de Entrega: {new Date(Date.parse(task.dataEntrega)).toLocaleDateString()}</span>
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