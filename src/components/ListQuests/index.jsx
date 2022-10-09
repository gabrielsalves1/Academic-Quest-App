import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import style from "./ListQuests.module.scss";

import LinkButton from "../LinkButton";
import { getData } from "../../service/requests";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarGray from "../StatusBarGray";
import BoxChildQuest from "../BoxChildQuest";

export default function ListQuests(props) {
  const [ loading, setLoading ] = useState();
  const [ quests, setQuests ] = useState();
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

  useEffect(() => {
    getData(`/tarefas/projeto/${props.idProject}`, setQuests, setLoading);
  }, [props.idProject]);

  return (
    <>
    <div>
      { quests.length === 0 &&
        <span className={style.withoutDataError}>Não há nenhuma quest cadastrada para o projeto.</span>
      }
    </div>
        
    
      { loading ? (
        <div className={style.containerQuests}>
          <div className={style.boxStatus}>
            <StatusBarGreen>Ativos</StatusBarGreen>  
            { quests?.map((quest) => {
              const date = new Date(Date.parse(quest.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

              if(date >= today) {
                return (
                  <BoxChildQuest urlQuest={`/project/${props.idProject}/evaluate-quest/${quest.id}`} dataEntrega={date}>
                    {quest.nome}
                  </BoxChildQuest>
                );
              }}
            )}
          </div>
          <div className={style.boxStatus}>
            <StatusBarGray>Finalizados</StatusBarGray>  
            { quests?.map((quest) => {
              const date = new Date(Date.parse(quest.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'});

              if(date < today) {
                return (
                  <BoxChildQuest urlQuest={`/project/${props.idProject}/evaluate-quest/${quest.id}`} dataEntrega={date}>
                    {quest.nome}
                  </BoxChildQuest>
                );
              }}
            )}
          </div>
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
      <div className={style.boxBtn}>
        <LinkButton to={`/project/${props.idProject}/create-quest`} classStyle="purple">Criar Quest</LinkButton>
      </div>

       
    </>
  );
}