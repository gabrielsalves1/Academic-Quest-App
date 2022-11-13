import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import style from "./ListQuestsByStudent.module.scss";

import { getData } from "../../service/requests";
import LinkButton from "../LinkButton";
import { Link } from "react-router-dom";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarYellow from "../StatusBarYellow";
import BoxFlexDirectionColumn from "../BoxFlexDirectionColumn";

export default function ListQuestsByStudent() {
  const { idProject, idGroup }  = useParams();
  const [ loading, setLoading ] = useState();
  const [ tasks, setTasks ] = useState();

  useEffect(() => {
    getData(`/aluno/tarefas/projetoGrupo/${idGroup}/${idProject}`, setTasks, setLoading);
  }, [idProject, idGroup])

  return (
    <>
      { loading ? (
        <ul>
          { tasks?.map((task) => {
            console.log(task)
            if(task.statusTarefa === "PENDENTE") {
              return (
                 <Link to={`/view-task/${task.tarefaGrupoId}`} key={task.id}>
                  <BoxFlexDirectionColumn>
                    <div className={style.BoxGroupQuest}>
                      <StatusBarYellow classStyle="slim">Pendente</StatusBarYellow> 
                      <div>
                        <h1 className={style.title}> {task.nomeTarefa}</h1>
                      </div>
                    </div>
                  </BoxFlexDirectionColumn>
                </Link>
              );
            } else  if(task.statusTarefa === "ENTREGUE"){
              return (
                <Link to={`/view-task/${task.tarefaGrupoId}`} key={task.id}>
                  <BoxFlexDirectionColumn>
                    <div className={style.BoxGroupQuest}>
                      <StatusBarGreen classStyle="slim">Entregue</StatusBarGreen> 
                      <div>
                        <h1 className={style.title}> {task.nomeTarefa}</h1>
                      </div>
                    </div>
                  </BoxFlexDirectionColumn>
                </Link>
              );
            }}
            )
          }
        </ul>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </>
  );
}