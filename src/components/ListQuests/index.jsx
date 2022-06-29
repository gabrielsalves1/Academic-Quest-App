import React, { useState, useEffect } from "react";
import style from "./ListQuests.module.scss";

import LinkButton from "../LinkButton";
import { getTasks } from "../../service/requests";

export default function ListQuests(props) {
  const [ quests, setQuests ] = useState();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  useEffect(() => {
    getTasks(props.idProject, setQuests);
  }, [props.idProject]);

  return (
    <>
      <div className={style.menuCreateQuest}>
        <LinkButton to="/projects">Voltar</LinkButton>

        <LinkButton to={`/project/${props.idProject}/create-quest`} classStyle="purple">Criar Quest</LinkButton>
      </div>

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
      </ul>
    </>
  );
}