import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsDownload, BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import Spinner from 'react-bootstrap/Spinner'; 
import style from "./EvaluateQuest.module.scss";

import LinkButton from "../../../components/LinkButton";
import TableTask from "../../../components/TableTask";
import Container from "../../../components/Container";
import StylizedButton from "../../../components/StylizedButton";
import { getData } from "../../../service/requests";

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
    
    <Container id="EvaluateQuest" classStyle="containerDirectionRow">
      <div className={style.backButton}>
        <LinkButton to={`/project/${idProject}/quest-management`}>Voltar</LinkButton>
      </div>
      <h1 className={style.title}>Avaliar Quest</h1>

      { loading ? (
          <section className={style.questSection}>
            <div className={style.questInfo}>
              <h2 className={style.taskItem}>{task.nome}</h2>
              <p className={style.taskItem}>Descrição: {task.descricao}</p>
              <span className={style.taskItem}>Data de Entrega: {new Date(Date.parse(task.dataEntrega)).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
            </div>

            <div className={style.questInfo}>
              <StylizedButton onClick={() => { Base64ToPdf(task.nomeArquivo, task.upload, task.formato) }}>Baixar Arquivo<BsDownload className={style.icon}/></StylizedButton>
              { task.nomeArquivo &&
                <span className={style.text}>{task.nomeArquivo} <BsFillFileEarmarkMedicalFill className={style.icon}/></span>
              }
            </div>
          </section>
        ) : (<Spinner className={style.loading} animation="border" variant="primary" />) }
      <TableTask idProject={idProject} idQuest={idQuest}/>
    </Container>
  );
}