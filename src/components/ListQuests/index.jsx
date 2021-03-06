import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import style from "./ListQuests.module.scss";

import LinkButton from "../LinkButton";
import { getData } from "../../service/requests";

export default function ListQuests(props) {
  const [ loading, setLoading ] = useState();
  const [ quests, setQuests ] = useState();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  useEffect(() => {
    getData(`/tarefas/projeto/${props.idProject}`, setQuests, setLoading);
  }, [props.idProject]);

  return (
    <>
      <div className={style.menuCreateQuest}>
        <LinkButton to="/projects">Voltar</LinkButton>

        <LinkButton to={`/project/${props.idProject}/create-quest`} classStyle="purple">Criar Quest</LinkButton>
      </div>

      { loading ? (
        <ul>
          { quests?.map((quest) => {
            const date = new Date(Date.parse(quest.dataEntrega));
            if(date < today) {
              return (
                <li className={style.quest} key={quest.id}>
                  <LinkButton to={`/project/${props.idProject}/evaluate-quest/${quest.id}`}>Quest {quest.nome}</LinkButton>
                  <span className={style.date}>
                    Data de Entrega <br/>
                    {date.toLocaleDateString()}
                  </span>
                  <span className={style.finished}>Finalizado</span>
                </li>
              );
            } else {
              return (
                <li className={style.quest} key={quest.id}>
                  <LinkButton to={`/project/${props.idProject}/evaluate-quest/${quest.id}`}>Quest {quest.nome}</LinkButton>
                  <span className={style.date}>
                    Data de Entrega <br/>
                    {date.toLocaleDateString()}  
                  </span>
                  <span className={style.active}>Ativo</span>
                </li>
              );
            }}
          )}

          { quests.length === 0 &&
            <span className={style.withoutDataError}>N??o h?? nenhuma quest cadastrada para o projeto.</span>
          }
        </ul>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
    </>
  );
}