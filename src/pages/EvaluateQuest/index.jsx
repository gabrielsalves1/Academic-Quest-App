import React from "react";
import { useParams } from "react-router-dom";
import style from "./EvaluateQuest.module.scss";

import LinkButton from "../../components/LinkButton";
import TableTask from "../../components/TableTask";
import Container from "../../components/Container";

export default function EvaluateQuest() {
  const { idProject, idQuest } = useParams();

  return (
    <Container classStyle="containerAlignCenter">
      <h1 className={style.title}>Avaliar Quest</h1>

      <LinkButton to={`/project/${idProject}/quest-management`}>Voltar</LinkButton>
      <TableTask idProject={idProject}/>
    </Container>
  );
}