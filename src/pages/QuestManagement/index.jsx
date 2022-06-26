import React from "react";
import { useParams } from "react-router-dom";
import style from "./QuestManagement.module.scss";

import ListQuests from "../../components/ListQuests";
import Container from "../../components/Container";

export default function QuestManagement(props) {
  const { idProject } = useParams();

  return (
    <Container classStyle="containerAlignCenter">
      <h1 className={style.title}>
        Gerenciamento de Quest
      </h1>

      <ListQuests idProject={idProject}></ListQuests>
    </Container>
  );
}