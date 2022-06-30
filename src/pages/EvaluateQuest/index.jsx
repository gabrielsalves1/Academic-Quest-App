import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./EvaluateQuest.module.scss";
import { BsDownload } from "react-icons/bs";

import LinkButton from "../../components/LinkButton";
import TableTask from "../../components/TableTask";
import Container from "../../components/Container";
import StylizedButton from "../../components/StylizedButton";
import { getTask } from "../../service/requests";

export default function EvaluateQuest() {
  const [ task, setTask ] = useState();
  const { idProject, idQuest } = useParams();

  useEffect(() => {
    getTask(idQuest, setTask);
  }, [idQuest]);

  function Base64ToPdf(fileName, base64String, formato) {
    const linkSource = `data:${formato};base64,` + base64String;
    const downloadLink = document.createElement("a");

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  return (
    <Container classStyle="containerAlignCenter">
      <div className={style.backButton}>
        <LinkButton to={`/project/${idProject}/quest-management`}>Voltar</LinkButton>
      </div>
      <h1 className={style.title}>Avaliar Quest</h1>

      { task &&
        <section className={style.questSection}>
          <div className={style.questInfo}>
            <h2 className={style.taskItem}>{task.nome}</h2>
            <p className={style.taskItem}>Descrição: {task.descricao}</p>
            <span className={style.taskItem}>Data de Entrega: {new Date(Date.parse(task.dataEntrega)).toLocaleDateString()}</span>
          </div>

          <StylizedButton onClick={() => { Base64ToPdf(task.nomeArquivo, task.upload, task.formato) }}>Baixar Arquivo<BsDownload className={style.icon}/></StylizedButton>
        </section>
      }
      
      <TableTask idProject={idProject} idQuest={idQuest}/>
    </Container>
  );
}