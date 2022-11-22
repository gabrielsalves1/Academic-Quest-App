import React, { useState, useEffect } from "react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import style from "./ListQuests.module.scss";

import LinkButton from "../LinkButton";
import { getData } from "../../service/requests";
import StatusBarGreen from "../StatusBarGreen";
import StatusBarGray from "../StatusBarGray";
import BoxChildQuest from "../BoxChildQuest";

export default function ListQuests(props) {
  const [loading, setLoading] = useState();
  const [quests, setQuests] = useState();
  const today = new moment.now();

  useEffect(() => {
    getData(`/tarefas/projeto/${props.idProject}`, setQuests, setLoading);
  }, [props.idProject]);

  return (
    <>
      <div>
        {quests?.length === 0 &&
          <span className={style.withoutDataError}>Não há nenhuma quest cadastrada para o projeto.</span>
        }
      </div>


      {loading ? (
        <div className={style.containerQuests}>
          <div className={style.boxStatus}>
            <StatusBarGreen>Ativos</StatusBarGreen>
            {quests?.map((quest) => {
              const date = new Date(Date.parse(quest.dataEntrega)).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
              const momentDate = new moment(quest.dataEntrega);

              console.log(`momentDate ${momentDate} today ${moment(momentDate).isSameOrAfter(date)}`)
              if (moment(momentDate).isSameOrAfter(today, 'day')) {
                return (
                  <BoxChildQuest urlQuest={`/project/${props.idProject}/evaluate-quest/${quest.id}`} dataEntrega={date} key={quest.id}>
                    {quest.nome}
                  </BoxChildQuest>
                );
              }
            }
            )}
          </div>
          <div className={style.boxStatus}>
            <StatusBarGray>Finalizados</StatusBarGray>
            {quests?.map((quest) => {
              const date = new Date(Date.parse(quest.dataEntrega)).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
              const momentDate = new moment(quest.dataEntrega);

              if (!moment(momentDate).isSameOrAfter(today, 'day')) {
                return (
                  <BoxChildQuest urlQuest={`/project/${props.idProject}/evaluate-quest/${quest.id}`} dataEntrega={date} key={quest.id}>
                    {quest.nome}
                  </BoxChildQuest>
                );
              }
            }
            )}
          </div>
        </div>
      ) : (<Spinner className={style.loading} animation="border" variant="primary" />)}
      <div className={style.boxBtn}>
        <LinkButton to={`/project/${props.idProject}/create-quest`} classStyle="purple">Criar Quest</LinkButton>
      </div>


    </>
  );
}