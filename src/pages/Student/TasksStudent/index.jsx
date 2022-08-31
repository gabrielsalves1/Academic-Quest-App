import React from "react";
import style from "./TasksStudent.module.scss";

import Container from "../../../components/Container";
import LinkButton from "../../../components/LinkButton";
import ListQuestsByStudent from "../../../components/ListQuestsByStudent";

export default function TasksStudent() {
  return (
    <Container classStyle="containerAlignCenter">
      <h1 className={style.title}>Tarefas</h1>

      <div className={style.tasks}>
        <div className={style.menuTasks}>
          <LinkButton to="/projects">Voltar</LinkButton>
        </div>

        <ListQuestsByStudent/>
      </div>
    </Container>
  );
}