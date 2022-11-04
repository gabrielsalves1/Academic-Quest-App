import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'; 
import style from "./EvaluateQuest.module.scss";

import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import GroupQuestContainer from "../../../components/GroupQuestContainer";
import NewContainer from "../../../components/NewContainer";
import { getData } from "../../../service/requests";
import QuestInfo from "../../../components/QuestInfo";

export default function EvaluateQuest() {
  const [ loading, setLoading ] = useState();
  const [ task, setTask ] = useState();
  const { idProject, idQuest } = useParams();

  useEffect(() => {
    getData(`/tarefas/${idQuest}`, setTask, setLoading);
  }, [idQuest]);

  return (
    <NewContainer id="EvaluateQuest" classStyle="containerDirectionRow">

      <ComeBackButtonIcon url={`/project/${idProject}/quest-management`}> </ComeBackButtonIcon>
      <h1 className={style.title}>Avaliar Quest</h1>
        { loading ? (
            <div className={style.alignQuestInfo}>
              <QuestInfo task={task}/>
            </div>
          ) : (<Spinner className={style.loading} animation="border" variant="primary" />)
        }
      <GroupQuestContainer idProject={idProject} idQuest={idQuest}/>
    </NewContainer>
  );
}