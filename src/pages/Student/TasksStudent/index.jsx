import React from "react";
import style from "./TasksStudent.module.scss";

import NewContainer from "../../../components/NewContainer";
import ComeBackButtonIcon from "../../../components/ComeBackButtonIcon";
import LinkButton from "../../../components/LinkButton";
import ListQuestsByStudent from "../../../components/ListQuestsByStudent";

export default function TasksStudent() {
  return (
    <NewContainer classStyle="containerJustifyCenter">
     <ComeBackButtonIcon url="/projects"> </ComeBackButtonIcon>
     
      <h2 className={style.title}>Tarefa</h2>

      <div className={style.tasks}>
        <ListQuestsByStudent/>
      </div>
    </NewContainer>
  );
}