import React from "react";
import style from "./EvaluateQuest.module.scss";

import LinkButton from "../../components/LinkButton";
import CardQuest from "../../components/CardQuest";
import TableTask from "../../components/TableTask";

export default function EvaluateQuest() {
  return (
    <div className={style.containerQuest}>
      <h1 className={style.title}>Avaliar Quest</h1>

      <div className={style.quest}>
        <CardQuest/>
      </div>

      <LinkButton to="/quest-management">Voltar</LinkButton>
      <TableTask/>
    </div>
  );
}