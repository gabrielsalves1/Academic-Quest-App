import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsDownload, BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner'; 
import style from "./EvaluateQuest.module.scss";

import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import GroupQuestContainer from "../../../components/GroupQuestContainer";
import NewContainer from "../../../components/NewContainer";
import StylizedButton from "../../../components/StylizedButton";
import { getData } from "../../../service/requests";
import BoxResult from "../../../components/BoxResult";
import BoxFlexDirectionColumn from "../../../components/BoxFlexDirectionColumn";
import StatusBarGreen from "../../../components/StatusBarGreen";
import StatusBarGray from "../../../components/StatusBarGray";

export default function EvaluateQuest() {
  const [ loading, setLoading ] = useState();
  const [ task, setTask ] = useState();
  const { idProject, idQuest } = useParams();

  useEffect(() => {
    getData(`/tarefas/${idQuest}`, setTask, setLoading);
  }, [idQuest]);

  function Base64ToPdf(fileName, base64String, formato) {
    const linkSource = `data:${formato};base64,` + base64String;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <NewContainer id="EvaluateQuest" classStyle="containerDirectionRow">

      <ComeBackButtonIcon url={`/project/${idProject}/quest-management`}> </ComeBackButtonIcon>
      <h1 className={style.title}>Avaliar Quest</h1>
        <BoxResult>
          <BoxFlexDirectionColumn>
      
           { loading ? (
              <div className="questSection">
                <h1 className={style.title}> {task?.nome}</h1>
                <h2 className={style.subtitle}>Descrição:  <span className={style.textBody}>{task?.descricao}</span></h2>
                <h2 className={style.subtitle}>Data de Entrega:  <span className={style.textBody}>{new Date(Date.parse(task?.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span></h2>
            
                <div className={style.questInfo}>
                  <StylizedButton onClick={() => { Base64ToPdf(task.nomeArquivo, task.upload, task.formato) }}>Baixar Arquivo<BsDownload className={style.icon}/></StylizedButton>
                  { task.nomeArquivo &&
                    <span className={style.text}>{task.nomeArquivo} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
                  }
                </div>
              </div>
            ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
          </BoxFlexDirectionColumn>
        </BoxResult>
      <GroupQuestContainer idProject={idProject} idQuest={idQuest}/>
    </NewContainer>
  );
}